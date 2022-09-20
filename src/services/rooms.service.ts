import { Room } from "../entities/Room";
import { createQueryBuilder } from "typeorm";

export async function createRoom(roomData) {
  const { number } = roomData;

  const room = Room.create({
    number,
  });

  await room.save();

  return room;
}

export async function getRooms() {
  const rooms = await Room.find();

  return rooms;
}
