const Sequelize = require('sequelize');
const db = require('./database');

const Categories = db.define('categories', {
    category_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: Sequelize.STRING, allowNull: false },
});

Categories.sync().then(() => {
    Categories.create({ category_id: 1, name: 'Graphic cards' }).catch(err => {});
    Categories.create({ category_id: 2, name: 'Motherboards' }).catch(err => {});
    Categories.create({ category_id: 3, name: 'CPUs' }).catch(err => {});
    Categories.create({ category_id: 4, name: 'RAM' }).catch(err => {});
    Categories.create({ category_id: 5, name: 'Power supplies' }).catch(err => {});
    Categories.create({ category_id: 6, name: 'Hard drives' }).catch(err => {});
    Categories.create({ category_id: 7, name: 'Monitors' }).catch(err => {});
    Categories.create({ category_id: 8, name: 'Keyboards' }).catch(err => {});
    Categories.create({ category_id: 9, name: 'Mouse' }).catch(err => {});
    Categories.create({ category_id: 10, name: 'Cases' }).catch(err => {});
    Categories.create({ category_id: 11, name: 'CPU Coolers' }).catch(err => {});
});

module.exports = Categories;