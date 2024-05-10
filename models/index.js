'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require('./user.js')(sequelize, Sequelize);
db.Comment = require('./comment.js')(sequelize, Sequelize);

db.User.hasMany(db.Comment);
db.Comment.belongsTo(db.User);
module.exports = db;
