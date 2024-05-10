const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');
const passportLocalSequelize = require('passport-local-sequelize');
const User = require('./user.js');

module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define('comment', {
	  commentId: {
		type: Sequelize.INTEGER,
		  primaryKey: true,
		  autoIncrement: true
	  },
	  boardName: {
		type: Sequelize.STRING(16),
		allowNull: false
	  },
	  parentCommentId: {
		type: Sequelize.INTEGER,
		  allowNull: true
	  },
	content: {
		type: Sequelize.STRING,
		allowNull: false
	},
}, {
    timestamps: true,
    freezeTableName: true
  });
  return Comment;
};

