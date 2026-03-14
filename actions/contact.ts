"use server";

import nodemailer from "nodemailer";
import { headers } from "next/headers";

interface ContactData {
  fullName: string;
  email: string;
  message: string;
}

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const LIMIT = 5;
const WINDOW_MS = 60 * 60 * 1000;

export async function sendContactMessage(data: ContactData) {
  const headerList = headers();
  const ip = headerList.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";

  const now = Date.now();
  const userLimit = rateLimitMap.get(ip);

  if (userLimit) {
    if (now < userLimit.resetTime) {
      if (userLimit.count >= LIMIT) {
        throw new Error("Too many requests. Please try again in an hour.");
      }
      userLimit.count += 1;
    } else {
      rateLimitMap.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    }
  } else {
    rateLimitMap.set(ip, { count: 1, resetTime: now + WINDOW_MS });
  }

  const { fullName, email, message } = data;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"${fullName}" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      subject: `Portfolio Contact from ${fullName}`,
      text: `Name: ${fullName}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">New Portfolio Message</h2>
          <p><strong>From:</strong> ${fullName} (${email})</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f9fafb; border-radius: 5px;">
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #6b7280;">Sent from techshubham.cloud contact form.</p>
        </div>
      `,
    });

    console.log("Message sent: %s", info.messageId);
    return { success: true, message: "Message sent successfully!" };
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send message. Please try again later.");
  }
}
