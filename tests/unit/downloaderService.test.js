const downloader = require('../../src/services/downloaderService');

describe('downloaderService formatters', () => {
  test('formatDownloadResponse handles array input', () => {
    const input = [{ url: 'https://example.com/video.mp4' }];
    const out = downloader.formatDownloadResponse(input, 'instagram');
    expect(out.success).toBe(true);
    expect(Array.isArray(out.data)).toBe(true);
    expect(out.data[0].url).toBe(input[0].url);
  });

  test('formatTikTokResponse handles rawResponse with video/audio', () => {
    const data = {
      rawResponse: {
        video: ['https://tiktok/video1.mp4'],
        audio: ['https://tiktok/audio1.mp3'],
        thumbnail: 'https://tiktok/thumb.jpg',
        title: 'Test'
      }
    };

    const out = downloader.formatTikTokResponse(data);
    expect(out.success).toBe(true);
    expect(out.data.length).toBeGreaterThanOrEqual(2);
    const urls = out.data.map((d) => d.url);
    expect(urls).toContain('https://tiktok/video1.mp4');
    expect(urls).toContain('https://tiktok/audio1.mp3');
  });
});
