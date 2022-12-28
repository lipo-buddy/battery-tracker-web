import config from 'config';
import { Router } from 'express';
import { serve, setup } from 'swagger-ui-express';
import yamljs from 'yamljs';

const docsRouter = Router();

// Add router to API documentation if it is enabled.
// Docs are disabled by default in production.
// Customizations to the OpenAPI Swagger UI are also performed here.
if (config.get('server.showSwaggerDocs')) {
    const apiSpec = yamljs.load('./api-specs/openapi-spec-aicv.prod.yml');
    docsRouter.use(
        '/api-docs',
        serve,
        setup(apiSpec, {
            customCss: '.try-out__btn, .servers, .servers-title, .topbar { display: none; }',
            swaggerOptions: {
                tryItOutEnabled: false,
            },
            customSiteTitle: 'Sea Machines AICV API',
            customfavIcon: '/v1/assets/favicon.ico',
        })
    ); // GET /v1/api-docs
}

export default docsRouter;
