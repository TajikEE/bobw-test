import { initTestDB, dropDB } from "../src/configs/test-db-config";
import { createRoom, getRooms } from "../src/services/rooms.service";

describe("room functionality", () => {
  beforeAll(async () => {
    await initTestDB();
  });

  afterAll(async () => {
    await dropDB();
  });

  it("creates a new room", async () => {
    const room = await createRoom("Super suite");

    expect(room).toEqual({
      data: {
        created_at: expect.anything(),
        id: 1,
        name: "Super suite",
        updated_at: expect.anything(),
      },
    });
  });

  it("gets all rooms", async () => {
    const rooms = await getRooms();

    expect(rooms).toEqual({
      data: [
        {
          created_at: expect.anything(),
          id: 1,
          name: "Super suite",
          updated_at: expect.anything(),
        },
      ],
    });
  });
});
