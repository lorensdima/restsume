import { NextResponse } from "next/server";
import { fetchUserBasic } from "../../lib/data";

export async function GET(request: Request) {
  const user = await fetchUserBasic();
  return NextResponse.json(user, { status: 200 });
}
