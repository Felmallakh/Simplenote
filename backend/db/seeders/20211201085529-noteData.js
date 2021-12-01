'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert(
        "Notes",
        [
          {
            userId: 1,
            notebookId: 1,
            title: "To-Do list",
            content: "Set-up Christmas tree",
            createdAt: new Date("Mon, 4 February 2019 13:30:00"),
            updatedAt: new Date("Mon, 4 February 2019 13:30:00"),
          },
          {
            userId: 1,
            notebookId: 2,
            title: "Bills to pay",
            content: "Phone , Credit-Cards, Insurance",
            createdAt: new Date("Fri, 12 November 2021 11:52:00"),
            updatedAt: new Date("Fri, 12 November 2021 11:52:00"), 
          },
          {
            userId: 1,
            notebookId: 3,
            title: "Gifts to buy",
            content: "Toys, Clothes, Accessories",
            createdAt: new Date("Wed, 17 November 2021 05:40:07"),
            updatedAt: new Date("Wed, 17 November 2021 05:40:07"),
          },
        ],
        {}
      );
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Notes', null, {});

  }
};

