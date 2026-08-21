# Mode : Prospection Directe
# Charge automatiquement _shared.md

## Objectif

Générer des messages de prospection pour contacter directement des clients
potentiels ou réactiver des relations existantes. La prospection directe
est souvent le canal le plus rentable (pas de commission plateforme, TJM brut).

---

## Déclencheur

`/career-ops prospect [cible / contexte]`

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

Je vous recontacte après [mission / formation] sur [sujet] en [date].

Ma mission actuelle se termine [date] et je regarde ce qui se présente
pour [Q2/Q3 2026]. Est-ce qu'il y a des chantiers .NET en cours ou
prévus chez [société] ?

Je suis sur du Lead Dev / Architecture C# .NET, dispo en [remote /
hybride] à partir de [date].

Si le timing n'est pas bon, dites-le moi et je reviendrai vers vous
plus tard.

Nicolas Cousin
nicolas-cousin.com | +33 6 38 12 29 63
```

### 2. Contact à froid (ESN / DSI / scale-up)

**Cibler en priorité :**
- DSI de banques / assurances / fintech (secteur connu)
- Startups / scale-ups avec stack .NET
- ESN spécialisées .NET (Soat, Xebia, Theodo, etc.)
- Organismes de formation qui sous-traitent les formateurs

**Script LinkedIn (court, < 300 chars pour la note de connexion) :**

```
Bonjour [Prénom], je suis développeur / architecte C# .NET en freelance.
Je travaille surtout sur des migrations .NET 8 et de l'architecture
microservices. Je vous écris au cas où [société] aurait ce type de besoin
dans les mois qui viennent.
```

**Message de suivi après connexion acceptée :**

```
Bonjour [Prénom],

Merci pour la connexion. Je fais du C# .NET en freelance depuis 2018,
surtout sur [stack du prospect si connu, sinon "des migrations .NET 8 et
de l'architecture microservices"].

Le sujet le plus proche du vôtre sur lequel j'ai bossé : [1 référence +
le résultat concret, ex. "migration d'un socle .NET Framework vers .NET 8
chez X, sans coupure de service"].

Vous avez un besoin sur ce type de profil en ce moment, ou c'est plutôt
un sujet pour plus tard ?

Bonne journée,
Nicolas
```

### 3. Prospection formation intra-entreprise

**Cibles :** DSI, Responsables formation (L&D), CTO de PME/ETI tech

```
Objet : Formation C# / .NET en intra-entreprise

Bonjour [Prénom],

Je suis formateur C# .NET indépendant, certifié Microsoft. Mes dernières
interventions : DGCCRF, École IT (Valenciennes et Bruxelles), Assystem.

Ce que je couvre : C# moderne, Clean Architecture, DDD/CQRS, TDD/BDD,
migration .NET 8. En intra, de 1 à 5 jours, sur site ou en remote.

Si vous avez des équipes .NET à faire monter en compétences en 2026,
dites-moi sur quoi elles bloquent et je vous propose un programme.

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

**Script LinkedIn (note de connexion, < 300 chars) :**

```
Bonjour [Prénom], je suis développeur / architecte C# .NET en freelance.
Je fais des audits de code et d'architecture .NET pour des PME, sur 1 à
5 jours, avec un document écrit à la fin. Je vous écris au cas où le sujet
vous parle.
```

**Message de suivi après connexion acceptée :**

```
Bonjour [Prénom],

Merci pour la connexion. Je suis développeur / architecte C# .NET, 13 ans
sur des applis critiques en banque, en assurance et en e-commerce haute
dispo.

J'interviens aussi sur des audits courts chez des PME/ETI : je lis le code,
je regarde comment c'est architecturé et où est la dette. À la fin vous avez
un document avec les risques classés et par quoi commencer.

Ça se déclenche souvent avant un recrutement senior, avant une migration,
ou après une série d'incidents en prod. C'est un sujet chez [société] ?

Bonne journée,
Nicolas Cousin
nicolas-cousin.com | contact@nicolas-cousin.com
```

**Script email direct (si contact identifié) :**

```
Objet : un regard extérieur sur votre base de code .NET

Bonjour [Prénom],

Je suis Nicolas Cousin, développeur / architecte C# .NET en freelance,
certifié Microsoft. 13 ans sur des applications critiques, chez AXA,
BetClic et Sage entre autres.

Je fais des audits .NET courts, de 1 à 5 jours : je lis le code, je regarde
l'architecture et la façon dont vous livrez, puis je vous rends un document
avec les risques classés par gravité et l'ordre dans lequel les traiter.

Le déclencheur est souvent une migration à préparer, un recrutement senior
en vue, ou des incidents qui reviennent. Si c'est votre cas, mon agenda est
ici : https://calendly.com/nicolas-cousin/30min

Nicolas Cousin
contact@nicolas-cousin.com | nicolas-cousin.com | +33 6 38 12 29 63
```

---

## Cadence de suivi

| Étape | Délai | Action |
|-------|-------|--------|
| 1er message | J | Envoi |
| Relance 1 | J+7 | Si pas de réponse : message court |
| Relance 2 | J+21 | Si pas de réponse : dernier essai |
| Archive | J+30 | Marquer "sans suite" dans le tracker |

**Relance 1 (si pas de réponse après 7 jours) :**
```
Bonjour [Prénom], je reviens vers vous suite à mon message de la semaine
dernière. Si le sujet vous intéresse, mon agenda est ici :
https://calendly.com/nicolas-cousin/30min
```

**Relance 2 (dernier essai) :**
```
Bonjour [Prénom], dernier message de ma part pour ne pas vous importuner.
Si ce n'est pas le bon moment, pas de souci. Vous pouvez me recontacter
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
