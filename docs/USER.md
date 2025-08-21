[Revenir au README](README.md)

# Manuel d’utilisation

> Compétence RNCP : C2.4.1

[//]: # (TODO: Add when we will have share vault -> SHARE)

## 1. Objet

Ce document décrit l’utilisation de l’application LockLite par un utilisateur final.  
Il explique les principales fonctionnalités et les bonnes pratiques afin d’assurer une gestion sécurisée des mots de
passe.

## 2. Pré-requis

Vous devez vous prémunir d'un mot de passe maître LockLite, si ce n'est pas déjà le cas je vous invite à contacter votre
administrateur.

## 3. Connexion à l’application

[//]: # (Ici on part du principe que l'application est déployée en intranet, ce qui n'est pas le cas pour ce MVP)

1. Accéder à l’URL fournie par votre administrateur (exemple : `https://locklite.mondomaine.com`).
2. Saisir votre email et le mot de passe maître que vous a fourni votre administrateur, puis cliquer sur **Sign in** _(
   Se connecter)_.
3. En cas d’oubli de mot de passe, utiliser la procédure prévue par votre administrateur.

## 4. Tableau de bord

Une fois connecté, vous accédez au tableau de bord LockLite :

- Aperçu de vos coffres-forts.
- Barre de recherche pour filtrer vos coffres-forts
- Bouton pour créer un nouveau coffre-fort

## 5. Gestion des coffres-forts

### Créer un coffre-fort

[//]: # (Cette version MVP de cette application est fictive donc il est fortement recommandé de ne pas mettre de réels identifiants)

1. Cliquer sur **Add a vault** _(Ajouter un coffre-fort)_.
2. Entrer un label _(nom)_ et un secret. Le secret peut être un mot de passe, une clé d'accès, un code à 6 chiffres,
   etc.
3. Cliquer sur **Create** _(Créer)_ pour valider : le coffre-fort est visible dans le tableau de bord.

### Supprimer un coffre-fort

1. Choisir le coffre-fort à supprimer.
2. Cliquer sur le bouton **Delete** _(Supprimer)_ de celui-ci.
3. Confirmer l’action (suppression définitive).

[//]: # (TODO: SHARE)

[//]: # (## 6. Partage de coffres-forts)

## 6. Déconnexion

- Cliquer sur l’icône de profil en haut à droite.
- Cliquer sur  **Logout** _(Se déconnecter)_.
- Pour des raisons de sécurité, toujours se déconnecter après usage, surtout sur un poste partagé.

## 7. Bonnes pratiques de sécurité

- Ne **jamais** partager vos identifiants de connexion.
- Ne pas enregistrer vos mots de passe LockLite en clair ailleurs (post-it, fichiers texte, etc.).
- Signaler immédiatement toute anomalie ou suspicion d’accès non autorisé à l’administrateur.

## 8. Support

En cas de problème ou de question :

- Consulter la documentation interne de l’entreprise.
- Contacter l’administrateur LockLite de votre organisation.  
