const router = require('express').Router();

const db = require('../models/database');
const states = require('../models/states');

router.get('/states', (req, res) => {
    states.findAll().then(states => {
        res.send(states);
    }).catch(err => {
        console.error(err);
        res.status(500).send({ error: "Server error" });
    });
})

module.exports = router;