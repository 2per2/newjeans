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
	// user의 id로 외래키 설정
	Comment.associate = function(models) {
		Comment.belongsTo(models.User);
	}
  return Comment;
};

