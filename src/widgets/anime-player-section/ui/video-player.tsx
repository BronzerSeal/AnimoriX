"use client";
import Hls from "hls.js";
import { useEffect, useRef } from "react";

type Props = {
  url: string;
  isTrailer?: boolean;
};

export default function VideoPlayer({ url, isTrailer }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const isYouTube =
    url.includes("youtube.com") ||
    url.includes("youtu.be") ||
    url.includes("youtube-nocookie.com");

  useEffect(() => {
    if (!url || isYouTube) return;

    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(`/api/proxy?url=${encodeURIComponent(url)}`);
      hls.attachMedia(video);
    } else {
      video.src = `/api/proxy?url=${encodeURIComponent(url)}`;
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [url, isYouTube]);

  // 🎥 YouTube fallback
  if (isYouTube) {
    return (
      <div className="w-full">
        <iframe
          src={url}
          className="w-full aspect-video rounded-2xl"
          allowFullScreen
        />
        {isTrailer && (
          <div className="mt-2 text-sm text-yellow-500 px-1">
            Episode unavailable, showing trailer
          </div>
        )}
      </div>
    );
  }

  // 🎬 HLS video
  return (
    <video
      ref={videoRef}
      controls
      className="w-full aspect-video rounded-2xl"
    />
  );
}
