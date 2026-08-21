# Mode : Évaluation de Mission Freelance
# Charge automatiquement _shared.md

## Objectif

Évaluer une annonce de mission freelance et produire un rapport structuré
avec score global, analyse détaillée et recommandation GO/NO-GO.

---

## Déclencheur

L'utilisateur colle une annonce de mission, une URL ou un texte de brief.

---

## Pipeline d'évaluation

### Étape 1 — Extraction des données brutes

Extraire depuis l'annonce :
- Titre et type de mission
- Stack technique demandée
- TJM proposé (ou fourchette)
- Durée + renouvellement
- Remote / hybride / sur site (précision %)
- Localisation client
- Client final ou ESN intermédiaire
- Secteur d'activité
- Profil recherché (senior/lead/archi ?)
- Délai de démarrage
- Délai de paiement (si mentionné)
- Contact / source

### Étape 2 — Détection de l'archétype

Parmi les archetypes de Nicolas (cf. _shared.md), identifier lequel correspond
le mieux : lead-dev, archi-migration, backend-senior, formateur, ia-llm, devsecops.

### Seuils TJM par archétype

| Archétype | TJM min | Exception |
|-----------|---------|-----------|
| lead-dev-dotnet | 650 €/j | — |
| archi-microservices | 700 €/j | — |
| backend-senior | 550 €/j | — |
| formateur-dotnet | 1000 €/j | Écoles (école, lycée, GRETA, campus, université, IUT, BTS, CFA) : 400–500 €/j |
| ia-llm-dotnet | 800 €/j | — |
| devsecops | 650 €/j | — |
| audit-conseil-ponctuel | 800 €/j | — |
| **non détecté** | **600 €/j** | Seuil global de secours |

Pour le scoring TJM : comparer le TJM proposé au seuil minimum de l'archétype détecté.
- TJM ≥ cible haute : 5/5
- TJM entre min et cible : 3–4/5
- TJM légèrement sous le min (< 10%) : 1–2/5 + signal 🟠
- TJM sous le min : 0/5 + signal 🔴 deal breaker

---

### Étape 3 — Scoring (10 dimensions, note 0–5)

| # | Dimension | Poids | Description |
|---|-----------|-------|-------------|
| 1 | **Match stack** | 25% | C# .NET dominant ? Version récente (.NET 6+) ? |
| 2 | **TJM** | 20% | Vs seuil minimum de l'archétype détecté (voir table ci-dessous). Sous le seuil = 0. |
| 3 | **Remote** | 15% | Full remote = 5. Hybride ok = 3. Sur site seul = 0–1. |
| 4 | **Client final** | 10% | Client direct = 5. ESN avec client identifié = 3. ESN opaque = 1. |
| 5 | **Durée & renouvellement** | 10% | 6 mois+ = 5. 3 mois = 3. < 1 mois = 1. **Exception audit-conseil-ponctuel : 1–5 jours = 5 (format nominal).** |
| 6 | **Niveau / responsabilité** | 8% | Lead/Archi = 5. Senior = 4. Junior/support = 1. |
| 7 | **Délai de paiement** | 6% | ≤ 30j = 5. 45j = 3. 60j = 1. Non précisé = 2. |
| 8 | **Secteur / contexte** | 3% | Critique (banque, assurance) = 5. Interesting = 3. Ennuyeux = 1. |
| 9 | **Potentiel évolution** | 2% | Mission récurrente / long terme ? |
| 10 | **Timing** | 1% | Démarrage compatible avec fin mission Natixis ? |

**Score final = moyenne pondérée × 5 → note /5 → lettre A–F**

| Score | Lettre | Recommandation |
|-------|--------|----------------|
| 4.5–5.0 | A | Postuler en priorité |
| 3.5–4.4 | B | Postuler si pas mieux |
| 2.5–3.4 | C | Postuler seulement si pipeline vide |
| 1.5–2.4 | D | Négocier conditions avant |
| < 1.5 | F | Passer |

### Étape 4 — Détection des signaux d'alerte

Signaler explicitement :
- 🔴 Deal breaker (TJM sous le seuil de l'archétype, 100% sur site, paiement > 60j)
- 🟠 Points à négocier (ESN, framework ancien, délai paiement 45j)
- 🟢 Signaux positifs (client final connu, stack moderne, remote, durée longue)

### Étape 5 — Rapport

```markdown
# Évaluation Mission : [Titre]
Date : [date]
Source : [plateforme / contact]

## Résumé
- **Score** : X.X/5 — Lettre **[A/B/C/D/F]**
- **Recommandation** : [GO / GO avec conditions / NO-GO]
- **Archétype** : [lead-dev / archi / backend / formateur / ia-llm]
- **TJM proposé** : [X €/j] vs cible [Y €/j] → [OK / Trop bas / Négocier]
- **Remote** : [Full / Hybride Xj/sem / Sur site]
- **Durée** : [X mois] + [renouvelable / non précisé]

## Scoring détaillé
| Dimension | Note /5 | Commentaire |
|-----------|---------|-------------|
| Match stack | X | ... |
| TJM | X | ... |
| Remote | X | ... |
| Client final | X | ... |
| Durée | X | ... |
| Niveau | X | ... |
| Délai paiement | X | ... |
| Secteur | X | ... |
| Potentiel évolution | X | ... |
| Timing | X | ... |
| **TOTAL** | **X.X** | |

## Alertes
🔴 [deal breakers éventuels]
🟠 [points à négocier]
🟢 [points positifs]

## Questions à poser avant de postuler
1. ...
2. ...

## Prochaine action recommandée
[Postuler maintenant / Demander précisions / Passer]
```

---

## Cas spéciaux

**Mission de formation :**
Ajouter dimension : contenu demandé vs expertise Nicolas, nb de stagiaires,
matériel fourni ou à créer, format (présentiel/remote).

**Mission d'audit / conseil ponctuel :**
Archétype `audit-conseil-ponctuel` — règles spécifiques :
- `duree_min_semaines` = 0 (1 à 5 jours est le format nominal, pas un malus)
- TJM cible : 800–1200 €/j (livrable concret = justifie le premium)
- Structure : micro-entreprise (facturation rapide)
- Disponibilité : compatible avec temps libre en mission ou inter-mission courte
- Signaux détecteurs : "audit", "revue de code", "dette technique", "diagnostic", "bilan architecture", "évaluation"
- Questions à poser systématiquement : périmètre précis du livrable attendu ? deadline ? accès au code/infra prévu ? format du rendu (rapport écrit, présentation, atelier) ?

**Mission internationale (EU / UK) :**
Vérifier : timezone, langue de travail, devise (convertir en EUR),
implications fiscales (portage salarial recommandé pour EU).

**Mission via ESN :**
Toujours demander : nom du client final, conditions de sortie,
délai de paiement réel (pas le délai ESN → client).