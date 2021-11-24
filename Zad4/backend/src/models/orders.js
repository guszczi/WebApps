const Sequelize = require('sequelize');
const db = require('./database');

const States = require('./states');

const Orders = db.define('orders', {
    order_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    date: { type: Sequelize.DATE, allowNull: true, validate: {
        isDate: { args: true, msg: 'Date must be in format YYYY-MM-DD' }
    }},
    state_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'states', key: 'state_id' } },
    username: { type: Sequelize.STRING, allowNull: false, validate: {
        notEmpty: { args: true, msg: 'Username cannot be empty' },
        isAlphanumeric: { args: true, msg: 'Username must be alphanumeric' }
    }},
    email: { type: Sequelize.STRING, allowNull: false, validate: { 
        notEmpty: { args: true, msg: 'Email cannot be empty' },
        isEmail: { args: true, msg: 'Email must be a valid email' }
    }},
    phone: { type: Sequelize.STRING, allowNull: false, validate: {
        notEmpty: { args: false, msg: 'Phone number cannot be empty' },
        is: { args: /^\d{9}$/, msg: 'Phone number must be a valid phone number' }
    }},
});

Orders.belongsTo(States, { foreignKey: 'state_id' });

Orders.sync();

module.exports = Orders;