const dotenv = require('dotenv');

/**
 * Multi-Downloader - Test Setup
 * Autor: Z3phyrkkj
 * Data: 2025-09-29
 */
<<<<<<< HEAD
=======
const dotenv = require('dotenv');
>>>>>>> dcc6880abe550e5ed61fbba79edbf64995e852db
dotenv.config({ path: '.env.test' });
process.env.NODE_ENV = 'test';
process.env.PORT = 3001;

global.beforeAll(async () => {
});

global.afterAll(async () => {
});