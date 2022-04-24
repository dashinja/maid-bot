'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
require('dotenv').config()

console.log('envConfig first: ', process.env.varDevEnv)
const envConfig = JSON.parse(process.env.varDevEnv)

let sequelize;
if (env === 'production') {
  console.log('env production: ', env)
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  console.log('env dev: ', env)
  sequelize = new Sequelize(envConfig.database, envConfig.username, envConfig.password, envConfig);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
