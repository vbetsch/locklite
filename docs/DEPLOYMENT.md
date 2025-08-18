# Déploiement continu

> Compétence RNCP : C2.1.1

### Références

- Intégration continue : [INTEGRATION.md](INTEGRATION.md)

## 1. Objectif

Garantir que l’application **LockLite** puisse être déployée automatiquement, de manière fiable et traçable, sur les
différents environnements.  
Le protocole s’intègre dans le cycle de développement afin d’assurer la qualité, la performance et la stabilité du
logiciel.

## 2. Environnements de déploiement

Chaque environnement possède une base de données dédiée et indépendante, ce qui permet d’éviter tout conflit de données.

- **Développement** : déploiements éphémères déclenchés lors de la fusion d'une branche de développement. Utilisé par les développeurs pour
  valider leur travail en conditions réelles. _Accessible uniquement aux membres du projet via authentification Vercel._
- **Préproduction (preview)** : déploiements automatiques de la branche `develop`. Sert à valider l’ensemble des
  fonctionnalités avant une release. _Accessible uniquement aux membres du projet via authentification Vercel._
- **Production** : déploiements automatiques de la branche `main`. Environnement stable pour
  les utilisateurs finaux. _Accessible publiquement._

## 3. Outils mobilisés

- **Compilateur / Langage** : TypeScript (_`tsc` en mode strict_).
- **Framework / Serveur d’application** : Next.js (_hébergé sur Vercel_).
- **Base de données** : PostgreSQL (_hébergée sur Neon_) avec ORM Prisma.
- **Gestion des sources** : GitHub (_branches nommées selon un Gitflow simplifié_).
- **Intégration / déploiement** : Vercel (_bot intégré à GitHub_).
- **Qualité** : ESLint, Prettier, Jest (_tests unitaires et d’intégration_).
- **Sécurité** : GitGuardian (_vérification des secrets_).

## 4. Séquences de déploiement

1. **Création de branche** : un développeur ouvre une branche à partir de `develop`.
2. **Pull Request vers `develop`** :
   - Vérification automatique : lint, tests unitaires, build, déploiement éphémère.
   - Si un échec survient, alors des corrections sont réalisés avant le merge.

3. **Merge dans `develop`** :
   - Déclenche un déploiement automatique sur l’environnement **préproduction**.
   - Tests manuels et recettes utilisateurs exécutés sur cet environnement.

4. **Release** :
   - Rédaction d’une release note.
   - Validation finale de toutes les recettes sur préproduction.
   - Merge de `develop` vers `main`.

5. **Déploiement en production** :
   - Déploiement automatique via Vercel.
   - Vérification post-déploiement.
   - Publication de la release officielle.

6. **Rollback (si nécessaire)** :
   - Revert Git sur `main`.
   - Redeploiement immédiat de la version précédente sur Vercel.

## 5. Conclusion

Ce protocole assure :

- Un **cycle complet de CI/CD** (tests automatiques + déploiement Vercel).
- La **séparation stricte des environnements**.
- Une **qualité logicielle mesurable** (tests, lint, recettes).
- Des **garde-fous opérationnels** (rollback, contrôle des secrets).
