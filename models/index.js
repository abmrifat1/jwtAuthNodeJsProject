const config = require('../config/db.config');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require('./user.model')(sequelize, Sequelize);
db.rent = require('./rent.model')(sequelize, Sequelize);

db.user.hasMany(db.rent, {foreignKey: 'userId', as: 'rentList'});
db.rent.belongsTo(db.user, {foreignKey: 'userId', targetKey: 'ownerId'});

module.exports = db;
