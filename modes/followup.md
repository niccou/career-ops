# Mode : Relances — Cadence de Suivi
# Charge automatiquement _shared.md

## Objectif

Détecter les relances dues sur le pipeline actif, générer les messages de relance
adaptés au statut (prospection, candidature, entretien, négociation), et enregistrer
l'envoi une fois confirmé.

Ce mode est le complément de `/career-ops tracker` : le tracker signale une ligne
"relance urgente" en une phrase, `followup` produit le brouillon complet et gère
l'enregistrement.

---

## Déclencheur

```
/career-ops followup
```

---

## Sources

- `data/tracker.tsv` — pipeline (source de vérité pour le statut et les dates)
- `reports/{NNN}-*.md` — rapport d'évaluation de la mission concernée (contexte pour le draft)
- `config/profile.yml`, `cv.md` — identité et preuves pour les drafts
- Airtable **Contacts** (base `appaiyea0oZpBc6so`, table `tblagi3YSBDgVe8LN`) — coordonnées
  et historique du contact visé

---

## Étape 1 — Lire le pipeline

Lire `data/tracker.tsv`. Ne garder que les lignes actives : exclure `évalué-C`,
`évalué-D`, `évalué-F`, `abandonné`, `clos`, `gagné`, `perdu`, `doublon`,
`non-évalué`, `décliné`.

Pour chaque ligne restante, calculer le nombre de jours écoulés depuis `date_maj`.

---

## Étape 2 — Appliquer les règles de cadence

Mêmes règles que `modes/tracker.md` (section "Règles de relance automatique") et
`modes/prospect.md` (section "Cadence de suivi") — ne pas les faire diverger.

| Statut | Délai | Action |
|--------|-------|--------|
| `prospection envoyée` / `postulé` | J+7 sans réponse | Relance 1 (message court) |
| `prospection envoyée` / `postulé` | J+21 sans réponse | Relance 2 (dernier essai) |
| `prospection envoyée` / `postulé` | J+30 sans réponse | Proposer le passage en `abandonné` |
| `entretien` (passé) | J+3 sans retour | Email de suivi |
| `négociation` | J+5 sans retour | Relancer sur les conditions |
| `en attente réponse` (réponse envoyée, attente clarifications) | J+7 sans retour | Relance courte |

Si la colonne `action` du tracker contient déjà une date de relance explicite
(ex. « Relancer J+7 (2026-08-23) si silence »), elle prime sur le calcul générique
tant qu'elle reste cohérente avec `date_maj`.

---

## Étape 3 — Dashboard

```
# Relances — {date}

## ⚡ Urgent (dû aujourd'hui ou en retard)
| # | Titre | Société | Statut | Depuis | Action |
|---|-------|---------|--------|--------|--------|

## 🟡 À venir (dans les 3 prochains jours)
| # | Titre | Société | Statut | Échéance |
|---|-------|---------|--------|----------|

## Résumé
- X relances dues, X à venir, X missions en `négociation` sous surveillance
```

Si aucune relance due : afficher "✅ Aucune relance en attente." et proposer
`/career-ops tracker` pour la vue d'ensemble, puis arrêter.

---

## Étape 4 — Générer les drafts

Pour chaque ligne urgente :

1. **Identifier le contact** : chercher dans Airtable Contacts par société (colonne
   `société` du tracker) ou nom cité dans `action`/`source`. Si aucune fiche trouvée,
   proposer `/career-ops outreach` avant de générer le draft.
2. **Choisir le template selon le statut** :
   - `prospection envoyée` / `postulé`, 1ère relance → réutiliser le script
     « Relance 1 » de `modes/prospect.md`
   - `prospection envoyée` / `postulé`, 2e relance → script « Relance 2 » de
     `modes/prospect.md`
   - `entretien` passé sans retour → email court : remercier, référencer un point
     concret de l'entretien ou du rapport `reports/{NNN}-*.md`, redemander une
     date de retour. Inclure le lien Calendly (https://calendly.com/nicolas-cousin/30min)
     si un nouvel échange est proposé, plutôt que de demander des créneaux.
   - `négociation` sans retour → relance orientée conditions, cf. `modes/negotiate.md`
     (ne pas dupliquer les scripts de négociation ici, y renvoyer).
3. **Respecter les règles de style de `_shared.md`** : pas de marqueurs IA, pas de
   tiret long en milieu de phrase, fait concret plutôt qu'adjectif.

Afficher chaque draft :

```
## Relance : {Titre} — {Société} (#{id})

**Destinataire :** {contact ou "à identifier via /career-ops outreach"}
**Statut / depuis :** {statut}, {N}j
**Canal :** Email / LinkedIn

{texte du draft}
```

---

## Étape 5 — Enregistrer l'envoi

Seulement après confirmation explicite de Nicolas qu'il a envoyé la relance :

1. Mettre à jour `data/tracker.tsv` sur la ligne concernée : `date_maj` = date du
   jour, `action` = courte note (ex. « Relance 1 envoyée, sans réponse depuis »).
2. Mettre à jour la fiche Airtable Contacts correspondante (chercher par Name +
   Company, ne jamais dupliquer) : `Last Contact` = date du jour, `Last Event` =
   ce qui a été envoyé.

**Important :** ne jamais enregistrer une relance comme envoyée sans confirmation.
Un brouillon affiché n'est pas une relance envoyée.

---

## Étape 6 — Résumé

```
**Relances — {date}**
- {N} relances dues, drafts ci-dessus
- {N} en négociation sous surveillance (échéance J+5)
- {N} à surveiller dans les prochains jours

Dis-moi lesquelles ont été envoyées pour que je les enregistre.
```
