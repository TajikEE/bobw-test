import express from "express";
const router = express.Router();
import { get, create } from "../controllers/rooms.controller";

router.get("/", get);

router.post("/", create);

export { router as roomsRouter };
