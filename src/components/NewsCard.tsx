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
  const [accentColor, setAccentColor] = useState("rgba(80,80,80,0.3)");
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
        setAccentColor(`rgba(${pixel[0]}, ${pixel[1]}, ${pixel[2]}, 0.45)`);
      } catch {
        // CORS or other error
      }
    };
  }, [data.image]);

  return (
    <div className="relative flex h-full w-full flex-col overflow-visible">
      {/* Large accent glow — bleeds beyond bounds for blended feel */}
      <div
        className="absolute -inset-20 -z-10"
        style={{
          background: `radial-gradient(ellipse at 50% 35%, ${accentColor} 0%, transparent 65%)`,
          filter: "blur(60px)",
        }}
      />

      {/* Image — no rounded corners, bleeds edge to edge */}
      <div className="relative flex-shrink-0">
        <img
          ref={imgRef}
          src={data.image}
          alt={data.headline}
          className="w-full aspect-[16/10] object-cover"
          loading="lazy"
          crossOrigin="anonymous"
          style={{
            maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
          }}
        />
        {data.isLive && (
          <div
            className="absolute top-3.5 left-3.5 flex items-center gap-1.5 rounded-full px-2.5 py-0.5"
            style={{
              background: "hsla(142, 70%, 45%, 0.8)",
              boxShadow: "0 0 20px hsla(142, 70%, 45%, 0.5)",
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

      {/* Content — floats openly, no container feel */}
      <div className="flex flex-1 flex-col justify-between px-1 pt-2 pb-2 gap-2">
        <div className="space-y-1.5">
          <p
            className="font-semibold uppercase"
            style={{
              fontSize: "10px",
              letterSpacing: "0.12em",
              color: "hsla(228, 8%, 50%, 0.7)",
            }}
          >
            {data.timeAgo}
          </p>
          <h2
            className="font-semibold leading-tight"
            style={{
              fontSize: "clamp(0.9rem, 4vw, 1.1rem)",
              lineHeight: 1.35,
              color: "hsla(0, 0%, 93%, 0.95)",
              textWrap: "balance",
            }}
          >
            {data.headline}
          </h2>
        </div>

        {/* Poll section — borderless, ghost buttons */}
        <div className="flex flex-col gap-2 mt-auto">
          <p
            className="font-medium"
            style={{
              fontSize: "12px",
              color: "hsla(0, 0%, 55%, 0.7)",
              letterSpacing: "0.01em",
            }}
          >
            {data.pollQuestion}
          </p>

          <div className="flex flex-col gap-1.5">
            {data.options.map((opt, i) => {
              const Icon = iconMap[opt.icon];
              return (
                <button
                  key={i}
                  className="flex items-center justify-between rounded-2xl px-3.5 py-2.5 text-[13px] font-medium transition-all duration-150 active:scale-[0.97]"
                  style={{
                    color: "hsla(0, 0%, 80%, 0.85)",
                    background: "hsla(0, 0%, 100%, 0.03)",
                    border: "none",
                  }}
                >
                  <span className="truncate mr-2">{opt.label}</span>
                  <Icon
                    size={14}
                    className="flex-shrink-0"
                    style={{ color: "hsla(228, 8%, 42%, 0.6)" }}
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
