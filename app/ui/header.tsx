"use client";

import Link from "next/link";
import { bebas, workSans } from "./fonts";
import { useState, useEffect } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-off-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <div className="relative w-12 h-12">
            <svg
              viewBox="0 0 40 40"
              className="w-full h-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* The Vertical Spine and E/L horizontal lines */}
              <path 
                d="M26 10 H14 V30 H26" 
                stroke="currentColor" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              {/* The Middle E line */}
              <path 
                d="M14 20 H24" 
                stroke="currentColor" 
                strokeWidth="3" 
                strokeLinecap="round"
              />
              {/* The D Curve connecting top and bottom */}
              <path 
                d="M26 10 C32 10 32 30 26 30" 
                stroke="currentColor" 
                strokeWidth="3" 
                strokeLinecap="round"
              />
            </svg>
          </div>
        </Link>

        {/* Navigation */}
        <nav className={`${workSans.className} hidden md:flex items-center gap-8 text-sm font-medium`}>
          <Link href="#home" className="hover:text-accent-orange transition-colors">
            Home
          </Link>
          <Link href="#about" className="hover:text-accent-orange transition-colors">
            About
          </Link>
          <Link href="#portfolio" className="hover:text-accent-orange transition-colors">
            Portfolio
          </Link>
          <Link href="#exhibitions" className="hover:text-accent-orange transition-colors">
            Projects
          </Link>
          <Link href="#contact" className="hover:text-accent-orange transition-colors">
            Contact
          </Link>
        </nav>

        {/* Metadata section */}
        <div className={`${workSans.className} hidden lg:flex items-center gap-2 text-xs text-gray-600`}>
          <span className="text-lg">+</span>
          <span>Portfolio, 2026</span>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden flex flex-col gap-1.5">
          <span className="w-6 h-0.5 bg-black"></span>
          <span className="w-6 h-0.5 bg-black"></span>
          <span className="w-6 h-0.5 bg-black"></span>
        </button>
      </div>
    </header>
  );
}
