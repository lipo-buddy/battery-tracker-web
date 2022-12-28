import app from './app';
import logger from './config/logger';
import DbService from './services/db.service';
import config from 'config';

const serverPort = config.get('server.port');
const environment = process.env.NODE_ENV || 'development';

// Write some debug configuration options on initialization
logger.debug('LiPo Buddy Pro API');
logger.debug('--------------------------------');
logger.debug(`Profile: ${environment}`);
logger.debug(`Server Port: ${serverPort}\n`);

// Start server, setting up various error handlers
// Log when we receive a SIGTERM or SIGINT signal
let server;

// Stop the server and shut down all services.
const exitHandler = () => {
    DbService.disconnect().then(() => {
        if (server) {
            server.close(() => {
                logger.info('Server closed.');
                process.exit(1);
            });
        } else {
            process.exit(1);
        }
    });
};

const unexpectedErrorHandler = (error) => {
    logger.error(error);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    exitHandler();
});
process.on('SIGINT', () => {
    logger.info('SIGINT received');
    exitHandler();
});

// Initialize REST API server
// Start all services once the API server is started.
server = app.listen(serverPort, async () => {
    logger.info(`LiPo Buddy Pro API started on Port ${serverPort}`);

    await DbService.connect();
});
