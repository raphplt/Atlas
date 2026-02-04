import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validators";
import { sendMail } from "@/lib/mail";

export async function POST(req: NextRequest) {
	try {
		const json = await req.json();
		const data = contactSchema.parse(json);

		if (data.website) {
			return NextResponse.json({ ok: true }, { status: 200 });
		}

		if (process.env.NODE_ENV === "production") {
			await sendMail(data);
		} else {
			await sendMail(data);
			console.log("contact(api)", data);
		}

		if (process.env.MAKE_WEBHOOK_URL) {
			try {
				await fetch(process.env.MAKE_WEBHOOK_URL, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						firstName: data.firstName,
						email: data.email,
						company: data.company,
						phone: data.phone || "",
						budget: data.budget || "",
						message: data.message,
					}),
				});
			} catch (e) {
				console.error("Webhook Make error:", e);
			}
		}

		return NextResponse.json({ ok: true });
	} catch (e: any) {
		return NextResponse.json({ error: e.message || "Erreur" }, { status: 400 });
	}
}
