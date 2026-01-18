"use client";

import { bebas, workSans } from "./fonts";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Contact() {
  return (
    <section id="contact" className="relative bg-gradient-to-br from-off-white via-off-white to-gray-50 py-24 md:py-32 px-6 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-10 w-40 h-40 bg-accent-orange/5 rounded-full blur-3xl hidden lg:block" />
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-accent-yellow/10 rounded-full blur-2xl hidden lg:block" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className={`${bebas.className} text-6xl md:text-8xl font-normal mb-8`}>
          <span className="text-black">Let's </span>
          <span className="text-accent-orange">Connect</span>
        </h2>
        <p className={`${workSans.className} text-lg md:text-xl text-gray-700 mb-12 max-w-2xl mx-auto`}>
          Interested in collaborating or have a project in mind? Get in touch and let's build something amazing together.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a
            href="mailto:laurencedimalanta@gmail.com"
            className={`${workSans.className} inline-flex items-center gap-3 px-8 py-4 bg-black text-white border-2 border-black hover:bg-accent-orange hover:border-accent-orange transition-all duration-300 font-medium shadow-lg hover:shadow-xl`}
          >
            <EnvelopeIcon className="w-5 h-5" />
            Send Email
          </a>
          <Link
            href="https://www.linkedin.com/in/emilio-laurence/"
            target="_blank"
            rel="noopener noreferrer"
            className={`${workSans.className} inline-flex items-center gap-3 px-8 py-4 bg-white text-black border-2 border-black hover:bg-accent-yellow hover:border-accent-yellow transition-all duration-300 font-medium shadow-lg hover:shadow-xl`}
          >
            View LinkedIn
          </Link>
        </div>
      </div>
    </section>
  );
}
