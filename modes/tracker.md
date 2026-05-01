# Mode : Tracker Pipeline Missions
# Charge automatiquement _shared.md

## Objectif

Maintenir un pipeline clair de toutes les missions en cours de prospection,
suivi et négociation. Éviter les oublis de relance et avoir une vue d'ensemble
de l'activité commerciale freelance.

---

## Déclencheur

`/career-ops tracker` → affiche le pipeline complet
`/career-ops tracker update [mission]` → met à jour le statut d'une mission
`/career-ops tracker add [URL ou texte]` → ajoute une mission au pipeline

---

## Statuts du pipeline

```
DÉCOUVERTE → ÉVALUÉ → POSTULÉ → ENTRETIEN → NÉGOCIATION → GAGNÉ / PERDU / ABANDONNÉ
```

| Statut | Définition | Action suivante |
|--------|-----------|-----------------|
| `découverte` | Mission repérée, pas encore évaluée | `/career-ops mission [URL]` |
| `évalué-A` | Score A — à postuler en priorité | Postuler dans les 24h |
| `évalué-B` | Score B — à postuler si pas mieux | Postuler dans les 48h |
| `évalué-C` | Score C — en attente pipeline vide | Mettre de côté |
| `évalué-F` | Score F — écarté | Archiver |
| `postulé` | Candidature envoyée | Relancer J+7 si silence |
| `entretien` | Entretien planifié ou passé | Préparer / envoyer suivi |
| `négociation` | Discussion TJM/conditions en cours | `/career-ops negocie` |
| `gagné` | Mission confirmée / contrat signé | Planifier démarrage |
| `perdu` | Mission attribuée à quelqu'un d'autre | Demander retour si possible |
| `abandonné` | Retiré volontairement (trop bas, trop loin...) | Archiver avec raison |

---

## Format du tracker (fichier data/tracker.tsv)

```tsv
id	titre	société	portail	tjm	remote	durée	score	statut	date_découverte	date_action	prochaine_action	notes	url
001	Lead Dev C# .NET	Fintech Paris	Malt	700	full	6 mois	B	postulé	2026-01-15	2026-01-16	Relance J+7 (2026-01-23)	ESN intermédiaire, client final = banque	https://...
```

---

## Commandes tracker

### Afficher le pipeline

```
/career-ops tracker
```

Affiche un tableau groupé par statut, trié par date d'action, avec les relances urgentes en tête.

**Format d'affichage :**

```
# Pipeline Missions — [date]

## ⚡ Relances urgentes (action requise aujourd'hui)
| # | Titre | Société | Score | Statut | Action due |
|---|-------|---------|-------|--------|-----------|
| 001 | Lead Dev C# | Fintech Paris | B | postulé | Relance (J+7 dépassé) |

## 🟢 En cours actifs
| # | Titre | Score | Statut | Prochaine action |
|---|-------|-------|--------|-----------------|
| 003 | Archi .NET | B | entretien | Entretien vendredi 10h |

## 🔵 Postulé (en attente)
...

## 🟡 À postuler (score A/B)
...

## 📦 Découvertes (à évaluer)
...

## Stats
- Pipeline actif : X missions
- Taux de réponse : X% (X réponses / X postulées)
- TJM moyen pipeline : X €/j
- Missions A+B en attente : X
```

### Ajouter une mission

```
/career-ops tracker add [URL ou description]
```

→ Évalue automatiquement (via `mission.md`) et ajoute au tracker avec statut `découverte` ou `évalué-X`.

### Mettre à jour un statut

```
/career-ops tracker update 001 entretien "Entretien vendredi 17 jan à 10h"
```

### Archiver les missions terminées

```
/career-ops tracker archive
```

→ Déplace les missions `gagné` / `perdu` / `abandonné` de plus de 30 jours dans `data/tracker-archive.tsv`.

---

## Règles de relance automatique

Le tracker détecte et signale les relances en retard :

| Statut | Délai avant relance | Action suggérée |
|--------|--------------------|-----------------| 
| `postulé` | J+7 sans réponse | Envoyer relance 1 (`/career-ops prospecte`) |
| `postulé` | J+21 sans réponse | Envoyer relance 2 (dernière) |
| `postulé` | J+30 sans réponse | Passer à `abandonné` |
| `entretien passé` | J+3 sans retour | Envoyer email de suivi |
| `négociation` | J+5 sans retour | Relancer sur les conditions |

---

## Alertes pipeline

Le tracker génère des alertes contextuelles :

```
⚠️  PIPELINE VIDE : aucune mission A/B en cours — lancer /career-ops scan
⚠️  FIN DE MISSION PROCHE : Natixis estimée dans X semaines — activer prospection
⚠️  X relances en retard — voir section "Relances urgentes"
✅  Mission gagné : mettre à jour disponibilité sur Malt/Comet/LinkedIn
```

---

## Intégration avec les autres modes

```
/career-ops scan          → missions découvertes ajoutées au tracker
/career-ops mission [URL] → évaluation → ajout au tracker avec score
/career-ops negocie       → déclenché depuis une mission en statut négociation
/career-ops prospecte     → scripts de relance pour les missions postulées
/career-ops intermission  → vue croisée avec la date de fin de mission actuelle
```
