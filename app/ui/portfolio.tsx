"use client";

import Image from "next/image";
import { bebas, workSans } from "./fonts";
import { useEffect, useRef, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface PortfolioItem {
  src: string;
  alt: string;
  title: string;
  description: string;
  repo_url?: string;
  documentation_url?: string;
  site_url?: string;
}

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
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

  const portfolioItems: PortfolioItem[] = [
    {
      src: "/projects/project1.png",
      alt: "AG Florendo Inventory System",
      title: "AG Florendo Inventory and Sales Monitoring System (AGISS)",
      description: "A Web-Based AG Florendo Inventory and Sales Monitoring System (AGISS) was developed for a company named AG Florendo Inc. The technologies used for the front end include HTML, CSS, Bootstrap, Material Design Bootstrap, and Vue.js. In contrast, PHP, MySQL, phpMyAdmin, and Apache Server were used to develop the back-end processes.",
      repo_url: "https://gitlab.com/emiliau/ag-inventory-and-sales-system",
      documentation_url: "https://drive.google.com/file/d/14b3IdXOtrCZjrMtyAuwr3Bfb2pHyOEV8/view?usp=share_link",
    },
    {
      src: "/projects/disaster.png",
      alt: "Disaster Analysis",
      title: "Determining Disaster Location and Severity Through Sentiment Analysis",
      description: "This project aims to determine how severe typhoons impact different cities and regions in the Philippines through machine learning and Twitter. A machine learning model was integrated into a simple web application to determine the locations of affected areas within the Philippine Archipelago.",
      repo_url: "https://gitlab.com/emiliau/typhoon-application",
      documentation_url: "https://drive.google.com/file/d/1CcAhNqbpOjRo5U9qq8ma5w9sEBmNDlLH/view?usp=share_link",
    },
    {
      src: "/projects/crime_mapping.png",
      alt: "Crime Mapping",
      title: "Mapping and Predicting Crime Prone Regions in the Philippines",
      description: "The aim of the project is to predict the likelihood of a crime happening in a region and to see the crime-prone areas in the Philippines. The team scraped data from the Twitter account of the PNP and the Manila Bulletin using TWINT and APIFY as tools for scraping.",
      repo_url: "https://gitlab.com/emiliau/data-mining",
      documentation_url: "https://drive.google.com/file/d/1TrpD9rFB-lNrMqsJLHQezyuetg-PMA-Z/view?usp=share_link",
    },
    {
      src: "/projects/radquiz.png",
      alt: "RadQuiz",
      title: "RadQuiz",
      description: "Simple quiz application with questions related to Rad Tech Deployed using GitHub Pages",
      repo_url: "https://github.com/lorensdima/radquiz",
      site_url: "https://lorensdima.github.io/radquiz/",
    },
  ];

  const handleImageClick = (item: PortfolioItem) => {
    setSelectedProject(item);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = "unset";
  };

  return (
    <>
      <section
        id="portfolio"
        ref={sectionRef}
        className="relative bg-off-white py-24 md:py-32 px-6 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          {/* Overlapping title with color accent */}
          <div className="relative mb-16 md:mb-24">
            <h2
              className={`${bebas.className} text-[clamp(4rem,12vw,14rem)] font-normal leading-[0.8] z-10 relative`}
              style={{
                transform: "translateY(-20%)",
              }}
            >
              <span className="text-black">port</span>
              <span className="text-accent-orange">folio</span>
            </h2>
          </div>

          {/* Grid of images */}
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
            }`}
          >
            {portfolioItems.map((item, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer"
                onClick={() => handleImageClick(item)}
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-accent-orange/20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className={`${bebas.className} text-white text-2xl drop-shadow-lg`}>View Details</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal for project details */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className={`${workSans.className} relative bg-off-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-black text-white rounded-full hover:bg-accent-orange transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>

            {/* Image */}
            <div className="relative w-full h-64 md:h-80">
              <Image
                src={selectedProject.src}
                alt={selectedProject.alt}
                fill
                className="object-cover rounded-t-2xl"
              />
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
              <h3 className={`${bebas.className} text-4xl md:text-5xl font-normal mb-6 text-black`}>
                {selectedProject.title}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-8 text-lg">
                {selectedProject.description}
              </p>

              {/* Links */}
              <div className="flex flex-wrap gap-4">
                {selectedProject.repo_url && (
                  <a
                    href={selectedProject.repo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-black text-white border-2 border-black hover:bg-accent-orange hover:border-accent-orange transition-all duration-300 font-medium"
                  >
                    View Repository
                  </a>
                )}
                {selectedProject.documentation_url && (
                  <a
                    href={selectedProject.documentation_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-white text-black border-2 border-black hover:bg-black hover:text-white transition-all duration-300 font-medium"
                  >
                    View Documentation
                  </a>
                )}
                {selectedProject.site_url && (
                  <a
                    href={selectedProject.site_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-accent-orange text-white border-2 border-accent-orange hover:bg-accent-yellow hover:border-accent-yellow transition-all duration-300 font-medium"
                  >
                    Visit Site
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
