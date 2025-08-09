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

[//]: # (- **Jeux de données** : coffres-forts et entrées préremplis via seed Prisma)

## 4. Stratégie de test

- **Fonctionnels** : validation des parcours utilisateur
- **Structurels** : conformité schémas API et contraintes DB
- **Sécurité** : authentification, autorisations, stockage sécurisé
- **Outils** : Jest, ESLint, GitHub Actions

## 5. Matrice de couverture

| ID | Fonctionnalité            | Tests fonctionnels                             | Tests structurels | Tests sécurité |
|----|---------------------------|------------------------------------------------|-------------------|----------------|
| F0 | Documentation API         | —                                              | `TS-E1.1`         | —              |
| F1 | Gestion des coffres-forts | `TC-F1.1`, `TC-F1.2`, `TC-F1.3.A`, `TC-F1.3.B` | `TS-F1.3`         |                |

[//]: # (| F2 | Authentification          | TC-F3.1            |                   | SEC-H1         |)

## 6. Tests fonctionnels

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

**Résultat attendu** : je ne vois que les coffres-forts qui commencent par les lettres que j'ai entré, pas de casse
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

### TS-F1.3 — Création de coffres-forts : libellé trop long

**Étapes** :

1. Accéder à `/ui/workspace`
2. Cliquer sur le bouton pour créer un coffre-fort
3. Entrer un libellé de plus de 255 digits ainsi qu'un mot de passe
4. Cliquer sur le bouton pour créer

**Résultat attendu** : le coffre-fort ne s'ajoute pas dans la liste, une erreur apparaît m'indiquant que le libellé est
trop long

**Couverture** :

- [x] test manuel

[//]: # (### TS-E1.1 — Codes HTTP & format d’erreur)

[//]: # (**But** : vérifier que les erreurs suivent le format attendu)

[//]: # (**Vérification** : appel API avec données invalides → code 400, schéma d'erreur conforme)

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
