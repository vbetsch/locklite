# Manuel d’utilisation

> Compétence RNCP : C2.4.1

[//]: # (TODO: Add when we will have share vault -> SHARE)

### Références

- Manuel de mise à jour : [CONTRIBUTING.md](CONTRIBUTING.md)
- Manuel de déploiement : [DEPLOYMENT.md](DEPLOYMENT.md)

## 1. Objet

Ce document décrit l’utilisation de l’application LockLite par un utilisateur final.  
Il explique les principales fonctionnalités et les bonnes pratiques afin d’assurer une gestion sécurisée des mots de
passe.

## 2. Pré-requis

Vous devez vous prémunir d'un mot de passe maître LockLite, si ce n'est pas déjà le cas je vous invite à contacter votre
administrateur.

## 2. Connexion à l’application

[//]: # (Ici on part du principe que l'application est déployée en intranet, ce qui n'est pas le cas pour ce MVP)

1. Accéder à l’URL fournie par votre administrateur (exemple : `https://locklite.mondomaine.com`).
2. Saisir votre email et le mot de passe maître que vous a fourni votre administrateur.
3. En cas d’oubli de mot de passe, utiliser la procédure prévue par votre administrateur.

## 3. Tableau de bord

Une fois connecté, vous accéder au tableau de bord LockLite :

- Aperçu des coffres-forts auxquels vous avez accès.
- Barre de recherche pour filtrer les coffres-forts affichés
- Bouton pour créer un nouveau coffre-fort

## 4. Gestion des coffres-forts

### Créer un coffre-fort

1. Cliquer sur **Add a vault**.
2. Entrer un nom (label) et un secret. Le secret peut être un mot de passe, une clé d'accès, un code à 6 chiffres, etc.
3. Cliquer sur créer pour valider : le coffre-fort est visible dans le tableau de bord.

### Supprimer un coffre-fort

1. Choisir le coffre-fort à supprimer.
2. Cliquer sur **Delete**.
3. Confirmer l’action (suppression définitive). Vous pouvez annuler.

[//]: # (TODO: SHARE)
[//]: # (## 6. Partage de coffres-forts)

## 5. Déconnexion

- Cliquer sur l’icône de profil en haut à droite.
- Cliquer sur  **Logout**.
- Pour des raisons de sécurité, toujours se déconnecter après usage, surtout sur un poste partagé.

## 6. Bonnes pratiques de sécurité

- Ne **jamais** partager vos identifiants de connexion.
- Ne pas enregistrer vos mots de passe LockLite en clair ailleurs (post-it, fichiers texte, etc.).
- Signaler immédiatement toute anomalie ou suspicion d’accès non autorisé à l’administrateur.

## 7. Support

En cas de problème ou de question :

- Consulter la documentation interne de l’entreprise.
- Contacter l’administrateur LockLite de votre organisation.  
