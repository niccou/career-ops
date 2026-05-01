# Mode : Alertes Passives (Configuration unique)
# Charge automatiquement _shared.md

## Objectif

Configurer une fois pour toutes des alertes automatiques sur les plateformes
qui bloquent le scraping (Malt, Comet, LinkedIn). Les missions arrivent
directement en boîte mail — zéro action manuelle ensuite.

---

## Déclencheur

`/career-ops alertes` → guide de configuration complet

---

## 1. Malt — Alertes email natives

1. https://www.malt.fr/missions → effectuer une recherche
2. Compétences : `C#`, `.NET`, `Architecture logicielle` · Remote : Oui
3. Cliquer **"Créer une alerte"**

| Alerte | Compétences | Fréquence |
|--------|-------------|-----------|
| Lead Dev C# | C#, .NET, Lead Dev | Immédiate |
| Architecte microservices | Architecture, Microservices, .NET | Quotidienne |
| Formateur C# | C#, Formation, .NET | Quotidienne |
| IA + .NET | LLM, IA, C# | Immédiate |

---

## 2. Comet — Matching automatique (profil à compléter)

Comet contacte proactivement quand une mission correspond.
→ Compléter le profil à 100% sur https://www.comet.co (stack, TJM, dispo, remote).
→ Activer les notifications email dans les paramètres.

---

## 3. LinkedIn — Alertes email natives

1. https://www.linkedin.com/jobs → recherche `Lead Dev C# .NET freelance`
2. Filtre : Contrat + Remote
3. Toggle **"Créer une alerte"** → Fréquence : Quotidienne

| Alerte | Mots-clés |
|--------|-----------|
| Lead Dev C# | `Lead Dev C# .NET freelance` |
| Architecte .NET | `Architecte .NET microservices mission` |
| Formateur C# | `Formateur C# .NET` |
| IA + .NET | `LLM .NET C# freelance` |

---

## 4. Google Alerts — Surveillance web globale

https://www.google.fr/alerts — fréquence : **Au fur et à mesure**

```
"Lead Dev C#" freelance mission remote
"Architecte .NET" freelance mission
"développeur C# senior" mission freelance
"formateur C# .NET" intra-entreprise
"migration .NET 8" freelance architecte
```

---

## 5. Indeed + Freelance.com — Alertes natives

- **Indeed** : https://fr.indeed.com → filtre Freelance/Indépendant → "Recevoir les alertes"
- **Freelance.com** : https://www.freelance.com → recherche + "Recevoir les alertes"

---

## 6. RSS (RemoteOK)

```
https://remoteok.com/remote-.net-jobs.rss
https://remoteok.com/remote-c%23-jobs.rss
```
→ Ajouter dans Feedly (gratuit), collection "Missions Freelance"

---

## 7. Centralisation avec Make (optionnel mais puissant)

Scénario Make : tous les emails d'alerte → une ligne dans Google Sheets

```
Déclencheur : Email reçu de malt.fr / linkedin.com / google.com / indeed.fr
Action 1 : Parser (titre, TJM, lien, plateforme)
Action 2 : Ajouter ligne dans Google Sheets "Pipeline Missions"
Action 3 : Notification push mobile (optionnel)
```

Colonnes : `Date | Titre | Plateforme | TJM | Remote | Lien | Statut | Score`

---

## Résumé — temps de configuration

| Plateforme | Méthode | Priorité | Durée |
|------------|---------|----------|-------|
| Malt | Alertes natives | P1 | 5 min |
| LinkedIn | Alertes natives | P1 | 5 min |
| Google Alerts | Alertes natives | P1 | 10 min |
| Comet | Profil matching | P1 | 30 min |
| Indeed | Alertes natives | P2 | 5 min |
| Freelance.com | Alertes natives | P2 | 5 min |
| RSS Feedly | RSS | P2 | 10 min |
| Make centralisé | No-code | P3 | 1–2h |

**~50 min une seule fois** pour les P1. Ensuite : les missions arrivent, tu évalues.

---

## Workflow une fois les alertes actives

```
Email d'alerte reçu
       ↓
Titre + TJM + remote → intéressant ?
  Non → Supprimer
  Oui → /career-ops mission [URL]
              ↓
         Score A ou B ?
           Non → Passer
           Oui → /career-ops negocie → Postuler
```
