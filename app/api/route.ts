import { NextResponse } from "next/server";
import { fetchHelp } from "../lib/data";

export async function GET(request: Request) {
  const help = await fetchHelp();
  return NextResponse.json(help, { status: 200 });
}
