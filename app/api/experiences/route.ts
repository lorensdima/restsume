import { NextResponse } from "next/server";
import { fetchEducation, fetchExperience } from "../../lib/data";

export async function GET(request: Request) {
  const experiences = await fetchExperience();
  return NextResponse.json(experiences, { status: 200 });
}
