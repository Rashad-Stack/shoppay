import nodemailer from "nodemailer";
import { google } from "googleapis";
import activationEmailTemplate from "@/templates/activationEmailTemplate";
import resetPassword from "@/templates/passwordResetTemplate";

const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

const {
  GOOGLE_ID,
  GOOGLE_SECRET,
  MAIL_SERVICE_REFRESH_TOKEN,
  SENDER_EMAIL_ADDRESS,
} = process.env;

const oauth2Client = new OAuth2(
  GOOGLE_ID,
  GOOGLE_SECRET,
  MAIL_SERVICE_REFRESH_TOKEN,
  OAUTH_PLAYGROUND
);

// send mail

export const sendEmail = ({ to, name, url, domain, subject }) => {
  oauth2Client.setCredentials({
    refresh_token: MAIL_SERVICE_REFRESH_TOKEN,
  });
  const accessToken = oauth2Client.getAccessToken();
  const smtpTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: SENDER_EMAIL_ADDRESS,
      clientId: GOOGLE_ID,
      clientSecret: GOOGLE_SECRET,
      refreshToken: MAIL_SERVICE_REFRESH_TOKEN,
      accessToken,
    },
  });

  const mailOptions = {
    from: SENDER_EMAIL_ADDRESS,
    to,
    subject,
    // html: activationEmailTemplate({ url, domain, name }),
    html: resetPassword({ url, domain }),
  };

  smtpTransporter.sendMail(mailOptions, (err, infos) => {
    if (err) return err;
    return infos;
  });
};
