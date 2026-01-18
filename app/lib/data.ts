"use server";

import { sql } from "@vercel/postgres";
import { Dog, Education, Experience, Help, Project, User } from "./definitions";

export async function fetchUsers() {
  try {
    const data = await sql<User>`
        SELECT * FROM users
      `;

    const users = data.rows;
    return users;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all users.");
  }
}

export async function fetchHelp() {
  try {
    const data = await sql<Help>`
        SELECT name, '/api' || route AS endpoint, description FROM help
      `;

    const help = data.rows;
    return help;
  } catch (err) {
    console.error("Database Error:", err);
    // Return empty array instead of throwing to prevent app crash
    // This allows the API page to still render even if database is unavailable
    return [];
  }
}

export async function fetchUserBasic() {
  try {
    const data = await sql<User>`
    SELECT 
        users.full_name, 
        users.email, 
        users.linkedin_link,
        (SELECT string_agg(project_name || ' (' || year || ')', ', ') FROM user_projects WHERE user_id = users.id GROUP BY user_id) AS projects,
        (SELECT (job_title || ' at ' || company) FROM user_experiences WHERE user_id = users.id GROUP BY user_id, job_title, company) AS experience,
        (SELECT string_agg(school_name, ', ') FROM user_education WHERE user_id = users.id GROUP BY user_id) AS education

    FROM users
        `;

    const users = data.rows;
    return users;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all users.");
  }
}

export async function fetchProjects() {
  try {
    const data = await sql<Project>`
    SELECT
        user_projects.project_name,
        user_projects.year,
        user_projects.description
    FROM user_projects
    JOIN users ON user_projects.user_id = users.id`;
    const projects = data.rows;
    return projects;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch project data.");
  }
}

export async function fetchEducation() {
  try {
    const data = await sql<Education>`
    SELECT
        user_education.school_name,
        user_education.degree,
        user_education.location,
        user_education.notes,
        user_education.start_date,
        user_education.end_date
    FROM user_education
    JOIN users ON user_education.user_id = users.id`;
    const education = data.rows;
    return education;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch education data.");
  }
}

export async function fetchExperience() {
  try {
    const data = await sql<Experience>`
    SELECT
        user_experiences.job_title,
        user_experiences.company,
        user_experiences.location,
        user_experiences.description,
        user_experiences.start_date,
        user_experiences.end_date
    FROM user_experiences
    JOIN users ON user_experiences.user_id = users.id`;
    const experiences = data.rows;
    return experiences;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch experiences.");
  }
}

export async function fetchPetNum() {
  try {
    const data = await sql<Dog>`
    SELECT * 
    FROM dog
    WHERE name = 'Skippy Mae'
    `;
    return data.rows;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to get number of times peted");
  }
}
