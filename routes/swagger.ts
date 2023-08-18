import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Simple Blog API',
      version: '1.0.0',
    },
  },
  apis: ['./accountRoutes.ts', './postRoutes.ts'],
};

const specs = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Swagger docs are available at http://localhost:${port}/api-docs`);
});
