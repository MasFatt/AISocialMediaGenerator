import { NextRequest, NextResponse } from "next/server";
import { generateSocialPost } from "../../../lib/gemini";

interface RequestBody {
  topic: string;
  platform?: string;
  style?: string;
  includeEmoji?: boolean;
  includeHashtag?: boolean;
  apiKey: string;
}

interface ErrorWithMessage {
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json();

    const { topic, platform, style, includeEmoji, includeHashtag, apiKey } = body;

    if (!apiKey || !topic) {
      return NextResponse.json(
        { error: "API key dan topik wajib diisi." },
        { status: 400 }
      );
    }

    const output = await generateSocialPost(
      {
        topic,
        platform: platform ?? "",
        style: style ?? "",
        includeEmoji: includeEmoji ?? false,
        includeHashtag: includeHashtag ?? false,
      },
      apiKey
    );

    return NextResponse.json({ output });
  } catch (error) {
    console.error("API error:", error);

    let message = "Server error.";
    let status = 500;

    if (
      error &&
      typeof error === "object" &&
      "message" in error &&
      typeof (error as ErrorWithMessage).message === "string" &&
      (error as ErrorWithMessage).message === "INVALID_API_KEY"
    ) {
      message = "API key tidak valid atau tidak punya akses.";
      status = 401;
    }

    return NextResponse.json({ error: message }, { status });
  }
}
