"use client";

import { useEffect, useState } from "react";

export function useImagePreloader(imagePaths: string[]) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let loadedCount = 0;

    imagePaths.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = img.onerror = () => {
        loadedCount++;
        if (loadedCount === imagePaths.length) {
          setIsLoaded(true);
        }
      };
    });
  }, [imagePaths]);

  return isLoaded;
}
