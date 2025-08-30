import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validators";
import { sendMail } from "@/lib/mail";

export async function POST(req: NextRequest) {
	try {
		const json = await req.json();
		const data = contactSchema.parse(json);

		// Honeypot
		if (data.website) {
			return NextResponse.json({ ok: true }, { status: 200 });
		}

		if (process.env.NODE_ENV === "production") {
			await sendMail(data);
		} else {
			console.log("contact(api)", data);
		}

		return NextResponse.json({ ok: true });
	} catch (e: any) {
		return NextResponse.json({ error: e.message || "Erreur" }, { status: 400 });
	}
}
