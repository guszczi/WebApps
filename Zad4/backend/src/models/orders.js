const Sequelize = require('sequelize');
const db = require('./database');

const States = require('./states');

const Orders = db.define('orders', {
    order_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    date: { type: Sequelize.STRING, allowNull: true },
    state_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'states', key: 'state_id' } },
    username: { type: Sequelize.STRING, allowNull: false },
    email: { type: Sequelize.STRING, allowNull: false, validate: { isEmail: true } },
    phone: { type: Sequelize.STRING, allowNull: false },
});

Orders.belongsTo(States, { foreignKey: 'state_id' });

Orders.sync();

module.exports = Orders;