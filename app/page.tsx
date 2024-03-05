import Image from "next/image";
import { outfit, jost, atkinson, inconsolata, into_light } from "./ui/fonts";
import Starfield from "react-starfield";
import { Suspense } from "react";
import {
  RectangleStackIcon,
  EnvelopeIcon,
  LinkIcon,
  ArrowDownIcon,
} from "@heroicons/react/20/solid";

import Skills from "./ui/skills";
import Projects from "./ui/projects";
import HeroInfoCard from "./ui/hero_info_card";

export default function Home() {
  return (
    <main className="">
      {/*<Starfield /> */}
      <Starfield />
      <div className="min-h-screen">
        <HeroInfoCard />
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
          <div className="relative z-20 rounded-lg shadow-lg w-full">
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
        <div className="lg:ml-56 mb-20" id="projects">
          <Suspense>
            <Projects />
          </Suspense>
        </div>
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
          <Skills />
        </div>
      </div>
      <div className="flex flex-col items-center my-96 mt-0 relative justify-center">
        <Image
          className="dark:invert"
          src="/happy-man.svg"
          width={300}
          height={300}
          alt="happy_man"
        />
        <p
          className={`${outfit.className} mb-12 text-5xl text-center tracking-wide`}
        >
          Together, Let's Build Something{" "}
          <span className={`${into_light.className} text-6xl font-bold`}>
            Great!
          </span>
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
        <div className="p-3 flex gap-3 mt-10">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.linkedin.com/in/emilio-laurence/"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 mx-1 max-xs:w-5 max-xs:h-5 hover:animate-pulse"
              viewBox="0 0 24 24"
            >
              <path
                fill="white"
                d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z"
              ></path>
            </svg>
          </a>
        </div>
      </div>
      <footer className="mt-10 flex items-center justify-center">
        <div className="bg-zinc-800 p-3 flex gap-3 w-full text-gray-400">
          <p className="font-bold">Emilio Laurence B. Dimalanta</p>
          <div className="flex gap-2 items-center absolute right-0 mr-3">
            <LinkIcon className="h-5 w-5" />
            <a href="https://www.vecteezy.com/free-vector/dot-grid">
              <div className="flex">
                Dot Grid{` `}
                <div className="md:block hidden"> Vectors by Vecteezy </div>
              </div>
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
