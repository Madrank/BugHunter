const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Vote = sequelize.define('Vote', {
    vote_value: {
      type: DataTypes.INTEGER,
      validate: {
        isIn: [[-1, 1]]
      }
    }
  });
  return Vote;
};