import { Request, Response, Router } from "express";
import * as nodemailer from "nodemailer";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const emailInput: EmailInput = req.body;

  console.log(`emailInput: ${JSON.stringify(emailInput)}`);
  console.log(`process.env.SMTP_USER: ${process.env.SMTP_USER}`);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.SMTP_USER,
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_OAUTH_REFRESH_TOKEN,
    },
  });
  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: emailInput?.to,
      subject: emailInput?.subject || "No subject",
      text: emailInput?.message,
    });
    res.status(200).json({ message: `Sent the email to ${emailInput?.to}` });
  } catch (error) {
    console.error("An error ocurred:", error);
    res.status(500).json(error);
  }
});

export default router;

interface EmailInput {
  to: string;
  subject: string;
  message: string;
}
