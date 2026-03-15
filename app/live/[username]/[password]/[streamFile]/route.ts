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

  // Proxy the HLS manifest instead of 302 redirect — Samsung AVPlay
  // cannot follow HTTP redirects for HLS streams, causing CONNECTION_FAILED.
  try {
    const upstream = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
      redirect: "follow",
    });

    if (!upstream.ok) {
      return new NextResponse(`Upstream error: ${upstream.status}`, { status: 502 });
    }

    const body = await upstream.text();
    const contentType = upstream.headers.get("content-type") || "application/vnd.apple.mpegurl";

    // For HLS manifests, rewrite relative URLs to absolute so the player
    // can fetch segments directly from the origin.
    let rewritten = body;
    if (contentType.includes("mpegurl") || url.endsWith(".m3u8")) {
      const base = url.substring(0, url.lastIndexOf("/") + 1);
      rewritten = body.replace(/^(?!#)(?!https?:\/\/)(.+)$/gm, base + "$1");
    }

    return new NextResponse(rewritten, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache",
      },
    });
  } catch (e: any) {
    return new NextResponse(`Proxy error: ${e.message}`, { status: 502 });
  }
}
