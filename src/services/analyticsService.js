const axios = require('axios');
const logger = require('../config/logger');

class AnalyticsService {
    constructor() {
        this.webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    }

    async track(event, data) {
        if (!this.webhookUrl) return;

        const payload = {
            embeds: [{
                title: event,
                description: JSON.stringify(data, null, 2),
                color: 0x00ff00,
                timestamp: new Date().toISOString()
            }]
        };

        try {
            await axios.post(this.webhookUrl, payload);
        } catch (error) {
            logger.error('Analytics event failed:', error.message);
        }
    }

    async trackDownload(platform, url, success, metadata = {}) {
        await this.track('Download Event', {
            platform,
            url,
            success,
            ...metadata,
            timestamp: new Date().toISOString()
        });
    }

    async trackError(error, context = {}) {
        await this.track('Error Event', {
            error: error.message,
            stack: error.stack,
            ...context,
            timestamp: new Date().toISOString()
        });
    }

    async trackApiUsage(endpoint, method, status, duration) {
        await this.track('API Usage', {
            endpoint,
            method,
            status,
            duration,
            timestamp: new Date().toISOString()
        });
    }
}

module.exports = new AnalyticsService();