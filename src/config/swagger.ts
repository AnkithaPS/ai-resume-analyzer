import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AI Resume Analyzer",
      version: "1.0.0",
      description: `AI Resume Analyzer is a backend application that analyzes resumes and evaluates their compatibility with a given job description.
      It leverages AI along with **Retrieval-Augmented Generation (RAG)** to provide more accurate and context-aware insights. The system also uses **Redis caching** to optimize performance and reduce repeated AI calls.
      The application generates an ATS (Applicant Tracking System) score and structured insights including strengths, weaknesses, missing skills, and actionable suggestions. 
       The project is fully containerized using Docker and Docker Compose, enabling consistent development and deployment environments.
      `,
    },
    servers: [
      { url: "http://localhost:5000" },
      { url: "https://ai-resume-analyzer-lmuy.onrender.com" },
    ],
    tags: [{ name: "Auth" }, { name: "Resume Analyzer" }],
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
