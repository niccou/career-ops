# Mode : Analyse Gmail — Missions par Email
# Charge automatiquement _shared.md

## Objectif

Lire la boîte Gmail dédiée aux missions, évaluer chaque email via le pipeline
`mission.md` (scoring 10 dimensions, A–F), sauvegarder les rapports, mettre à
jour le tracker, et marquer les emails comme traités.

Ce mode est le complément naturel de `/career-ops alertes` — il traite les
emails générés par les alertes configurées sur Malt, Comet, LinkedIn, etc.

---

## Déclencheur

```
/career-ops gmail
/career-ops gmail --max 30          # lire jusqu'à 30 emails (défaut : 20)
/career-ops gmail --label missions  # lire un label Gmail spécifique
```

---

## Prérequis

Le MCP Gmail doit être configuré dans la session claude.ai.
Si l'outil `mcp__claude_ai_Gmail__authenticate` n'est pas disponible, afficher :

```
⚠️  MCP Gmail non configuré.
Pour activer ce mode :
1. Ouvre claude.ai → Settings → Integrations → Gmail
2. Connecte ton compte Gmail dédié aux missions
3. Relance /career-ops gmail
```

Et arrêter.

---

## Pipeline

### Étape 0 — Authentification Gmail

1. Appeler `mcp__claude_ai_Gmail__authenticate`
2. Afficher l'URL d'autorisation à Nicolas :
   ```
   🔐 Autorisation Gmail requise.
   Ouvre ce lien dans ton navigateur :
   [URL]
   Puis colle l'URL de la page de confirmation ici.
   ```
3. Une fois l'URL de callback collée → appeler `mcp__claude_ai_Gmail__complete_authentication`
4. Les outils Gmail (list, read, modify) sont maintenant disponibles dans la session.

Si déjà authentifié (les outils Gmail sont déjà disponibles) → passer directement à l'étape 1.

---

### Étape 1 — Lire les emails non traités

Utiliser les outils Gmail disponibles post-auth pour lister les emails :
- Filtre : `is:unread in:inbox` (ou le label passé via `--label`)
- Limite : `--max` (défaut 20)
- Si 0 résultats → afficher "✅ Aucun email non lu — boîte à jour." et arrêter.

**Filtre anti-newsletter :**
Ignorer silencieusement un email si :
- L'expéditeur contient "no-reply" ou "noreply" OU est un domaine purement marketing
- ET le corps ne contient aucun des mots-clés mission : `C#`, `.NET`, `freelance`, `mission`,
  `TJM`, `€/j`, `remote`, `développeur`, `architecte`, `lead`, `ingénieur`

Les alertes Google Alerts contiennent des liens → les garder même si expéditeur = google.com.

---

### Étape 2 — Extraire le contenu mission

Pour chaque email retenu :

1. Lire le corps texte complet (ignorer les images, bannières HTML)
2. Détecter les URLs dans le corps
3. Si URL présente :
   - Tentative 1 : `WebFetch` sur l'URL
   - Tentative 2 : Playwright (`browser_navigate` + `browser_snapshot`) si WebFetch insuffisant
   - Si URL inaccessible (login requis, 404) → utiliser le texte de l'email directement
4. Si pas d'URL → utiliser le texte de l'email directement
5. Si le contenu final ne contient aucun élément mission détectable (pas de stack tech,
   pas de rôle, pas de TJM approximatif) → classifier comme "non-mission", skipper,
   incrémenter le compteur "non-missions ignorés".

---

### Étape 3 — Dédupliquer

Lire `data/tracker.tsv`.

Pour chaque email avec contenu mission :
- **Match URL** (prioritaire) : si l'URL du mail est déjà dans la colonne `url` du tracker
  → skipper avec note `"déjà évalué (#NNN)"` (NNN = id du tracker)
- **Match société+titre** (fallback, si pas d'URL) :
  - Le domaine de l'expéditeur est contenu dans la colonne `société` du tracker
  - ET au moins 2 mots significatifs du titre de l'email matchent la colonne `titre` du tracker
  → skipper avec note `"doublon probable (#NNN)"`

---

### Étape 4 — Évaluer chaque mission

Appliquer le pipeline complet de `modes/eval.md` :

1. Extraction des données brutes (titre, stack, TJM, remote, durée, client, secteur…)
2. Détection de l'archétype (lead-dev, archi-migration, backend-senior, formateur, ia-llm…)
3. Scoring 10 dimensions pondérées → note /5 → lettre A–F
4. Détection des alertes (🔴 deal breaker / 🟠 orange / 🟢 positif)

**Numérotation du rapport :**
- Lister tous les fichiers dans `reports/`
- Extraire le préfixe numérique (ex: `042-betclic-2026-01-15.md` → 42)
- Nouveau numéro = max trouvé + 1 (démarrer à 001 si `reports/` est vide)

**Sauvegarder :** `reports/{NNN}-{société-slug}-{YYYY-MM-DD}.md`
(société-slug = nom société en minuscules, espaces remplacés par `-`, accents supprimés)

**Ajouter au tracker** `data/tracker.tsv` :
```
{NNN}	{titre}	{société}	{portail}	{tjm}	{remote}	{durée}	{score}	évalué-{lettre}	{date}	{date}	Postuler si A/B	issu email Gmail	{url}
```

`portail` = plateforme détectée depuis l'expéditeur ou le contenu de l'email
(ex : `malt`, `linkedin`, `comet`, `indeed`, `freelance.com`) — ou `email` si non identifiable.

**Si > 5 emails à évaluer :** lancer chaque évaluation comme Agent en parallèle
(`run_in_background=True`, subagent_type="general-purpose") pour éviter de saturer le
contexte principal. Agréger les résultats une fois tous les agents terminés.

---

### Étape 5 — Marquer les emails dans Gmail

Pour **chaque email traité** (évalué, skipé doublon, ou skipé non-mission) :
- Appliquer le label Gmail `career-ops/traité`
- Marquer comme lu

Pour les emails avec score **A ou B** :
- Appliquer aussi le label Gmail `career-ops/à-postuler`

**Si les labels n'existent pas encore dans Gmail :** les créer via l'API Gmail MCP avant
d'appliquer. Utiliser les outils de modification de labels disponibles post-auth.

---

## Rapport de sortie

```markdown
# Analyse Gmail — {date} — {N} emails traités

## Résumé
- Analysés : {X} | Doublons skippés : {X} | Non-missions ignorés : {X}

## Missions évaluées

| # | Source | Titre | TJM | Remote | Score | Action |
|---|--------|-------|-----|--------|-------|--------|
| 001 | malt.fr | Lead Dev C# .NET | 700 €/j | Full | B | Postuler |
| 002 | linkedin | Architecte microservices | ? | Hybride | A | Postuler en priorité |

## ⚡ À postuler maintenant (A/B)
{liste des missions prioritaires avec lien rapport}

## 💤 Ignorés
- {X} emails non-mission (newsletters, pubs)
- {X} doublons : #{NNN}, #{NNN}...

## Prochaine action
→ /career-ops tracker  (voir le pipeline complet)
→ /career-ops negotiate  (pour préparer une candidature A/B)
```

---

## Cas d'erreur

| Situation | Comportement |
|-----------|-------------|
| MCP Gmail non disponible | Afficher message setup + arrêter |
| URL inaccessible (login, 404) | Utiliser texte email direct |
| Email sans contenu mission | Skipper silencieusement |
| `data/tracker.tsv` inexistant | Créer avec ligne d'en-tête avant d'ajouter |
| `reports/` vide | Démarrer numérotation à 001 |
| Gmail label inexistant | Créer le label via API avant d'appliquer |
