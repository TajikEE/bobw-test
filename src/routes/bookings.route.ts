import express, { Router } from "express";
import { get, create, confirm } from "../controllers/bookings.controller";
import { body, param } from "express-validator";

const router: Router = express.Router();

router.get("/", get);

router.post(
  "/",
  body("email").isEmail(),
  body("roomIds").isLength({ min: 1 }),
  body("start").isString(),
  body("end").isString(),
  create
);

router.get(
  "/confirm/:id/:roomsCount",
  param("id").isNumeric(),
  param("roomsCount").isNumeric(),
  confirm
);

export { router as bookingsRouter };
