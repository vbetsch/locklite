# Critères de qualité et de performance

> Compétence RNCP : C2.1.1

### Références

- Déploiement continue : [CD.md](CD.md)

## 1. Objectif

Garantir que l’application **LockLite** respecte des standards élevés de qualité logicielle, de performance et de
sécurité.  
Ces critères servent de référence pour valider les développements, suivre les évolutions et s’assurer que le produit
reste fiable, maintenable et performant.

## 2. Qualité logicielle

### 2.1 Code et maintenabilité

- Langage : TypeScript avec compilation stricte (tsconfig en mode strict).
- Normes : ESLint (analyse statique), Prettier (formatage automatique).
- Couverture de tests : seuil minimum fixé à 80% (unitaires, intégration, end-to-end).
- Documentation technique associée (Swagger pour l’API, README pour les modules critiques).
- Gestion des dépendances sécurisée et mise à jour régulière.

### 2.2 Processus de vérification

- Tests automatisés exécutés à chaque Pull Request.
- Analyse des secrets et dépendances sensibles avec GitGuardian et npm audit.
- Revue de code obligatoire avant tout merge.

## 3. Performance applicative

### 3.1 Front-end (Next.js + MUI)

- Web Vitals surveillés :
  - LCP (Largest Contentful Paint) < 2,5s
  - FCP (First Contentful Paint) < 1,8s
  - CLS (Cumulative Layout Shift) < 0,1
  - INP (Interaction to Next Paint) < 200ms
- Audit régulier avec Lighthouse en préproduction.
- Lazy-loading des composants lourds et optimisation des assets.

### 3.2 Back-end (API + Prisma + PostgreSQL)

- Temps de réponse API : < 300ms (p95).
- Taux d’erreurs 5xx : < 1%.
- Connexions base de données gérées avec un pool Prisma (évite surcharge).
- Migrations Prisma validées et testées avant passage en production.

## 4. Sécurité

- Authentification : NextAuth, cookies sécurisés (`Secure`, `HttpOnly`, `SameSite=Lax`).
- Mots de passe hashés avec bcrypt.
- Politiques de rotation des secrets (Vercel / GitHub).
- OWASP Top 10 pris en compte (ex : protections CSRF, XSS, injection SQL).
- En-têtes HTTP de sécurité activés (CSP, X-Frame-Options, Referrer-Policy).

## 5. Accessibilité et conformité

- Référentiel appliqué : RGAA niveau AA.
- Score minimal d’accessibilité Lighthouse : 95/100.
- Navigation clavier complète et contrastes vérifiés.
- Tests manuels sur les composants critiques (formulaires, navigation).

## 6. Fiabilité des déploiements

- Chaque déploiement est associé à un commit et un tag Git.
- Rollback en moins de 5 minutes possible via revert Git + redeploiement Vercel.
- Health check automatique exposé sur /api/health.
- Suivi des logs et alertes via Sentry.

## 7. Traçabilité

- Historique des releases publié sur GitHub (CHANGELOG, SECURITY, ACCESSIBILITY).
- Suivi des migrations et schémas de base de données via Prisma.
- Suivi des anomalies et corrections via cahier de recettes et tickets associés.

## 8. Résumé

Ces critères permettent de :

- Vérifier la **qualité du code** avant chaque intégration,
- Surveiller la **performance utilisateur** (front et back),
- Garantir la **sécurité et l’accessibilité**,
- Assurer la **fiabilité du déploiement** et la traçabilité des évolutions.

Ils répondent directement aux exigences du projet et aux critères d’évaluation de la compétence C2.1.1.
