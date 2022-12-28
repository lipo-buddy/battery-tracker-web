import logger from './config/logger';
import { errorHandler, successHandler } from './config/logger';
import docsRoute from './routes/docs.route';
import healthcheckRoute from './routes/healthcheck.route';
import { ApiError } from '@sea-machines/utils';
import compression from 'compression';
import config from 'config';
import cors from 'cors';
import express, { json, urlencoded } from 'express';
import helmet from 'helmet';
import httpStatus from 'http-status';
import moment from 'moment';
import xss from 'xss-clean';

const environment = process.env.NODE_ENV || 'development';
const showStackTraces = config.get('logging.showStackTraces');

// Configure the express server, but don't run it.
// The server is started in index.js.
const app = express();

// Configure security settings.
// Set HTTP headers, and enable CORS.
app.use(helmet());
app.use(cors());

// Sanitize request data to avoid XSS vulnerabilities
app.use(xss());

// Use gzip compression when possible
app.use(compression());

// Parse JSON or URL-encoded request bodies
app.use(json());
app.use(urlencoded({ extended: true }));

// In all environments except for testing, log requests.
if (environment !== 'test') {
    app.use(successHandler);
    app.use(errorHandler);
}

// Serve static files
app.use('/v1/assets', express.static('assets'));

// Initialize routes
app.use('/api/v1', healthcheckRoute);
app.use('/v1/', docsRoute);

// send back a 404 error for any unknown api request
app.use(() => {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
});

// Always show errors as JSON-serialized objects
app.use(function (err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    logger.error(err);

    // Convert whatever error occurred in the request into a JSON object.
    let errorObj = {
        statusCode: err.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
        message: err.message,
        timestamp: moment().toISOString(),
    };

    if (showStackTraces) {
        errorObj.stack = err.stack;
    }

    res.status(errorObj.statusCode).json(errorObj);
});

export default app;
