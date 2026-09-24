import { NextRequest, NextResponse } from "next/server";
// Deployment-level rate limiting should complement these request checks.
export async function readSubmission(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (
    origin &&
    origin !== req.nextUrl.origin &&
    origin !== "https://atlas.raphael-plassart.com"
  )
    return {
      error: NextResponse.json(
        { error: "Origine non autorisée" },
        { status: 403 },
      ),
    };
  if (!req.headers.get("content-type")?.includes("application/json"))
    return {
      error: NextResponse.json(
        { error: "Format non accepté" },
        { status: 415 },
      ),
    };
  const reader = req.body?.getReader();
  if (!reader)
    return {
      error: NextResponse.json({ error: "Requête vide" }, { status: 400 }),
    };
  let size = 0;
  const chunks: Uint8Array[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 16384) {
      await reader.cancel();
      return {
        error: NextResponse.json(
          { error: "Requête trop volumineuse" },
          { status: 413 },
        ),
      };
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  try {
    return { data: JSON.parse(new TextDecoder().decode(bytes)) as unknown };
  } catch {
    return {
      error: NextResponse.json({ error: "Requête invalide" }, { status: 400 }),
    };
  }
}
