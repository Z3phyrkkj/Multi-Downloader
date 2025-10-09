const { igdl, ttdl, twitter } = require('aetherz-downloader');

class DownloadError extends Error {
  constructor(message, status = 502, internal = true) {
    super(message);
    this.status = status;
    this.internal = internal;
  }
}

class ResponseFormatter {
  static DEFAULT_AUTHOR = 'Mkg';
  static DEFAULT_QUALITY = 'HD';
  static DEFAULT_TYPE = 'video';

  static formatStandardMedia(data) {
    return {
      url: data.url,
      thumbnail: data.thumbnail,
      quality: data.quality || this.DEFAULT_QUALITY,
      type: data.type || this.DEFAULT_TYPE,
      title: data.title,
      author: data.author
    };
  }

  static formatTikTokVideo(videoUrl, raw, index = 0) {
    return {
      url: videoUrl,
      thumbnail: raw.thumbnail,
      quality: index === 0 ? this.DEFAULT_QUALITY : `Quality ${index + 1}`,
      type: this.DEFAULT_TYPE,
      title: raw.title,
      author: 'Mkg'
    };
  }

  static formatTikTokAudio(audioUrl, raw) {
    return {
      url: audioUrl,
      thumbnail: raw.thumbnail,
      quality: 'Áudio',
      type: 'audio',
      title: raw.title_audio || raw.title,
      author: 'Mkg'
    };
  }

  static formatSuccess(data, creator, metrics = {}) {
    return {
      success: true,
      data,
      criador: creator || this.DEFAULT_AUTHOR,
      metrics
    };
  }

  static formatError(message, metrics = {}) {
    return {
      success: false,
      data: [],
      error: message,
      metrics
    };
  }
}

class DownloaderService {
  static downloaders = {
    instagram: igdl,
    tiktok: ttdl,
    twitter
  };

  static validateUrl(url) {
    if (!url || typeof url !== 'string') {
      throw new DownloadError('URL inválida', 400);
    }
  }

  static getDownloader(platform) {
    const downloader = this.downloaders[platform];
    if (!downloader) {
      throw new DownloadError(`Plataforma não suportada: ${platform}`, 400);
    }
    return downloader;
  }

  static formatStandardResponse(data, metrics = {}) {
    if (data?.data && Array.isArray(data.data)) {
      return ResponseFormatter.formatSuccess(data.data, data.criador, metrics);
    }
    if (data?.medias && Array.isArray(data.medias)) {
      return ResponseFormatter.formatSuccess(data.medias, data.author, metrics);
    }
    if (Array.isArray(data)) {
      return ResponseFormatter.formatSuccess(data, undefined, metrics);
    }
    if (data?.url) {
      return ResponseFormatter.formatSuccess(
        [ResponseFormatter.formatStandardMedia(data)],
        data.author,
        metrics
      );
    }
    return ResponseFormatter.formatError('Formato de resposta não reconhecido', metrics);
  }

  static formatTikTokResponse(data, metrics = {}) {
    if (data?.rawResponse) {
      const raw = data.rawResponse;
      const result = { success: true, data: [], metrics };
      if (raw.video?.length) {
        raw.video.forEach((videoUrl, index) => {
          result.data.push(ResponseFormatter.formatTikTokVideo(videoUrl, raw, index));
        });
      }
      if (raw.audio?.length) {
        raw.audio.forEach(audioUrl => {
          result.data.push(ResponseFormatter.formatTikTokAudio(audioUrl, raw));
        });
      }
      if (!result.data.length && data.url) {
        result.data.push(ResponseFormatter.formatStandardMedia({
          url: data.url,
          thumbnail: data.thumbnail || raw.thumbnail,
          title: raw.title || data.title,
          author: 'Mkg'
        }));
      }
      result.criador = 'Mkg';
      return result;
    }
    if (data?.video?.length) {
      return ResponseFormatter.formatSuccess(
        data.video.map(video => ResponseFormatter.formatStandardMedia({
          url: typeof video === 'string' ? video : video.url,
          thumbnail: data.thumbnail,
          title: data.title,
          author: 'Mkg'
        })),
        data.creator || data.criador,
        metrics
      );
    }
    if (data?.url) {
      return ResponseFormatter.formatSuccess(
        [ResponseFormatter.formatStandardMedia(data)],
        'Mkg',
        metrics
      );
    }
    return ResponseFormatter.formatError('Formato de resposta do TikTok não reconhecido', metrics);
  }

  static async downloadFromPlatform(url, platform) {
    this.validateUrl(url);
    const downloader = this.getDownloader(platform);
    const start = Date.now();
    try {
      const result = await downloader(url);
      const elapsed = Date.now() - start;
      const metrics = { download_time_ms: elapsed };
      return platform === 'tiktok'
        ? this.formatTikTokResponse(result, metrics)
        : this.formatStandardResponse(result, metrics);
    } catch (err) {
      const elapsed = Date.now() - start;
      throw new DownloadError(err.message || 'Erro ao baixar mídia', 502, true, { download_time_ms: elapsed });
    }
  }
}

module.exports = DownloaderService;
