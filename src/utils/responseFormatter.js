const durationParser = require('../services/durationParser');

/**
 * Utilitário para formatar respostas da API de maneira consistente
 */

const createResponse = (data, success = true) => ({
  creator: 'Mkg',
  success,
  timestamp: new Date().toISOString(),
  ...data
});

const createErrorResponse = (message, code = 400, details = null) => ({
  creator: 'Mkg',
  success: false,
  error: { message, code, details },
  timestamp: new Date().toISOString()
});

exports.createResponse = createResponse;
exports.createErrorResponse = createErrorResponse;

exports.formatResponse = (downloadData, metaData, platform) => {
  if (downloadData.success && downloadData.data) {
    return {
      success: true,
      platform,
      data: downloadData.data,
      criador: downloadData.criador || 'z3phyr'
    };
  }

  const result = {
    success: true,
    platform,
    data: {
      title: metaData.title || downloadData.title || downloadData.desc || 'Sem título',
      author: metaData.author || downloadData.author || downloadData.username || downloadData.owner || 'Desconhecido',
      duration: downloadData.duration || durationParser.parseVideoDuration(downloadData.videoDuration) || null,
      thumbnail: metaData.thumbnail || downloadData.thumbnail || downloadData.cover || null,
      urls: []
    }
  };

  this.extractUrls(result.data, downloadData, platform);

  return result;
};

exports.extractUrls = (resultData, downloadData, platform) => {
  if (platform === 'tiktok' && downloadData.rawResponse) {
    const raw = downloadData.rawResponse;
    
    if (raw.video && Array.isArray(raw.video)) {
      raw.video.forEach((url, index) => {
        resultData.urls.push({
          quality: index === 0 ? 'HD' : `Quality ${index + 1}`,
          url: url,
          type: 'video'
        });
      });
    }
    
    if (raw.audio && Array.isArray(raw.audio)) {
      raw.audio.forEach((url, index) => {
        resultData.urls.push({
          quality: 'Áudio',
          url: url,
          type: 'audio'
        });
      });
    }
    return;
  }

  if (downloadData.url) {
    resultData.urls.push({ 
      quality: downloadData.quality || 'HD', 
      url: downloadData.url, 
      type: downloadData.type || 'video' 
    });
  }
  
  if (downloadData.medias && Array.isArray(downloadData.medias)) {
    resultData.urls = downloadData.medias.map(m => ({
      quality: m.quality || m.resolution || 'HD',
      url: m.url,
      type: m.type || 'video'
    }));
  }
  
  if (downloadData.video && Array.isArray(downloadData.video)) {
    resultData.urls = downloadData.video.map(v => ({
      quality: v.quality || 'HD',
      url: v.url,
      type: 'video'
    }));
  }

  if (downloadData.download && typeof downloadData.download === 'string') {
    resultData.urls.push({ 
      quality: 'HD', 
      url: downloadData.download, 
      type: 'video' 
    });
  }

  if (downloadData.data && Array.isArray(downloadData.data)) {
    resultData.urls = downloadData.data.map(d => ({
      quality: d.quality || 'HD',
      url: d.url || d.download,
      type: d.type || 'video'
    }));
  }
};