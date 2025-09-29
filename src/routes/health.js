const express = require('express');
const router = express.Router();
const { createResponse } = require('../utils/responseFormatter');

router.get('/', (req, res) => {
  const uptime = process.uptime();
  const mem = process.memoryUsage();
  res.json(createResponse({
    status: 'operational',
    server: {
      uptime,
      memory: mem,
      node_version: process.version
    }
  }));
});

module.exports = router;
