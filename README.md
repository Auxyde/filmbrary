# Filmbrary

Filmbrary est une application conçue pour gérer et apprécier une collection de films. Basée sur Node.js et Docker, elle offre une solution pratique pour cataloguer, rechercher et interagir avec votre bibliothèque de films personnelle.

## Fonctionnalités Réalisées

- **Gestion des films** : Les utilisateurs peuvent ajouter et rechercher des films dans leur bibliothèque. Chaque film peut être détaillé avec des informations telles que le titre, le genre, l'année de sortie, et une brève description.
- **Système de notation** : Il est possible de noter les films, permettant ainsi de facilement identifier vos préférés.

## Fonctionnalités Non Implémentées

- **Exportation des films en CSV** : Cette fonctionnalité n'a pas été implémentée dans la version actuelle du projet.
- **Suppression des films** : La capacité de supprimer des films de la bibliothèque n'est pas disponible pour le moment.

## Démarrage Rapide avec Docker

Pour lancer l'application Filmbrary, assurez-vous que Docker est installé sur votre machine, puis suivez ces étapes :

1. Clonez le dépôt du projet.
2. Ouvrez une fenêtre de terminal et naviguez vers le répertoire du projet.

```bash
docker run --name hapi-mysql -e MYSQL_ROOT_PASSWORD=hapi -e MYSQL_DATABASE=user -p 3306:3306 -d mysql:8 --default-authentication-plugin=mysql_native_password
```
```bash
npm start
```

## Template de la mise en place du projet
Pour mettre en place ce projet, j'ai pris l'initiative de créer un [template](https://github.com/Auxyde/iut-project-template) pour potentiellement réutiliser cette stack dans le futur

## Plus d'Informations

Pour une compréhension complète du projet, y compris des détails sur le cahier des charges et des informations supplémentaires sur les fonctionnalités, veuillez consulter le cahier des charges du projet disponible à [ce lien](https://drjs-organization.gitbook.io/nodejs/tp/projet).

## Conclusion

Filmbrary est en développement continu, avec des fonctionnalités en cours d'ajout pour enrichir l'expérience utilisateur. Restez à l'écoute pour les mises à jour futures qui incluront de nouvelles fonctionnalités et améliorations.
