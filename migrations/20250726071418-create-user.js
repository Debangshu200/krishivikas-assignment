'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      gender: {
        type: Sequelize.ENUM('Male','Female','Others'),
        allowNull: false
      },
      role: {
        type: Sequelize.ENUM('Super-admin','Admin','Manager'),
        allowNull: false
      },
      createdById: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',  // self reference (foreign key to same table)
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });    
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};