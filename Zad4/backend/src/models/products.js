const Sequelize = require('sequelize');
const db = require('./database');

const Categories = require('./categories');

const Products = db.define('products', {
    product_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: Sequelize.STRING, allowNull: false, validate: { 
        notEmpty: { args: true, msg: "Name must be a non empty string" }
    }},
    description: { type: Sequelize.STRING, allowNull: false, validate: { 
        notEmpty: { args: true, msg: "Description must be a non empty string" }
    }},
    price: { type: Sequelize.FLOAT, allowNull: false, validate: { 
        isFloat: { args: true, msg: "Price must be an float" },
        min: { args: [0], msg: "Price must be a non negative float" }
    }},
    weight: { type: Sequelize.FLOAT, allowNull: false, validate: {
        isFloat: { args: true, msg: "Weight must be an float" },
        min: { args: [0], msg: "Weight must be a non negative float" }
    }},
    category_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'categories', key: 'category_id' }}
});

Products.belongsTo(Categories, { foreignKey: 'category_id' });

Products.sync();

module.exports = Products;