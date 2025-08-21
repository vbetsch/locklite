[Revenir au README](README.md)

# Manuel de mise à jour

> Compétence RNCP : C2.4.1

### Références

- Manuel de déploiement : [DEPLOYMENT.md](DEPLOYMENT.md)
- Critères de qualité et de performance : [CRITERIA.md](CRITERIA.md)
- Mesures d'accessibilité : [ACCESSIBILITY.md](ACCESSIBILITY.md)
- Journal de versions : [CHANGELOG.md](CHANGELOG.md)

## 1. Objet

Ce document décrit la procédure de mise à jour de l’application LockLite afin de garantir la continuité de service,
l’intégrité des données et la sécurité lors du passage d’une version N à une version N+1.

## 2. Pré-requis

- Accès au dépôt Git du projet.
- Accès à l’infrastructure d’hébergement (Vercel) et aux bases de données PostgreSQL (Neon).
- Droits administrateur pour gérer la base de données et les variables d’environnement.
- Sauvegarde complète et validée de la base de données et des secrets.
- Node.js et npm installés dans les environnements concernés.

## 3. Étapes préparatoires

1. Vérifier les dépendances dans `package.json` et intégrer les correctifs de sécurité proposés (via Dependabot).
2. Effectuer une sauvegarde de la base PostgreSQL et des variables d’environnement.
3. Mettre à jour les dépendances localement avec la commande :

  ```shell
  npm ci
  ```

4. Lancer les tests unitaires :

  ```shell
  npm test
  ```

5. Compiler le projet :

  ```shell
  npm run build
  ```

## 4. Procédure de mise à jour

1. Récupérer la nouvelle version depuis Git :

  ```shell
  git fetch --all
  git checkout <tag_version>
  ```

2. Installer les dépendances :

```shell
  npm ci
  ```

3. Appliquer les migrations Prisma :

  ```shell
  npm run prisma:migrate:deploy
  ```

4. Déployer la nouvelle version (pipeline GitHub Actions, Vercel).
5. Vérifier que le déploiement s’est bien effectué.

## 5. Vérifications post-déploiement

- Contrôler les parcours critiques : connexion, création et recherche de coffres-forts.
- Vérifier les métriques de performance (Web Vitals) conformes aux seuils projet
- Contrôler l’accessibilité : points clés RGAA AA sur les écrans principaux.
- Surveiller les logs et alertes dans Sentry (absence d'erreurs).
- Vérifier l’état de la base après migration.

## 6. Procédure de rollback

En cas d’incident majeur :

1. Restaurer la version précédente (revert).
2. Restaurer la base depuis la sauvegarde réalisée avant migration.
3. Rejouer les tests de validation.
4. Consigner l’incident et ouvrir une tâche de correction.
