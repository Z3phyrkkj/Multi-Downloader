/**
 * Controlador responsável por extrair metadados de URLs
 */

const scraperService = require('../services/scraperService');
const errorHandler = require('../utils/errorHandler');

exports.extractMeta = async (req, res) => {
  try {
    const { url, platform } = req.query;
    const metaData = await scraperService.extractMeta(url, platform);
    res.json({ success: true, data: metaData });
  } catch (error) {
    errorHandler.handleError(res, error, 'meta_extraction');
  }
};