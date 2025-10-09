const downloaderService = require('../services/downloaderService');
const scraperService = require('../services/scraperService');
const analytics = require('../services/analyticsService');
const { createResponse, createErrorResponse, formatResponse } = require('../utils/responseFormatter');
const errorHandler = require('../utils/errorHandler');
const { validateUrl } = require('../validators/urlValidator');

exports.handleDownload = async (req, res, platform) => {
  try {
    const url = req.query?.url || req.body?.url;
    if (!url || !validateUrl[platform]?.(url)) {
      return res.status(400).json(createErrorResponse('Invalid or missing url', 400));
    }

    const [downloadDataResult, metaDataResult] = await Promise.allSettled([
      downloaderService.downloadFromPlatform(url, platform),
      scraperService.extractMeta(url, platform)
    ]);

    const downloadData = downloadDataResult.status === 'fulfilled' ? downloadDataResult.value : {};
    const metaData = metaDataResult.status === 'fulfilled' ? metaDataResult.value : {};

    if (downloadData.success && downloadData.data) {
      analytics.trackDownload(platform, url, true, { metadata: metaData });
      return res.json(createResponse({ platform, data: downloadData.data, criador: downloadData.criador || 'z3phyr' }));
    }

    analytics.trackDownload(platform, url, false, { error: downloadData.error });
    const result = formatResponse(downloadData, metaData, platform);
    return res.json(result);
  } catch (error) {
    analytics.trackError(error, { platform, url });
    errorHandler.handleError(res, error, platform);
  }
};
