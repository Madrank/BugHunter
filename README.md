[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.x-blue)](https://reactjs.org/)
[![SQLite](https://img.shields.io/badge/SQLite-3.x-blue)](https://sqlite.org/)
# BugHunter - Collaborative Debugging Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.x-blue)](https://reactjs.org/)

## Description

BugHunter est une plateforme collaborative où les développeurs peuvent partager des bugs et proposer des solutions. Inspiré de Stack Overflow et GitHub Gist, ce projet démontre mes compétences en développement fullstack.

### Fonctionnalités

- **Authentification JWT** - Inscription et connexion sécurisées
- **Gestion de bugs** - Création, modification et suppression de bugs
- **Solutions collaboratives** - Proposez des corrections avec visualisation des changements (diff)
- **Système de vote** - Upvote/downvote pour les meilleures solutions
- **Système de réputation** - Gagnez des points en aidant les autres
- **Syntax highlighting** - Affichage du code avec coloration syntaxique
- **Responsive design** - Interface adaptée à tous les écrans

## Stack Technique

### Backend
- **Node.js** + **Express** - API RESTful
- **SQLite** / **Sequelize** - ORM et base de données
- **JWT** + **Bcrypt** - Authentification
- **Diff** - Génération de différences de code

### Frontend  
- **React 18** - Interface utilisateur
- **Tailwind CSS** - Styling et responsive
- **Axios** - Communication API
- **React Router v6** - Navigation
- **React Syntax Highlighter** - Coloration du code

## Installation

### Prérequis
- Node.js (v18 ou supérieur)
- npm ou yarn

### Backend

```bash
cd backend
npm install
cp .env.example .env  # Configurez votre JWT_SECRET
npm run dev