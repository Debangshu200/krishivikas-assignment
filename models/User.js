'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      name:{ 
        type: DataTypes.STRING, 
        allowNull: false 
    },
      email:{ 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true 
    },
      password:{ 
        type: DataTypes.STRING, 
        allowNull: false 
    },
      gender:{ 
        type: DataTypes.ENUM('Male','Female','Others'), 
        allowNull: false 
    },
      role:{ 
        type: DataTypes.ENUM('Super-admin','Admin','Manager'), 
        allowNull: false 
    },
    
      createdById: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id'
        },
        validate: {
          notSelf(value) {
            if (value && value === this.id) {
              throw new Error('User cannot be their own creator');
            }
          }
        }
      }
    });
    User.associate = models => {
      User.hasMany(models.Task, { foreignKey: 'createdById', as: 'tasks' });
      User.hasMany(models.User, { as: 'CreatedUsers', foreignKey: 'createdById' });
      User.belongsTo(models.User, { as: 'Creator', foreignKey: 'createdById' });
    };
    return User;
  };