const router = require('express').Router();

const db = require('../models/database');
const Orders = require('../models/orders');
const States = require('../models/states');

const getOrder = (id, res) => {
    Orders.findOne({
        where: { order_id: id },
        attributes: {
            exclude: ['state_id']
        },
        include: [{
            model: States
        }]
    }).then(orders => {
        res.send(orders);
    }).catch(err => {
        console.error(err);
        res.status(500).send({ error: "Server error" });
    });
}

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
    }).catch(err => {
        console.error(err);
        res.status(500).send({ error: "Server error" });
    });
})

router.get('/orders/:id', (req, res) => {
    getOrder(req.params.id, res);
})

router.post('/orders', (req, res) => {
    Orders.create({
        date: req.body.date,
        state_id: req.body.state_id,
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone
    }).then(order => {
        getOrder(order.order_id, res);
    }).catch(err => {
        console.error(err);
        res.status(500).send({ error: "Server error" });
    });
})

// TODO: fix
router.put('/orders/:id/:state', (req, res) => {
    Orders.update({ state_id: req.params.state_id }, {
        where: { order_id: req.params.id }
    }).then(num => {
        if (num == 1) {
            res.send({ message: 'Order updated' });
        }
        else {
            res.send({ message: 'Order not found or there is nothing to change' });
        }
    }).catch(err => {
        console.error(err);
        res.status(500).send({ error: "Server error" });
    });
})

module.exports = router;