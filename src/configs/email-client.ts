import SibApiV3Sdk from "sib-api-v3-sdk";

const defaultClient = SibApiV3Sdk.ApiClient.instance;

let apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.EMAIL_CLIENT_API_KEY;

export const emailClient = new SibApiV3Sdk.TransactionalEmailsApi();
export const configData = new SibApiV3Sdk.SendSmtpEmail();
