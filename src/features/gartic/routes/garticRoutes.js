/**
 * Multi-Downloader - Gartic Routes
 * Autor: Z3phyrkkj
 * Data: 2025-09-29
 */
const express = require('express');
const router = express.Router();
const garticController = require('../controllers/garticController');

router.get('/health', garticController.getHealth);
router.get('/', garticController.getImage);
router.post('/', garticController.checkAnswer);

module.exports = router;