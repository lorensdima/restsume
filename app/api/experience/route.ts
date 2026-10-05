import { NextResponse } from "next/server";
import { fetchEducation, fetchExperience } from "../../lib/data";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const experiences = await fetchExperience();
    return NextResponse.json(experiences, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Database unavailable", message: String(err) },
      { status: 503 }
    );
  }
}

