import { Room } from "../entities/Room";

export interface GetBookingsParams {
  email: string;
  isConfirmed: boolean;
}

export interface CreateBookingParams {
  email: string;
  roomIds: number[];
  start: string;
  end: string;
}
