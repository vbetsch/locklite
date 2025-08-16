# Mesures de sécurité

> Compétence RNCP : C2.2.3

### Références

- Journal de versions : [CHANGELOG.md](CHANGELOG.md)

## Objectif

Ce document présente les mesures de sécurité mises en place et planifiées dans LockLite, en lien avec le **Top 10 OWASP
2021**.  
L’objectif est de garantir l’évolutivité et la sécurité du code source.

## A01:2021 – Broken Access Control

### Mesures déjà mises en place

- Chaque coffre-fort est lié à un seul et unique identifiant utilisateur.
- Tests de recette pour vérifier la relation entre utilisateurs et coffres-forts.

### Mesures prévues

- Mise en place du partage de coffre-forts via une relation many-to-many (version ultérieure).
- Introduction d’un contrôle d’accès basé sur les rôles (RBAC).

### Mesures restant à mettre en œuvre

- Définir et appliquer des droits : lecture seule, édition, suppression (ACL)

## A02:2021 – Cryptographic Failures

### Mesures déjà mises en place

- À ce stade, les secrets ne sont pas encore chiffrés.

### Mesures prévues

- Mise en place du chiffrement des secrets utilisateurs (prochaine itération).
- Chiffrement des usernames (email/identifiant) dans une version ultérieure.

### Mesures restant à mettre en œuvre

- Définir et documenter la stratégie de chiffrement (algorithme, gestion des clés, rotation).

## A03:2021 – Injection

### Mesures déjà mises en place

- Utilisation de Prisma (ORM) qui protège nativement contre les injections SQL.
- TypeScript strict et DTO partagés entre UI et API.

### Mesures prévues

- Recettes de tests validant la longueur maximale des entrées (les noms des coffres-forts ne doivent pas dépasser 255
  caractères).

### Mesures restant à mettre en œuvre

- Ajouter une validation centralisée des données entrantes côté API (ex. zod, class-validator).

## A04:2021 – Insecure Design

### Mesures déjà mises en place

- Authentification via NextAuth avec gestion sécurisée de session.
- Messages d’erreur d’authentification uniformisés ("invalid credentials").
- UUID utilisés pour masquer les identifiants métiers.
- Protection CSRF intégrée par défaut dans NextAuth.

### Mesures prévues

- Mise en place d’un mécanisme anti-brute force (limite de tentatives de connexion).
- Ajout progressif de la gestion des rôles (RBAC).

### Mesures restant à mettre en œuvre

- Définir une politique de mot de passe stricte.

## A05:2021 – Security Misconfiguration

### Mesures déjà mises en place

- Configuration par défaut de Next.js et NextAuth.
- TypeScript configuré en mode strict.
- ESLint et Prettier appliqués en continu.
- Sessions gérées par JWT avec un secret dédié.

### Mesures prévues

- Durcissement des en-têtes HTTP via un module de sécurisation adapté.
- Documentation de la configuration de sécurité (authentification, sessions, cookies).

### Mesures restant à mettre en œuvre

- Vérifier et fermer les endpoints non utilisés.

## A06:2021 – Vulnerable and Outdated Components

### Mesures déjà mises en place

- Adoption du versioning SemVer.
- Journal de versions avec une catégorie dédiée aux correctifs de sécurité.

### Mesures prévues

- Mise en place de Dependabot pour la gestion proactive des dépendances.
- Définir une politique de mise à jour automatisée et validée en CI/CD.

## A07:2021 – Identification and Authentication Failures

### Mesures déjà mises en place

- Authentification centralisée avec NextAuth (provider Credentials).
- Mots de passe hashés avec bcrypt.
- Messages d’erreur neutres pour éviter l’énumération des comptes.

### Mesures prévues

- Ajout d’une limitation du nombre de tentatives de connexion.

## A08:2021 – Software and Data Integrity Failures

### Mesures déjà mises en place

- CI via GitHub Actions avec tests, linter et build obligatoires.
- Déploiement (CD) déclenché uniquement si la CI est validée.
- Branche `main` protégée par des règles de merge strictes.

### Mesures prévues

- Protection de la branche `develop` également.
- Validation de l’intégrité des dépendances avec `npm audit`.

## A09:2021 – Security Logging and Monitoring Failures

### Mesures déjà mises en place

- Logger centralisé utilisé côtés API et UI.
- Journaux natifs de Next.js pour toutes les routes.

### Mesures prévues

- Mise en place d’un outil de supervision (ex. Sentry).
- Définir les événements critiques à journaliser (échecs d’authentification, accès refusés, erreurs serveur).

## A10:2021 – Server-Side Request Forgery (SSRF)

### Mesures déjà mises en place

- Aucun champ URL manipulé par l’utilisateur.
- Pas d’appels sortants sensibles dans la première version.

### Mesures prévues

- Validation stricte des URLs lors de l’introduction du champ "URL".

### Mesures restant à mettre en œuvre

- Définir une stratégie de filtrage et de validation des URLs côté serveur.

