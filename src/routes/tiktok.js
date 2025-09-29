const express = require('express');
const router = express.Router();
const downloadController = require('../controllers/downloadController');
const { validateUrlMiddleware } = require('../validators/urlValidator');

router.get('/', validateUrlMiddleware, (req, res) =>
  downloadController.handleDownload(req, res, 'tiktok')
);

router.post('/download', validateUrlMiddleware, (req, res) =>
  downloadController.handleDownload(req, res, 'tiktok')
);

module.exports = router;