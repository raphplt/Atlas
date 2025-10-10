import { NextRequest, NextResponse } from "next/server";
import { isValidVariant } from "@/lib/ab-testing";

/**
 * API route to force A/B variant via cookie
 * Usage: /api/ab?variant=B
 */
export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const variant = searchParams.get("variant");

	if (!variant) {
		return NextResponse.json(
			{ error: "Missing variant parameter. Use ?variant=A, B, or C" },
			{ status: 400 }
		);
	}

	if (!isValidVariant(variant)) {
		return NextResponse.json(
			{ error: "Invalid variant. Must be A, B, or C" },
			{ status: 400 }
		);
	}

	// Set cookie for 30 days
	const response = NextResponse.json({
		success: true,
		variant,
		message: `CTA variant set to ${variant}`,
	});

	response.cookies.set("cta_variant", variant, {
		maxAge: 60 * 60 * 24 * 30, // 30 days
		path: "/",
		sameSite: "lax",
	});

	return response;
}
