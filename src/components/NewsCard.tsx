import { useState, useRef, useEffect } from "react";
import { Check, AlertTriangle, Radio } from "lucide-react";

export interface NewsCardData {
  id: number;
  image: string;
  isLive: boolean;
  headline: string;
  timeAgo: string;
  pollQuestion: string;
  options: { label: string; icon: "check" | "warning" }[];
}

interface NewsCardProps {
  data: NewsCardData;
}

const iconMap = {
  check: Check,
  warning: AlertTriangle,
};

const NewsCard = ({ data }: NewsCardProps) => {
  const [accentColor, setAccentColor] = useState("hsla(0,0%,30%,0.5)");
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = data.image;
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = 8;
        canvas.height = 8;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, 8, 8);
        const pixel = ctx.getImageData(2, 2, 1, 1).data;
        setAccentColor(`rgba(${pixel[0]}, ${pixel[1]}, ${pixel[2]}, 0.35)`);
      } catch {
        // CORS or other error, keep default
      }
    };
  }, [data.image]);

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-3xl">
      {/* Accent blur background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(ellipse at 50% 30%, ${accentColor} 0%, transparent 70%)`,
          filter: "blur(40px)",
        }}
      />

      {/* Image area */}
      <div className="relative flex-shrink-0">
        <img
          ref={imgRef}
          src={data.image}
          alt={data.headline}
          className="w-full aspect-[16/10] object-cover rounded-2xl"
          loading="lazy"
          crossOrigin="anonymous"
        />
        {/* Gradient overlay for text legibility */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background:
              "linear-gradient(to bottom, hsla(0,0%,0%,0) 40%, hsla(0,0%,0%,0.55) 100%)",
          }}
        />
        {data.isLive && (
          <div
            className="absolute top-3.5 left-3.5 flex items-center gap-1.5 rounded-full px-2.5 py-0.5"
            style={{
              background: "hsl(142, 70%, 45%)",
              boxShadow: "0 2px 8px hsla(142, 70%, 45%, 0.4)",
            }}
          >
            <Radio size={10} className="text-white animate-pulse" />
            <span
              className="text-white font-bold uppercase"
              style={{ fontSize: "10px", letterSpacing: "0.08em" }}
            >
              Live
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between px-4 pt-4 pb-4 gap-2.5">
        {/* Meta + Headline */}
        <div className="space-y-1.5">
          <p
            className="font-semibold uppercase"
            style={{
              fontSize: "10px",
              letterSpacing: "0.12em",
              color: "hsl(228, 8%, 46%)",
            }}
          >
            {data.timeAgo}
          </p>
          <h2
            className="font-semibold leading-tight"
            style={{
              fontSize: "clamp(0.9rem, 4vw, 1.1rem)",
              lineHeight: 1.35,
              color: "hsl(0, 0%, 93%)",
              textWrap: "balance",
            }}
          >
            {data.headline}
          </h2>
        </div>

        {/* Poll section */}
        <div className="flex flex-col gap-2 mt-auto">
          <p
            className="font-medium"
            style={{
              fontSize: "12px",
              color: "hsl(0, 0%, 55%)",
              letterSpacing: "0.01em",
            }}
          >
            {data.pollQuestion}
          </p>

          {/* Poll options */}
          <div className="flex flex-col gap-2">
            {data.options.map((opt, i) => {
              const Icon = iconMap[opt.icon];
              return (
                <button
                  key={i}
                  className="flex items-center justify-between rounded-xl px-3.5 py-3 text-[13px] font-medium transition-all duration-150 active:scale-[0.97]"
                  style={{
                    color: "hsl(0, 0%, 82%)",
                    background: "hsla(0, 0%, 100%, 0.05)",
                    border: "1px solid hsla(0, 0%, 100%, 0.06)",
                  }}
                >
                  <span className="truncate mr-2">{opt.label}</span>
                  <Icon
                    size={14}
                    className="flex-shrink-0"
                    style={{ color: "hsl(228, 8%, 42%)" }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
