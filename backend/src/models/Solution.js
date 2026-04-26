const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Solution = sequelize.define('Solution', {
    code_fix: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    explanation: {
      type: DataTypes.TEXT
    },
    diff_text: {
      type: DataTypes.TEXT
    },
    is_accepted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  return Solution;
};