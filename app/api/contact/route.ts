import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validators";
import { sendMail } from "@/lib/mail";
import { readSubmission } from "@/lib/request-guard";
export async function POST(req: NextRequest) {
  const submission = await readSubmission(req);
  if (submission.error) return submission.error;
  const raw = submission.data;
  if (raw && typeof raw === "object" && "website" in raw && raw.website)
    return NextResponse.json({ ok: true });
  const result = contactSchema.safeParse(raw);
  if (!result.success)
    return NextResponse.json(
      { error: "Vérifiez les informations du formulaire." },
      { status: 400 },
    );
  try {
    await sendMail(result.data);
  } catch {
    return NextResponse.json(
      { error: "L’envoi est indisponible. Contactez-moi par e-mail." },
      { status: 503 },
    );
  }
  if (process.env.MAKE_WEBHOOK_URL) {
    try {
      await fetch(process.env.MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
        signal: AbortSignal.timeout(5000),
      });
    } catch {
      /* Delivery succeeded; optional CRM sync must not cause duplicate submissions. */
    }
  }
  return NextResponse.json({ ok: true });
}
