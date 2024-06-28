"use server";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "c9ef4e1867ab5d",
    pass: "b0b8231cedc41c"
  }
});

interface EmailOptions {
    from: string;
    to: string;
    subject: string;
    text: string;
    html: string;
  }
  
export const sendEmail = async ({ from, to, subject, text, html }: EmailOptions) => {
    try {
        const info = await transport.sendMail({
        from,
        to,
        subject,
        text,
        html
        });
        console.log("Message sent: %s", info.messageId);
        return info;
    } catch (error) {
        console.error("Error sending email: %s", error);
        throw error;
    }
};