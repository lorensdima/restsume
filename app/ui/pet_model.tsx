"use client";

import Image from "next/image";
import { incrementPets } from "../lib/actions";
import { useEffect, useState } from "react";
import { into_light } from "./fonts";
import { XMarkIcon, StarIcon } from "@heroicons/react/20/solid";
import { fetchExperience, fetchPetNum } from "../lib/data";

export default function PetModal() {
  const [hoverCount, setHoverCount] = useState(0);
  const [canIncremented, setCanIncremented] = useState(true);
  const [timesPetted, setTimesPetted] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetchPetNum().then((data) => {
      setTimesPetted(data[0].pets);
    });
  }, []);
  const handleMouseEnter = async () => {
    setHoverCount((prevCount) => prevCount + 1);
    if (hoverCount == 40) {
      if (canIncremented) {
        setCanIncremented(false);
        await incrementPets("Skippy Mae");
      }
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center z-50">
        <StarIcon
          onClick={() => setVisible(true)}
          className="h-5 w-5 cursor-pointer relative absolute top-[3.5rem] rotate-45 z-30"
        />
      </div>
      {visible && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <XMarkIcon
            className="h-8 w-8 cursor-pointer absolute top-[9rem] bg-gray-800 h-10 rounded"
            onClick={() => setVisible(false)}
          />
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg items-center flex flex-col gap-5">
            {hoverCount > 40 ? (
              <p>"Thanks!!" Skippy was petted {timesPetted} times</p>
            ) : hoverCount > 20 ? (
              <p>"More!!!"</p>
            ) : hoverCount > 0 ? (
              <p>"More!"</p>
            ) : (
              <p>You found Skippy! Rub Her</p>
            )}
            <div className="flex justify-center items-center h-60 w-64">
              <div
                className={`${into_light.className} text-sm text-black rounded-full top-96 px-2 bg-white absolute z-30 font-bold`}
                onMouseEnter={handleMouseEnter}
              >
                Rub Here
              </div>
              <div className="absolute translate-y-20">
                <Image
                  src="/tail.svg"
                  width={100}
                  height={200}
                  alt="dogs tail"
                  color="white"
                  className={`${
                    hoverCount > 40
                      ? `animate-fast-rotate-animation`
                      : hoverCount > 20
                      ? `animate-rotate-animation`
                      : hoverCount > 0
                      ? `animate-slow-rotate-animation`
                      : `-rotate-90`
                  } h-64 w-64`}
                />
              </div>
              <Image
                src="/dog.svg"
                width={200}
                height={200}
                alt="dog"
                color="white"
                className="absolute h-34 w-34 z-20"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
