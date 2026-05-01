# Mode : Prospection Directe
# Charge automatiquement _shared.md

## Objectif

Générer des messages de prospection pour contacter directement des clients
potentiels ou réactiver des relations existantes. La prospection directe
est souvent le canal le plus rentable (pas de commission plateforme, TJM brut).

---

## Déclencheur

`/career-ops prospecte [cible / contexte]`

---

## Types de prospection

### 1. Réactivation d'anciens clients

Les clients de Nicolas à réactiver en priorité :

| Client | Dernière mission | Archétype probable | Canal |
|--------|-----------------|-------------------|-------|
| BetClic | Oct. 2024 | Backend / Archi .NET | LinkedIn / email direct |
| Sage | Mars 2023 | Backend / API .NET | LinkedIn |
| AXA en France | Mars 2021 | Lead Dev / Archi / DevSecOps | LinkedIn |
| École IT | Mai 2025 | Formation C# | Email direct |
| Assystem / Artza | Fév. 2025 | Formation | Email direct |

**Script réactivation (adapter par client) :**

```
Bonjour [Prénom],

J'espère que vous allez bien. Je me permets de vous recontacter
après notre collaboration sur [mission / formation] en [date].

Je suis actuellement en fin de mission et je commence à regarder
les prochaines opportunités pour [Q2/Q3 2026]. Est-ce que [société]
a des projets en cours ou à venir sur lesquels je pourrais vous
apporter de la valeur ?

Mon positionnement actuel : Lead Dev / Architecte C# .NET, disponible
pour des missions [remote / hybride] à partir de [date].

N'hésitez pas si vous avez des questions ou si vous souhaitez échanger.

Nicolas Cousin
nicolas-cousin.com | +33 6 38 12 29 63
```

### 2. Contact à froid (ESN / DSI / scale-up)

**Cibler en priorité :**
- DSI de banques / assurances / fintech (secteur connu)
- Startups / scale-ups avec stack .NET
- ESN spécialisées .NET (Soat, Xebia, Theodo, etc.)
- Organismes de formation qui sous-traitent les formateurs

**Script LinkedIn (court — < 300 chars pour la note de connexion) :**

```
Bonjour [Prénom], Lead Dev C# .NET freelance avec 7 ans d'indépendant —
migrations .NET 8, microservices, formations. Je me permets de vous
contacter pour échanger sur vos besoins éventuels.
```

**Message de suivi après connexion acceptée :**

```
Bonjour [Prénom],

Merci d'avoir accepté ma demande. Je suis Nicolas, Lead Dev / Architecte
C# .NET freelance, spécialisé sur [stack du prospect si connu ou "les
migrations .NET 8 et l'architecture microservices"].

J'ai récemment travaillé sur [1 référence pertinente pour ce prospect] —
ce type de contexte me correspond bien.

Est-ce que vous avez des besoins en cours ou prévus sur ce type de profil ?
Je serais ravi d'en discuter.

Bonne journée,
Nicolas
```

### 3. Prospection formation intra-entreprise

**Cibles :** DSI, Responsables formation (L&D), CTO de PME/ETI tech

```
Objet : Formation C# / .NET / Architecture — Nicolas Cousin, formateur indépendant

Bonjour [Prénom],

Je suis formateur C# .NET indépendant, certifié Microsoft, avec des interventions
récentes pour la DGCCRF, l'École IT (Valenciennes et Bruxelles) et Assystem.

Mes formations : C# moderne, Clean Architecture, DDD/CQRS, TDD/BDD, migration .NET 8.
Format intra-entreprise, 1 à 5 jours, présentiel ou remote.

Si vous avez des besoins de montée en compétences de vos équipes .NET en 2026,
je serais heureux d'échanger sur un programme sur mesure.

Nicolas Cousin
contact@nicolas-cousin.com | nicolas-cousin.com
```

---

### 4. Prospection audit & conseil ponctuel (micro-entreprise)

**Cibles prioritaires :** CTO / fondateur technique de startup, DSI de PME/ETI (50–500 salariés),
dirigeants tech sans Lead Dev interne. Canal principal : LinkedIn direct.

**Signaux déclencheurs chez la cible :**
- "On a une appli .NET qui date, on ne sait plus trop où on en est"
- Recrutement d'un Lead Dev ou Architecte en cours (ils ont besoin d'un état des lieux avant)
- Migration cloud ou refonte prévue (besoin de cadrage technique)
- Incidents répétés en prod (dette technique visible)

**Script LinkedIn (note de connexion — < 300 chars) :**

```
Bonjour [Prénom], Lead Dev / Architecte C# .NET freelance —
j'accompagne les PME sur des audits de code et d'architecture .NET
ponctuels (1 à 5 jours, livrable concret). Je me permets de vous contacter.
```

**Message de suivi après connexion acceptée :**

```
Bonjour [Prénom],

Merci d'avoir accepté ma demande. Je suis Nicolas, Lead Dev / Architecte
C# .NET freelance avec 13 ans d'expérience sur des contextes critiques
(banque, assurance, e-commerce haute dispo).

J'interviens ponctuellement auprès de PME/ETI pour des audits techniques :
revue de code, évaluation d'architecture, bilan de dette technique —
avec un livrable actionnable en quelques jours.

C'est souvent utile avant un recrutement senior, une migration, ou après
des incidents répétés. Est-ce que vous avez ce type de besoin ou de projet
en cours chez [société] ?

Bonne journée,
Nicolas Cousin
nicolas-cousin.com | contact@nicolas-cousin.com
```

**Script email direct (si contact identifié) :**

```
Objet : Audit .NET ponctuel — regard extérieur sur votre base de code

Bonjour [Prénom],

Je suis Nicolas Cousin, Lead Dev / Architecte C# .NET freelance, certifié
Microsoft, avec 13 ans d'expérience sur des applications critiques (Natixis,
AXA, BetClic).

J'interviens ponctuellement pour des audits techniques ciblés :
- Revue de code et identification des risques
- Évaluation d'architecture et de dette technique
- Bilan CI/CD et pratiques de livraison
Format : 1 à 5 jours, livrable écrit + recommandations priorisées.

Si vous avez un projet de migration, un recrutement senior en préparation,
ou simplement besoin d'un regard extérieur sur votre stack .NET, je serais
ravi d'en discuter.

Nicolas Cousin
contact@nicolas-cousin.com | nicolas-cousin.com | +33 6 38 12 29 63
```

---

## Cadence de suivi

| Étape | Délai | Action |
|-------|-------|--------|
| 1er message | J | Envoi |
| Relance 1 | J+7 | Si pas de réponse — message court |
| Relance 2 | J+21 | Si pas de réponse — dernier essai |
| Archive | J+30 | Marquer "sans suite" dans le tracker |

**Relance 1 (si pas de réponse après 7 jours) :**
```
Bonjour [Prénom], je me permets un petit rappel suite à mon message
de la semaine dernière. Avez-vous des disponibilités pour un bref échange ?
```

**Relance 2 (dernier essai) :**
```
Bonjour [Prénom], dernier message de ma part pour ne pas vous importuner.
Si ce n'est pas le bon moment, pas de souci — n'hésitez pas à me recontacter
si un besoin se présente à l'avenir. Bonne continuation !
```

---

## Rapport de prospection

```markdown
# Campagne de Prospection — [date]

## Cibles contactées
| Contact | Société | Canal | Statut | Suivi |
|---------|---------|-------|--------|-------|
| ... | ... | LinkedIn | Envoyé | J+7 |

## Statistiques
- Contacts envoyés : X
- Réponses : X (X%)
- Entretiens planifiés : X
- Missions identifiées : X
```
