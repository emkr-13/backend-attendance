require("dotenv").config();

module.exports = {
  type: process.env.DB_ENGINE,
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ["dist/entities/**/*.js"],
  migrations: ["dist/migrations/**/*.js"],
  cli: {
    entitiesDir: "src/entities",
    migrationsDir: "src/migrations",
  },
  synchronize: false,
};
