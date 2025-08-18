[Revenir au README](README.md)

# Critères de qualité et de performance

> Compétence RNCP : C2.1.1

[//]: # (TODO: Add when we will have sentry -> SENTRY)

[//]: # (TODO: Add when we will have lighthouse -> LIGHTHOUSE)

### Références

- Déploiement continue : [CD.md](CD.md)
- Mesures de sécurité : [SECURITY.md](SECURITY.md)
- Mesures d'accessibilité : [ACCESSIBILITY.md](ACCESSIBILITY.md)
- Journal de versions : [CHANGELOG.md](CHANGELOG.md)
- Cahier de recettes : [ACCEPTANCE.md](ACCEPTANCE.md)

## 1. Objectif

Garantir que l’application **LockLite** respecte des standards élevés de qualité logicielle, de performance et de
sécurité.  
Ces critères servent de référence pour valider les développements, suivre les évolutions et s’assurer que le produit
reste fiable, maintenable et performant.

## 2. Qualité logicielle

### 2.1 Code et maintenabilité

- **Langage** : TypeScript avec compilation stricte (_tsconfig en mode strict_).
- **Normes** : ESLint (_analyse statique_), Prettier (_formatage automatique_).
- **Couverture de tests** : seuil minimum fixé à 80% (_unitaires_).
- **Documentation** technique associée (_Swagger pour l’API et README_).
- Gestion des **dépendances** sécurisée et mise à jour régulière.

### 2.2 Processus de vérification

- Tests automatisés exécutés à chaque pull request.
- Analyse des secrets et dépendances sensibles avec GitGuardian et npm audit.
- Revue de code obligatoire avant tout merge.

## 3. Performance applicative

### 3.1 Front-end (Next.js + MUI)

- Web Vitals surveillés :
  - LCP (Largest Contentful Paint) < 2,5s
  - FCP (First Contentful Paint) < 1,8s
  - CLS (Cumulative Layout Shift) < 0,1
  - INP (Interaction to Next Paint) < 200ms
- Lazy-loading des composants lourds et optimisation des assets.

[//]: # (TODO: LIGHTHOUSE)

[//]: # (- Audit régulier avec Lighthouse en préproduction.)

### 3.2 Back-end (API + Prisma + PostgreSQL)

- Temps de réponse API : < 300ms.
- Taux d’erreurs 5xx : < 1%.
- Connexions base de données gérées avec un pool Prisma (évite surcharge).
- Migrations Prisma validées et testées avant passage en production.

## 4. Sécurité et Accessibilité

- Locklite suit les recommandations de sécurité du top 10 OWASP (_voir les [Mesures de sécurité](SECURITY.md)_)
- Locklite suit le référentiel d'accessibilité RGAA (_voir les [Mesures d'accessibilité](ACCESSIBILITY.md)_)

## 5. Fiabilité des déploiements

- Chaque déploiement est associé à un commit et un tag Git.
- Rollback en moins de 5 minutes possible via revert Git + redéploiement Vercel.

[//]: # (TODO: SENTRY)

[//]: # (- Suivi des logs et alertes via Sentry.)

## 6. Traçabilité

- Journal de versions et historique de releases publiés sur GitHub.
- Suivi des migrations et schémas de base de données via Prisma.
- Suivi des anomalies et corrections via cahier de recettes et tickets associés.

## 7. Résumé

Ces critères permettent de :

- Vérifier la **qualité du code** avant chaque intégration,
- Surveiller la **performance utilisateur** (front et back),
- Garantir la **sécurité et l’accessibilité**,
- Assurer la **fiabilité du déploiement** et la traçabilité des évolutions.
