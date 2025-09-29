const express = require('express');
const router = express.Router();
const downloadController = require('../controllers/downloadController');
const { validateUrl } = require('../validators/urlValidator');

router.get('/', validateUrl, (req, res) => 
  downloadController.handleDownload(req, res, 'instagram')
);

module.exports = router;