[Revenir au README](README.md)

# Cahier de recettes

> Compétence RNCP : C2.3.1
>
> Version : [`1.2.0`](https://github.com/vbetsch/locklite/releases/tag/v1.2.0)

### Références

- Schéma Prisma : [schema.prisma](../prisma/schema.prisma)
- Configuration Jest : [jest.config.ts](../jest.config.ts)
- Documentation API Swagger : http://localhost:3000/api/docs
- Plan de correction des bogues : [BUGS.md](BUGS.md)

## 1. Objet et périmètre

Ce document décrit les scénarios de tests et résultats attendus pour valider les fonctionnalités de LockLite, détecter
les anomalies et prévenir les régressions.  
Périmètre couvert : toutes les fonctionnalités du MVP.

## 2. Environnements et données de test

* Les tests des recettes sont réalisés sur l'environnement de préproduction qui possède sa propre base de
  données.
* Seule l'équipe de développement a accès à cet environnement.
* Les développeurs peuvent également reproduire les tests sur leur environnement local, avec soit les données de
  développement par défaut (seed), soit leur propre jeu de données.
* Les développements ne sont pas poussés en production tant que les recettes ne sont pas toutes validées.

- **Comptes de test** (pre-prod) :
  - `admin@example.com` / `admin`
  - `user@example.com` / `user`

## 3. Stratégie de test

- **Fonctionnels** : validation des parcours utilisateur
- **Structurels** : conformité schémas API et contraintes DB
- **Sécurité** : authentification, autorisations, stockage sécurisé
- **Outils** : Jest, ESLint, GitHub Actions

## 4. Matrice de couverture

| ID | Fonctionnalité            | Tests fonctionnels                                                              | Tests structurels    | Tests sécurité                                     | Tests accessibilité                                   |
|----|---------------------------|---------------------------------------------------------------------------------|----------------------|----------------------------------------------------|-------------------------------------------------------|
| F0 | Documentation API         | `TC-F0`                                                                         | `TS-F0.1`, `TS-F0.2` | —                                                  | —                                                     |
| F1 | Gestion des coffres-forts | `TC-F1.1`, `TC-F1.2`, `TC-F1.3.A`, `TC-F1.3.B`, `TC-F1.4`, `TC-F1.5`, `TC-F1.6` | `TS-F1.3`            | `SE-VAULTS`, `SE-F1.5-A`, `SE-F1.5-B`, `SE-F1.5-C` | `AC-ZOOM`, `AC-F1.1`, `AC-F1.2`, `AC-F1.3`, `AC-F1.4` |
| F2 | Authentification          | `TC-F2.1.A`, `TC-F2.1.B`, `TC-F2.2.A`, `TC-F2.2.B`                              | —                    | `SE-HASH`, `SE-GUARD-UI`, `SE-GUARD-API`           | `AC-ZOOM`, `AC-F2.1`, `AC-F2.2`                       |

## 5. Tests fonctionnels

### TC-F0 — Affichage de la documentation API

**Étapes** :

1. Accéder à `/api/docs`

**Résultat attendu** : un Swagger s'affiche, toutes les routes API sont présentes, catégorisées, décrites et
documentées, les schémas sont tous présents et complets, je peux exécuter les routes API depuis l'interface

**Couverture** :

- [ ] test manuel

### TC-F1.1 — Affichage des coffres-forts

**Préconditions** : être connecté avec un utilisateur

**Étapes** :

1. Accéder à `/ui/workspace`
2. Attendre le chargement de l'affichage

**Résultat attendu** : mes coffres-forts s'affichent correctement, je ne vois que les miens et il n'en manque aucun, je
peux voir leurs noms, leurs noms d'utilisateurs, leurs secrets, et leurs membres

> S'il n'y en a aucun, un texte explicite doit s'afficher

**Couverture** :

- [ ] test manuel

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

- [ ] test manuel

> Si aucun résultat n'est trouvé, un texte me l'indique

### TC-F1.3.A — Création de coffres-forts : succès

**Préconditions** : être connecté avec un utilisateur

**Étapes** :

1. Accéder à `/ui/workspace`
2. Cliquer sur le bouton pour créer un coffre-fort
3. Entrer un libellé ainsi qu'un mot de passe
4. Cliquer sur le bouton pour créer

**Résultat attendu** : le coffre-fort s'ajoute au début de la liste, je suis le seul membre de ce coffre-fort

**Couverture** :

- [ ] test manuel

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

- [ ] test manuel

### TC-F1.4 — Suppression de coffres-forts

**Préconditions** : être connecté avec un utilisateur, avoir au moins un coffre-fort

**Étapes** :

1. Accéder à `/ui/workspace`
2. Cliquer sur le bouton Supprimer d'un coffre-fort
3. Confirmer l'action
4. Attendre le chargement de l'action

**Résultat attendu** : je ne vois plus le coffre-fort que j'ai supprimé

**Couverture** :

- [ ] test manuel

### TC-F1.5 — Partager un coffre-fort

**Préconditions** : être connecté avec un utilisateur, avoir au moins un coffre-fort

**Étapes** :

1. Accéder à `/ui/workspace`
2. Cliquer sur les membres d'un coffre-fort
3. Modifier les membres
4. Appliquer la modification

**Résultat attendu** : les membres correspondent à la modification appliquée

**Couverture** :

- [ ] test manuel

### TC-F1.6 — Modifier les informations d'un coffre-fort

**Préconditions** : être connecté avec un utilisateur, avoir au moins un coffre-fort

**Étapes** :

1. Accéder à `/ui/workspace`
2. Cliquer sur le bouton "Modifier" d'un coffre-fort
3. Modifier le nom et le secret
4. Confirmer les modifications

**Résultat attendu** : les informations se sont bien mises à jour

**Couverture** :

- [ ] test manuel

### TC-F2.1.A — Connexion d'un utilisateur : succès

**Préconditions** : ne pas être déjà connecté, être muni d'au moins un utilisateur

**Étapes** :

1. Se rendre sur `/ui/login`
2. Entrer l'email et le mot de passe maître de votre utilisateur
3. Cliquer sur le bouton pour se connecter

**Résultat attendu** : je suis redirigé sur l'espace de travail et je vois l'icône du profil dans la barre de navigation

**Couverture** :

- [ ] test manuel
- [ ] tests unitaires

### TC-F2.1.B — Connexion d'un utilisateur : mauvais identifiants

**Préconditions** : ne pas être déjà connecté

**Étapes** :

1. Se rendre sur `/ui/login`
2. Entrer un email et/ou un mot de passe erroné
3. Cliquer sur le bouton pour se connecter

**Résultat attendu** : je ne suis pas redirigé sur l'espace de travail, une erreur m'indique que je n'ai pas entré des
identifiants valides

**Securité** : `OWASP-A04:2021`

**Couverture** :

- [ ] test manuel
- [ ] tests unitaires

### TC-F2.2.A — Menu profil de l'utilisateur : affichage

**Préconditions** : être connecté avec un utilisateur

**Étapes** :

1. Se rendre sur `/ui/workspace`
2. Cliquer sur l'icône du profil de la barre de navigation

**Résultat attendu** : Un menu s'ouvre affichant mon nom et un bouton pour me déconnecter, l'icône représente mon avatar
si j'ai un nom

**Couverture** :

- [ ] test manuel

### TC-F2.2.B — Menu profil de l'utilisateur : déconnexion

**Préconditions** : être connecté avec un utilisateur

**Étapes** :

1. Se rendre sur `/ui/workspace`
2. Cliquer sur l'icône du profil de la barre de navigation
3. Cliquer sur "se déconnecter"

**Résultat attendu** : Je suis redirigé sur la page de login

**Couverture** :

- [ ] test manuel

## 6. Tests structurels

### TS-F0.1 — Format des erreurs

**But** : vérifier que les erreurs suivent le format attendu

**Vérification** : se rendre dans les schémas de la documentation API, déplier les DTO de type "error", vérifier qu'ils
contiennent bien tous un objet `error` contenant un attribut `message`

**Securité** : `OWASP-A03:2021`

**Couverture** :

- [ ] test manuel
- [ ] tests unitaires

### TS-F0.2 — Format des réponses API

**But** : vérifier que les réponses suivent le format attendu

**Vérification** : se rendre dans les schémas de la documentation API, déplier les DTO de type "data", vérifier qu'ils
contiennent bien tous un objet `data` contenant les informations à transmettre

**Securité** : `OWASP-A03:2021`

**Couverture** :

- [ ] test manuel
- [ ] tests unitaires

### TS-F1.3 — Libellé de coffre-fort trop long

**But** : vérifier que les contraintes de base de données sont respectées

**Vérification** : être connecté avec un utilisateur, créer ou modifier un coffre-fort avec un libellé de plus de 255
caractères, le coffre-fort ne s'ajoute pas dans la liste, une erreur apparaît m'indiquant que le libellé est trop long

**Securité** : `OWASP-A03:2021`

**Couverture** :

- [ ] test manuel
- [ ] tests unitaires

## 7. Tests de sécurité

### SE-VAULTS - Confidentialité des coffres-forts

**But** : vérifier la sécurité du stockage des coffres-forts

**Vérification** : inspection de la base de données: les coffres-forts sont bien liés à un seul et unique userId

**Securité** : `OWASP-A01:2021`

**Couverture** :

- [ ] test manuel

### SE-HASH — Hashage des mots de passe

**But** : vérifier la sécurité du stockage des mots de passe maîtres

**Vérification** : inspection de la base de données, aucun mot de passe maître ne doit être en clair

**Securité** : `OWASP-A07:2021`

**Couverture** :

- [ ] test manuel
- [ ] tests unitaires

### SE-GUARD-UI — Protection des routes : front-end

**But** : Vérifier que toutes les routes protégées exigent une authentification valide avant traitement.

**Vérification** : sans être connecté, essayer de se rendre sur `/ui/workspace`, je dois être redirigé vers `/ui/login`

**Securité** : `OWASP-A01:2021`

**Couverture** :

- [ ] test manuel

### SE-GUARD-API — Protection des routes : back-end

**But** : Vérifier que toutes les routes protégées exigent une authentification valide avant traitement.

**Vérification** : sans être connecté, faire appel à `GET /vaults` pour obtenir la liste des coffres-forts utilisateur.
Je dois avoir une erreur 401 "Unauthorized". Je n'ai pas de "vault" dans les data retournées.

**Securité** : `OWASP-A01:2021`

**Couverture** :

- [ ] test manuel
- [ ] tests unitaires

### SE-F1.5-A — Partager un coffre-fort : Accès refusé

**But** : sécuriser l'accès aux vaults

**Vérification** : un non-membre ne peut ni lire, ni modifier, ni lister, ni supprimer le vault.

**Securité** : `OWASP-A01:2021`

**Couverture** :

- [ ] test manuel

### SE-F1.5-B — Partager un coffre-fort : Révocation

**But** : sécuriser l'accès aux vaults

**Vérification** : un ex-membre ne peut plus rien faire immédiatement

**Securité** : `OWASP-A01:2021`

**Couverture** :

- [ ] test manuel

### SE-F1.5-C — Partager un coffre-fort : Non-orphelin

**But** : sécuriser l'accès aux vaults

**Vérification** : impossible de se retirer soi-même d'un vault

**Securité** : `OWASP-A01:2021`

**Couverture** :

- [ ] test manuel

## 8. Tests d'accessibilité

### AC-ZOOM — Lisibilité à 200% de zoom

**But** : vérifier que l’interface reste lisible et utilisable après un zoom navigateur à 200%.

**Vérification** :

- Activer le zoom du navigateur à 200%.
- Les textes, champs de formulaire et boutons restent visibles sans recoupement ni perte d’information.
- La navigation au clavier reste possible (aucun élément inaccessible).
- Aucune barre de défilement horizontale inutile n’apparaît.

**Accessibilité** : `RGAA-10.11`, `RGAA-12.6`

**Couverture** :

- [ ] test manuel

### AC-F1.1 — Affichage des coffres-forts : navigation clavier

**But** : vérifier que la liste des coffres-forts est accessible uniquement au clavier.

**Vérification** :

[//]: # (TODO: ajouter 'editer' dans les actions)

- Naviguer avec `Tab` et `Shift+Tab`, chaque coffre-fort est atteignable.
- Les actions (supprimer, modifier les membres) sont activables avec `Entrée` ou `Espace`.

**Accessibilité** : `RGAA-9.2`, `RGAA-12.6`

**Couverture** :

- [ ] test manuel

### AC-F1.2 — Recherche de coffres-forts : libellé et focus

**But** : vérifier que la barre de recherche est correctement étiquetée et utilisable au clavier.

**Vérification** :

- La zone de recherche possède un `label` ou un `aria-label` explicite.
- L’ordre de tabulation permet d’y accéder logiquement après la navigation principale.

**Accessibilité** : `RGAA-4.1`, `RGAA-12.8`

**Couverture** :

- [ ] test manuel

### AC-F1.3 — Création et modification de coffres-forts : pertinence des labels

**But** : vérifier que les champs de formulaire sont correctement associés à leurs libellés.

**Vérification** :

- Chaque champ (nom, mot de passe) possède un `label` associé.
- Les messages d’erreur sont lisibles par un lecteur d’écran (ex. via `aria-describedby`).

**Accessibilité** : `RGAA-4.1`, `RGAA-11.1`

**Couverture** :

- [ ] test manuel

### AC-F1.4 — Suppression et partage de coffres-forts : confirmation accessible

**But** : vérifier que les dialogues de confirmation sont accessibles.

**Vérification** :

- Le focus est placé automatiquement dans la modale ouverte.
- La fermeture est possible avec la touche `Échap`.
- Les boutons de confirmation/annulation sont atteignables au clavier.

**Accessibilité** : `RGAA-12.7`, `RGAA-7.1`

**Couverture** :

- [ ] test manuel

### AC-F2.1 — Connexion utilisateur : lisibilité et ordre de lecture

**But** : vérifier que les champs de connexion sont accessibles.

**Vérification** :

- Le champ email est étiqueté avec le mot "email".
- Le champ mot de passe est étiqueté correctement et son contenu est masqué.
- L’ordre de tabulation suit l’ordre visuel : email, mot de passe, bouton de connexion.

**Accessibilité** : `RGAA-4.1`, `RGAA-9.2`

**Couverture** :

- [ ] test manuel

### AC-F2.2 — Menu profil : pertinence des intitulés

**But** : vérifier que les intitulés sont clairs et accessibles au lecteur d’écran.

**Vérification** :

- L’icône de profil possède un `aria-label` explicite "Open profile menu".
- Le bouton de déconnexion est lisible et activable au clavier.

**Accessibilité** : `RGAA-12.8`, `RGAA-6.1`

**Couverture** :

- [ ] test manuel

## 9. Procédure d’exécution

- **Automatisée** : la CI lance les tests unitaires, il est également possible de les exécuter en environnement local
- **Manuelle** : les recettes sont toutes au minimum testées manuellement

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
- Des tests Jest reprenant cet ID

## 12. Gestion des anomalies

- Création d'un ticket "bug" contenant l'ID du scénario dans l'outil de suivi.
- Respect du [Plan de correction des bogues](BUGS.md).
