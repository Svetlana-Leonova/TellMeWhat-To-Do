const Sequelize = require("sequelize");
const db = require("../db");

const ToDoItem = db.define("toDoItem", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  deadline: {
    type: Sequelize.DATE,
  },
});

module.exports = ToDoItem;

/**
 * instanceMethods
 */

/**
 * classMethods
 */

/**
 * hooks
 */

ToDoItem.beforeCreate((toDoItem) => {
  toDoItem.title = toDoItem.title.toLowerCase();
  return toDoItem;
});
