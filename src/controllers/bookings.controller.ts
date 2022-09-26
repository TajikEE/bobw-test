import { NextFunction, Request, Response } from "express";
import {
  create as createBooking,
  getMultiple as getBookings,
  confirmBooking,
} from "../services/bookings.service";
import { validateInputs } from "../utils/sanitization";

export async function get(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await getBookings(req.query));
  } catch (err) {
    console.error(`Error while getting bookings`, err.message);
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  validateInputs(req, res);
  try {
    res.json(await createBooking(req.body));
  } catch (err) {
    console.error(`Error while creating bookings`, err.message);
    next(err);
  }
}

export async function confirm(req: Request, res: Response, next: NextFunction) {
  validateInputs(req, res);
  try {
    const bookingId: number = parseInt(req.params.id);
    const roomsCount: number = parseInt(req.params.roomsCount);

    res.json(await confirmBooking(bookingId, roomsCount));
  } catch (err) {
    console.error(`Error while confirming booking`, err.message);
    next(err);
  }
}
