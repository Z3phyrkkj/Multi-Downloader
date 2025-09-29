/**
 * Multi-Downloader - Gartic Service
 * Autor: Z3phyrkkj
 * Data: 2025-09-29
 */
const fs = require('fs');
const path = require('path');

class GarticService {
  constructor() {
    this.imagesData = null;
    this.usedImages = [];
    this.initializeData();
  }

  initializeData() {
    try {
      const dataPath = path.join(__dirname, '..', 'data', 'images.json');
      if (!fs.existsSync(dataPath)) {
        throw new Error('Data file not found');
      }
      this.imagesData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
      if (!this.imagesData?.images?.length) {
        throw new Error('Invalid data structure');
      }
    } catch (error) {
      console.error('Failed to initialize data:', error.message);
      process.exit(1);
    }
  }

  normalizeText(text) {
    return text?.toString()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim() || '';
  }

  getRandomImage(categoryFilter = null) {
    const filteredImages = categoryFilter
      ? this.imagesData.images.filter(img => this.normalizeText(img.category) === this.normalizeText(categoryFilter))
      : this.imagesData.images;

    if (!filteredImages.length) return null;

    let availableImages = filteredImages.filter(img => !this.usedImages.includes(img.id));
    
    if (!availableImages.length) {
      this.usedImages = this.usedImages.filter(id => !filteredImages.some(img => img.id === id));
      availableImages = [...filteredImages];
    }

    const selectedImage = availableImages[Math.floor(Math.random() * availableImages.length)];
    this.usedImages.push(selectedImage.id);
    return selectedImage;
  }

  checkAnswer(imageId, answer) {
    const image = this.imagesData.images.find(img => img.id === imageId);
    if (!image) return null;

    const normalizedAnswer = this.normalizeText(answer);
    const isCorrect = image.correctAnswers.some(correctAnswer =>
      this.normalizeText(correctAnswer) === normalizedAnswer
    );

    return {
      isCorrect,
      image
    };
  }

  getStats() {
    return {
      total_images: this.imagesData?.images?.length || 0,
      used_images: this.usedImages.length,
      categories: this.imagesData?.images 
        ? [...new Set(this.imagesData.images.map(img => img.category))]
        : []
    };
  }
}

module.exports = new GarticService();