import { createRoom, getRooms } from "../services/rooms.service";

export async function get(req, res, next) {
  try {
    res.json(await getRooms());
  } catch (err) {
    console.error(`Error while getting rooms`, err.message);
    next(err);
  }
}

export async function create(req, res, next) {
  try {
    res.json(await createRoom(req.body));
  } catch (err) {
    console.error(`Error while creating rooms`, err.message);
    next(err);
  }
}
