const Sequelize = require('sequelize');
const db = require('./database');

const Categories = require('./categories');

const Products = db.define('products', {
    product_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: Sequelize.STRING, allowNull: false },
    description: { type: Sequelize.STRING, allowNull: false },
    price: { type: Sequelize.FLOAT, allowNull: false },
    weight: { type: Sequelize.FLOAT, allowNull: false },
    category_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'categories', key: 'category_id' }}
});

Products.belongsTo(Categories, { foreignKey: 'category_id' });

Products.sync();

module.exports = Products;