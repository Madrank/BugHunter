const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Bug = sequelize.define('Bug', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    code_snippet: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'open'
    }
  }, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  
  return Bug;
};