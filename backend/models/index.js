const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('jober_pre_task', 'root', 'root', {
  host: 'db',
  dialect: 'mysql'
});

const db = {};

fs.readdirSync(__dirname)
  .filter((fileName) => {
    const [modelName, extension] = fileName.split('.');
    return modelName !== 'index' && extension === 'js';
  })
  .forEach(function (file) {
    const model = sequelize['import'](path.join(__dirname, file));
    console.log('[model]', model.name);
    db[model.name] = model;
  });

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize.sync({ force: false })
  .then(() => {
    console.log("Tables created/updated successfully!");
  })
  .catch((error) => {
    console.error("Error creating/updating tables: ", error);
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
