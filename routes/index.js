const express = require('express');
const router = express.Router();

const user = require('./user.routes');
const rent = require('./rent.routes');

router.use('/api/users', user);
router.use('/api/rent', rent);

module.exports = router;