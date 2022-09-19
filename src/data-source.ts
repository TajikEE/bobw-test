import "reflect-metadata";
import { DataSource } from "typeorm";
import { Booking } from "./entities/Booking";
import { Invoice } from "./entities/Invoice";
import { Room } from "./entities/Room";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "test",
  database: "postgres",
  synchronize: true,
  logging: false,
  entities: [Room, Booking, Invoice],
  migrations: [],
  subscribers: [],
});
