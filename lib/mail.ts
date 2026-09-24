import { ContactInput } from "./validators";
import { Resend } from "resend";
import { ContactEmail } from "@/components/email-templates/ContactEmail";
export async function sendMail(data: ContactInput) {
  if (
    !process.env.RESEND_API_KEY ||
    !process.env.MAIL_FROM ||
    !process.env.MAIL_TO
  )
    throw new Error("Mail service unavailable");
  const resend = new Resend(process.env.RESEND_API_KEY);
  const result = await resend.emails.send({
    from: process.env.MAIL_FROM,
    to: [process.env.MAIL_TO],
    subject: `Nouveau contact : ${data.firstName} — ${data.company}`,
    replyTo: data.email,
    react: ContactEmail({ data }),
  });
  if (result.error) throw new Error("Mail delivery failed");
}
