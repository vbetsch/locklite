[Revenir au README](README.md)

# Manuel de déploiement

> Compétence RNCP : C2.4.1

### Références

- Déploiement continu : [CD.md](CD.md)

### Ressources

- Variables d'environnement : [.env.example](../.env.example)
- Migrations Prisma : [migrations](../prisma/migrations)

## 1. Objectif

Ce manuel décrit les étapes nécessaires pour déployer l’application **LockLite** sur les différents environnements.  
Il assure la traçabilité des choix techniques et permet à n'importe qui de reproduire le déploiement dans un cadre
maîtrisé.

## 2. Technologies utilisées

- **Langage** : TypeScript (compilé avec tsc en mode strict)
- **Framework** : Next.js (App Router)
- **Serveur d’application** : Vercel (hébergement et déploiement automatisé)
- **Base de données** : PostgreSQL (hébergée sur Neon)
- **ORM** : Prisma (gestion des migrations et du schéma)
- **Gestion des sources** : Git + GitHub (workflow GitFlow simplifié)
- **Intégration / déploiement** : Vercel bot (déploiement continu) et GitHub Actions (CI complémentaire)
- **Sécurité des secrets** : variables d’environnement stockées dans GitHub et Vercel

## 3. Pré-requis

- Compte GitHub connecté à Vercel
- Projet configuré sur Vercel avec trois environnements distincts : development, preview, production
- Bases PostgreSQL distinctes sur Neon (une par environnement)
- Variables d’environnement définies dans Vercel

## 4. Processus de déploiement

### 4.1 Déploiement en environnement de développement

1. Créer une branche depuis `develop`
2. Développer et committer les changements
3. Pousser la branche sur GitHub
4. Ouvrir une pull request vers `develop`
   * Vercel déclenche automatiquement un déploiement éphémère
   * L’URL est visible dans la pull request

### 4.2 Déploiement en préproduction (preview)

1. Une fois la pull request validée et mergée dans develop, Vercel déploie automatiquement sur l’environnement
**preview**
2. Les tests automatisés (CI GitHub) et manuels sont réalisés sur cet environnement
3. Si les recettes sont validées, une release est préparée

### 4.3 Déploiement en production

1. Préparer une release sur GitHub : créer un nouveau tag (vX.Y.Z) et mettre à jour la documentation
2. Merger la branche `develop` dans `main`
3. Le merge déclenche automatiquement le déploiement **production** sur Vercel
4. Vérifier le déploiement : connexion, création d’un coffre-fort, recherche

### 4.4 Rollback

En cas d’échec en production :

1. Identifier le commit fautif
2. Effectuer un revert sur la branche `main`
3. Vercel redéploie automatiquement la version corrigée
4. Les correctifs sont développés dans une nouvelle branche et repassent par `develop`

## 5. Traçabilité

- Chaque déploiement est associé à un commit Git et un tag
- L’historique est consultable dans GitHub (commits, pull requests, releases) et dans Vercel (logs et statuts de
  déploiement)
- Les changements de base de données sont versionnés par les migrations Prisma

## 6. Résumé des bonnes pratiques

- **Ne jamais committer de secrets** : utilisation obligatoire des variables d’environnement
- Ne jamais merger sur main sans validation complète en préproduction
- Vérifier systématiquement l'environnement de production après déploiement
- Documenter chaque release avant de la déployer en production
