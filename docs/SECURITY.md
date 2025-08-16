# Mesures de sécurité

> Compétence RNCP : C2.2.3

Ce document présente les mesures de sécurité mises en place et planifiées dans LockLite, en lien avec le **Top 10 OWASP
2021**.  
L’objectif est de garantir l’évolutivité et la sécurité du code source.

---

## A01:2021 – Broken Access Control

### Mesures déjà mises en place

- Chaque vault est lié à un seul et unique `userId`.
- Tests de recette pour vérifier l’unicité du lien vault ↔ user.

### Mesures prévues

- Mise en place du partage de vaults via une relation many-to-many (version ultérieure).
- Introduction d’un contrôle d’accès basé sur les rôles (RBAC).

### Mesures restant à mettre en œuvre

- Définir et appliquer des règles fines de droits : lecture seule, édition, suppression.

---

## A02:2021 – Cryptographic Failures

### Mesures déjà mises en place

- À ce stade, les secrets ne sont pas encore chiffrés.

### Mesures prévues

- Mise en place du chiffrement des secrets utilisateurs (prochaine itération).
- Chiffrement des usernames (email/identifiant) dans une version ultérieure.

### Mesures restant à mettre en œuvre

- Définir et documenter la stratégie de chiffrement (algorithme, gestion des clés, rotation).

---

## A03:2021 – Injection

### Mesures déjà mises en place

- Utilisation de Prisma (ORM) qui protège nativement contre les injections SQL.
- TypeScript strict et DTO partagés entre UI et API.

### Mesures prévues

- Recettes de tests validant la longueur maximale des entrées (ex. vault name ≤ 255 caractères).

### Mesures restant à mettre en œuvre

- Ajouter une validation centralisée des données entrantes côté API (ex. zod, class-validator).

---

## A04:2021 – Insecure Design

### Mesures déjà mises en place

- Authentification via NextAuth avec gestion sécurisée de session.
- Messages d’erreur d’authentification uniformisés ("invalid credentials").
- UUID utilisés pour masquer les identifiants métiers.
- Protection CSRF intégrée par défaut dans NextAuth.

### Mesures prévues

- Mise en place d’un mécanisme anti-brute force (limitation des tentatives).
- Ajout progressif de la gestion des rôles (RBAC).

### Mesures restant à mettre en œuvre

- Définir une politique de mot de passe stricte.

---

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

---

## A06:2021 – Vulnerable and Outdated Components

### Mesures déjà mises en place

- Adoption du versioning
