const router = require('express').Router();

const db = require('../models/database');
const Orders = require('../models/orders');
const States = require('../models/states');

router.get('/orders', (req, res) => {
    Orders.findAll({
        attributes: {
            exclude: ['state_id']
        },
        include: [{
            model: States
        }]
    }).then(orders => {
        res.send(orders);
    })//.catch(err => {
    //    res.status(500).send({ error: err });
    //});
})

router.get('/orders/:id', (req, res) => {
    Orders.findAll({
        where: { order_id: req.params.id }
    }).then(orders => {
        res.send(orders);
    }).catch(err => {
        res.status(500).send({ error: err });
    });
})

router.get('/orders/:id/:state', (req, res) => {
    Orders.findAll({
        where: { order_id: req.params.id, state: req.params.state }
    }).then(orders => {
        res.send(orders);
    }).catch(err => {
        res.status(500).send({ error: err });
    });
})

router.post('/orders', (req, res) => {
    Orders.create({
        date: req.body.date,
        state_id: req.body.state_id,
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone
    }).then(order => {
        res.send(order);
    }).catch(err => {
        res.status(400).send({ error: err });
    });
})

router.put('/orders/:id/:state', (req, res) => {
    Orders.update({ state: req.params.state }, {
        where: { order_id: req.params.id }
    }).then(num => {
        if (num == 1) {
            res.send({ message: 'Order updated' });
        }
        else {
            res.send({ message: 'Order not found or there is nothing to change' });
        }
    }).catch(err => {
        res.status(500).send({ error: err });
    });
})

module.exports = router;