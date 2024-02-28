"use client";

import { useEffect, useState } from "react";

const Background = () => {
  // State to hold the scroll value
  const [scrollValue, setScrollValue] = useState(0);

  // Function to handle scroll event
  const handleScroll = (event: { deltaY: number }) => {
    // Update scroll value based on scroll delta
    setScrollValue((prevScrollValue) => prevScrollValue + event.deltaY);
  };

  // Effect to add event listener on mount and remove on unmount
  useEffect(() => {
    window.addEventListener("wheel", handleScroll);

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  return <div></div>;
};

export default Background;
