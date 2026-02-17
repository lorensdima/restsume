"use client";

import {
  ArrowRightIcon,
  XMarkIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { workSans } from "./fonts";
import { useState } from "react";

export default function HeroInfoCard() {
  const [visible, setVisible] = useState(false);

  const toggle = () => {
    setVisible(!visible);
  };

  return (
    <div
      className={`${
        visible
          ? "transition-transform duration-300"
          : "animate-subtle-bounce transition-transform duration-300"
      } absolute top-20 left-6 z-50 mt-3`}
    >
      <div className="flex items-center gap-2">
        <div className="h-full border-r-2 border-black pr-2">
          <ExclamationCircleIcon className="w-8 h-8 text-black" />
        </div>
        {visible && (
          <div className={`${workSans.className} text-sm bg-off-white border-2 border-black p-3 shadow-lg`}>
            This is a RESTsume. Try accessing{" "}
            <Link href="/api" className="font-bold text-accent-orange hover:underline">
              /api
            </Link>{" "}
            to see available routes!
          </div>
        )}
        {visible ? (
          <XMarkIcon 
            className="h-8 w-8 cursor-pointer text-black hover:text-accent-orange transition-colors" 
            onClick={toggle} 
          />
        ) : (
          <ArrowRightIcon
            className="h-8 w-8 cursor-pointer text-black hover:text-accent-orange transition-colors"
            onClick={toggle}
          />
        )}
      </div>
    </div>
  );
}
