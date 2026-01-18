"use client";

import Image from "next/image";
import { bebas, workSans } from "./fonts";
import { useEffect, useRef, useState } from "react";

export default function About() {
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

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-black text-white py-24 md:py-32 overflow-hidden"
    >
      {/* Repeated title text */}
      <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none">
        <div
          className={`${bebas.className} repeated-text text-white opacity-20 whitespace-nowrap`}
          style={{
            transform: "translateY(-20%)",
            fontSize: "clamp(6rem, 15vw, 20rem)",
            lineHeight: "0.8",
          }}
        >
          about.about.about.about.about.about.about.about.about.about.about.about.about.about.about.about.
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none">
        <div
          className={`${bebas.className} repeated-text text-white opacity-20 whitespace-nowrap`}
          style={{
            transform: "translateY(20%)",
            fontSize: "clamp(6rem, 15vw, 20rem)",
            lineHeight: "0.8",
          }}
        >
          about.about.about.about.about.about.about.about.about.about.about.about.about.about.about.about.
        </div>
      </div>

      {/* Decorative icons with color accents */}
      <div className="absolute top-8 left-8 w-12 h-12 border-2 border-accent-orange/40 rounded-full opacity-50">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-accent-orange rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 border border-accent-orange/60 rounded-full"></div>
      </div>
      <div className="absolute bottom-8 left-8 w-12 h-12 border-2 border-accent-yellow/40 rounded-full opacity-50">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-accent-yellow rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 border border-accent-yellow/60 rounded-full"></div>
      </div>
      <div className="absolute top-1/2 left-8 transform -translate-y-1/2 w-8 h-8 border-2 border-accent-orange/30 opacity-40">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-full bg-accent-orange/50"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-0.5 bg-accent-orange/50"></div>
      </div>
      <div className="absolute top-1/2 right-8 transform -translate-y-1/2 w-8 h-8 border-2 border-accent-yellow/30 opacity-40">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-full bg-accent-yellow/50"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-0.5 bg-accent-yellow/50"></div>
      </div>

      {/* Centered content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
        >
          {/* Centered image with abstract shapes */}
          <div className="relative mb-12">
            {/* Abstract radiating shapes behind image with color accents */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full max-w-md h-96">
                {[...Array(8)].map((_, i) => {
                  const isColored = i % 3 === 0;
                  return (
                    <div
                      key={i}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      style={{
                        width: `${200 + i * 40}px`,
                        height: `${200 + i * 40}px`,
                        border: isColored 
                          ? `1px solid ${i % 6 === 0 ? 'rgba(255, 107, 53, 0.3)' : 'rgba(255, 210, 63, 0.3)'}`
                          : "1px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: "50%",
                        transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Main image */}
            <div className="relative z-10 flex justify-center">
              <div className="relative w-64 h-80 md:w-80 md:h-96 bg-gray-800 rounded-lg overflow-hidden">
                <Image
                  src="https://placehold.co/400x500/000000/FFFFFF?text=About"
                  alt="About"
                  width={400}
                  height={500}
                  className="object-cover rounded-lg w-full h-full"
                  unoptimized
                />
              </div>
            </div>
          </div>

          {/* Description text */}
          <div className={`${workSans.className} text-center space-y-4 max-w-2xl mx-auto`}>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Cloud Software Engineer passionate about creating innovative solutions 
              through code. Specializing in full-stack development with a focus on user 
              experience and clean architecture.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
