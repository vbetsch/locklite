# Mesures d'accessibilité

> Compétence RNCP : C2.2.3

[//]: # (TODO: Modify when we will have audits in CI/CD -> CI)

### Références

- Mesures de sécurité : [SECURITY.md](SECURITY.md)
- Cahier de recettes : [ACCEPTANCE.md](ACCEPTANCE.md)

[//]: # (TODO: CI)

[//]: # (- Intégration Continue : [INTEGRATION.md]&#40;INTEGRATION.md&#41;)

## 1. Objet et périmètre

Ce document présente les actions prévues et mises en œuvre pour rendre l’application **LockLite** accessible aux
personnes en situation de handicap, conformément au [RGAA niveau AA](https://accessibilite.numerique.gouv.fr/).  
Deux catégories sont suivies :

- **Mis en place** : mesures déjà mises en place soit dans l'application, soit dans les processus.
- **À mettre en place** : mesures planifiées mais pas encore réalisées.

## 2. Référentiel choisi

Le référentiel choisi est le **RGAA 4.1 niveau AA** (_Référentiel Général d’Amélioration de l’Accessibilité_) car il est
le référentiel officiel imposé par la législation française pour la conformité des applications
web, reconnu au niveau européen.

Le RGAA est la déclinaison française du standard international **WCAG 2.1 niveau AA** (_Web Content Accessibility
Guidelines_). Le respect du RGAA assure donc également la conformité aux WCAG.

## 3. Actions mises en place

### Non automatisées

* Vérification de la bonne navigation clavier seule (menus, modales, dialogues MUI).
* Vérification manuelle de la pertinence des textes alternatifs (`alt`, labels).
* Vérification de l’ordre de lecture logique (tabulation/visuel/sémantique).
* Vérification de la compréhension des intitulés de boutons et liens.
* Vérification de la lisibilité à 200% de zoom sans perte d’information.
* Vérification des contrastes de couleurs.

### Automatisées

* Vérification que chaque titre (`h1`, `h2` etc) possède du contenu
* Vérification de la présence des attributs `alt` sur toutes les images.
* Vérification de l’association `label`/`input` dans les formulaires.
* Vérification des rôles ARIA valides et cohérents.

## 4. Actions à mettre en place

### Non automatisables

* Vérification de la hiérarchie des titres (`h1`, `h2` etc).

### Automatisables

* Vérification automatique des contrastes de couleurs.

## 5. Critères non applicables

Certains critères du RGAA ne concernent pas l’application dans son état actuel :

- Absence de contenus multimédias synchronisés (vidéo, audio) : critères sur sous-titrage, transcription et
  audiodescription non applicables.
- Absence de captcha ou équivalents : critères sur les alternatives accessibles aux captchas non applicables.
- Absence de contenus en mouvement, clignotants ou animés : critères relatifs au contrôle de ces contenus non
  applicables.

## 6. Procédure d’exécution

[//]: # (TODO: CI)

[//]: # (- **CI/CD** : exécution automatique des audits à chaque Pull Request sur la branche `main`.)

- **Recettes manuelles** : ajoutées dans le cahier de recettes au fil du développement, par fonctionnalité.

## 7. Critères de réussite

- Couverture RGAA AA sur 100% des pages et composants critiques.
- Validation intégrale des recettes manuelles d’accessibilité.

[//]: # (TODO: CI)

[//]: # (- Score ≥ 90% sur Lighthouse accessibilité.)
