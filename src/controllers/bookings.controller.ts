import {
  create as createBooking,
  getMultiple as getBookings,
} from "../services/bookings.service";

export async function get(req, res, next) {
  try {
    res.json(await getBookings(req.query));
  } catch (err) {
    console.error(`Error while getting bookings`, err.message);
    next(err);
  }
}

export async function create(req, res, next) {
  try {
    res.json(await createBooking(req.body));
  } catch (err) {
    console.error(`Error while creating bookings`, err.message);
    next(err);
  }
}
