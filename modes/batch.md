# Mode : Batch — Évaluation Parallèle de Missions
# Charge automatiquement _shared.md

## Objectif

Évaluer plusieurs missions en parallèle en une seule commande.
Utile après un scan qui remonte 10+ missions, ou après une session
de veille sur Malt/LinkedIn.

---

## Déclencheur

```
/career-ops batch [liste d'URLs ou fichier]
```

Exemples :
```
/career-ops batch https://malt.fr/... https://linkedin.com/... https://freelance.com/...
/career-ops batch --file jds/batch-janvier.txt
```

Le fichier `jds/batch-janvier.txt` contient une URL ou description par ligne.

---

## Pipeline batch

### Étape 1 — Chargement

Lire toutes les missions (URLs ou textes bruts).
Maximum recommandé : **15 missions par batch** (au-delà, découper en plusieurs passes).

### Étape 2 — Évaluation parallèle (sous-agents)

Lancer `claude -p` en parallèle pour chaque mission avec le prompt de `modes/eval.md`.

```bash
# batch-runner.sh (adapté de l'original)
for mission in "${missions[@]}"; do
  claude -p "$(cat modes/eval.md modes/_shared.md) Évalue cette mission : $mission" \
    --output-format json >> data/batch-results.jsonl &
done
wait
```

### Étape 3 — Agrégation et tri

Trier les résultats par score décroissant.
Grouper par lettre (A, B, C, D, F).

### Étape 4 — Rapport de synthèse

```markdown
# Rapport Batch — [date] — [N] missions évaluées

## 🏆 Score A — Postuler immédiatement
| Titre | Société | TJM | Remote | Score | Lien |
|-------|---------|-----|--------|-------|------|
| Lead Dev C# | Fintech XYZ | 750€/j | Full | 4.7/5 | ... |

## ✅ Score B — Postuler si pipeline léger
| ... |

## 🟡 Score C — Garder en réserve
| ... |

## ❌ Score D/F — Ignorés
| Titre | Raison d'élimination |
|-------|---------------------|
| Dev C# junior | TJM 450€/j — sous le minimum |
| Mission sur site Lyon | 100% présentiel hors région |

## Synthèse
- Missions A : X
- Missions B : X
- Missions C : X
- Missions éliminées : X
- TJM moyen des A+B : X €/j
- Remote dominant dans les A+B : X%

## Actions recommandées
1. Postuler sur [mission A1] — `/career-ops negotiate` pour préparer
2. Postuler sur [mission A2]
3. Garder [mission B1] en réserve
→ Ajouter toutes au tracker : `/career-ops tracker add --batch data/batch-results.jsonl`
```

---

## Fichier batch d'entrée (format)

`jds/batch-[date].txt` — une entrée par ligne, trois formats acceptés :

```
# URLs directes
https://www.malt.fr/mission/lead-dev-c-sharp-...
https://www.linkedin.com/jobs/view/...

# Texte brut (coller l'annonce entre triple guillemets)
"""
Lead Dev C# .NET — 6 mois — Remote — 700€/j
Nous cherchons un Lead Dev...
"""

# Fichiers locaux
jds/mission-fintech.txt
jds/mission-sage-2026.txt
```

---

## Conseils d'utilisation

**Quand lancer un batch :**
- Après un `/career-ops scan` qui remonte 10+ missions
- Après une session de veille manuelle sur Malt/LinkedIn (copier les URLs)
- En début de semaine si en inter-mission

**Fréquence recommandée :**
- En mission (prospection parallèle) : 1 batch/semaine
- En inter-mission : 1 batch/jour sur les nouvelles missions

**Limite de tokens :**
Si le batch dépasse 15 missions, découper :
```
/career-ops batch --file jds/batch.txt --start 1 --end 10
/career-ops batch --file jds/batch.txt --start 11 --end 20
```
