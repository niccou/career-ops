# Mode : Négociation TJM & Contrat Freelance
# Charge automatiquement _shared.md

## Objectif

Préparer la négociation du TJM et des conditions contractuelles pour une mission,
et générer des scripts de réponse adaptés au contexte.

---

## Déclencheur

`/career-ops negocie [contexte]` ou demande de préparation à une négociation.

---

## 1. Calculateur TJM contextuel

À partir du TJM proposé et du contexte, calculer le TJM recommandé :

**Formule de base :** TJM cible archétype (cf. _shared.md)

**Modificateurs :**
| Facteur | Impact |
|---------|--------|
| Full remote confirmé | +0% (déjà inclus) |
| Sur site > 2j/sem | +10 à +15% |
| Mission < 2 mois | +15% (risque intermission) |
| Mission > 6 mois | -5% (sécurité) |
| Client final direct | +5% (pas d'intermédiaire à payer) |
| ESN intermédiaire | +10% (ESN prend 20–40%) |
| Secteur financier/banque | +10% (contraintes réglementaires) |
| Mission formation | +20 à +30% (préparation non facturée) |
| Mission IA/LLM | +15 à +25% (profil rare) |
| Délai de paiement 45j | +5% (coût de trésorerie) |
| Délai de paiement 60j | +10% |
| Urgence client (démarrage < 2 sem) | +10% |

**Afficher :** TJM calculé recommandé + TJM d'ouverture (demander +15% du recommandé)

---

## 2. Scripts de négociation

### Réponse initiale à une offre (TJM trop bas)

```
Bonjour [Prénom],

Merci pour cette opportunité sur [mission]. Le projet m'intéresse particulièrement
pour [raison spécifique liée au projet].

Concernant les conditions, je travaille habituellement à [TJM cible + 15%] €/j
pour ce type de mission [Lead Dev / Archi / Formation], en tenant compte de
[remote / durée / complexité]. Je reste ouvert à la discussion selon les modalités
définitives du contrat.

Pouvez-vous me confirmer [question clé : client final ? délai paiement ? durée réelle ?] ?

Cordialement,
Nicolas Cousin
```

### Réponse à "votre TJM est trop élevé"

```
Je comprends la contrainte budget. Pour référence, mon positionnement à [TJM]€/j
correspond au marché pour un profil [Lead Dev / Architecte] avec 7 ans de freelance
et des références comme [BetClic / AXA / Natixis].

Je serais prêt à étudier [TJM légèrement inférieur] €/j si la mission est à
[full remote / durée 6 mois+ / client final direct], ce qui compenserait la
différence.

Qu'est-ce qui est flexible de votre côté ?
```

### Réponse à une ESN qui ne communique pas le client final

```
Avant d'aller plus loin, j'aurais besoin de connaître le secteur d'activité
et la taille du client final — c'est un critère de choix pour moi (secteur financier,
industrie, etc.). Pouvez-vous me donner ces informations ?
```

### Relance après silence (> 5 jours)

```
Bonjour [Prénom],

Je me permets de revenir vers vous concernant la mission [titre] discutée
le [date]. Est-ce que le projet est toujours d'actualité ?

Je suis disponible pour un échange rapide si vous avez besoin de précisions.

Nicolas
```

---

## 3. Checklist contrat / bon de commande

Avant de signer, vérifier :

**Financier :**
- [ ] TJM correct et écrit (pas de surprise)
- [ ] Délai de paiement ≤ 30j (idéalement à réception facture)
- [ ] Pénalités de retard mentionnées (légalement obligatoire)
- [ ] Acompte sur missions longues (> 3 mois) ?

**Durée & sortie :**
- [ ] Durée initiale précisée
- [ ] Clause de renouvellement explicite
- [ ] Délai de préavis : 6 semaines **réciproque** (client → toi ET toi → client)
- [ ] Symétrie obligatoire — refuser un préavis unilatéral (client seul)
- [ ] Conditions de résiliation anticipée

**Périmètre :**
- [ ] Livrables définis (ou régie sans livrables précis — les deux sont OK, mais le savoir)
- [ ] Nombre de jours/semaine précisé
- [ ] Remote / hybride écrit noir sur blanc

**Propriété intellectuelle :**
- [ ] Cession de droits limitée à la mission (pas de cession totale)
- [ ] Pas de clause de non-concurrence abusive

**Portage salarial :**
- [ ] Contrat via la société de portage (pas en direct si portage)
- [ ] Frais de portage inclus dans le calcul du TJM

**🔴 Signaux d'alerte contrat :**
- Clause de non-concurrence > 6 mois ou trop large
- TJM "variable selon les jours travaillés" sans plancher
- Délai de paiement > 60j
- Pas de clause de sortie anticipée
- Confidentialité extrêmement large (bloquerait d'autres missions similaires)

---

## 4. Benchmark TJM marché (maj à vérifier via web search)

| Profil | TJM bas | TJM médian | TJM haut |
|--------|---------|-----------|---------|
| Dev Senior C# .NET | 550 | 650 | 750 |
| Lead Dev / Tech Lead .NET | 650 | 750 | 850 |
| Architecte .NET / Microservices | 700 | 850 | 1000 |
| Formateur C# .NET | 700 | 850 | 1100 |
| Expert IA/LLM + .NET | 800 | 950 | 1200 |

> Source : Baromètre Malt / Comet / enquêtes communautaires — vérifier la mise à jour annuelle.
