const Sequelize = require('sequelize');

const router = require('express').Router();

const db = require('../models/database');
const Products = require('../models/products');

const Categories = require('../models/categories');

const getProduct = (id, res) => {
    Products.findOne({
        attributes: {
            exclude: ['category_id']
        },
        where: { product_id: id },
        include: [{
            model: Categories,
        }]
    }).then(products => {
        res.send(products);
    }).catch(err => {
        console.error(err);
        res.status(500).send({ error: "Server error" });
    });
}

router.get('/products', (req, res) => {
    Products.findAll({
        attributes: {
            exclude: ['category_id']
        },
        include: [{
            model: Categories,
        }]
    }).then(products => {
        res.send(products);
    }).catch(err => {
        console.error(err);
        res.status(500).send({ error: "Server error" });
    });
})

router.get('/products/:id', (req, res) => {
    getProduct(req.params.id, res);
})

router.post('/products', (req, res) => {
    Products.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        weight: req.body.weight,
        category_id: req.body.category_id
    }).then(product => {
        getProduct(product.product_id, res);
    }).catch(err => {
        if (err instanceof Sequelize.ForeignKeyConstraintError) {
            res.status(400).send({ error: `Category with id=${req.body.category_id} does not exist` });
            return;
        }
        else if (err instanceof Sequelize.ValidationError) {
            res.status(400).send({ error: err.errors[0].message });
            return;
        }

        console.error(err);
        res.status(500).send({ error: "Server error" });
    });
})

router.put('/products/:id', (req, res) => {
    Products.update(req.body, {
        where: { product_id: req.params.id }
    }).then(num => {
        if (num == 1) {
            getProduct(req.params.id, res);
        }
        else {
            res.send({ message: 'Product not found or there is nothing to change' });
        }
    }).catch(err => {
        if (err instanceof Sequelize.ForeignKeyConstraintError) {
            res.status(400).send({ error: `Category with id=${req.body.category_id} does not exist` });
            return;
        }
        else if (err instanceof Sequelize.ValidationError) {
            res.status(400).send({ error: err.errors[0].message });
            return;
        }
        
        console.error(err);
        res.status(500).send({ error: "Server error" });
    });
})

module.exports = router;