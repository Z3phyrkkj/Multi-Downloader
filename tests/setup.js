const dotenv = require('dotenv');

/**
 * Multi-Downloader - Test Setup
 * Autor: Z3phyrkkj
 * Data: 2025-09-29
 */
const dotenv = require('dotenv');
dotenv.config({ path: '.env.test' });
process.env.NODE_ENV = 'test';
process.env.PORT = 3001;

global.beforeAll(async () => {
});

global.afterAll(async () => {
});