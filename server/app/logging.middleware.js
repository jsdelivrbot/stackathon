'use strict';

var router = require('express').Router();
var morgan = require('morgan');

router.use(morgan('dev'));

module.exports = router;