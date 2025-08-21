[Revenir au README](README.md)

# Manuel de mise à jour

> Compétence RNCP : C2.4.1

### Références

- Manuel de déploiement : [DEPLOYMENT.md](DEPLOYMENT.md)

## 1. Objet

Ce document décrit la procédure à suivre pour mettre à jour le code source de LockLite.  
Il s’adresse aux développeurs et définit le workflow de contribution, depuis la création d’un ticket jusqu’à
l’intégration en préproduction.

## 2. Pré-requis

- Accès au dépôt GitHub du projet.
- Connaissance du workflow Git utilisé (`feature` → `develop` → `main`).
- Environnement de développement configuré (Node.js, npm).
- Respect des conventions de commits, branches et pull requests.

## 3. Étapes préparatoires

1. Création d’un ticket dans l’outil de gestion de projet
2. Analyse, refinement et conception
3. Assignation du ticket à un développeur.
4. Création de la branche de développement à partir de `develop` en suivant la
   convention [Gitflow](https://www.atlassian.com/fr/git/tutorials/comparing-workflows/gitflow-workflow), en prefixant
   par le projet concerné et en incluant le numéro du ticket de la manière suivante :
   - `api/feature/52-add-users`
   - `ui/hotfix/103-button-alignment`

## 4. Procédure de mise à jour

1. **Développement sur une branche dédiée**

- Implémenter la fonctionnalité ou le correctif.
- Effectuer des commits clairs et précis liés au ticket.

2. **Création d’une pull request vers `develop`**

- Inclure le numéro du ticket, une description claire et les labels nécessaires.

3. **Exécution automatique de la CI/CD**

- Linter : `npm run lint`
- Tests unitaires : `npm test`
- Build : `npm run build`
- Déploiement automatique sur Vercel en environnement de développement
- Sécurité : scan GitGuardian pour détection de secrets

4. **Corrections si la CI échoue**

- Le développeur est responsable de faire passer tous les tests.

5. **Revue de code**

- Les reviewers (tech lead ou lead dev) valident ou demandent des corrections.
- Si un reviewer bloque, le cycle recommence jusqu’à validation.

6. **Merge dans `develop`**

- Une fois validée, la PR est mergée.
- Le merge déclenche un déploiement sur l’environnement de préproduction.

## 5. Vérifications post-merge

- Recettes manuelles sur l’environnement de préproduction :
  - Connexion (NextAuth).
  - Création et lecture de coffre-fort.
  - Recherche.
- Vérification des métriques (Web Vitals).
- Vérification de l’accessibilité (RGAA AA).
- Logs et alertes dans Sentry (absence d’erreurs).

## 6. Rollback en cas de problème

- Si la fonctionnalité introduit un bug critique :
  1. Revert la pull request sur `develop`.
  2. Ouvrir un ticket correctif.
  3. Implémenter la correction sur une nouvelle branche.

## 7. Bonnes pratiques

- Respecter les conventions de nommage des branches et commits.
- Ne jamais committer de secrets (GitGuardian assure un contrôle automatique).
- Écrire du code lisible, testé et conforme aux règles ESLint + Prettier.
- Associer systématiquement les changements à un ticket pour assurer la traçabilité.  
