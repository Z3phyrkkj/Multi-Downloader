const scraperService = require('../services/scraperService');
const errorHandler = require('../utils/errorHandler');
const { createResponse, createErrorResponse } = require('../utils/responseFormatter');
const { validateUrl } = require('../validators/urlValidator');

exports.extractMeta = async (req, res) => {
  try {
    const { url, platform } = req.query;
    if (!url || !validateUrl(url, platform)) {
      return res.status(400).json(createErrorResponse('Invalid or missing url', 400));
    }

    const metaData = await scraperService.extractMeta(url, platform);
    res.json(createResponse({ data: metaData }));
  } catch (error) {
    errorHandler.handleError(res, error, 'meta_extraction');
  }
};
