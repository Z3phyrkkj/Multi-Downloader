const request = require('supertest');
const app = require('../../src/app');

describe('API Integration Tests', () => {
  describe('GET /', () => {
    it('should return 200 OK', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
    });
  });

  describe('URL Validation', () => {
    it('should validate Instagram URLs', async () => {
      const response = await request(app)
        .post('/api/ig/download')
        .send({ url: 'invalid-url' });
      expect(response.status).toBe(400);
    });

    it('should validate TikTok URLs', async () => {
      const response = await request(app)
        .post('/api/tiktok/download')
        .send({ url: 'invalid-url' });
      expect(response.status).toBe(400);
    });

    it('should validate Twitter URLs', async () => {
      const response = await request(app)
        .post('/api/twitter/download')
        .send({ url: 'invalid-url' });
      expect(response.status).toBe(400);
    });
  });
});