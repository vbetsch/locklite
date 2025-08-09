# Cahier de recettes

> Version : [`1.0.0`](https://github.com/vbetsch/locklite/releases/tag/v1.0.0)
>
> Projet : LockLite — Gestionnaire de mots de passe
>
> Compétence RNCP : C2.3.1

[//]: # (TODO: Modify when we will have authentication -> AUTH)

[//]: # (TODO: Modify when we will link with tests -> TESTS)

[//]: # (TODO: Modify when we will have bugs plan -> BUGS)

[//]: # (TODO: Modify when we will have production environment -> PROD)

## 1. Objet et périmètre

Ce document décrit les scénarios de tests et résultats attendus pour valider les fonctionnalités de LockLite, détecter
les anomalies et prévenir les régressions.  
Périmètre couvert : fonctionnalités MVP prévues pour le rendu du Bloc 2.

## 2. Références

- Schéma Prisma : [schema.prisma](../prisma/schema.prisma)
- Configuration Jest : [jest.config.ts](../jest.config.ts)
- Documentation API Swagger : http://localhost:3000/api/docs

[//]: # (TODO: BUGS)

[//]: # (- Plan de correction des bogues &#40;C2.3.2&#41; : [lien])

## 3. Environnements et données de test

[//]: # (TODO: PROD)

[//]: # (- **Environnements** : développement local, CI GitHub Actions, production &#40;Vercel&#41;)

- **Environnements** : développement local, CI GitHub Actions

[//]: # (TODO: AUTH)

[//]: # (- **Comptes de test** :)

[//]: # (  - `admin@example.com` / `admin`)

[//]: # (  - `user@example.com` / `user`)

[//]: # (- **Jeux de données** : coffres-forts et entrées préremplis via seed Prisma)

## 4. Stratégie de test

- **Fonctionnels** : validation des parcours utilisateur
- **Structurels** : conformité schémas API et contraintes DB
- **Sécurité** : authentification, autorisations, stockage sécurisé
- **Outils** : Jest, ESLint, GitHub Actions

## 5. Matrice de couverture

| ID | Fonctionnalité            | Tests fonctionnels                             | Tests structurels    | Tests sécurité |
|----|---------------------------|------------------------------------------------|----------------------|----------------|
| F0 | Documentation API         | `TC-F0`                                        | `TS-F0.1`, `TS-F0.2` | —              |
| F1 | Gestion des coffres-forts | `TC-F1.1`, `TC-F1.2`, `TC-F1.3.A`, `TC-F1.3.B` | `TS-F1.3`            | —              |

[//]: # (TODO: AUTH)

[//]: # (| F2 | Authentification          | TC-F3.1            |                   | SEC-H1         |)

## 6. Tests fonctionnels

### TC-F0 — Affichage de la documentation API

**Étapes** :

1. Accéder à `/api/docs`

**Résultat attendu** : un Swagger s'affiche, toutes les routes API sont présentes, catégorisées, décrites et
documentées, les schémas sont tous présents et complets, je peux exécuter les routes API depuis l'interface

**Couverture** :

- [x] test manuel

### TC-F1.1 — Affichage des coffres-forts

**Étapes** :

1. Accéder à `/ui/workspace`
2. Attendre le chargement de l'affichage

**Résultat attendu** : les coffres-forts s'affichent correctement, je peux voir leur nom et leur secret

> S'il n'y en a aucun, un texte explicite doit s'afficher

**Couverture** :

- [x] test manuel

### TC-F1.2 — Recherche de coffres-forts

**Préconditions** : avoir au moins deux coffres-forts qui commencent par des lettres différentes

**Étapes** :

1. Accéder à `/ui/workspace`
2. Attendre le chargement de l'affichage
3. Sélectionner la barre de recherche
4. Entrer les premières lettres d'un coffre-fort, puis d'autres lettres

**Résultat attendu** : je ne vois que les coffres-forts qui commencent par les lettres que j'ai entrées, pas de casse
sensible

**Couverture** :

- [x] test manuel

> Si aucun résultat n'est trouvé, un texte me l'indique

### TC-F1.3.A — Création de coffres-forts : succès

**Étapes** :

1. Accéder à `/ui/workspace`
2. Cliquer sur le bouton pour créer un coffre-fort
3. Entrer un libellé ainsi qu'un mot de passe
4. Cliquer sur le bouton pour créer

**Résultat attendu** : le coffre-fort s'ajoute au début de la liste

**Couverture** :

- [x] test manuel

### TC-F1.3.B — Création de coffres-forts : déjà existant

**Préconditions** : avoir au moins un coffre-fort

**Étapes** :

1. Accéder à `/ui/workspace`
2. Cliquer sur le bouton pour créer un coffre-fort
3. Entrer un libellé d'un coffre-fort existant ainsi qu'un mot de passe
4. Cliquer sur le bouton pour créer

**Résultat attendu** : le coffre-fort ne s'ajoute pas dans la liste, une erreur apparaît m'indiquant que le coffre-fort
existe déjà

**Couverture** :

- [x] test manuel

### TC-F1.4 — Suppression de coffres-forts

**Préconditions** : avoir au moins un coffre-fort

**Étapes** :

1. Accéder à `/ui/workspace`
2. Cliquer sur le bouton Supprimer d'un coffre-fort
3. Confirmer l'action
4. Attendre le chargement de l'action

**Résultat attendu** : je ne vois plus le coffre-fort que j'ai supprimé

**Couverture** :

- [x] test manuel

## 7. Tests structurels

### TS-F0.1 — Format des erreurs

**But** : vérifier que les erreurs suivent le format attendu

**Vérification** : se rendre dans les schémas de la documentation API, déplier les DTO de type "error", vérifier qu'ils
contiennent bien tous un objet `error` contenant un attribut `message`

**Couverture** :

- [x] test manuel

### TS-F0.2 — Format des réponses API

**But** : vérifier que les réponses suivent le format attendu

**Vérification** : se rendre dans les schémas de la documentation API, déplier les DTO de type "data", vérifier qu'ils
contiennent bien tous un objet `data` contenant les informations à transmettre

**Couverture** :

- [x] test manuel

### TS-F1.3 — Libellé de coffre-fort trop long

**But** : vérifier que les contraintes de base de données sont respectées

**Vérification** : créer un coffre-fort avec un libellé de plus de 255 digits, le coffre-fort ne s'ajoute pas dans la
liste, une erreur apparaît m'indiquant que le libellé est trop long

**Couverture** :

- [x] test manuel

[//]: # (TODO: AUTH)

[//]: # (## 8. Tests de sécurité)

[//]: # (### SEC-H1 — Hashage des mots de passe)

[//]: # (**But** : vérifier l’utilisation de bcrypt avec paramétrage sécurisé)

[//]: # (**Vérification** : inspection DB → aucun mot de passe en clair)

[//]: # (## 9. Procédure d’exécution)

## 8. Procédure d’exécution

- **CI** : pipeline GitHub Actions → lint, tests avec rapport de couverture, build

### Tests unitaires

- **Local** :
  1. `npm install`
  2. `npm test`

[//]: # (TODO: AUTH)

[//]: # (## 10. Critères de réussite)

## 9. Critères de réussite

- 100 % des scénarios critiques passent
- 0 anomalie bloquante ouverte
- Couverture minimale définie dans Jest bloquante dans la CI :
  - 80% de branches
  - 80% de fonctions
  - 80% de lignes
  - 80% de statements

[//]: # (TODO: AUTH)

[//]: # (## 11. Traçabilité)

## 10. Traçabilité

Chaque scénario est lié à :

- Un ID unique (ex. `TC-F3.1`)

[//]: # (TODO : TESTS)

[//]: # (- Un test Jest &#40;`describe/it`&#41; reprenant cet ID)

[//]: # (TODO: AUTH)

[//]: # (## 12. Gestion des anomalies)

## 11. Gestion des anomalies

- Création d'un ticket "bug" contenant l'ID du scénario dans l'outil de gestion de projet.

[//]: # (TODO : BUGS)

[//]: # (Ajout dans le Plan de correction des bogues &#40;C2.3.2&#41;.)
