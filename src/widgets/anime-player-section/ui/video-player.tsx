"use client";
import Hls from "hls.js";
import { useEffect, useRef } from "react";

export default function VideoPlayer({ url }: { url: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!url) return;

    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();

      hls.loadSource(`/api/proxy?url=${encodeURIComponent(url)}`);
      hls.attachMedia(video);
    } else {
      video.src = `/api/proxy?url=${encodeURIComponent(url)}`;
    }
  }, [url]);

  return <video ref={videoRef} controls className="w-full h-125" />;
}
