const Sequelize = require('sequelize');

const router = require('express').Router();

const cors = require('cors');
const corsOptions = require('../util/corsOptions');

const db = require('../models/database');
const Orders = require('../models/orders');
const States = require('../models/states');
const OrderLists = require('../models/orderlists');

const getOrder = (id, res) => {
    Orders.findOne({
        where: { order_id: id },
        attributes: {
            exclude: ['state_id']
        },
        include: [{
            model: States
        }, {
            model: OrderLists
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
        }, {
            model: OrderLists
        }]
    }).then(orders => {
        res.send(orders);
    }).catch(err => {
        console.error(err);
        res.status(500).send({ error: "Server error" });
    });
});

router.get('/orders/:id', (req, res) => {
    getOrder(req.params.id, res);
});

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
});

router.put('/orders/:id/:state/', (req, res) => {
    Orders.findOne({ where: { order_id: req.params.id }}).then(order => { 

        if (!order) {
            res.status(404).send({ error: "Order does not exist" });
            return;
        }

        if (order.state_id === 3) {
            res.status(400).send({ error: "Order has been canceled - cannot change state!" });
            return;
        }

        if (req.params.state < order.state_id) {
            res.status(400).send({ error: "Order state cannot be changed to previous one!" });
            return;
        }

        Orders.update({ state_id: req.params.state }, {
            where: { order_id: req.params.id }
        }).then(num => {
            if (num == 1) {
                getOrder(req.params.id, res);
            }
            else {
                res.send({ message: 'Order not found or there is nothing to change' });
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
    }).catch(err => {
        console.error(err);
        res.status(500).send({ error: "Server error" });
    });
});

router.post('/orders/:id/', (req, res) => {
    OrderLists.create({
        order_id: req.params.id,
        product_id: req.body.product_id,
        quantity: req.body.quantity
    }).then(order => {
        getOrder(req.params.id, res);
    }).catch(err => {
        if (err instanceof Sequelize.ForeignKeyConstraintError) {
            if (err.index === "order_lists_ibfk_2") {
                res.status(400).send({ error: `Product with id=${req.body.product_id} does not exist` });
            }
            else {
                res.status(400).send({ error: `Order with id=${req.params.id} does not exist` });
            }
            return;
        }
        else if (err instanceof Sequelize.ValidationError) {
            res.status(400).send({ error: err.errors[0].message });
            return;
        }

        console.error(err);
        res.status(500).send({ error: "Server error" });
    });
});

router.put('/orders/:id/', cors(corsOptions), (req, res) => {
    Orders.findOne({ where: { order_id: req.params.id }}).then(order => { 

        if (!order) {
            res.status(404).send({ error: "Order does not exist" });
            return;
        }

        Orders.update({ state_id: req.body.state }, {
            where: { order_id: req.params.id }
        }).then(num => {
            if (num == 1) {
                getOrder(req.params.id, res);
            }
            else {
                res.send({ message: 'Order not found or there is nothing to change' });
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
    }).catch(err => {
        console.error(err);
        res.status(500).send({ error: "Server error" });
    });
});

module.exports = router;