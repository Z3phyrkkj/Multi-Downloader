const garticService = require('../../src/features/gartic/services/garticService');

describe('GarticService', () => {
  test('should initialize and provide stats', () => {
    const stats = garticService.getStats();
    expect(stats.total_images).toBeGreaterThan(0);
    expect(Array.isArray(stats.categories)).toBe(true);
  });

  test('getRandomImage returns an image object', () => {
    const image = garticService.getRandomImage();
    expect(image).toHaveProperty('id');
    expect(image).toHaveProperty('url');
  });

  test('checkAnswer returns correct boolean for known answer', () => {
    const image = garticService.getRandomImage();
    const correct = image.correctAnswers[0];
    const result = garticService.checkAnswer(image.id, correct);
    expect(result).not.toBeNull();
    expect(result.isCorrect).toBe(true);
  });
});
