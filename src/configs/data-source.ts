import "reflect-metadata";
import { DataSource } from "typeorm";
import { Booking } from "../entities/Booking";
import { Invoice } from "../entities/Invoice";
import { Room } from "../entities/Room";

export const AppDataSource: DataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST_DOCKER,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Room, Booking, Invoice],
  migrations: [],
  subscribers: [],
});
