import express from "express";
import { get, create } from "../controllers/rooms.controller";
const router = express.Router();

router.get("/", get);

router.post("/", create);

export { router as roomsRouter };
