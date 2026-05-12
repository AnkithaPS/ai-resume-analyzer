import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AI Resume Analyzer",
      version: "1.0.0",
      description:
        "AI-powered Resume Analyzer with RAG, Redis caching, Docker, and JWT authentication",
    },
    servers: [
      { url: "http://localhost:5000" },
      { url: "https://ai-resume-analyzer-lmuy.onrender.com" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./dist/routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);

export { swaggerSpec, swaggerUi };
