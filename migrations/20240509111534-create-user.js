'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user', {
      id: {
        type: Sequelize.STRING(16),
        primaryKey: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(64),
        unique: true,
        allowNull: false
      },
      birthdate: {
        type: Sequelize.DATEONLY
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

    // comment 테이블과의 관계 설정
    await queryInterface.addConstraint('user', {
      fields: ['id'], // 사용자 ID를 사용하여 로그인
      type: 'unique',
      name: 'unique_user_id_constraint'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user');
  }
};
