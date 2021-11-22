const router = require('express').Router();

router.use('/', require('./products'));
router.use('/', require('./categories'));
router.use('/', require('./orders'));

module.exports = router;