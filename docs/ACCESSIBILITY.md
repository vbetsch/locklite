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

Les actions non automatisables sont couvertes par les recettes.

## 2. Référentiel choisi

Le référentiel choisi est le **RGAA 4.1 niveau AA** (Référentiel Général d’Amélioration de l’Accessibilité) car il est
le référentiel officiel imposé par la législation française pour la conformité des applications
web, reconnu au niveau européen.

Le RGAA est la déclinaison française du standard international **WCAG 2.1 niveau AA** (Web Content Accessibility
Guidelines). Le respect du RGAA assure donc également la conformité aux WCAG.

## 3. Actions mises en place

*(aucune pour l’instant)*

## 4. Actions à mettre en place

### Automatisables

* Intégration d’**Axe-core** dans les tests (via Jest + Testing Library).
* Audit d'accessibilité avec **Lighthouse CI** dans GitHub Actions.
* Vérification automatique des contrastes de couleurs.
* Vérification de la hiérarchie des titres (`h1`, `h2` …).
* Vérification de la présence des attributs `alt` sur toutes les images.
* Vérification de l’association `label` ↔ `input` dans les formulaires.
* Vérification des rôles ARIA valides et cohérents.

### Non automatisables

* Vérification de la bonne navigation clavier seule (menus, modales, dialogues MUI).
* Vérification manuelle de la pertinence des textes alternatifs (`alt`, labels).
* Vérification de l’ordre de lecture logique (tabulation ↔ visuel ↔ sémantique).
* Vérification de la compréhension des intitulés de boutons et liens.
* Vérification de la lisibilité à 200% de zoom sans perte d’information.

## 5. Non applicables

Certains critères du RGAA ne concernent pas l’application LockLite dans son état actuel :

- Absence de contenus multimédias synchronisés (vidéo, audio) : critères sur sous-titrage, transcription et
  audiodescription non applicables.
- Absence de captcha ou équivalents : critères sur les alternatives accessibles aux captchas non applicables.
- Absence de contenus en mouvement, clignotants ou animés : critères relatifs au contrôle de ces contenus non
  applicables.

## 6. Procédure d’exécution

- **CI/CD** : exécution automatique des audits (Axe + Lighthouse CI) à chaque Pull Request sur la branche `main`.
- **Recettes manuelles** : ajoutées dans le cahier de recettes au fil du développement, par fonctionnalité.

## 7. Critères de réussite

- Couverture RGAA AA sur 100% des pages et composants critiques.
- Score ≥ 90% sur Lighthouse accessibilité.
- Validation intégrale des recettes manuelles d’accessibilité.
