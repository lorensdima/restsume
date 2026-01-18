import Link from "next/link";
import { fetchHelp } from "../lib/data";

export default async function Page() {
  const help = await fetchHelp();

  return (
    <div className="p-4 min-h-screen bg-off-white">
      {help.length === 0 ? (
        <div className="max-w-2xl mx-auto mt-20 p-8 bg-white border-2 border-black rounded-lg">
          <h1 className="text-2xl font-bold mb-4">RESTsume API</h1>
          <p className="text-gray-600 mb-4">
            The API help data is currently unavailable. This might be due to database connection issues.
          </p>
          <p className="text-sm text-gray-500">
            Available API endpoints:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-gray-600">
            <li><code className="bg-gray-100 px-2 py-1 rounded">/api/basic</code> - Basic user information</li>
            <li><code className="bg-gray-100 px-2 py-1 rounded">/api/projects</code> - Project data</li>
            <li><code className="bg-gray-100 px-2 py-1 rounded">/api/experience</code> - Work experience</li>
            <li><code className="bg-gray-100 px-2 py-1 rounded">/api/education</code> - Education history</li>
          </ul>
        </div>
      ) : (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th>Name</th>
              <th>Endpoint/Route</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody className="text-md bg-gray-900 bg-gray-50 dark:bg-gray-800">
            {help.map((data, index) => {
              return (
                <tr key={index} className="border border-gray-700">
                  <td>
                    <Link
                      href={data.endpoint}
                      target="_blank"
                      className="underline text-blue-400"
                    >
                      {data.name}
                    </Link>
                  </td>
                  <td>{data.endpoint}</td>
                  <td>{data.description}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

/* 


import { NextResponse } from "next/server";
import { fetchHelp } from "../lib/data";

export async function GET(request: Request) {
  const help = await fetchHelp();
  return NextResponse.json(help, { status: 200 });
}




*/
