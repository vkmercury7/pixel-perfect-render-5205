import { useEffect, useRef, useState } from "react";
import { Volume2 } from "lucide-react";
import vslAsset from "@/assets/vsl-0909-1.mp4.asset.json";

const ASSET_ORIGIN = "https://project--bbe2edb1-f546-4660-92bc-eff9d3df6528.lovable.app";

const videoSrc = vslAsset.url.startsWith("http")
  ? vslAsset.url
  : `${ASSET_ORIGIN}${vslAsset.url}`;

export function VslPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showUnmute, setShowUnmute] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(async () => {
      const video = videoRef.current;
      if (!video) return;

      try {
        video.muted = false;
        video.volume = 1;
        await video.play();
        setShowUnmute(false);
      } catch {
        try {
          video.muted = true;
          await video.play();
          setShowUnmute(true);
        } catch {
          setShowUnmute(false);
        }
      }
    }, 2000);

    return () => window.clearTimeout(timer);
  }, []);

  const enableSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.volume = 1;
    void video.play();
    setShowUnmute(false);
  };

  return (
    <div className="relative mx-auto w-full max-w-full overflow-hidden rounded-2xl bg-muted">
      <video
        ref={videoRef}
        src={videoSrc}
        poster="/videos/vsl-poster.jpg"
        controls
        playsInline
        preload="auto"
        className="block h-full w-full object-contain"
        style={{ aspectRatio: "16 / 9" }}
      />

      {showUnmute && (
        <button
          type="button"
          onClick={enableSound}
          className="absolute inset-x-0 top-1/2 mx-auto flex w-max -translate-y-1/2 items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-bold text-primary-foreground shadow-lg"
        >
          <Volume2 className="h-5 w-5" aria-hidden="true" />
          ATIVAR SOM
        </button>
      )}
    </div>
  );
}
