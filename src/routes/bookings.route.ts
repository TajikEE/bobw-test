import express from "express";
import { get, create, confirm } from "../controllers/bookings.controller";

const router = express.Router();

router.get("/", get);

router.post("/", create);

router.get("/confirm/:id", confirm);

export { router as bookingsRouter };
