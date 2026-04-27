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

## Améliorations futures

Le projet est fonctionnel, mais plusieurs fonctionnalités sont prévues pour le faire évoluer :

### À court terme
- [ ] **WebSockets** - Notifications en temps réel quand une nouvelle solution est proposée
- [ ] **Recherche avancée** - Filtrer les bugs par langage, tags ou statut
- [ ] **Markdown support** - Pour les descriptions de bugs et explications des solutions
- [ ] **Pagination** - Pour gérer un grand nombre de bugs et solutions

### À moyen terme
- [ ] **Éditeur de code intégré** - Avec auto-complétion et validation syntaxique
- [ ] **Système de tags** - Catégoriser les bugs par technologie (React, Node.js, Python...)
- [ ] **Export PDF** - Générer un rapport de bug ou une solution en PDF
- [ ] **Tests automatisés** - Unitaires (Jest) et end-to-end (Cypress)

### À long terme
- [ ] **Versioning des solutions** - Historique des modifications d'une solution
- [ ] **Gamification** - Badges et niveaux de réputation avancés
- [ ] **API publique** - Exposer les bugs/solutions via une API REST documentée
- [ ] **Dashboard analytics** - Statistiques sur les bugs résolus, votes, contributeurs actifs

### Stack envisagée pour les évolutions
- **WebSockets** : Socket.io
- **Recherche** : Algolia ou PostgreSQL full-text
- **Tests** : Jest + Supertest (backend), React Testing Library (frontend)
- **Déploiement** : Docker + GitHub Actions (CI/CD)

---