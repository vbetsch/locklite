# Mesures de sécurité

> Compétence RNCP : C2.2.3

### Références

- Cahier de recettes : [ACCEPTANCE.md](ACCEPTANCE.md)
- Journal de versions : [CHANGELOG.md](CHANGELOG.md)
- Intégration Continue : [CI.md](INTEGRATION.md)

## Objectif

Ce document présente les mesures de sécurité mises en place et planifiées dans LockLite, en lien avec le [Top 10 OWASP
2021](https://owasp.org/www-project-top-ten/).  
L’objectif est de garantir l’évolutivité et la sécurité du code source.

## A01:2021 – Broken Access Control

### Mesures déjà mises en place

- Chaque coffre-fort est lié à un seul et unique identifiant utilisateur.
- Des tests de recette vérifient la relation entre utilisateurs et coffres-forts en base de données.

### Mesures prévues

- Mise en place du partage de coffres-forts via une relation many-to-many (version ultérieure).
- Introduction d’un contrôle d’accès basé sur les rôles (RBAC).
- Définir et appliquer des droits : lecture seule, édition, suppression (ACL)

## A02:2021 – Cryptographic Failures

### Mesures déjà mises en place

- À ce stade, les secrets ne sont pas encore chiffrés.

### Mesures prévues

- Mise en place du chiffrement des secrets utilisateurs (prochainement).
- Chiffrement des usernames (email/identifiant) dans une version ultérieure.

## A03:2021 – Injection

### Mesures déjà mises en place

- Utilisation de Prisma (ORM) qui protège nativement contre les injections SQL.
- TypeScript strict et DTO partagés entre UI et API.
- Recettes de tests validant la longueur maximale des entrées (les noms des coffres-forts ne doivent pas dépasser 255
  caractères).

### Mesures prévues

- Ajouter une validation centralisée des données entrantes côté API (par exemple zod ou class-validator).
- Ajouter des tests d'injections dans le cahier de recettes

### Mesures restantes à intégrer

- Interdire l'usage de `dangerouslySetInnerHTML`

## A04:2021 – Insecure Design

### Mesures déjà mises en place

- Authentification via NextAuth avec gestion sécurisée de session.
- Messages d’erreur d’authentification uniformisés ("invalid credentials").
- UUID utilisés pour masquer les identifiants métiers.
- Protection CSRF intégrée par défaut dans NextAuth.

### Mesures prévues

- Mise en place d’un mécanisme anti-brute force (limite de tentatives de connexion).
- Ajout progressif de la gestion des rôles (RBAC).

### Mesures restantes à intégrer

- Définir une politique de mot de passe stricte (pour les mots de passe maîtres).
- Vérifier que les cookies de session soient sécurisés (`HttpOnly`, `Secure`, `SameSite=strict`).
- Ajouter une authentification multifactorielle

## A05:2021 – Security Misconfiguration

### Mesures déjà mises en place

- Configuration par défaut de Next.js et NextAuth.
- TypeScript configuré en mode strict.
- ESLint et Prettier appliqués en continu.
- Sessions gérées par JWT avec un secret dédié.
- Mise en place de différents environnements (preview et production)
- Désactivation du Swagger en production

### Mesures prévues

- Mise en place d'une authentification sur l'API

### Mesures restantes à intégrer

- Durcissement des en-têtes HTTP via un module de sécurisation adapté.

## A06:2021 – Vulnerable and Outdated Components

### Mesures déjà mises en place

- Adoption du versioning SemVer.
- Journal de versions avec une catégorie dédiée aux correctifs de sécurité.

### Mesures prévues

- Mise en place de Dependabot pour la gestion proactive des dépendances.
- Définir une politique de mise à jour automatisée et validée en CI/CD.

## A07:2021 – Identification and Authentication Failures

### Mesures déjà mises en place

- Authentification centralisée avec NextAuth
- Mots de passe maîtres hashés avec bcrypt.
- Messages d’erreur neutres pour éviter l’énumération des comptes.

### Mesures prévues

- Ajout d’une limitation du nombre de tentatives de connexion.
- Ajouter une politique de mots de passe (longueur, minuscules, majuscules, chiffres, caractères spéciaux etc) pour les
  mots de passe maîtres
- Réinitialisation possible du mot de passe maître utilisateur

### Mesures restantes à intégrer

- Ajouter une authentification multifactorielle

## A08:2021 – Software and Data Integrity Failures

### Mesures déjà mises en place

- CI via GitHub Actions avec tests, linter et build obligatoires.
- Branche `main` protégée par des règles de merge strictes.

### Mesures prévues

- Protection de la branche `develop` également.
- Déploiement (CD) déclenché uniquement si la CI est validée.
- Définir une politique de mise à jour automatisée et validée en CI/CD.

## A09:2021 – Security Logging and Monitoring Failures

### Mesures déjà mises en place

- Logger centralisé utilisé à la fois côté API, et à la fois côté UI.
- Journaux natifs de Next.js pour toutes les routes.

### Mesures prévues

- Mise en place d’un outil de supervision (par exemple Sentry).

### Mesures restantes à intégrer

- Définir les événements critiques à journaliser (échecs d’authentification, accès refusés, erreurs serveur).

## A10:2021 – Server-Side Request Forgery (SSRF)

### Mesures déjà mises en place

- Aucun champ URL manipulé par l’utilisateur.
- Pas d’appels sortants sensibles dans la première version.

### Mesures restantes à intégrer

- Validation stricte des URLs lors de l’introduction du champ "URL".
