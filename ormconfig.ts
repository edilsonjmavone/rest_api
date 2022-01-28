import dotenv from "dotenv";
dotenv.config({
  path: process.env.NODE_ENV === "dev" ? ".env.dev" : ".env.production"
});

export default {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: process.env.USERNAME,
  password: process.env.PASW,
  database: "api_dev",
  synchronize: true,
  logging: false,
  entities: [process.env.TYPEORM_ENTITIES],
  migrations: [process.env.TYPEORM_MIGRATIONS],
  cli: {
    migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
    entitiesDir: process.env.TYPEORM_ENTITIES_DIR
  }
};
