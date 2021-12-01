'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert(
        "Notebooks",
        [
          {
            userId: 1,
            title: "To-Do",
            createdAt: new Date("Mon, 4 February 2019 13:30:00"),
            updatedAt: new Date("Mon, 4 February 2019 13:30:00"),
          },
          {
            userId: 1,
            title: "Gifts",
            createdAt: new Date("Fri, 12 November 2021 11:52:00"),
            updatedAt: new Date("Fri, 12 November 2021 11:52:00"),
          },
          {
            userId: 1,
            title: "Bills",
            createdAt: new Date("Wed, 17 November 2021 05:40:07"),
            updatedAt: new Date("Wed, 17 November 2021 05:40:07"),
          },
        ],
        {}
      );
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Notebooks', null, {});

  }
};
