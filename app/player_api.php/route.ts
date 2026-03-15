import { NextRequest, NextResponse } from "next/server";
import { checkAuth, getServerInfo } from "@/lib/auth";
import {
  AUTH,
  VOD_CATEGORIES,
  VOD_STREAMS,
  VOD_INFO,
  LIVE_CATEGORIES,
  LIVE_STREAMS,
  SERIES_CATEGORIES,
  SERIES_LIST,
  SERIES_INFO,
} from "@/lib/data";

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const username = sp.get("username");
  const password = sp.get("password");

  // Auth check
  const authErr = checkAuth(username, password);
  if (authErr) return authErr;

  const action = sp.get("action");

  // No action → auth / server info
  if (!action) {
    return NextResponse.json({
      user_info: {
        username: AUTH.username,
        password: AUTH.password,
        status: "Active",
        exp_date: "1893456000",
        is_trial: "0",
        active_cons: "1",
        created_at: "1704067200",
        max_connections: "1",
        allowed_output_formats: ["m3u8", "ts", "rtmp"],
      },
      server_info: getServerInfo(req),
    });
  }

  switch (action) {
    // ── VOD ────────────────────────────────────────────────────────
    case "get_vod_categories":
      return NextResponse.json(VOD_CATEGORIES);

    case "get_vod_streams": {
      const catId = sp.get("category_id");
      const streams = catId
        ? VOD_STREAMS.filter((s) => s.category_id === catId)
        : VOD_STREAMS;
      return NextResponse.json(streams);
    }

    case "get_vod_info": {
      const vodId = Number(sp.get("vod_id"));
      const info = VOD_INFO[vodId];
      if (!info) {
        return NextResponse.json({}, { status: 404 });
      }
      return NextResponse.json(info);
    }

    // ── Live TV ────────────────────────────────────────────────────
    case "get_live_categories":
      return NextResponse.json(LIVE_CATEGORIES);

    case "get_live_streams": {
      const catId = sp.get("category_id");
      const streams = catId
        ? LIVE_STREAMS.filter((s) => s.category_id === catId)
        : LIVE_STREAMS;
      return NextResponse.json(streams);
    }

    // ── Series ─────────────────────────────────────────────────────
    case "get_series_categories":
      return NextResponse.json(SERIES_CATEGORIES);

    case "get_series": {
      const catId = sp.get("category_id");
      const series = catId
        ? SERIES_LIST.filter((s) => s.category_id === catId)
        : SERIES_LIST;
      return NextResponse.json(series);
    }

    case "get_series_info": {
      const seriesId = Number(sp.get("series_id"));
      const info = SERIES_INFO[seriesId];
      if (!info) {
        return NextResponse.json({}, { status: 404 });
      }
      return NextResponse.json(info);
    }

    // ── EPG (stub) ─────────────────────────────────────────────────
    case "get_short_epg":
    case "get_simple_data_table":
      return NextResponse.json({ epg_listings: [] });

    default:
      return NextResponse.json(
        { error: "Unknown action", action },
        { status: 400 }
      );
  }
}
