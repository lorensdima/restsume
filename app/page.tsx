import Image from "next/image";
import { outfit, jost, atkinson, inconsolata, shadows_font } from "./ui/fonts";
import Starfield from "react-starfield";
import {
  RectangleStackIcon,
  EnvelopeIcon,
  LinkIcon,
} from "@heroicons/react/20/solid";

import Skills from "./ui/skills";

export default function Home() {
  return (
    <main className="">
      {/*<Starfield /> */}
      <Starfield />
      <div className="min-h-screen">
        <div className="relative flex items-center justify-center">
          <div className="bg-zinc-800 p-3 flex gap-3">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="http://www.linkedin.com/in/emilio-laurence/"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7 mx-1 max-xs:w-5 max-xs:h-5"
                viewBox="0 0 24 24"
              >
                <path
                  fill="white"
                  d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z"
                ></path>
              </svg>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="mailto:laurencedimalanta@gmail.com"
            >
              <EnvelopeIcon className="w-6 h-7 mx-1 max-xs:w-5 max-xs:h-5" />
            </a>
          </div>
        </div>
        <div className="relative h-screen flex items-center justify-center">
          <div className="hidden absolute bottom-[-300px] left-[-300px] lg:block">
            <Image src="/circle1.png" width={500} height={500} alt="circle" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              className="animate-slower-spin"
              src="/circle1.png"
              width={500}
              height={500}
              alt="circle"
            />
          </div>
          <div className="relative z-20 p-8 rounded-lg shadow-lg">
            <p
              className={`${outfit.className} antialiased text-6xl text-center font-bold bg-black`}
            >
              Emilio Laurence Dimalanta
            </p>
            <p className="text-center text-gray-600 mt-3 text-lg">
              Information Technology Graduate
            </p>
          </div>
        </div>
        <div className="lg:ml-56 ">
          <div className="z-10 ml-50 text-sm flex items-center">
            <div className="mx-5 border rounded-full p-3">
              <RectangleStackIcon className="h-7 w-7 text-white " />
            </div>
            <div className="flex w-auto p-3 justify-center bg-zinc-600">
              <p className={`${atkinson.className} text-xl text-shadow-md`}>
                PR0JECTS
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-5 p-5">
            <div className="p-5 border rounded-lg bg-zinc-800">
              <div className="flex flex-col md:flex-row gap-5 items-center">
                <div className="">
                  <Image
                    src="/projects/project1.png"
                    alt="project1"
                    width={500}
                    height={500}
                  />
                </div>
                <div className="lg:w-1/2 md:w-full p-1">
                  <h1
                    className={`${jost.className} text-center text-lg mb-5 font-bold text-shadow-md`}
                  >
                    AG Florendo Inventory and Sales Monitoring System (AGISS)
                  </h1>
                  <p
                    className={`${jost.className} text-justify text-shadow-md`}
                  >
                    A Web-Based AG Florendo Inventory and Sales Monitoring
                    System (AGISS) was developed for a company named AG Florendo
                    Inc. This project aimed to design, develop, test, and deploy
                    a web-based system that handles inventory-related
                    transactions, sales, delivery status, reports, and on-call
                    orders. It was developed using the Agile software
                    development method. This method divided large tasks of this
                    project into smaller tasks through several iterations.
                    Planning, designing, developing, testing, deploying, and
                    reviewing occurred in each iteration. The technologies used
                    for the front end include HTML, CSS, Bootstrap, Material
                    Design Bootstrap, and Vue.js. In contrast, PHP, MySQL,
                    phpMyAdmin, and Apache Server were used to develop the
                    back-end processes.
                  </p>
                  <div className="mt-5 flex gap-5">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://gitlab.com/emiliau/ag-inventory-and-sales-system"
                    >
                      <div
                        className={`${inconsolata.className} cursor-pointer p-5 border border-blue-300 rounded-lg hover:animate-pulse hover:bg-blue-200 hover:text-black hover:border-black`}
                      >
                        View Repository
                      </div>
                    </a>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://gitlab.com/emiliau/ag-inventory-and-sales-system"
                    >
                      <div
                        className={`${inconsolata.className} cursor-pointer p-5 border border-blue-300 rounded-lg hover:animate-pulse hover:bg-blue-200 hover:text-black hover:border-black`}
                      >
                        View Repository
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              {/* new card */}
            </div>
          </div>
        </div>
        {/* end of projects */}
        <div className="flex items-center h-[40rem] mt-10 relative justify-center border-b-4 border-t-4">
          <div className="bg-black w-full h-full absolute" />
          <Image
            src="/dotted_background.jpg"
            alt="bg"
            className="dark:invert opacity-10"
            fill={true}
            style={{
              objectFit: "cover",
            }}
          />

          {/* <a href="https://www.vecteezy.com/free-vector/dot-grid">Dot Grid Vectors by Vecteezy</a> */}
          <Skills />
        </div>
      </div>
      <div className="flex flex-col items-center my-96 relative justify-center">
        <p
          className={`${outfit.className} mb-12 text-5xl text-center tracking-wide`}
        >
          Together, Let's Build Something{" "}
          <span className={`${shadows_font.className} font-bold`}>Great!</span>
        </p>
        <div>
          <div className="animate-pulse right-20 relative absolute flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]"></div>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="mailto:laurencedimalanta@gmail.com"
            className={`${jost.className} p-4 border text-3xl bg-gray-700 rounded-md hover:bg-black tracking-wide text-shadow-md`}
          >
            Contact Me
          </a>
        </div>
      </div>
      <footer className="mt-10 flex items-center justify-center">
        <div className="bg-zinc-800 p-3 flex gap-3 w-full text-gray-400">
          <p className="font-bold">Emilio Laurence B. Dimalanta</p>
          <div className="flex gap-2 items-center absolute right-0 mr-3">
            <LinkIcon className="h-5 w-5" />
            <a href="https://www.vecteezy.com/free-vector/dot-grid">
              Dot Grid Vectors by Vecteezy
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
