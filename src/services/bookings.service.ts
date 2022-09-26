import { Booking } from "../entities/Booking";
import { Invoice } from "../entities/Invoice";
import { Room } from "../entities/Room";
import { confirmBookingEmail } from "./email.service";
import { CreateBookingParams, GetBookingsParams } from "../interfaces/booking";
import moment from "moment";

export async function create(bookingData): Promise<{ data: Booking }> {
  const { email, roomIds, start, end }: CreateBookingParams = bookingData;

  const now = moment();
  const startTimestamp = moment(start);
  const endTimestamp = moment(end);

  const bookedRooms: Room[] = await checkRoomAvailability(
    startTimestamp,
    endTimestamp,
    roomIds,
    now
  );

  if (bookedRooms.length > 0) {
    throw new Error(
      "The following room ids are already booked: " +
        bookedRooms.map((room) => room.id).join(", ")
    );
  }

  const existingRooms = await Room.createQueryBuilder()
    .where("id IN (:...roomIds)", { roomIds })
    .getMany();

  if (existingRooms.length !== roomIds.length) {
    throw new Error("One or more rooms do not exist");
  }

  // set expiry time for booking to allow confirmation from email
  const expiresAt = moment(now).add(
    process.env.BOOKING_TIME_BUFFER_MINUTES,
    "minutes"
  );

  const booking = Booking.create({
    email,
    rooms: existingRooms,
    expires_at: expiresAt,
    start: startTimestamp,
    end: endTimestamp,
  });
  await booking.save();

  try {
    await confirmBookingEmail(email, booking.id, existingRooms.length);
  } catch (error) {
    throw new Error("Confirmation email was not sent");
  }

  return { data: booking };
}

export async function getMultiple(
  queryData
): Promise<{ data?: Booking[] } | { message?: string }> {
  const { email, isConfirmed }: GetBookingsParams = queryData;

  if (email || isConfirmed) {
    const bookings = await Booking.findBy({ is_confirmed: isConfirmed, email });

    return bookings.length > 0
      ? { data: bookings }
      : { message: "No bookings found" };
  }
  return { data: await Booking.find() };
}

export async function confirmBooking(
  bookingId: number,
  roomsCount: number
): Promise<{ data: Booking }> {
  const booking = await Booking.findOne({ where: { id: bookingId } });

  if (!booking) {
    throw new Error("Booking not found");
  }
  booking.is_confirmed = true;

  const invoice = Invoice.create({
    amount: roomsCount * 100,
    booking,
  });

  await invoice.save();
  await booking.save();

  return { data: booking };
}

export async function checkRoomAvailability(
  startTimestamp: moment.Moment,
  endTimestamp: moment.Moment,
  roomIds: number[],
  now: moment.Moment
): Promise<Room[]> {
  const bookedRooms: Room[] = await Room.createQueryBuilder()
    .select("room")
    .from(Room, "room")
    .leftJoinAndSelect("room.bookings", "booking")
    .where(
      `((booking.start BETWEEN :startTimestamp AND :endTimestamp) OR
            (booking.end BETWEEN :startTimestamp AND :endTimestamp) OR
            (:startTimestamp BETWEEN booking.start AND booking.end) OR
            (:endTimestamp BETWEEN booking.start AND booking.end))`,
      {
        startTimestamp,
        endTimestamp,
      }
    )
    .andWhere(
      "room.id IN (:...roomIds) AND (booking.is_confirmed = :is_confirmed OR booking.expires_at > :now)",
      {
        roomIds,
        is_confirmed: true,
        now,
      }
    )
    .getMany();

  return bookedRooms;
}
