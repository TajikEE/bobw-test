import { emailClient, configData } from "../configs/email-client";

export const confirmBookingEmail = async (
  email: string,
  bookingId: number,
  roomsCount: number
) => {
  configData.sender = { name: "Tajik", email: "tajik.ifrad@gmail.com" };
  configData.to = [{ email }];
  configData.templateId = 17;
  configData.params = { BOOKINGID: bookingId, ROOMSCOUNT: roomsCount };

  return await emailClient.sendTransacEmail(configData);
};
