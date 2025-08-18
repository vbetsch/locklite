[Revenir au README](README.md)

# Intégration continue

> Compétence RNCP : C2.1.2

### Références

- Déploiement continu : [CD.md](CD.md)

### Ressources

- [Pipeline Github](../.github/workflows/ci.yml)
- [Configuration NodeJS](../package.json) (inclus les commandes npm)

## 1) Objectif

Assurer qu’à chaque contribution, le code est automatiquement analysé, testé et construit afin de détecter au plus tôt
les régressions, garantir la qualité et sécuriser les fusions vers les branches d’intégration.

## 2) Périmètre

- **Dépôt Git** : GitHub (LockLite)
- **CI/CD** : GitHub Actions
- **Gestion des dépendances** : npm (NodeJS)
- **Qualité de code** : ESLint
- **Tests unitaires** : Jest (avec couverture)
- **Build** : Next.js
- **Branches cibles** : `main` et `develop` (via *Pull Request*)

## 3) Déclencheurs

- **pull_request sur `main` et `develop`**  
  Chaque PR vers `main` ou `develop` déclenche le pipeline complet (lint, tests, build).  
  La fusion est autorisée uniquement si tous les jobs passent au vert.

## 4) Environnements et versions

- **Runner** : `ubuntu-latest`
- **Node.js** : version 22
- **Cache** : npm activé via `actions/setup-node` pour accélérer les installations
- **Installation** : `npm ci`(clean-install) pour des builds reproductibles à partir du `package-lock.json`

## 5) Séquences d’intégration

L’intégration se fait en trois **jobs indépendants** exécutés en parallèle sur chaque PR.  
L’ordre logique est : lint, tests, build (même si parallélisé par GitHub Actions).

### 5.1) Job `linter:eslint`

- **Objectif** : vérifier la conformité du code aux règles définies par ESLint.
- **Étapes** :
  1. Checkout du code
  2. Installation de Node.js 22 et activation du cache npm
  3. Installation des dépendances (`npm ci`)
  4. Lancement du linter (`npm run lint`)
- **Critère de réussite** : échec bloquant si ESLint détecte des erreurs.

### 5.2) Job `tests:units`

- **Objectif** : prévenir les régressions via l’exécution de tous les tests unitaires avec couverture.
- **Étapes** :
  1. Checkout du code
  2. Installation de Node.js 22 et activation du cache npm
  3. Installation des dépendances (`npm ci`)
  4. Exécution des tests avec couverture (`npm run test:cov`)
- **Critère de réussite** : échec bloquant si un test échoue ou si Jest rencontre une erreur.

### 5.3) Job `build:app`

- **Objectif** : valider la compilabilité et l’assemblage du projet.
- **Étapes** :
  1. Checkout du code
  2. Installation de Node.js 22 et activation du cache npm
  3. Installation des dépendances (`npm ci`)
  4. Build de l’application (`npm run build`)
- **Critère de réussite** : échec bloquant si la construction Next.js échoue.

## 6) Politique de fusion

- Une PR ne peut être fusionnée vers `main` ou `develop` que si **tous les jobs** sont au vert.
- Les revues de code sont réalisées après validation CI.

## 7) Gestion des défaillances

- **Lint en échec** : correction locale puis nouveau push déclenche une relance automatique du job.
- **Tests en échec** : correction des tests ou du code, vérification locale (`npm run test`) puis push.
- **Build en échec** : correction de configuration ou de code, test du build local (`npm run build`) puis push.

## 8) Sécurité, reproductibilité et traçabilité

- **Reproductibilité** : Node 22 + `npm ci` assurent un environnement homogène.
- **Traçabilité** : chaque exécution CI est historisée dans GitHub Actions (logs conservés).
- **Secrets** : non requis par ce pipeline (aucun déploiement intégré ici).

## 9) Rôles et responsabilités

- **Auteur de la PR** : s’assure du passage des jobs en local et corrige les échecs CI.
- **Relecteur(s)** : valide la pertinence technique et architecturale après CI verte.
- **Mainteneur** : contrôle le respect de la politique de merge.

## 10) Indicateurs de suivi

- Taux de réussite des workflows par PR.
- Temps moyen d’exécution par job.
- Tendance de couverture (exposée par `test:cov` dans les logs).

## 11) Limites et évolutions

- **Base de données éphémère** : non incluse dans ce workflow.
- **Artefacts** : non publiés (possibilité d’ajouter un export de build ou des rapports de couverture).
- **Déploiement** : indépendant (un bot est chargé du déploiement continu, il ne dépend pas du résultat de la CI).

## 12) Références opérationnelles

- **Scripts utilisés** :
  - `npm run lint`
  - `npm run test:cov`
  - `npm run build`
- **Branches cibles** : `main`, `develop`
- **Environnement CI** : `ubuntu-latest`, Node 22, cache npm
