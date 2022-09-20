import { emailClient, configData } from "../configs/email-client";

export const confirmBookingEmail = async (email, bookingId) => {
  configData.sender = { name: "Tajik", email: "tajik.ifrad@gmail.com" };
  configData.to = [{ email }];
  configData.templateId = 17;
  configData.params = { EMAIL: email, BOOKINGID: bookingId };

  await emailClient.sendTransacEmail(configData);
};
