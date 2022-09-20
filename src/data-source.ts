import "reflect-metadata";
import { DataSource, DatabaseType } from "typeorm";
import { Booking } from "./entities/Booking";
import { Invoice } from "./entities/Invoice";
import { Room } from "./entities/Room";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  // dropSchema: true,
  // migrationsRun: true,
  entities: [Room, Booking, Invoice],
  migrations: [],
  subscribers: [],
});
