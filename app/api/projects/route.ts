import { NextResponse } from "next/server";
import { fetchProjects } from "../../lib/data";

export async function GET(request: Request) {
  const projects = await fetchProjects();
  return NextResponse.json(projects, { status: 200 });
}
