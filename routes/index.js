const express = require('express'); //eslint-disable-line
const router = require('express-promise-router')();
const telegram = require('./telegram');

router.route('/telegram').get(telegram);

module.exports = router;
