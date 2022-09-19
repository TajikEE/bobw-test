import { Booking } from "../entities/Booking";
import { Room } from "../entities/Room";

export async function create(bookingData) {
  const { email, rooms, start, end } = bookingData;

  const bookedRooms = await Room.createQueryBuilder()
    .select("room")
    .from(Room, "room")
    .leftJoinAndSelect("room.bookings", "booking")
    .where("booking.start BETWEEN :start AND :end", {
      start,
      end,
    })
    .andWhere("room.id IN (:...rooms)", { rooms })
    .andWhere("booking.is_confirmed = :is_confirmed", { is_confirmed: false })
    .getMany();

  if (bookedRooms.length > 0) {
    throw new Error(
      "The following rooms are already booked: " +
        bookedRooms.map((room) => room.number).join(", ")
    );
  }

  const existingRooms = await Room.createQueryBuilder()
    .where("id IN (:...rooms)", { rooms })
    .getMany();

  const booking = Booking.create({
    email,
    rooms: existingRooms,
    start,
    end,
  });

  await booking.save();

  return booking;
}

export async function getMultiple(email) {
  const bookings = await Booking.createQueryBuilder()
    .select("booking")
    .from(Booking, "booking")
    // .where("email = :email", {
    //   email,
    // })
    .getMany();

  return bookings;
}
