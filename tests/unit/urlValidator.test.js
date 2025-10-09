const { validateUrl } = require('../../src/validators/urlValidator');

describe('URL Validator', () => {
  describe('Instagram URLs', () => {
    it('should validate correct Instagram URLs', () => {
      const url = 'https://www.instagram.com/p/ABC123/';
      expect(validateUrl.instagram(url)).toBe(true);
    });

    it('should reject invalid Instagram URLs', () => {
      const url = 'https://invalid-instagram.com/p/ABC123/';
      expect(validateUrl.instagram(url)).toBe(false);
    });
  });

  describe('TikTok URLs', () => {
    it('should validate correct TikTok URLs', () => {
      const url = 'https://www.tiktok.com/@user/video/1234567890';
      expect(validateUrl.tiktok(url)).toBe(true);
    });

    it('should reject invalid TikTok URLs', () => {
      const url = 'https://invalid-tiktok.com/@user/video/1234567890';
      expect(validateUrl.tiktok(url)).toBe(false);
    });
  });

  describe('Twitter URLs', () => {
    it('should validate correct Twitter URLs', () => {
      const url = 'https://twitter.com/user/status/1234567890';
      expect(validateUrl.twitter(url)).toBe(true);
    });

    it('should reject invalid Twitter URLs', () => {
      const url = 'https://invalid-twitter.com/user/status/1234567890';
      expect(validateUrl.twitter(url)).toBe(false);
    });
  });
});