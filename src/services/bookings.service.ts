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
  // call email service here
  return booking;
}

export async function getMultiple(queryData) {
  const { email, isConfirmed } = queryData;
  if (email && isConfirmed) {
    return await Booking.findBy({ is_confirmed: isConfirmed, email });
  } else if (email) {
    return await Booking.findBy({ email });
  } else if (isConfirmed) {
    return await Booking.findBy({ is_confirmed: isConfirmed });
  }
  return await Booking.find();
}
