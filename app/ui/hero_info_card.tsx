"use client";

import {
  ArrowRightIcon,
  XMarkIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { outfit } from "./fonts";
import { useState } from "react";

export default function HeroInfoCard() {
  const [visible, setVisible] = useState(true);

  const toggle = () => {
    setVisible(!visible);
  };

  return (
    <div
      className={`${
        visible ? "" : "-translate-x-16"
      } absolute top-3 left-3 z-20`}
    >
      <div className="w-1/2 flex items-center gap-2 ">
        <div className="h-full border-r-2 pr-1">
          <ExclamationCircleIcon className="w-12" />
        </div>
        {visible && (
          <div className={`${outfit.className} text-shadow-md bg-zinc-600 p-2`}>
            This a RESTsume. Try accessing{" "}
            <Link href="/api" className="font-bold">
              /api
            </Link>{" "}
            to see available routes!
          </div>
        )}
        {visible ? (
          <XMarkIcon className="h-20 w-20 cursor-pointer" onClick={toggle} />
        ) : (
          <ArrowRightIcon
            className="h-24 w-24 cursor-pointer"
            onClick={toggle}
          />
        )}
      </div>
    </div>
  );
}
