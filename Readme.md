# eSport

Backend pour gérer une plateforme de compétitions e-sport : utilisateurs, équipes et tournois.

## Fonctionnalités

- US1 : Création de compte
- US2 : Connexion
- US3 : Déconnexion
- US4 : Modifier mon profil
- US5 : Créer une équipe
- US6 : Rejoindre une équipe
- US7 : Gérer les membres de mon équipe
- US8 : Créer un tournoi
- US9 : Modifier un tournoi
- US10 : Supprimer un tournoi
- US11 : Inscrire une équipe à un tournoi
- US12 : Lister les tournois ouverts
- US13 : Voir les équipes inscrites à un tournoi
- US14 : Supprimer une équipe (admin uniquement)
- US15 : Voir les statistiques de participation
- US16 : Gérer les rôles utilisateurs
- US17 : Consulter le détail d’une équipe
- US18 : Consulter mes inscriptions à des tournois

## Technologies

- Node.js
- Express 5
- MongoDB avec Mongoose
- JSON Web Token (JWT)
- bcryptjs
- Helmet
- CORS
- express-rate-limit
- validator

## Prérequis

- Node.js et npm installés.
- Une base de données MongoDB accessible.
- Un terminal ouvert à la racine du projet.

## Installation

```bash
git clone https://github.com/gaelramos-ship-i/eSport.git
cd eSport
npm install
```

Créez ensuite un fichier `.env` à la racine du projet :

```env
MONGODB_URI=mongodb://...
JWT_SECRET=remplacer-par-une-cle-secrete-longue
```

`MONGODB_URI` contient l'URL de connexion MongoDB et `JWT_SECRET` sert à signer les tokens JWT. Ne partagez jamais ces valeurs et ne les committez pas.

## Démarrage

```bash
nodemon app.js
```

## Organisation du projet

```text
.
├── app.js                  # Point d'entrée de l'API
├── config/db.js            # Connexion à MongoDB
├── controllers/            # Logique métier
├── middlewares/            # Authentification et droits administrateur
├── models/                 # Schémas Mongoose
├── routes/                 # Définition des routes HTTP
├── .env                    # Variables d'environnement, non versionné
├── package.json
└── Readme.md
```