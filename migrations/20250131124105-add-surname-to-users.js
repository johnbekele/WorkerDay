'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'surname', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Unknown',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'surname');
  },
};
