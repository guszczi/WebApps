const router = require('express').Router();

router.use('/', require('./productsRoutes'));
router.use('/', require('./categoriesRoutes'));
router.use('/', require('./statesRoutes'));
router.use('/', require('./ordersRoutes'));

module.exports = router;