/**
 * Multi-Downloader - Gartic Controller
 * Autor: Z3phyrkkj
 * Data: 2025-09-29
 */
const garticService = require('../services/garticService');
const { createResponse, createErrorResponse } = require('../../../utils/responseFormatter');
const logger = require('../../../config/logger');
const { sanitizeString } = require('../../../utils/stringUtils');

class GarticController {
  getHealth(req, res) {
    const stats = garticService.getStats();
    res.json(createResponse({
      status: 'operational',
      server: {
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        node_version: process.version
      },
      data: {
        total_images: stats.total_images,
        used_images: stats.used_images,
        categories: stats.categories.length
      }
    }));
  }

  getImage(req, res) {
    try {
      const { category } = req.query;
      const image = garticService.getRandomImage(category);
      if (!image) {
        return res.status(404).json(createErrorResponse('No images available', 404));
      }
      return res.json(createResponse({
        data: {
          id: image.id,
          url: image.url,
          categoria: image.category,
          respostas_corretas: image.correctAnswers,
          hint: `Categoria: ${image.category}`,
          ...garticService.getStats()
        }
      }));
    } catch (error) {
      logger.error('Error getting image:', error);
      res.status(500).json(createErrorResponse('Internal server error', 500));
    }
  }

  checkAnswer(req, res) {
    try {
      const { imageId, answer } = req.body;
      if (!imageId || !answer) {
        return res.status(400).json(createErrorResponse('imageId and answer are required', 400));
      }
      const result = garticService.checkAnswer(imageId, answer);
      if (!result) {
        return res.status(404).json(createErrorResponse('Image not found', 404));
      }
      return res.json(createResponse({
        data: {
          correto: result.isCorrect,
          resposta_enviada: answer,
          respostas_corretas: result.image.correctAnswers,
          categoria: result.image.category
        }
      }));
    } catch (error) {
      logger.error('Error checking answer:', error);
      res.status(500).json(createErrorResponse('Internal server error', 500));
    }
  }
}

module.exports = new GarticController();