import Link from "next/link";
import { fetchHelp } from "../lib/data";

export default async function Page() {
  const help = await fetchHelp();

  return (
    <div className="p-4">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th>Name</th>
            <th>Endpoint/Route</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody className="text-md bg-gray-900 bg-gray-50 dark:bg-gray-800">
          {help.map((data) => {
            return (
              <tr className="border border-gray-700">
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
