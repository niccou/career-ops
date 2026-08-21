# Mode : Scan de Missions Freelance
# Charge automatiquement _shared.md

## Objectif

Rechercher automatiquement des missions freelance via trois méthodes complémentaires :
1. **Pylote REST API** — `npm run pylote` (5000+ missions agrégées Malt/Comet/Freelance.com, zéro scraping, voir `modes/alertes.md` §0)
2. **Web search** (Google/Bing) — requêtes ciblées, pas de scraping
3. **Playwright** — navigation directe sur les portails qui l'acceptent

Malt et Comet nécessitent une auth directe — ils sont couverts via Pylote et `modes/alertes.md`.

---

## Déclencheur

`/career-ops scan` ou `/career-ops scan [archetype]`

Archétypes : `lead-dev` · `archi` · `backend` · `formateur` · `ia-llm` · `all` (défaut)

---

## Stratégie par portail

### 🔍 Web Search (requêtes ciblées)

```
site:freelance.com "C# .NET" "Lead Dev" remote
site:xxljobs.fr "C#" ".NET" freelance
site:remoteok.com ".NET" "C#" remote
site:indeed.fr "mission freelance" "Lead Dev C#" remote
"Lead Dev C# .NET" freelance mission remote -CDI -CDD
"Tech Lead C# .NET" freelance mission remote -CDI -CDD
"Tech Lead hands-on .NET" freelance mission
"Architecte .NET" freelance mission remote
"formateur C# .NET" intra-entreprise
```

Pour chaque résultat : extraire titre, portail, TJM si visible, remote/hybride, durée.

---

### 🎭 Playwright (navigation directe)

#### Indeed France
```
URL : https://fr.indeed.com/jobs?q=Lead+Dev+C%23+.NET+freelance&l=France
Filtre : Type = Freelance/Indépendant
```

#### RemoteOK
```
URL : https://remoteok.com/remote-.net-jobs
Filtre : C# ou .NET ou backend
```

#### LinkedIn Jobs (public, sans auth)
```
URL : https://www.linkedin.com/jobs/search/?keywords=Lead+Dev+C%23+.NET+freelance&f_JT=C&f_WT=2
f_JT=C = Contract/Freelance · f_WT=2 = Remote
```

#### AI Jobs Board
```
URL : https://aijobs.net/?q=.net+c%23
Filtre : remote, contract
```

#### Freelance-Informatique
```
URL : https://www.freelance-informatique.fr/offres-freelance?keywords=C%23+.NET+remote
URL : https://www.freelance-informatique.fr/offres-freelance?keywords=Lead+Dev+.NET
Extraire uniquement les URLs au format /mission-[slug]-[YYMMDDXXX]
Ignorer : /mission-c-net-*, /developpeur-*, /cv-mission-*
```

#### Freelance.com
```
URL : https://www.freelance.com/missions.php?kw=Lead+Dev+C%23+.NET&remote=1
```

---

## Pipeline

**Étape 1 — Lancer en parallèle** : `npm run pylote` + web search (5 requêtes) + Playwright (5 portails)

**Étape 2 — Dédupliquer** : même titre + même société = doublon

**Étape 3 — Pré-filtrer automatiquement** (éliminer sans évaluation) :
- TJM affiché < 600 €/j
- 100% sur site sans remote
- Stack principale non-.NET
- Annonce > 30 jours
- URLs de type profil/CV freelance (ex: `freelance-informatique.fr/mission-c-net-*`, `/developpeur-*`, `/cv-mission-*`) — ce sont des pages catégorie ou CVs, pas des annonces individuelles

**Étape 4 — Pre-score rapide** (garder si > 60%) :

| Critère | Poids | Signal |
|---------|-------|--------|
| Stack match | 50% | "C#", ".NET", "Lead Dev", "Architecture" |
| Remote | 30% | "remote", "full remote", "télétravail" |
| TJM OK | 20% | ≥ 600 ou non précisé |

**Étape 5 — Rapport** avec top missions et liens directs vers `/career-ops eval [URL]`

---

## Rapport de scan

```markdown
# Scan Missions — [date]

## Résumé
- Trouvées : X · Après filtrage : X · À évaluer : X

## Top missions

### 🥇 [Titre]
- Source : [portail] | TJM : [X€/j] | Remote : [oui/hybride]
- URL : [lien]
- Pre-score : X%
→ `/career-ops eval [URL]`

[suite...]

## Écartées
- X < 600€/j · X sur site · X hors stack
```

---

## Fréquence recommandée

| Situation | Fréquence |
|-----------|-----------|
| En mission (prospection parallèle) | 1x/semaine |
| < 6 semaines avant fin mission | 3x/semaine |
| En inter-mission | 1x/jour |

> Malt / Comet : auth requise → configurer les alertes email (`/career-ops alertes`)
