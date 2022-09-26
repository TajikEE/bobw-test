import { Room } from "../entities/Room";

export async function createRoom(name: string): Promise<{ data: Room }> {
  const room = Room.create({
    name,
  });

  const data = await room.save();

  return { data };
}

export async function getRooms(): Promise<{ data: Room[] }> {
  const data = await Room.find();

  return { data };
}
