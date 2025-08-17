# Mesures d'accessibilité

> Compétence RNCP : C2.2.3

### Références

- Cahier de recettes : [ACCEPTANCE.md](ACCEPTANCE.md)
- Intégration Continue : [CI.md](CI.md)

## 1. Objet et périmètre

Ce document présente les actions prévues et mises en œuvre pour rendre l’application **LockLite** accessible aux
personnes en situation de handicap, conformément au **RGAA niveau AA**.  
Deux catégories sont suivies :

- **À mettre en place** : mesures planifiées mais pas encore réalisées.
- **Mis en place** : mesures déjà mises en place soit dans l'application, soit dans les processus.

## 2. Référentiel choisi

- **RGAA 4.1 niveau AA** (Référentiel Général d’Amélioration de l’Accessibilité).
- Justification : c’est le référentiel officiel imposé par la législation française pour la conformité des applications
  web, reconnu au niveau européen.

## 3. Actions à mettre en place

### Automatisables

 * Intégration d’**Axe-core** dans les tests (via Jest + Testing Library).
 * Audit **Lighthouse CI** dans GitHub Actions avec seuil > 95% sur accessibilité.
 * Vérification automatique des contrastes couleurs.
 * Vérification de la hiérarchie de titres (`h1`, `h2` …).
 * Vérification de la présence des attributs `alt` sur toutes les images.
 * Vérification de l’association `label` ↔ `input` dans les formulaires.
 * Vérification des rôles ARIA valides et cohérents.

### Non automatisables

 * Recettes de tests lecteurs d’écran (NVDA, VoiceOver).
 * Recettes de navigation clavier seule (menus, modales, dialogues MUI).
 * Vérification manuelle de la pertinence des textes alternatifs (`alt`, labels).
 * Vérification des transcriptions/sous-titres pour vidéos et audios.
 * Vérification de l’ordre de lecture logique (tabulation ↔ visuel ↔ sémantique).
 * Vérification de la compréhension des intitulés de boutons et liens.
 * Vérification de la lisibilité à 200% de zoom sans perte d’information.

## 4. Actions mises en place

*(aucune pour l’instant)*

## 5. Procédure d’exécution

- **CI/CD** : exécution automatique des audits (Axe + Lighthouse CI) à chaque Pull Request.
- **Recettes manuelles** : ajoutées dans `ACCEPTANCE.md` au fil du développement, par fonctionnalité.

## 6. Critères de réussite

- Couverture RGAA AA sur 100% des pages et composants critiques.
- Score ≥ 95% sur Lighthouse accessibilité.
- Validation des recettes manuelles d’accessibilité.
- Documentation mise à jour (migration des actions de « À mettre en place » vers « Mis en place »).
