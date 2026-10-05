import { NextResponse } from "next/server";
import { fetchProjects } from "../../lib/data";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const projects = await fetchProjects();
    return NextResponse.json(projects, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Database unavailable", message: String(err) },
      { status: 503 }
    );
  }
}

