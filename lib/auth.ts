import { NextRequest, NextResponse } from "next/server";
import { AUTH } from "./data";

export function checkAuth(
  username: string | null,
  password: string | null
): NextResponse | null {
  if (!username || !password) {
    return NextResponse.json(
      { user_info: { auth: 0, status: "Disabled", message: "Missing credentials" } },
      { status: 401 }
    );
  }
  if (username !== AUTH.username || password !== AUTH.password) {
    return NextResponse.json(
      { user_info: { auth: 0, status: "Disabled", message: "Invalid credentials" } },
      { status: 403 }
    );
  }
  return null; // auth OK
}

export function getServerInfo(req: NextRequest) {
  const proto = req.headers.get("x-forwarded-proto") || "https";
  const host = req.headers.get("host") || "localhost";
  const base = `${proto}://${host}`;
  const now = Math.floor(Date.now() / 1000);

  return {
    url: base,
    port: "443",
    https_port: "443",
    server_protocol: "https",
    rtmp_port: "0",
    timezone: "UTC",
    timestamp_now: now,
    time_now: new Date().toISOString(),
  };
}
