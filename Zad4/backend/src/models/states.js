const Sequelize = require('sequelize');
const db = require('./database');

const States = db.define('states', {
    state_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: Sequelize.STRING, allowNull: false },
});

States.sync().then(() => {
    States.create({ state_id: 1, name: 'Not accepted' }).catch(err => {});
    States.create({ state_id: 2, name: 'Accepted' }).catch(err => {});
    States.create({ state_id: 3, name: 'Canceled' }).catch(err => {});
    States.create({ state_id: 4, name: 'Completed' }).catch(err => {});
});

module.exports = States;