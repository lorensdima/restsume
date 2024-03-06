"use server";

import { sql } from "@vercel/postgres";

export async function incrementPets(name: string) {
  try {
    const data = await sql`
      UPDATE dog
      SET pets = pets + 1
      WHERE name = ${`${name}`};
      `;
    return data;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to increment pets. Name: " + err);
  }
}
