import MQTTService from '../services/mqtt.service';
import config from 'config';

const serialNumber = config.get('smr.serialNumber');
const deviceType = config.get('smr.deviceType');

/**
 * API Healthcheck
 *
 * Serves a healthcheck endpoint that shows process statistics,
 * device IDs, and other debug information.
 */
const healthcheck = async (req, res) => {
    res.status(200).json({
        message: 'OK',
        uptime: process.uptime(),
        timestamp: Date.now(),
    });
};

export { healthcheck };
