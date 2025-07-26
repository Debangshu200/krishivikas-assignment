'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    name:        { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    description: { 
      type: DataTypes.STRING 
    },
    type:        { 
      type: DataTypes.ARRAY(DataTypes.ENUM('a-task','b-task','c-task','d-task','e-task')), 
      allowNull: false 
    },
    startDate:   { 
      type: DataTypes.DATE, 
      allowNull: false 
    },
    endDate:     { 
      type: DataTypes.DATE, 
      allowNull: false 
    },
  });
  Task.associate = models => {
    Task.belongsTo(models.User, { as: 'Creator', foreignKey: 'createdById' });
  };
  return Task;
};