/**
 * Multi-Downloader - Validador de URLs
 * Autor: Z3phyrkkj
 * Data: 2025-09-29
 */

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

const platformDomains = {
  instagram: ['instagram.com'],
  tiktok: ['tiktok.com'],
  twitter: ['twitter.com', 'x.com']
};

const matchesDomain = (hostname, domain) => {
  if (!hostname || !domain) return false;
  hostname = hostname.toLowerCase();
  domain = domain.toLowerCase();
  return hostname === domain || hostname.endsWith(`.${domain}`);
};

const validateForPlatform = (url, platform) => {
  if (!url || !isValidUrl(url)) return false;
  if (!platform) return true;
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname;
    const domains = platformDomains[platform.toLowerCase()];
    if (!domains) return true;
    return domains.some(domain => matchesDomain(hostname, domain));
  } catch (e) {
    return false;
  }
};

const validateUrl = (reqOrUrl, maybePlatform) => {
  if (typeof reqOrUrl === 'object' && reqOrUrl !== null && reqOrUrl.method) {
    return (req2, res2, next) => next();
  }
  const url = reqOrUrl;
  const platform = maybePlatform;
  return validateForPlatform(url, platform);
};

const validateUrlMiddleware = (req, res, next) => {
  const url = req.query.url || (req.body && req.body.url);
  const platform = req.params.platform || req.query.platform;
  if (!url) {
    return res.status(400).json({ success: false, error: 'URL obrigatória' });
  }
  if (!validateForPlatform(url, platform)) {
    return res.status(400).json({ success: false, error: 'URL inválida para a plataforma' });
  }
  next();
};

const validateUrlHelper = (u, platform) => validateForPlatform(u, platform);
validateUrlHelper.instagram = (u) => validateForPlatform(u, 'instagram');
validateUrlHelper.tiktok = (u) => validateForPlatform(u, 'tiktok');
validateUrlHelper.twitter = (u) => validateForPlatform(u, 'twitter');

module.exports = {
  isValidUrl,
  validateForPlatform,
  validateUrlMiddleware,
  validateUrl: validateUrlHelper
};