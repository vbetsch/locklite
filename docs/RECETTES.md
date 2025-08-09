# Cahier de recettes

> Version : [`1.1.1`](https://github.com/vbetsch/locklite/releases/tag/v1.1.1)
>
> Projet : LockLite — Gestionnaire de mots de passe
>
> Compétence RNCP : C2.3.1

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

- **Comptes de test** :

  - `admin@example.com` / `admin`

  - `user@example.com` / `user`

- **Jeux de données** : coffres-forts et utilisateurs générés via seed Prisma avec la commande `npm run prisma:seed`

## 4. Stratégie de test

- **Fonctionnels** : validation des parcours utilisateur
- **Structurels** : conformité schémas API et contraintes DB
- **Sécurité** : authentification, autorisations, stockage sécurisé
- **Outils** : Jest, ESLint, GitHub Actions

## 5. Matrice de couverture

| ID | Fonctionnalité            | Tests fonctionnels                             | Tests structurels    | Tests sécurité        |
|----|---------------------------|------------------------------------------------|----------------------|-----------------------|
| F0 | Documentation API         | `TC-F0`                                        | `TS-F0.1`, `TS-F0.2` | —                     |
| F1 | Gestion des coffres-forts | `TC-F1.1`, `TC-F1.2`, `TC-F1.3.A`, `TC-F1.3.B` | `TS-F1.3`            | `SE-VAULTS`           |
| F2 | Authentification          | `TC-F2.1.A`, `TC-F2.1.B`, `TC-F2.2`            | —                    | `SE-HASH`, `SE-GUARD` |

## 6. Tests fonctionnels

### TC-F0 — Affichage de la documentation API

**Étapes** :

1. Accéder à `/api/docs`

**Résultat attendu** : un Swagger s'affiche, toutes les routes API sont présentes, catégorisées, décrites et
documentées, les schémas sont tous présents et complets, je peux exécuter les routes API depuis l'interface

**Couverture** :

- [x] test manuel

### TC-F1.1 — Affichage des coffres-forts

**Préconditions** : être connecté avec un utilisateur

**Étapes** :

1. Accéder à `/ui/workspace`
2. Attendre le chargement de l'affichage

**Résultat attendu** : les coffres-forts s'affichent correctement, je peux voir leurs noms et leurs secrets

> S'il n'y en a aucun, un texte explicite doit s'afficher

**Couverture** :

- [x] test manuel

### TC-F1.2 — Recherche de coffres-forts

**Préconditions** : être connecté avec un utilisateur, avoir au moins deux coffres-forts qui commencent par des lettres
différentes

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

**Préconditions** : être connecté avec un utilisateur

**Étapes** :

1. Accéder à `/ui/workspace`
2. Cliquer sur le bouton pour créer un coffre-fort
3. Entrer un libellé ainsi qu'un mot de passe
4. Cliquer sur le bouton pour créer

**Résultat attendu** : le coffre-fort s'ajoute au début de la liste

**Couverture** :

- [x] test manuel

### TC-F1.3.B — Création de coffres-forts : déjà existant

**Préconditions** : être connecté avec un utilisateur, avoir au moins un coffre-fort

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

**Préconditions** : être connecté avec un utilisateur, avoir au moins un coffre-fort

**Étapes** :

1. Accéder à `/ui/workspace`
2. Cliquer sur le bouton Supprimer d'un coffre-fort
3. Confirmer l'action
4. Attendre le chargement de l'action

**Résultat attendu** : je ne vois plus le coffre-fort que j'ai supprimé

**Couverture** :

- [x] test manuel

### TC-F2.1.A — Connexion d'un utilisateur : succès

**Préconditions** : ne pas être déjà connecté, être muni d'au moins un utilisateur

**Étapes** :

1. Se rendre sur `/ui/login`
2. Entrer l'email et le mot de passe de votre utilisateur
3. Cliquer sur le bouton pour se connecter

**Résultat attendu** : je suis redirigé sur l'espace de travail et je vois l'icône "profil" dans la barre de navigation

**Couverture** :

- [x] test manuel

### TC-F2.1.B — Connexion d'un utilisateur : mauvais identifiants

**Préconditions** : ne pas être déjà connecté

**Étapes** :

1. Se rendre sur `/ui/login`
2. Entrer un email et/ou un mot de passe erronés
3. Cliquer sur le bouton pour se connecter

**Résultat attendu** : je ne suis pas redirigé sur l'espace de travail, une erreur m'indique que je n'ai pas entré des
identifiants valides

**Couverture** :

- [x] test manuel

### TC-F2.2 — Menu profil de l'utilisateur

**Préconditions** : être connecté avec un utilisateur

**Étapes** :

1. Se rendre sur `/ui/workspace`
2. Cliquer sur l'icône profil de la barre de navigation

**Résultat attendu** : Un menu s'ouvre affichant mon nom et un bouton pour me déconnecter.

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

**Vérification** : être connecté avec un utilisateur, créer un coffre-fort avec un libellé de plus de 255 digits, le
coffre-fort ne s'ajoute pas dans la liste, une erreur apparaît m'indiquant que le libellé est trop long

**Couverture** :

- [x] test manuel

## 8. Tests de sécurité

### SE-VAULTS - Confidentialité des coffres-forts

**But** : vérifier la sécurité du stockage des coffres-forts

**Vérification** : inspection de la base de données → mes vaults sont liés à mon userId (tous et uniquement les miens)

**Couverture** :

- [x] test manuel

### SE-HASH — Hashage des mots de passe

**But** : vérifier la sécurité du stockage des mots de passe maîtres

**Vérification** : inspection de la base de données → aucun mot de passe ne doit être en clair

**Couverture** :

- [x] test manuel

### SE-GUARD — Protection des routes

**But** : Vérifier que toutes les routes protégées exigent une authentification valide avant traitement.

**Vérification** : sans être connecté, essayer de se rendre sur `/ui/workspace`, je dois être redirigé vers `/ui/login`

**Couverture** :

- [x] test manuel

## 9. Procédure d’exécution

- **CI** : pipeline GitHub Actions → lint, tests avec rapport de couverture, build

### Tests unitaires

- **Local** :
  1. `npm install`
  2. `npm test`

## 10. Critères de réussite

- 100 % des scénarios critiques passent
- 0 anomalie bloquante ouverte
- Couverture minimale définie dans Jest bloquante dans la CI :
  - 80% de branches
  - 80% de fonctions
  - 80% de lignes
  - 80% de statements

## 11. Traçabilité

Chaque scénario est lié à :

- Un ID unique (ex. `TC-F3.1`)

[//]: # (TODO : TESTS)

[//]: # (- Un test Jest &#40;`describe/it`&#41; reprenant cet ID)

## 12. Gestion des anomalies

- Création d'un ticket "bug" contenant l'ID du scénario dans l'outil de gestion de projet.

[//]: # (TODO : BUGS)

[//]: # (Ajout dans le Plan de correction des bogues &#40;C2.3.2&#41;.)
