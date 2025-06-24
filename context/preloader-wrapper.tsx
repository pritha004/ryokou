"use client";

import { locations } from "@/constants/hero-locations";
import { useImagePreloader } from "@/hooks/use-imagepreloader";
import { Ellipsis, Luggage, Pizza, TreePalm } from "lucide-react";
import React, { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export const PreloaderWrapper = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const words = [
    { icon: TreePalm, name: "Traveling" },
    { icon: Pizza, name: "Exploring" },
    { icon: Ellipsis, name: "Loading" },
    { icon: Luggage, name: "Packing" },
  ];
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

  const IconComponent = words[index].icon;

  return (
    <main className="relative">
      {isLoading || !isLoaded ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center justify-center border border-white rounded-full p-6">
              <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>
            <div className="w-full flex items-center justify-center">
              <h1 className="max-w-xs text-white text-base font-lato transition-all duration-300 uppercase text-center ">
                {words[index].name.split("").map((w, index) => (
                  <span key={index} className="p-2">
                    {w}
                  </span>
                ))}
              </h1>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div>{children}</div>
        </>
      )}
    </main>
  );
};
