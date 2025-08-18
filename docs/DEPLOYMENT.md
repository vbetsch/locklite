# Déploiement continu

> Compétence RNCP : C2.1.1

### Références

- [Intégration continue](INTEGRATION.md)

## 1. Objectif

Garantir que l’application **LockLite** puisse être déployée automatiquement, de manière fiable et traçable, sur ses
différents environnements (développement, préproduction et production).  
Le protocole s’intègre dans le cycle de développement afin d’assurer la qualité, la performance et la stabilité du
logiciel.

## 2. Environnements de déploiement

- **Développement** : déploiements éphémères déclenchés lors de la création de branches de fonctionnalités. Base de
  données dédiée sur Neon. Utilisé par les développeurs pour valider leur travail en conditions réelles.
- **Préproduction (preview)** : déploiements automatiques de la branche `develop`. Sert à valider l’ensemble des
  fonctionnalités avant une release. Accessible uniquement aux membres du projet via authentification Vercel.
- **Production** : déploiements automatiques de la branche `main`. Accessible publiquement. Environnement stable pour
  les utilisateurs finaux.

Chaque environnement dispose de sa propre base PostgreSQL indépendante, ce qui permet d’éviter tout conflit de données.

## 3. Outils mobilisés

- **Compilateur / Langage** : TypeScript (`tsc` en mode strict).
- **Framework / Serveur d’application** : Next.js (hébergé sur Vercel).
- **Base de données** : PostgreSQL (hébergé sur Neon) avec ORM Prisma.
- **Gestion des sources** : GitHub (branches `feature/*`, `develop`, `main`).
- **Intégration / déploiement** : Vercel (bot intégré à GitHub).
- **Qualité** : ESLint, Prettier, Jest (tests unitaires et d’intégration).
- **Sécurité** : GitGuardian (vérification des secrets).

## 4. Séquences de déploiement

1. **Création de branche** : un développeur ouvre une branche à partir de `develop`.
2. **Pull Request vers `develop`** :

- Vérification automatique : lint, tests unitaires, build, déploiement éphémère.
- Si échec → corrections avant merge.

3. **Merge dans `develop`** :

- Déclenche un déploiement automatique sur l’environnement **préproduction**.
- Tests manuels et recettes utilisateurs exécutés sur cet environnement.

4. **Release** :

- Rédaction d’une note de version (CHANGELOG, SECURITY, ACCESSIBILITY).
- Validation finale de toutes les recettes sur préproduction.
- Merge de `develop` vers `main`.

5. **Déploiement en production** :

- Déploiement automatique via Vercel.
- Vérification post-déploiement (health check, tests de fumée).
- Publication de la release officielle.

6. **Rollback (si nécessaire)** :

- Revert Git sur `main`.
- Redeploiement immédiat de la version précédente sur Vercel.

## 5. Critères de qualité et de performance

- **Qualité du code** :
  - Lint et formatage obligatoires.
  - Couverture de tests unitaires mesurée (objectif > 80%).
  - Analyse des secrets par GitGuardian.
- **Performance front-end** :
  - Vérification des Web Vitals (LCP < 2,5 s, CLS < 0,1).
  - Mesure via Lighthouse et outils Vercel intégrés.
- **Performance back-end** :
  - Temps de réponse API < 300 ms (p95).
  - Taux d’erreurs < 1%.
- **Fiabilité du déploiement** :
  - Chaque déploiement doit être traçable (date, commit associé).
  - Interdiction de merge si le déploiement échoue.
- **Sécurité** :
  - Bases isolées par environnement.
  - Secrets stockés dans GitHub/Vercel, jamais dans le code.

## 6. Conclusion

Ce protocole assure :

- Un **cycle complet de CI/CD** (tests automatiques + déploiement Vercel).
- La **séparation stricte des environnements**.
- Une **qualité logicielle mesurable** (tests, lint, recettes).
- Des **garde-fous opérationnels** (rollback, contrôle des secrets, health checks).

Il répond aux critères du RNCP pour la compétence **C2.1.1** :

- Protocole explicité,
- Outils et environnements détaillés,
- Séquences de déploiement claires,
- Critères qualité et performance adaptés aux exigences du projet.
