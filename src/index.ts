import dotenv from "dotenv";
dotenv.config();

import express, { Express, Request, Response } from "express";

import { AppDataSource } from "./data-source";
import { bookingsRouter } from "./routes/bookings.route";
import { invoicesRouter } from "./routes/invoices.route";
import { roomsRouter } from "./routes/rooms.route";

// establish database connection
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
    throw new Error("Unable to connect to DB");
  });

const app: Express = express();
app.use(express.json());

const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Express");
});

app.use("/booking", bookingsRouter);
app.use("/room", roomsRouter);
app.use("/invoice", invoicesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).json({
    message: "No such route exists",
  });
});

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });

  return;
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
