const router = require('express').Router();

const db = require('../models/database');
const categories = require('../models/categories');

router.get('/categories', (req, res) => {
    categories.findAll().then(categories => {
        res.send(categories);
    }).catch(err => {
        res.status(500).send({ error: err });
    });
})

module.exports = router;