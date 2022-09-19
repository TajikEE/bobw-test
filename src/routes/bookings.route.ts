import express from "express";
const router = express.Router();
import { get, create } from "../controllers/bookings.controller";

router.get("/", get);

router.post("/", create);

export { router as bookingsRouter };
