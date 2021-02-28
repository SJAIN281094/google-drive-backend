const express = require('express');
const router = express.Router();

const folder = require('./folder');
const file = require('./file');

/* Application Routes */
router.use('/folder', folder);
router.use('/file', file);

module.exports = router;
