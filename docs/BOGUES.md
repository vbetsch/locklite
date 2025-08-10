# Plan de correction des bogues

> Compétence RNCP : C2.3.2

[//]: # (TODO: Modify when we will have accessibility reference -> ACCESSIBILITY)

[//]: # (TODO: Modify when we will have changelogs -> CHANGELOGS)

### Références

- Cahier de recettes : [RECETTES.md](RECETTES.md)
- Configuration Jest : [jest.config.ts](../jest.config.ts)

## 1. Objectif

Ce document décrit le processus mis en place pour détecter, qualifier, corriger et valider les anomalies et régressions
identifiées lors de la phase de recette, afin de garantir le fonctionnement du logiciel conformément à l’attendu.

## 2. Méthodologie de détection et consignation

### 2.1 Outils utilisés

- **Tests automatisés** : Jest pour les tests unitaires
- **Surveillance en développement** : logs applicatifs (loggers), console et monitoring.
- **Intégration continue** : GitHub Actions pour exécuter automatiquement les suites de tests.
- **Traçabilité** : Outil de suivi Notion qui référence les bogues découverts

### 2.2 Sources de détection

- Échecs des scénarios du cahier de recettes.
- Alertes CI/CD lors des push ou pull requests.

### 2.3 Fiche d’anomalie

Chaque anomalie est consignée dans l’outil de suivi interne sous le format :

- **ID unique**
- **Date**
- **Environnement**
- **Description**
- **Étapes de reproduction**
- **Résultat attendu**
- **Résultat obtenu**
- **Pièces jointes** (logs, captures d’écran)

## 3. Qualification des anomalies

### 3.1 Priorisation

- **Bloquant** : empêche l’utilisation de la fonctionnalité principale.
- **Majeur** : impact significatif mais contournement possible.
- **Mineur** : gêne légère ou esthétique.

### 3.2 Catégorisation

- **Fonctionnelle** : non-respect d’une spécification.
- **Technique** : problème de performance, compatibilité ou sécurité.
- **Régression** : fonctionnalité précédemment validée qui échoue.

[//]: # (TODO: ACCESSIBILITY)

[//]: # (- **Accessibilité** : non-conformité avec le référentiel retenu ...)

## 4. Analyse des points d’amélioration

Pour chaque test en échec :

1. **Identifier la cause racine** via l’analyse des logs, reproduction contrôlée et revue de code.
2. **Évaluer l’impact** sur les autres modules et fonctionnalités.
3. **Proposer la solution technique** la plus adaptée.

## 5. Processus de traitement et validation

### 5.1 Workflow

1. Création d’une branche Git dédiée au correctif.
2. Implémentation du correctif en respectant les bonnes pratiques et normes de sécurité.
3. Ajout ou mise à jour des tests unitaires.
4. Exécution des tests en local.
5. Création d’une Pull Request avec revue par IA.
6. Validation automatique par la CI (GitHub Actions).
7. Fusion et déploiement.
8. Reproduction du scénario en production.

### 5.2 Critères de validation

- Tous les tests du cahier de recettes sont passés.
- Aucune régression détectée.
- Code conforme aux règles ESLint et Prettier.

## 6. Suivi et traçabilité

- Les bogues sont référencés dès leur détection dans l'outil de suivi interne.
- Ils sont étiquettés par les identifiants des
  scénarios de recettes concernés.
- **Indicateurs de suivi** :
  - % d’anomalies corrigées dans les délais.
  - Nombre de régressions post-correction.
  - Évolution des anomalies critiques.

[//]: # (TODO: CHANGELOGS)

[//]: # (- **Journal de versions** mis à jour pour chaque correctif.)

## 7. Exemples représentatifs

> Les anomalies ci-dessous illustrent l’application de ce plan. Les autres sont consignées dans l’outil de suivi interne.

### Bug #001 – Zone cliquable du bouton Logout trop restreinte
- Priorité : Mineur  
- Catégorie : UX/Accessibilité  
- Description : Le `onClick` était attaché au label au lieu de l’élément de liste, cliquer à côté du texte ne déclenchait pas la déconnexion.  
- Cause racine : Gestionnaire d’événement positionné sur le mauvais composant MUI.  
- Correction : Déplacer `onClick` sur `ListItem`/`ListItemButton`
- Validation : vérification manuelle du déclenchement sur toute la zone.

---

### Bug #002 – Incohérences de nommage dans la documentation API
- Priorité : Majeur  
- Catégorie : Technique/Documentation  
- Description : Les noms exposés dans la documentation (OpenAPI/Swagger) ne correspondaient pas toujours aux objets réellement retournés.  
- Cause racine : Divergence entre DTO/schema et la génération de doc.  
- Correction : Aligner les schémas OpenAPI avec les DTO réels, régénérer la doc  
- Validation : Documentation régénérée et relue

---

### Bug #003 – Visibilité des coffres-forts entre utilisateurs
- Priorité : Bloquant (Sécurité)  
- Catégorie : Sécurité/Fonctionnelle  
- Description : Les utilisateurs voyaient les coffres-forts de tout le monde, de plus un coffre-fort créé n’était pas relié à l’utilisateur courant.  
- Cause racine : Les requêtes ne sont pas filtrées par `userId` et absence de liaison propriétaire à la création.  
- Correction :  
  - Lecture : filtrer systématiquement par `userId` côté serveur et non côté client.  
  - Création : relier le coffre-fort au propriétaire au moment de l’insert.  
  - Ajouter des tests unitaires : un utilisateur A ne doit jamais voir/éditer les coffres-forts de B, création doit lier le `ownerId`.  
- Validation : Tests unitaires OK (list/read/update/delete), vérification manuelle en recette avec deux comptes distincts.
