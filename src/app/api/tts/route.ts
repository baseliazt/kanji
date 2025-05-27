import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get("text");
  const lang = searchParams.get("lang") || "id";

  if (!text) {
    return NextResponse.json(
      { error: "Missing text parameter" },
      { status: 400 }
    );
  }

  const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
    text
  )}&tl=${lang}&client=tw-ob`;

  const ttsRes = await fetch(url);
  console.log(ttsRes,'ini apa')
  if (!ttsRes.ok) {
    return NextResponse.json(
      { error: "Failed to fetch audio from Google TTS" },
      { status: ttsRes.status }
    );
  }

  const audioBuffer = await ttsRes.arrayBuffer();

  return new NextResponse(audioBuffer, {
    status: 200,
    headers: {
      "Content-Type": "audio/mpeg",
      "Content-Disposition": `inline; filename="tts.mp3"`,
    },
  });
}
