# Next-vote - Application de vote en ligne

## Description
Application en ligne permettant aux utilisateurs de créer, voter et voir le résultat des sujets de votes

## Fonctionnalité 
- Création de sujet de vote
- Saisir autant de choix pendant la création du sujet
- Participation à un vote
- Affichage  du nombre d’utilisateurs inscrit sur un vote
- Fixer un quota d'utilisateur inscrit par vote
- Affichage du résultat
- Authentification 


## Tecnologies utilisés
- React-js
- Next-js
- Node-js
- Material-ui 

## Comment installer

Cloner le projet:
```sh
git clone
cd next-vote
```

Installer les modules:

```sh
npm install
```

Lancement en local:
```sh
npm run dev
```


Exécuter toutes les migrations de base de données non appliquées
```sh
migrate-mongo up
```

Annuler la dernière migration de base de données appliquées
```sh
migrate-mongo down
```

Aficher le journal des modifications de la base de données
```sh
migrate-mongo status
```

## Documentation
Pour générer la documentation
```sh
npm run doc
```

Pour consulter la documentation : **back/docs/index.html**



<!-- ! A FAIRE -->

<!-- TODO -->
**modifier ses sujets si ils n'ont pas n'utilisateurs inscrit dessus**
**js doc - documentation**
**migration**
