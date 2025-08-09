# Cahier de recettes

> Version : 1.0.0
>
> Projet : LockLite — Gestionnaire de mots de passe
>
> Compétence RNCP : C2.3.1

## 1. Objet et périmètre

Ce document décrit les scénarios de tests et résultats attendus pour valider les fonctionnalités de LockLite, détecter
les anomalies et prévenir les régressions.  
Périmètre couvert : fonctionnalités MVP prévues pour le rendu du Bloc 2.

## 2. Références

- Schéma Prisma : [schema.prisma](../prisma/schema.prisma)
- Configuration Jest : [jest.config.ts](../jest.config.ts)
- Documentation API Swagger : http://localhost:3000/api/docs

[//]: # (- Plan de correction des bogues &#40;C2.3.2&#41; : [lien])

## 3. Environnements et données de test

[//]: # (- **Environnements** : développement local, CI GitHub Actions, production &#40;Vercel&#41;)

- **Environnements** : développement local, CI GitHub Actions

[//]: # (- **Comptes de test** :)

[//]: # (  - `admin@example.com` / `admin`)

[//]: # (  - `user@example.com` / `user`)

[//]: # (- **Jeux de données** : vaults et entrées préremplis via seed Prisma)

## 4. Stratégie de test

- **Fonctionnels** : validation des parcours utilisateur
- **Structurels** : conformité schémas API et contraintes DB
- **Sécurité** : authentification, autorisations, stockage sécurisé
- **Outils** : Jest, ESLint, GitHub Actions

## 5. Matrice de couverture

| ID | Fonctionnalité            | Tests fonctionnels | Tests structurels | Tests sécurité |
|----|---------------------------|--------------------|-------------------|----------------|
| F0 | Documentation API         | —                  | TS-E1.1           | —              |
| F2 | Gestion des coffres-forts |                    |                   |                |

[//]: # (| F3 | Authentification          | TC-F3.1            |                   | SEC-H1         |)

## 6. Tests fonctionnels

### TC-F3.1 — Connexion réussie

**Préconditions** : compte utilisateur existant avec mot de passe valide

**Étapes** :

1. Accéder à `/ui/login`

2. Saisir email et mot de passe valides

3. Soumettre le formulaire

**Résultat attendu** : redirection vers l'espace de travail, session active

[//]: # (### TC-F3.1 — Connexion réussie)

[//]: # (**Préconditions** : compte utilisateur existant avec mot de passe valide)

[//]: # (**Étapes** :)

[//]: # (1. Accéder à `/ui/login`)

[//]: # (2. Saisir email et mot de passe valides)

[//]: # (3. Soumettre le formulaire)

[//]: # (**Résultat attendu** : redirection vers l'espace de travail, session active)

## 7. Tests structurels

### TS-E1.1 — Codes HTTP & format d’erreur

**But** : vérifier que les erreurs suivent le format attendu

**Vérification** : appel API avec données invalides → code 400, schéma d'erreur conforme

## 8. Tests de sécurité

[//]: # (### SEC-H1 — Hashage des mots de passe)

[//]: # (**But** : vérifier l’utilisation de bcrypt avec paramétrage sécurisé)

[//]: # (**Vérification** : inspection DB → aucun mot de passe en clair)

## 9. Procédure d’exécution

- **Local** :
  1. `npm install`
  2. `npm test`

- **CI** : pipeline GitHub Actions → lint, tests avec rapport de couverture, build

## 10. Critères de réussite

- 100 % des scénarios critiques passent
- 0 anomalie bloquante ouverte
- Couverture minimale définie dans Jest et dans la CI :
  - 80% de branches
  - 80% de fonctions
  - 80% de lignes
  - 80% de statements

## 11. Traçabilité

Chaque scénario est lié à :

- Un ID unique (ex. `TC-F3.1`)

[//]: # (TODO)

[//]: # (- Un test Jest &#40;`describe/it`&#41; reprenant cet ID)

## 12. Gestion des anomalies

 - Création d'un ticket "bug" dans l'outil de gestion de projet.

[//]: # (Ajout dans le Plan de correction des bogues &#40;C2.3.2&#41;.)
