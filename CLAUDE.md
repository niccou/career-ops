# Career-Ops — Fork Nicolas Cousin
# Instructions pour Claude Code

## Contexte

Ce fork de career-ops est personnalisé pour **Nicolas Cousin**, Lead Dev / Architecte
C# .NET freelance depuis 2018 (portage salarial + micro-entreprise depuis nov. 2024).

Ce système aide à trouver, évaluer et décrocher des **missions freelance** —
pas des emplois salariés. Les modes et le scoring sont adaptés en conséquence.

---

## Commandes disponibles

```
/career-ops                → Aide et liste des modes
/career-ops mission {URL ou texte}  → Évaluation d'une mission freelance
/career-ops scan           → Scan des portails (Malt, Comet, LinkedIn...)
/career-ops prospecte      → Messages de prospection directe
/career-ops negocie        → Préparation négociation TJM + checklist contrat
/career-ops visibilite     → Audit et optimisation profil freelance
/career-ops intermission   → Gestion proactive fin de mission
/career-ops tracker        → Pipeline des missions en cours
/career-ops pdf            → Génération CV/profil freelance PDF
/career-ops batch          → Évaluation batch de plusieurs missions
```

---

## Fichiers de configuration à personnaliser en premier

1. `config/profile.yml` — profil complet (TJM, conditions, stack, archétypes)
2. `modes/_shared.md` — contexte permanent chargé par tous les modes
3. `config/portals.yml` — plateformes à scanner
4. `cv.md` — CV de Nicolas en markdown (à créer à la racine)

---

## Règles fondamentales

### TJM
- Ne jamais suggérer de postuler à une mission < 600 €/j
- Toujours calculer le TJM recommandé avec les modificateurs contextuels
- En cas d'ESN intermédiaire, demander +10% minimum

### Remote
- Toujours signaler si la mission est 100% sur site hors région
- Distinguer "remote affiché" vs "remote réel" (demander confirmation)

### Portage vs micro-entreprise
- Portage salarial : missions longues (> 1 mois), client entreprise
- Micro-entreprise : formations, missions courtes (< 1 mois), ponctuels
- Ne jamais recommander une structure juridique sans connaître le contexte fiscal

### Qualité > Quantité
Ce système est un **filtre**, pas un outil de candidature massive.
Recommander de postuler uniquement aux missions notées A ou B.
Une mission C = postuler seulement si le pipeline est vide.
Une mission D ou F = passer, sauf exception explicite.

---

## Contexte de Nicolas (résumé)

- **Stack** : C# .NET 8, Architecture (Clean, DDD, CQRS, Microservices), TDD/BDD, Azure, AWS
- **Double profil** : Dev/Architecte senior + Formateur C#/.NET
- **7 ans de freelance** : missions longues en portage (AXA, BetClic, Sage...) + missions courtes/formations en micro-entreprise
- **Mission actuelle** : Natixis (nov. 2025, .NET Framework 4.8)
- **TJM** : 600 €/j minimum, 700 €/j standard, 850+ €/j IA/Formation/Archi
- **Géo** : Full remote préféré, hybride OK (max 2j/sem), France + EU remote

---

## Architecture des fichiers

```
career-ops/
├── CLAUDE.md                    # Ce fichier
├── cv.md                        # CV Nicolas (à créer)
├── config/
│   ├── profile.yml              # Profil freelance complet
│   └── portals.yml              # Plateformes à scanner
├── modes/
│   ├── _shared.md               # Contexte permanent
│   ├── mission.md               # Évaluation mission freelance
│   ├── negocie.md               # Négociation TJM + contrat
│   ├── visibilite.md            # Optimisation profil
│   ├── prospecte.md             # Prospection directe
│   ├── intermission.md          # Gestion inter-missions
│   ├── pdf.md                   # Génération profil PDF
│   ├── scan.md                  # Scanner portails
│   ├── batch.md                 # Batch évaluation
│   └── tracker.md               # Suivi pipeline
├── data/                        # Données (gitignored)
├── reports/                     # Rapports d'évaluation (gitignored)
└── output/                      # PDFs générés (gitignored)
```
