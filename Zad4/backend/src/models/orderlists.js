const Sequelize = require('sequelize');
const db = require('./database');

const Orders = require('./orders');
const Products = require('./products');

const OrderLists = db.define('order_lists', {
    order_list_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    order_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'orders', key: 'order_id' } },
    product_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'products', key: 'product_id' } },
    quantity: { type: Sequelize.INTEGER, allowNull: false },
});

OrderLists.belongsTo(Products, { foreignKey: 'product_id' });

OrderLists.sync();

module.exports = OrderLists;