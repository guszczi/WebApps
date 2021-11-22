const router = require('express').Router();

const db = require('../models/database');
const products = require('../models/products');

router.get('/products', (req, res) => {
    products.findAll().then(products => {
        res.send(products);
    }).catch(err => {
        res.status(500).send({ error: err });
    });
})

router.get('/products/:id', (req, res) => {
    products.findByPk(req.params.id).then(products => {
        res.send(products);
    }).catch(err => {
        res.status(500).send({ error: err });
    });
})

router.post('/products', (req, res) => {
    products.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        weight: req.body.weight,
        category_id: req.body.category_id
    }).then(product => {
        res.send(product);
    }).catch(err => {
        res.status(400).send({ error: err });
    });
})

router.put('/products/:id', (req, res) => {
    console.log(req.params.id);

    products.update(req.body, {
        where: { product_id: req.params.id }
    }).then(num => {
        if (num == 1) {
            res.send({ message: 'Product updated' });
        }
        else {
            res.send({ message: 'Product not found or there is nothing to change' });
        }
    }).catch(err => {
        res.status(500).send({ error: err });
    });
})

module.exports = router;