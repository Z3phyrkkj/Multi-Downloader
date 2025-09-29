const { igdl, ttdl, twitter } = require('aetherz-downloader');

/**
 * Serviço responsável por fazer download de mídia de diferentes plataformas
 */

exports.downloadFromPlatform = async (url, platform) => {
  const downloaders = {
    instagram: igdl,
    tiktok: ttdl,
    twitter: twitter
  };

  const downloader = downloaders[platform];
  if (!downloader) {
    throw new Error(`Plataforma não suportada: ${platform}`);
  }

  const result = await downloader(url);
  return this.formatDownloadResponse(result, platform);
};

exports.formatDownloadResponse = (data, platform) => {
  if (platform === 'tiktok') {
    return this.formatTikTokResponse(data);
  }

  if (data && data.data && Array.isArray(data.data)) {
    return {
      success: true,
      data: data.data,
      criador: data.criador || 'Mkg'
    };
  }

  if (data && data.medias && Array.isArray(data.medias)) {
    return {
      success: true,
      data: data.medias,
      criador: data.author || 'Mkg'
    };
  }

  if (Array.isArray(data)) {
    return {
      success: true,
      data: data,
      criador: 'Mkgr'
    };
  }

  if (data && data.url) {
    return {
      success: true,
      data: [{
        url: data.url,
        thumbnail: data.thumbnail,
        quality: data.quality || 'HD',
        type: data.type || 'video'
      }],
      criador: data.author || 'Mkg'
    };
  }

  return {
    success: false,
    data: [],
    error: 'Formato de resposta não reconhecido'
  };
};

exports.formatTikTokResponse = (data) => {
  if (data && data.rawResponse) {
    const raw = data.rawResponse;
    const result = {
      success: true,
      data: []
    };

    if (raw.video && Array.isArray(raw.video)) {
      raw.video.forEach((videoUrl, index) => {
        result.data.push({
          url: videoUrl,
          thumbnail: raw.thumbnail,
          quality: index === 0 ? 'HD' : `Quality ${index + 1}`,
          type: 'video',
          title: raw.title,
          author: raw.creator || 'TikTok User'
        });
      });
    }

    if (raw.audio && Array.isArray(raw.audio)) {
      raw.audio.forEach((audioUrl, index) => {
        result.data.push({
          url: audioUrl,
          thumbnail: raw.thumbnail,
          quality: 'Áudio',
          type: 'audio',
          title: raw.title_audio || raw.title,
          author: raw.creator || 'TikTok User'
        });
      });
    }

    if (result.data.length === 0) {
      if (data.url) {
        result.data.push({
          url: data.url,
          thumbnail: data.thumbnail || raw.thumbnail,
          quality: 'HD',
          type: 'video',
          title: raw.title || data.title,
          author: raw.creator || data.author || 'TikTok User'
        });
      }
    }

    result.criador = raw.creator || data.criador || 'Mkg';
    return result;
  }

  if (data && data.video && Array.isArray(data.video)) {
    return {
      success: true,
      data: data.video.map(video => ({
        url: typeof video === 'string' ? video : video.url,
        thumbnail: data.thumbnail,
        quality: 'HD',
        type: 'video',
        title: data.title,
        author: data.creator || data.author
      })),
      criador: data.creator || data.criador || 'Mkg'
    };
  }

  if (data && data.url) {
    return {
      success: true,
      data: [{
        url: data.url,
        thumbnail: data.thumbnail,
        quality: 'HD',
        type: 'video',
        title: data.title,
        author: data.creator || data.author
      }],
      criador: data.creator || data.criador || 'Mkg'
    };
  }

  return {
    success: false,
    data: [],
    error: 'Formato de resposta do TikTok não reconhecido'
  };
};