import { NextResponse } from "next/server";
import { fetchEducation } from "../../lib/data";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const projects = await fetchEducation();
    return NextResponse.json(projects, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Database unavailable", message: String(err) },
      { status: 503 }
    );
  }
}

