"use client";

import Image from "next/image";
import Link from "next/link";
import { outfit, jost, atkinson, inconsolata } from "./fonts";
import {
  RectangleStackIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  MinusCircleIcon,
} from "@heroicons/react/20/solid";
import { StopCircleIcon } from "@heroicons/react/24/outline";
import { usePathname, useSearchParams } from "next/navigation";

//AG Florendo Inventory and Sales Monitoring System (AGISS)
interface CardProps {
  image_src: string;
  title: string;
  description: string;
  repo_url: string;
  documentation_url: string;
  site_url: string;
}

export default function Projects() {
  const ProjectCard: React.FC<CardProps> = ({
    image_src,
    title,
    description,
    repo_url,
    documentation_url,
    site_url,
  }) => {
    return (
      <div className="p-5 border rounded-lg bg-zinc-800 max-w-[75rem]">
        <div className="flex flex-col md:flex-row gap-5 items-center">
          <div className="">
            <Image
              src={image_src}
              alt="project1"
              width={500}
              height={500}
              className="rounded-lg text-shadow-md shadow-lg"
            />
          </div>
          <div className="lg:w-1/2 md:w-full p-1">
            <h1
              className={`${jost.className} text-center text-lg mb-5 font-bold text-shadow-md`}
            >
              {title}
            </h1>
            <p
              className={`${jost.className} text-justify text-shadow-md text-gray-200`}
            >
              {description}
            </p>
            <div className="mt-5 flex gap-5">
              <a target="_blank" rel="noopener noreferrer" href={repo_url}>
                <div
                  className={`${inconsolata.className} cursor-pointer p-4 border border-blue-300 rounded-lg hover:animate-pulse hover:bg-blue-200 hover:text-black hover:border-black`}
                >
                  View Repository
                </div>
              </a>
              {documentation_url ? (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={documentation_url}
                >
                  <div
                    className={`${inconsolata.className} cursor-pointer p-4 border border-blue-300 rounded-lg hover:animate-pulse hover:bg-blue-200 hover:text-black hover:border-black`}
                  >
                    View Documentation
                  </div>
                </a>
              ) : (
                <></>
              )}
              {site_url ? (
                <a target="_blank" rel="noopener noreferrer" href={site_url}>
                  <div
                    className={`${inconsolata.className} cursor-pointer p-4 border border-green-300 rounded-lg bg-green-600 hover:animate-pulse hover:bg-blue-200 hover:text-black hover:border-black`}
                  >
                    View Site
                  </div>
                </a>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const totalPages = 2;

  const createPageURL = (pageNumber: number | string) => {
    if (Number(pageNumber) > 2) {
      pageNumber = 1;
    }
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };
  return (
    <>
      <div className="z-10 ml-50 text-sm flex items-center">
        <div className="mx-5 border rounded-full p-3">
          <RectangleStackIcon className="h-7 w-7 text-white " />
        </div>
        <div className="flex w-auto p-3 justify-center bg-zinc-600 mr-3">
          <p className={`${atkinson.className} text-xl text-shadow-md`}>
            PR0JECTS
          </p>
        </div>
        <Link href={createPageURL(currentPage + 1)} scroll={false}>
          {currentPage == 1 ? (
            <div className="flex items-center text-md">
              <ChevronRightIcon className="h-10 w-10 text-white " />
            </div>
          ) : (
            <div className="flex items-center text-md">
              <ChevronLeftIcon className="h-10 w-10 text-white " />
            </div>
          )}
        </Link>
      </div>
      <div className="mt-4 flex flex-col gap-5 p-5">
        {currentPage == 1 ? (
          <>
            {" "}
            <ProjectCard
              image_src="/projects/project1.png"
              title="AG Florendo Inventory and Sales Monitoring System (AGISS)"
              description=" A Web-Based AG Florendo Inventory and Sales Monitoring System (AGISS)
          was developed for a company named AG Florendo Inc. The
          technologies used for the front end include HTML, CSS, Bootstrap,
          Material Design Bootstrap, and Vue.js. In contrast, PHP, MySQL,
          phpMyAdmin, and Apache Server were used to develop the back-end
          processes."
              repo_url="https://gitlab.com/emiliau/ag-inventory-and-sales-system"
              documentation_url="https://drive.google.com/file/d/14b3IdXOtrCZjrMtyAuwr3Bfb2pHyOEV8/view?usp=share_link"
              site_url=""
            />
            <ProjectCard
              image_src="/projects/disaster.png"
              title="Determining Disaster Location and Severity Through Sentiment Analysis of Philippine Typhoon Related Tweets"
              description="This project aims to determine how severe typhoons impact different cities and regions in the Philippines through machine learning and Twitter. A machine learning model was integrated into a simple web application to determine the locations of affected areas within the Philippine Archipelago."
              repo_url="https://gitlab.com/emiliau/typhoon-application"
              documentation_url="https://drive.google.com/file/d/1CcAhNqbpOjRo5U9qq8ma5w9sEBmNDlLH/view?usp=share_link"
              site_url=""
            />
            <ProjectCard
              image_src="/projects/crime_mapping.png"
              title="Mapping and Predicting Crime Prone Regions in the Philippines"
              description="The aim of the project is to predict the likelihood of a crime happening in a region and to see the crime-prone areas in the Philippines. The team scraped data from the Twitter account of the PNP and the Manila Bulletin using TWINT and APIFY as tools for scraping. "
              repo_url="https://gitlab.com/emiliau/data-mining"
              documentation_url="https://drive.google.com/file/d/1TrpD9rFB-lNrMqsJLHQezyuetg-PMA-Z/view?usp=share_link"
              site_url=""
            />
            <ProjectCard
              image_src="/projects/radquiz.png"
              title="RadQuiz"
              description="Simple quiz application with questions related to Rad Tech Deployed using GitHub Pages"
              repo_url="https://github.com/lorensdima/radquiz"
              documentation_url=""
              site_url="https://lorensdima.github.io/radquiz/"
            />{" "}
          </>
        ) : (
          <>
            <ProjectCard
              image_src="/projects/todo.png"
              title="Todo Application"
              description="This simple To-Do app allows users to create an account, log in, add tasks, mark tasks as completed, and delete tasks. It features basic authentication using JSON Web Tokens (JWT) for user sessions. Application was built to experiment with Docker."
              repo_url="https://github.com/lorensdima/todo-app-api/"
              documentation_url=""
              site_url=""
            />
            <ProjectCard
              image_src="/projects/pasteit.png"
              title="Paste.It"
              description="A very simple web application for removing formatting on copied text. Built to try out GitHub Pages"
              repo_url="https://github.com/lorensdima/paste.it"
              documentation_url=""
              site_url="https://lorensdima.github.io/paste.it/"
            />
          </>
        )}
      </div>
      <div className="">
        <div className="flex">
          {currentPage == 1 ? (
            <>
              <MinusCircleIcon className="h-10 w-10 text-white" />
              <StopCircleIcon className="h-10 w-10 text-white" />
            </>
          ) : (
            <>
              <StopCircleIcon className="h-10 w-10 text-white" />
              <MinusCircleIcon className="h-10 w-10 text-white" />
            </>
          )}

          <Link
            className="ml-3"
            href={createPageURL(currentPage + 1)}
            scroll={false}
          >
            {currentPage == 1 ? (
              <div className="flex items-center text-md">
                Next
                <ChevronRightIcon className="h-10 w-10 text-white " />
              </div>
            ) : (
              <div className="flex items-center text-md">
                Previous
                <ChevronLeftIcon className="h-10 w-10 text-white " />
              </div>
            )}
          </Link>
        </div>
      </div>
    </>
  );
}
