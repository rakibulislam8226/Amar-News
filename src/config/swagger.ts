import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Amar News Portal API",
      version: "1.0.0",
      description: "Personalized News Portal API",
    },

    servers: [
      {
        url: `http://localhost:${process.env.PORT}/api/v1`,
      },
    ],
  },

  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
  );
};