"use client";

import Image from "next/image";
import { bebas, workSans } from "./fonts";
import { GlobeAltIcon, ArrowUpRightIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    if (heroRef.current) {
      heroRef.current.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (heroRef.current) {
        heroRef.current.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen bg-gradient-to-br from-off-white via-off-white to-gray-100 px-6 pt-32 pb-24 md:pt-40 md:pb-32 flex items-center overflow-hidden"
    >
      {/* Animated background gradient that follows mouse */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 107, 53, 0.15), transparent 50%)`,
        }}
      />

      {/* Decorative geometric shapes */}
      <div className="absolute top-20 right-10 w-32 h-32 border-2 border-black/10 rotate-45 hidden lg:block" />
      <div className="absolute bottom-32 left-10 w-24 h-24 border-2 border-accent-orange/20 rotate-12 hidden lg:block" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-[1.2fr,1fr] gap-12 lg:gap-20 items-center">
          {/* Left Side - More creative layout */}
          <div className="space-y-10 animate-fade-in-up">
            {/* Large Title with creative typography */}
            <div className="relative">
              <h1
                className={`${bebas.className} text-[clamp(3.5rem,9vw,9rem)] font-normal leading-[0.85] tracking-tight text-black mb-4`}
              >
                <span className="block transform -rotate-1 inline-block">code</span>
                <span className="block transform rotate-1 inline-block ml-8">crafted</span>
                <span className="block transform -rotate-0.5 inline-block ml-4">with</span>
                <span className="block transform rotate-2 inline-block ml-12 text-accent-orange">purpose</span>
              </h1>
              
              {/* Decorative underline */}
              <div className="absolute bottom-0 left-0 w-32 h-1 bg-accent-orange transform -rotate-1" />
            </div>

            {/* Description with unique styling */}
            <div className={`${workSans.className} space-y-4 max-w-xl pl-4 border-l-4 border-black/10`}>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-light">
                Transforming complex ideas into elegant digital experiences. 
                Every line of code tells a story, every interface creates connection.
              </p>
              <p className="text-base text-gray-600 italic">
                Full-stack developer • Problem solver • Creative technologist
              </p>
            </div>

            {/* Social Media Icons - Overlapping */}
            <div className="flex items-center pt-4">
              <a
                href="https://www.linkedin.com/in/emilio-laurence/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-[4] w-12 h-12 rounded-full bg-white border-2 border-black flex items-center justify-center hover:bg-accent-orange hover:border-accent-orange transition-all duration-300 shadow-sm"
                title="LinkedIn"
              >
                <span className={`${bebas.className} text-xs font-normal`}>
                  li
                </span>
              </a>
              <a
                href="mailto:laurencedimalanta@gmail.com"
                className="relative z-[3] -ml-3 w-12 h-12 rounded-full bg-white border-2 border-black flex items-center justify-center hover:bg-accent-orange hover:border-accent-orange transition-all duration-300 shadow-sm"
                title="Email"
              >
                <span className={`${bebas.className} text-xs font-normal`}>
                  em
                </span>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-[2] -ml-3 w-12 h-12 rounded-full bg-white border-2 border-black flex items-center justify-center hover:bg-accent-orange hover:border-accent-orange transition-all duration-300 shadow-sm"
                title="GitHub"
              >
                <span className={`${bebas.className} text-xs font-normal`}>
                  gh
                </span>
              </a>
              <a
                href="#"
                className="relative z-[1] -ml-3 w-12 h-12 rounded-full bg-white border-2 border-black flex items-center justify-center hover:bg-accent-orange hover:border-accent-orange transition-all duration-300 shadow-sm"
                title="Portfolio"
              >
                <span className={`${bebas.className} text-xs font-normal`}>
                  pf
                </span>
              </a>
            </div>

            {/* Statistics with unique design */}
            <div className="grid grid-cols-2 gap-6 pt-8">
              <div className="animate-fade-in-up-delay-2 p-4 bg-white/50 backdrop-blur-sm border border-black/10 rounded-lg">
                <div className={`${bebas.className} text-4xl md:text-5xl font-normal text-black mb-1`}>
                  100%
                </div>
                <p className={`${workSans.className} text-xs text-gray-600 leading-tight`}>
                  Commitment to Quality
                </p>
              </div>
              <div className="animate-fade-in-up-delay-3 p-4 bg-accent-orange/10 border border-accent-orange/20 rounded-lg">
                <div className={`${bebas.className} text-4xl md:text-5xl font-normal text-black mb-1`}>
                  100k+
                </div>
                <p className={`${workSans.className} text-xs text-gray-600 leading-tight`}>
                  Lines of code, building solutions
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Unique panel design */}
          <div className="relative animate-fade-in-up-delay-1">
            {/* Main image container with unique shape */}
            <div className="relative">
              {/* Decorative background elements */}
              <div className="absolute -top-8 -right-8 w-full h-full bg-accent-orange/20 rounded-3xl transform rotate-3 z-0" />
              <div className="absolute -top-4 -right-4 w-full h-full bg-accent-yellow/30 rounded-3xl transform -rotate-2 z-0" />
              
              {/* Main content panel */}
              <div className="relative bg-gradient-to-br from-accent-orange to-accent-yellow rounded-3xl p-6 md:p-10 aspect-[4/5] overflow-hidden z-10 shadow-2xl">
                {/* Decorative elements */}
                <div className="absolute top-6 right-6 w-14 h-14 bg-white/20 rounded-full flex items-center justify-center z-20 backdrop-blur-sm">
                  <GlobeAltIcon className="w-7 h-7 text-white" />
                </div>

                {/* Signature text */}
                <div className="absolute top-8 left-8 z-20">
                  <p className={`${workSans.className} text-white text-sm font-light italic opacity-90`}>
                    Emilio Laurence
                  </p>
                </div>

                {/* Sparkle decoration */}
                <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20">
                  <SparklesIcon className="w-8 h-8 text-white/40" />
                </div>

                {/* Main image */}
                <div className="relative w-full h-full mt-8 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                    <Image
                      src="https://placehold.co/600x800/FF6B35/FFFFFF?text=Profile"
                      alt="Profile"
                      width={600}
                      height={800}
                      className="object-cover rounded-2xl w-full h-full"
                      unoptimized
                    />
                  </div>
                </div>

                {/* Small circular overlay images */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 z-30 space-y-4">
                  <div className="w-20 h-20 rounded-full bg-white border-4 border-white overflow-hidden shadow-xl">
                    <Image
                      src="https://placehold.co/80x80/000000/FFFFFF?text=1"
                      alt="Overlay 1"
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                      unoptimized
                    />
                  </div>
                  <div className="w-20 h-20 rounded-full bg-white border-4 border-white overflow-hidden shadow-xl">
                    <Image
                      src="https://placehold.co/80x80/000000/FFFFFF?text=2"
                      alt="Overlay 2"
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                      unoptimized
                    />
                  </div>
                </div>

                {/* Large arrow button */}
                <div className="absolute bottom-6 right-6 w-16 h-16 bg-white rounded-full flex items-center justify-center z-30 shadow-2xl hover:scale-110 transition-transform duration-300 cursor-pointer group">
                  <ArrowUpRightIcon className="w-8 h-8 text-black group-hover:text-accent-orange transition-colors" />
                </div>

                {/* Decorative corner accent */}
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/5 rounded-tr-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
