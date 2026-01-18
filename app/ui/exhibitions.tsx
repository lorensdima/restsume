"use client";

import Link from "next/link";
import { bebas, workSans } from "./fonts";
import { useEffect, useRef, useState } from "react";

interface ExhibitionItem {
  number: string;
  title: string;
  location: string;
  date: string;
  repo_url?: string;
  documentation_url?: string;
  site_url?: string;
}

export default function Exhibitions() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Map existing projects to exhibitions format
  const exhibitions: ExhibitionItem[] = [
    {
      number: "01",
      title: "AG Florendo Inventory and Sales Monitoring System",
      location: "Web Application",
      date: "2023",
      repo_url: "https://gitlab.com/emiliau/ag-inventory-and-sales-system",
      documentation_url: "https://drive.google.com/file/d/14b3IdXOtrCZjrMtyAuwr3Bfb2pHyOEV8/view?usp=share_link",
    },
    {
      number: "02",
      title: "Disaster Location and Severity Analysis",
      location: "Machine Learning Project",
      date: "2023",
      repo_url: "https://gitlab.com/emiliau/typhoon-application",
      documentation_url: "https://drive.google.com/file/d/1CcAhNqbpOjRo5U9qq8ma5w9sEBmNDlLH/view?usp=share_link",
    },
    {
      number: "03",
      title: "Crime Prone Regions Mapping",
      location: "Data Mining Project",
      date: "2023",
      repo_url: "https://gitlab.com/emiliau/data-mining",
      documentation_url: "https://drive.google.com/file/d/1TrpD9rFB-lNrMqsJLHQezyuetg-PMA-Z/view?usp=share_link",
    },
    {
      number: "04",
      title: "RadQuiz Application",
      location: "Web Application",
      date: "2023",
      repo_url: "https://github.com/lorensdima/radquiz",
      site_url: "https://lorensdima.github.io/radquiz/",
    },
  ];

  return (
    <section
      id="exhibitions"
      ref={sectionRef}
      className="relative bg-off-white py-24 md:py-32 px-6 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="mb-16 md:mb-24">
          <h2
            className={`${bebas.className} text-[clamp(4rem,12vw,14rem)] font-normal leading-[0.8] text-black`}
            style={{
              transform: "translateX(-5%)",
            }}
          >
            projects.projects
          </h2>
        </div>

        {/* Exhibitions List */}
        <div
          className={`space-y-8 md:space-y-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
        >
          {exhibitions.map((exhibition, index) => (
            <div
              key={exhibition.number}
              className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 py-6 border-b border-gray-300"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* Number with color accent */}
              <div className={`${bebas.className} text-4xl md:text-5xl font-normal min-w-[80px]`}>
                <span className="text-accent-orange">{exhibition.number}</span>
              </div>

              {/* Title */}
              <div className="flex-1">
                <h3
                  className={`${bebas.className} text-3xl md:text-5xl font-normal italic text-black mb-2`}
                >
                  {exhibition.title}
                </h3>
              </div>

              {/* Location and Date */}
              <div className={`${workSans.className} text-sm md:text-base text-gray-600 min-w-[200px]`}>
                {exhibition.location}, {exhibition.date}
              </div>

              {/* Button with color accent */}
              <div className="min-w-[140px]">
                <Link
                  href={exhibition.repo_url || exhibition.site_url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${workSans.className} inline-block px-6 py-3 border-2 border-black bg-white text-black text-sm font-medium hover:bg-accent-orange hover:border-accent-orange hover:text-white transition-all duration-300`}
                >
                  View Project
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
