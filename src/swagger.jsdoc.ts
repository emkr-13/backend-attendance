import swaggerJsDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Attendance Backend API",
      version: "1.0.0",
      description: "API documentation for Attendance Backend",
    },
    servers: [
      {
        url: "http://localhost:3080", // Ganti dengan URL server Anda
      },
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
  apis: ["./routes/*.ts"], // Lokasi file rute Anda
};

export const swaggerDocs = swaggerJsDoc(swaggerOptions);
// console.log("Swagger Loaded APIs:", swaggerDocs);
