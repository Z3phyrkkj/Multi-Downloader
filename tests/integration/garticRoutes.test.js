const request = require('supertest');
const app = require('../../src/app');

describe('Gartic Routes', () => {
  test('GET /api/gartic should return 200 and image', async () => {
    const res = await request(app).get('/api/gartic');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('id');
  }, 10000);

  test('POST /api/gartic should validate answer', async () => {
    const getRes = await request(app).get('/api/gartic');
    const imageId = getRes.body.data.id;
    const correctAnswer = getRes.body.data.respostas_corretas ? getRes.body.data.respostas_corretas[0] : null;

    const postRes = await request(app)
      .post('/api/gartic')
      .send({ imageId, answer: correctAnswer });

    expect(postRes.status).toBe(200);
    expect(postRes.body.success).toBe(true);
    expect(typeof postRes.body.data.correto).toBe('boolean');
  }, 10000);
});
