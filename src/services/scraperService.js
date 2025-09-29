/**
 * Serviço responsável por extrair metadados de páginas web
 */

const axios = require('axios');
const cheerio = require('cheerio');
const apiConfig = require('../config/apiConfig');

exports.extractMeta = async (url, platform) => {
  const scrapers = {
    instagram: this.extractInstagramMeta,
    tiktok: this.extractTikTokMeta,
    twitter: this.extractTwitterMeta
  };

  const scraper = scrapers[platform] || this.extractGenericMeta;
  return await scraper(url);
};

exports.extractInstagramMeta = async (url) => {
  try {
    const { data } = await axios.get(url, { headers: apiConfig.headers });
    const $ = cheerio.load(data);
    
    const metaTitle = $('meta[property="og:title"]').attr('content') || '';
    const metaDescription = $('meta[property="og:description"]').attr('content') || '';
    const thumbnail = $('meta[property="og:image"]').attr('content');
    
    const author = metaTitle.split(' on Instagram')[0] || metaTitle.split('•')[0].trim();
    const title = metaDescription.substring(0, 100);
    
    return { author, title, thumbnail };
  } catch {
    return { author: null, title: null, thumbnail: null };
  }
};

exports.extractTikTokMeta = async (url) => {
  try {
    const { data } = await axios.get(url, { headers: apiConfig.headers });
    const $ = cheerio.load(data);
    
    const author = $('meta[name="twitter:creator"]').attr('content')?.replace('@', '') ||
                   $('meta[property="og:title"]').attr('content')?.split('|')[0].trim();
    const title = $('meta[property="og:title"]').attr('content')?.split('|')[1]?.trim() ||
                  $('meta[property="og:description"]').attr('content');
    const thumbnail = $('meta[property="og:image"]').attr('content');
    
    return { author, title, thumbnail };
  } catch {
    return { author: null, title: null, thumbnail: null };
  }
};

exports.extractTwitterMeta = async (url) => {
  try {
    const { data } = await axios.get(url, { headers: apiConfig.headers });
    const $ = cheerio.load(data);
    
    const author = $('meta[property="og:site_name"]').attr('content') ||
                   $('meta[name="twitter:creator"]').attr('content')?.replace('@', '');
    const title = $('meta[property="og:description"]').attr('content') ||
                  $('meta[name="twitter:description"]').attr('content');
    const thumbnail = $('meta[property="og:image"]').attr('content');
    
    return { author, title, thumbnail };
  } catch {
    return { author: null, title: null, thumbnail: null };
  }
};

exports.extractGenericMeta = async (url) => {
  try {
    const { data } = await axios.get(url, { headers: apiConfig.headers });
    const $ = cheerio.load(data);
    
    const author = $('meta[property="og:site_name"]').attr('content') || null;
    const title = $('meta[property="og:title"]').attr('content') ||
                  $('meta[property="og:description"]').attr('content') || null;
    const thumbnail = $('meta[property="og:image"]').attr('content') || null;
    
    return { author, title, thumbnail };
  } catch {
    return { author: null, title: null, thumbnail: null };
  }
};