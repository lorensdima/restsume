"use client";

import Link from "next/link";
import { bebas, workSans } from "./fonts";

export default function Footer() {
  return (
    <footer className="bg-black text-off-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Top section with logo and navigation */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 pb-8 border-b border-gray-800">
          {/* Logo */}
          <Link href="/" className="mb-6 md:mb-0">
            <div className="relative w-12 h-12">
              <svg
                viewBox="0 0 40 40"
                className="w-full h-full"
                fill="white"
              >
                <path d="M10 20 Q10 10 20 10 Q30 10 30 20" stroke="currentColor" strokeWidth="3" fill="none" />
                <path d="M10 20 Q10 30 20 30 Q30 30 30 20" stroke="currentColor" strokeWidth="3" fill="none" />
                <circle cx="20" cy="20" r="8" fill="currentColor" opacity="0.3" />
              </svg>
            </div>
          </Link>

          {/* Navigation */}
          <nav className={`${workSans.className} flex flex-wrap items-center gap-6 md:gap-8 text-sm font-medium text-gray-400`}>
            <Link href="#home" className="hover:text-off-white transition-colors">
              Home
            </Link>
            <Link href="#about" className="hover:text-off-white transition-colors">
              About
            </Link>
            <Link href="#portfolio" className="hover:text-off-white transition-colors">
              Portfolio
            </Link>
            <Link href="#exhibitions" className="hover:text-off-white transition-colors">
              Exhibitions
            </Link>
            <Link href="#contact" className="hover:text-off-white transition-colors">
              Contact
            </Link>
          </nav>
        </div>

        {/* Large signature text */}
        <div className="overflow-hidden">
          <h2
            className={`${bebas.className} text-[clamp(4rem,15vw,20rem)] font-normal leading-[0.8] tracking-tight`}
            style={{
              WebkitTextStroke: "2px white",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
          >
            developer
          </h2>
        </div>
      </div>
    </footer>
  );
}
