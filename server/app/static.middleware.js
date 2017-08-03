'use strict';
const express = require('express');
const router = require('express').Router();
const path = require('path');

var rootPath = path.join(__dirname, '..', '..');
const publicPath = path.join(rootPath, 'public');
const nodeModulesPath = path.join(rootPath, 'node_modules');

router.use(express.static(publicPath));
router.use(express.static(nodeModulesPath));

module.exports = router;