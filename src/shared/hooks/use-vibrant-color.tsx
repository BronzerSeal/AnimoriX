"use client";

import { useEffect, useState } from "react";
import { Vibrant } from "node-vibrant/browser";

type VibrantResult = {
  colors: string[];
  isLoading: boolean;
  error: string | null;
};

export const useVibrantColor = (
  imageUrl?: string | null | undefined,
): VibrantResult => {
  const fallbackColors = [
    "#93c5fd",
    "#60a5fa",
    "#3b82f6",
    "#a5b4fc",
    "#ddd6fe",
  ];
  const [bgColors, setbgColors] = useState<string[]>(fallbackColors);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!imageUrl) return;

    let isCancelled = false;

    const getColor = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const proxiedUrl = `/api/image-proxy?url=${encodeURIComponent(
          imageUrl,
        )}`;

        Vibrant.from(proxiedUrl)
          .getPalette()
          .then((palette) => {
            const colors = [
              palette.Vibrant?.hex,
              palette.DarkVibrant?.hex,
              palette.Muted?.hex,
              palette.DarkMuted?.hex,
              palette.LightVibrant?.hex,
            ].filter((c): c is string => Boolean(c));

            setbgColors(colors.length ? colors : fallbackColors);
          });
      } catch (err: any) {
        if (isCancelled) return;

        console.error("Vibrant error:", err);
        setError(err?.message || "Failed to extract color");
        setbgColors(fallbackColors);
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    };

    getColor();

    return () => {
      isCancelled = true;
    };
  }, [imageUrl]);

  return { colors: bgColors, isLoading, error };
};
