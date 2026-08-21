#!/usr/bin/env node

/**
 * pylote-jobs.mjs — Pylote REST API mission fetcher (free plan, no MCP needed)
 *
 * Calls GET /v1/me/jobs (5000+ missions aggregated from 14+ platforms:
 * Malt, Comet, Freelance.com...), applies the same pre-filter as
 * modes/scan.md (TJM, stack, remote), dedupes against data/tracker.tsv,
 * and prints a scan-style report ready for /career-ops eval.
 *
 * Free plan: 60 req/hour on /v1/me/*. No MCP required (MCP is Plus-only).
 *
 * Usage:
 *   node pylote-jobs.mjs
 *   node pylote-jobs.mjs --raw     # dump the raw API response (debug field names)
 *
 * Requires:
 *   PYLOTE_API_KEY in .env — retrieve it from the Pylote extension:
 *   Settings → Clé API (https://docs.pylote.io/api-key/)
 */

import { readFileSync, existsSync } from 'fs';

try {
  const { config } = await import('dotenv');
  config();
} catch {
  // dotenv optional — falls back to process.env
}

const API_URL = 'https://api-prod.pylote.io/v1/me/jobs';
const TRACKER_PATH = 'data/tracker.tsv';

const TJM_MIN = 600;
const STACK_KEYWORDS = ['c#', '.net', 'dotnet', 'lead dev', 'architecte', 'backend senior', 'formateur'];
const REMOTE_KEYWORDS = ['remote', 'télétravail', 'full remote', 'hybride'];
const ONSITE_KEYWORDS = ['sur site', 'présentiel'];

// ── Env check ───────────────────────────────────────────────────────

const apiKey = process.env.PYLOTE_API_KEY;
if (!apiKey) {
  console.error(`
❌  PYLOTE_API_KEY not found.

   1. Ouvre l'extension Pylote → Settings → "Clé API"
   2. Ajoute-la dans .env :   PYLOTE_API_KEY=pylk_xxx
   3. Free plan : la clé est visible en pointillés dans l'extension mais
      fonctionne quand même en API (60 req/h sur /v1/me/*).
`);
  process.exit(1);
}

// ── Fetch ───────────────────────────────────────────────────────────

async function fetchJobs() {
  const res = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  if (res.status === 401) throw new Error('401 — clé API invalide ou expirée');
  if (res.status === 403) throw new Error('403 — accès refusé (vérifie que ce n\'est pas un endpoint MCP-only)');
  if (res.status === 429) throw new Error('429 — rate limit atteint (60 req/h sur le free plan)');
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  return res.json();
}

// Pylote's exact JSON shape isn't in the public OpenAPI spec (no response
// schema — only a prose description). Extract defensively across the
// plausible key/wrapper variants rather than assuming one.
function extractJobsArray(json) {
  if (Array.isArray(json)) return json;
  for (const key of ['jobs', 'data', 'missions', 'items', 'results']) {
    if (Array.isArray(json?.[key])) return json[key];
  }
  return [];
}

function pick(obj, keys) {
  for (const k of keys) {
    if (obj[k] !== undefined && obj[k] !== null && obj[k] !== '') return obj[k];
  }
  return null;
}

function normalizeJob(raw) {
  return {
    title: pick(raw, ['title', 'jobTitle', 'name']) || '(sans titre)',
    platform: pick(raw, ['platform', 'source', 'portal']) || '?',
    tjm: pick(raw, ['dailyRate', 'daily_rate', 'tjm', 'rate']),
    city: pick(raw, ['city', 'location']),
    remote: pick(raw, ['remotePolicy', 'remote_policy', 'remote']),
    url: pick(raw, ['url', 'link', 'jobUrl']),
  };
}

// ── Dedup against tracker.tsv ────────────────────────────────────────

function loadSeenUrls() {
  const seen = new Set();
  if (!existsSync(TRACKER_PATH)) return seen;
  const lines = readFileSync(TRACKER_PATH, 'utf-8').split('\n').filter(Boolean);
  const header = lines[0]?.split('\t') || [];
  const urlCol = header.indexOf('url');
  if (urlCol === -1) return seen;
  for (const line of lines.slice(1)) {
    const url = line.split('\t')[urlCol];
    if (url) seen.add(url.trim());
  }
  return seen;
}

// ── Pre-filter + pre-score (mirrors modes/scan.md Étapes 3–4) ────────

function preScore(job) {
  const title = job.title.toLowerCase();
  const remoteText = (job.remote || '').toLowerCase();
  const cityText = (job.city || '').toLowerCase();
  const combinedLocation = `${remoteText} ${cityText}`;

  const stackMatch = STACK_KEYWORDS.some(k => title.includes(k));
  const remoteMatch = REMOTE_KEYWORDS.some(k => combinedLocation.includes(k));
  const onsiteOnly = ONSITE_KEYWORDS.some(k => combinedLocation.includes(k)) && !remoteMatch;
  const tjmNum = job.tjm ? parseInt(String(job.tjm).replace(/\D/g, ''), 10) : null;
  const tjmOk = tjmNum === null || tjmNum >= TJM_MIN;

  const score = (stackMatch ? 50 : 0) + (remoteMatch ? 30 : 0) + (tjmOk ? 20 : 0);

  const excluded = !stackMatch || !tjmOk || onsiteOnly;

  return { ...job, tjmNum, score, excluded, excludeReason: !stackMatch ? 'hors stack' : !tjmOk ? `TJM < ${TJM_MIN}` : onsiteOnly ? 'sur site' : null };
}

// ── Main ──────────────────────────────────────────────────────────

async function main() {
  const raw = process.argv.includes('--raw');

  console.log('Fetching /v1/me/jobs...');
  const json = await fetchJobs();

  if (raw) {
    console.log(JSON.stringify(json, null, 2));
    return;
  }

  const jobsRaw = extractJobsArray(json);
  if (jobsRaw.length === 0) {
    console.log('Aucune mission retournée. Lance avec --raw pour inspecter la réponse brute.');
    return;
  }

  const jobs = jobsRaw.map(normalizeJob).map(preScore);
  const seenUrls = loadSeenUrls();

  const deduped = jobs.filter(j => !j.url || !seenUrls.has(j.url));
  const kept = deduped.filter(j => !j.excluded && j.score > 60).sort((a, b) => b.score - a.score);

  const date = new Date().toISOString().slice(0, 10);
  console.log(`\n${'━'.repeat(45)}`);
  console.log(`Pylote Scan — ${date}`);
  console.log(`${'━'.repeat(45)}`);
  console.log(`Missions récupérées :   ${jobs.length}`);
  console.log(`Doublons (tracker.tsv): ${jobs.length - deduped.length}`);
  console.log(`Écartées (filtre) :     ${deduped.length - kept.length}`);
  console.log(`À évaluer :             ${kept.length}`);

  if (kept.length > 0) {
    console.log('\nTop missions :\n');
    for (const j of kept) {
      console.log(`### ${j.title}`);
      console.log(`- Source : ${j.platform} | TJM : ${j.tjm || '?'} | Remote : ${j.remote || j.city || '?'}`);
      console.log(`- Pre-score : ${j.score}%`);
      if (j.url) console.log(`→ /career-ops eval ${j.url}`);
      console.log('');
    }
  }

  console.log('→ Postuler seulement aux missions notées A ou B après /career-ops eval.');
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
