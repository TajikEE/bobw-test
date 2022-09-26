import express, { Router } from "express";
import { body } from "express-validator";
import { get, create } from "../controllers/rooms.controller";

const router: Router = express.Router();

router.get("/", get);

router.post("/", body("name").isString(), create);

export { router as roomsRouter };
