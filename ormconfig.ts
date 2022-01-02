import "dotenv/config";

export default {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: process.env.USERNAME,
  password: process.env.PASW,
  database: "api_dev",
  synchronize: true,
  logging: false,
  entities: ["src/database/entity/**/*.ts"],
  migrations: ["src/database/migration/**/*.ts"],
  cli: {
    migrationsDir: "src/database/migration",
    entitiesDir: "src/database/entity"
  }
};
