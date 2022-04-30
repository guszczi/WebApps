const router = require('express').Router();

const db = require('../models/database');
const categories = require('../models/categories');

router.get('/categories', (req, res) => {
    categories.findAll().then(categories => {
        res.send(categories);
    }).catch(err => {
        console.error(err);
        res.status(500).send({ error: "Server error" });
    });
})

module.exports = router;