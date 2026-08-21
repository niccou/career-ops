# Mode : Génération PDF Profil Freelance
# Charge automatiquement _shared.md

## Objectif

Générer un PDF professionnel adapté au contexte freelance : pas un CV classique
de salarié, mais un **profil de prestataire** orienté mission, avec TJM,
disponibilité, et références clients.

Deux formats selon le besoin :
1. **Profil général** — à envoyer en prospection ou à uploader sur les plateformes
2. **Profil adapté mission** — personnalisé selon une offre spécifique (stack mise en avant, références pertinentes)

---

## Déclencheur

`/career-ops pdf` → profil général
`/career-ops pdf [URL ou titre mission]` → profil adapté à cette mission

---

## Structure du profil freelance (différent d'un CV salarié)

### Page 1 — En-tête + Pitch

```
NICOLAS COUSIN
Lead Dev / Architecte C# .NET | Formateur | IA appliquée
Freelance depuis mars 2018 · TJM : 700 €/j · Disponible : [date]

contact@nicolas-cousin.com · +33 6 38 12 29 63 · nicolas-cousin.com
Hauts-de-France · Full remote · EU OK
```

**Pitch (5–7 lignes) :**
Adapté selon le mode (général ou ciblé mission).
- Général : mettre en avant les 3 archétypes principaux + double profil
- Ciblé : mettre en avant l'archétype le plus proche + la référence la plus pertinente

### Page 1 — Compétences (format visuel)

Groupées par catégorie, pas une liste à puces :
- **Cœur de métier** : C# · .NET 8 · Architecture · DDD · Microservices · CQRS
- **Qualité** : TDD · BDD · Clean Code · Revue de code
- **Cloud & DevOps** : Azure · AWS · Docker · CI/CD
- **IA/LLM** : Claude Code · GitHub Copilot
- **Certifications** : Programming in C# (2015) · SQL Server (2013)

### Page 1–2 — Missions (format prestataire)

Format **résultat-oriented**, pas chronologique pur :

```
── BetClic · Plateforme Paris Sportifs (2022–2024)
   Migration microservices haute dispo · .NET 8 · AWS · gRPC
   "Responsable de la chaîne de données finale pour 1M+ utilisateurs"

── AXA en France · Lead Dev + DevSecOps (2018–2021)
   Migration Azure · Architecture hexagonale · Remédiation OWASP Top 10
   "3 ans de collaboration — Lead Dev puis DevSecOps"

── Sage · API REST .NET 6 (2022–2023)
   Migration .NET 6 · TDD · React — Full remote
   
── Decathlon Pro · Backend .NET (2025)
   .NET Framework 4.7.2 · Tests unitaires · AWS

── Natixis · .NET Framework 4.8 (nov. 2025 – en cours)
   Tests unitaires · Application bancaire Demeter
```

### Page 2 — Formations dispensées (si profil formateur)

```
── École IT · C# Moderne (Valenciennes + Bruxelles) · Mai–Avr. 2025
── DGCCRF · Atelier .NET 8 (3 jours) · Avr. 2025
── Assystem · Clean Architecture .NET (via Artza) · Fév. 2025
```

### Page 2 — Conditions & Disponibilité

```
TJM : 700 €/j (standard) · 850 €/j (Formation / IA / Architecture)
Disponibilité : [à renseigner selon fin mission Natixis]
Remote : Full remote préféré · Hybride OK (max 2j/sem)
Zones : France · Europe · International remote
Structure : Portage salarial (missions longues) · Micro-entreprise (formations/missions courtes)
```

---

## Personnalisation selon l'archétype détecté

### Si mission Lead Dev / Tech Lead
→ Mettre BetClic et AXA en tête
→ Insister sur : revue de code, mentoring, standards techniques, TDD/BDD

### Si mission Architecture / Migration
→ Mettre AXA (migration Azure) et BetClic (microservices) en tête
→ Insister sur : Clean Architecture, DDD, CQRS, .NET Framework → .NET 8

### Si mission Formation
→ Mettre les 3 formations en tête (DGCCRF, École IT, Assystem)
→ Insister sur : pédagogie, live coding, retours participants, certifications

### Si mission IA/LLM
→ Mettre en avant : Claude Code, GitHub Copilot, career-ops (projet concret)
→ Insister sur : early adopter, automatisation workflow dev, intégration LLM dans .NET

### Si mission Backend Senior
→ Missions récentes en tête (Natixis, Decathlon, BetClic)
→ Insister sur : TDD, clean code, API REST, microservices

### Si mission Audit & Conseil ponctuel
→ Format **1 page uniquement** (le client PME ne lira pas 2 pages)
→ Pitch ultra-condensé : 3 lignes max, orienté résultat client ("je livre un rapport actionnable en X jours")
→ Mettre en avant : AXA (migration + sécurité), BetClic (haute dispo), Natixis (bancaire)
→ Insister sur : regard extérieur, livrables concrets, expérience secteurs critiques
→ Ajouter bloc "Ce que vous recevez" :
```
Ce que vous recevez
─────────────────────────────────────────
✓ Rapport écrit structuré (risques, priorités, recommandations)
✓ Présentation orale des résultats (optionnel)
✓ Feuille de route technique priorisée
─────────────────────────────────────────
Délai : 1 à 5 jours selon périmètre · Tarif : sur devis
Facturation micro-entreprise · Paiement à réception
```
→ Nom de fichier : `output/profil-nicolas-cousin-audit-conseil.pdf`

---

## Génération technique

### Template HTML → PDF via Playwright

Utiliser le template `templates/cv-template.html` (adapté depuis l'original career-ops) :

```javascript
// generate-pdf.mjs
// 1. Lire cv.md + config/profile.yml
// 2. Injecter les données dans cv-template.html
// 3. Générer le PDF via Playwright

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent(htmlContent);
await page.pdf({
  path: `output/profil-nicolas-cousin-${archetype}-${date}.pdf`,
  format: 'A4',
  printBackground: true,
  margin: { top: '15mm', bottom: '15mm', left: '15mm', right: '15mm' }
});
```

### Nom du fichier de sortie

```
output/profil-nicolas-cousin.pdf                    ← profil général
output/profil-nicolas-cousin-lead-dev-[société].pdf ← ciblé mission
output/profil-nicolas-cousin-formateur.pdf          ← version formation
```

---

## Checklist avant envoi

- [ ] TJM à jour et cohérent avec la mission ciblée
- [ ] Date de disponibilité correcte
- [ ] Référence la plus pertinente mise en avant
- [ ] Pas de faute d'orthographe (relire le pitch)
- [ ] Format PDF (pas Word) — évite les problèmes d'affichage
- [ ] Taille < 2 Mo (pour les formulaires de candidature)
- [ ] Nom de fichier professionnel (pas "CV_v3_final2.pdf")