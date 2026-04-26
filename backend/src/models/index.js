const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

// Utiliser SQLite - pas de mot de passe, pas de serveur !
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: console.log  // Mettre à true pour voir les requêtes SQL
});

const User = require('./User')(sequelize);
const Bug = require('./Bug')(sequelize);
const Solution = require('./Solution')(sequelize);
const Vote = require('./Vote')(sequelize);

// Associations
User.hasMany(Bug, { foreignKey: 'UserId' });
Bug.belongsTo(User, { foreignKey: 'UserId' });

User.hasMany(Solution, { foreignKey: 'UserId' });
Solution.belongsTo(User, { foreignKey: 'UserId' });
Solution.belongsTo(Bug, { foreignKey: 'BugId' });
Bug.hasMany(Solution, { foreignKey: 'BugId' });

Solution.hasMany(Vote, { foreignKey: 'SolutionId' });
Vote.belongsTo(Solution, { foreignKey: 'SolutionId' });
User.hasMany(Vote, { foreignKey: 'UserId' });
Vote.belongsTo(User, { foreignKey: 'UserId' });

module.exports = { sequelize, User, Bug, Solution, Vote };