import { NextFunction, Request, Response } from "express";
import { createRoom, getRooms } from "../services/rooms.service";
import { validateInputs } from "../utils/sanitization";

export async function get(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await getRooms());
  } catch (err) {
    console.error(`Error while getting rooms`, err.message);
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  validateInputs(req, res);
  try {
    const { name } = req.body;

    res.json(await createRoom(name));
  } catch (err) {
    console.error(`Error while creating rooms`, err.message);
    next(err);
  }
}
