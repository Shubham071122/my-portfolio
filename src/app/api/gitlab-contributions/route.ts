import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "Username is required", contributions: [] }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://gitlab.com/users/${encodeURIComponent(username)}/calendar.json`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; PortfolioBot/1.0)",
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return NextResponse.json({ contributions: [] }, { status: 200 });
    }

    const data: Record<string, number> = await res.json();
    const contributions = Object.entries(data).map(([date, count]) => ({
      date,
      count: Number(count) || 0,
    }));

    return NextResponse.json({ contributions });
  } catch (err) {
    console.error("Failed to fetch GitLab contributions:", err);
    return NextResponse.json({ contributions: [] }, { status: 200 });
  }
}
