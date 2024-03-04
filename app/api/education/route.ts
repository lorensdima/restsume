import { NextResponse } from "next/server";
import { fetchEducation } from "../../lib/data";

export async function GET(request: Request) {
  const projects = await fetchEducation();
  return NextResponse.json(projects, { status: 200 });
}
