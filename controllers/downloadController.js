const downloaderService = require('../services/downloaderService');
const scraperService = require('../services/scraperService');
const responseFormatter = require('../utils/responseFormatter');
const errorHandler = require('../utils/errorHandler');

/**
 * Controlador responsável por gerenciar downloads de mídia
 */

exports.handleDownload = async (req, res, platform) => {
  try {
    const { url } = req.query;
    
    const [downloadData, metaData] = await Promise.allSettled([
      downloaderService.downloadFromPlatform(url, platform),
      scraperService.extractMeta(url, platform)
    ]);

    const data = downloadData.status === 'fulfilled' ? downloadData.value : {};
    const meta = metaData.status === 'fulfilled' ? metaData.value : {};

    if (data.success && data.data) {
      res.json({
        success: true,
        platform,
        data: data.data,
        criador: data.criador || 'z3phyr'
      });
    } else {
      const result = responseFormatter.formatResponse(data, meta, platform);
      res.json(result);
    }
    
  } catch (error) {
    errorHandler.handleError(res, error, platform);
  }
};