import { emailClient, configData } from "../configs/email-client";

export const confirmBookingEmail = async (email, bookingId, rooms) => {
  configData.sender = { name: "Tajik", email: "tajik.ifrad@gmail.com" };
  configData.to = [{ email }];
  configData.templateId = 17;
  configData.params = { BOOKINGID: bookingId, EMAIL: email, ROOMS: rooms };

  await emailClient.sendTransacEmail(configData);
};
