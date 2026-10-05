import { NextResponse } from "next/server";
import { fetchUserBasic } from "../../lib/data";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const user = await fetchUserBasic();
    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Database unavailable", message: String(err) },
      { status: 503 }
    );
  }
}

