import moment from "moment";
import { initTestDB, dropDB } from "../src/configs/test-db-config";
import { createRoom } from "../src/services/rooms.service";
import { checkRoomAvailability } from "../src/services/bookings.service";

describe("booking functionality", () => {
  beforeAll(async () => {
    await initTestDB();
    await createRoom("Ruum");
  });

  afterAll(async () => {
    await dropDB();
  });

  it("returns empty array for overlapping booked rooms", async () => {
    const bookedRooms = await checkRoomAvailability(
      moment("2022-10-01T15:15:00.000Z"),
      moment("2022-10-03T15:15:00.000Z"),
      [1],
      moment()
    );
    expect(bookedRooms).toEqual([]);
  });
});
