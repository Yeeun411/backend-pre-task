const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('jober_pre_task', 'root', 'root', {
  host: 'db',
  dialect: 'mysql'
});

fs.readdirSync(__dirname)
  .filter((fileName) => {
    const [modelName, extension] = fileName.split('.');
    return modelName !== 'index' && extension === 'js';
  })
  .forEach(function (file) {
    const model = sequelize['import'](path.join(__dirname, file));
    console.log('[model]', model);
    db[model.name] = model;
  });

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
