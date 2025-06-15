"use client";

import { locations } from "@/constants/hero-locations";
import { useImagePreloader } from "@/hooks/use-imagepreloader";
import React, { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export const PreloaderWrapper = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const words = ["Traveling", "Exploring", "Loading"];
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  const isLoaded = useImagePreloader(locations.map((loc) => loc.image));

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    const textInterval = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, 800);

    return () => {
      clearTimeout(timer), clearInterval(textInterval);
    };
  }, []);

  if (!mounted) return null;

  return (
    <main className="relative">
      {isLoading || !isLoaded ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
          <h1 className="text-white text-base font-mono transition-all duration-300 tracking-[1rem] uppercase">
            {words[index]}
          </h1>
        </div>
      ) : (
        <>
          <div>{children}</div>
        </>
      )}
    </main>
  );
};
