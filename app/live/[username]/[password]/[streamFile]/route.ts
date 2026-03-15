import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/lib/auth";
import { STREAM_URLS } from "@/lib/data";

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string; password: string; streamFile: string } }
) {
  const { username, password, streamFile } = params;

  const authErr = checkAuth(username, password);
  if (authErr) return authErr;

  // streamFile is e.g. "101.m3u8" or "101.ts"
  const streamId = Number(streamFile.split(".")[0]);
  const url = STREAM_URLS[streamId];

  if (!url) {
    return NextResponse.json({ error: "Stream not found" }, { status: 404 });
  }

  return NextResponse.redirect(url, 302);
}
