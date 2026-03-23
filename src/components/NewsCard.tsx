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
  return (
    <div
      className="flex h-full w-full flex-col rounded-3xl overflow-hidden"
      style={{
        background: "hsla(0, 0%, 100%, 0.08)",
        backdropFilter: "blur(60px) saturate(1.8)",
        WebkitBackdropFilter: "blur(60px) saturate(1.8)",
        border: "1px solid hsla(0, 0%, 100%, 0.18)",
        boxShadow:
          "0 8px 32px hsla(0, 0%, 0%, 0.4), inset 0 1px 0 hsla(0, 0%, 100%, 0.2), inset 0 -1px 0 hsla(0, 0%, 100%, 0.05)",
      }}
    >
      {/* Image area */}
      <div className="relative flex-shrink-0">
        <img
          src={data.image}
          alt={data.headline}
          className="w-full aspect-[16/10] object-cover"
          loading="lazy"
        />
        {data.isLive && (
          <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-[hsl(142,70%,45%)] px-3 py-1">
            <Radio size={12} className="text-white" />
            <span className="text-xs font-bold uppercase tracking-wider text-white">Live</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-5 gap-3">
        <div className="space-y-2">
          <h2
            className="font-semibold leading-snug"
            style={{
              fontSize: "clamp(1rem, 4.5vw, 1.25rem)",
              lineHeight: 1.3,
              textWrap: "balance",
              color: "hsl(0, 0%, 95%)",
            }}
          >
            {data.headline}
          </h2>
          <p
            className="text-xs font-medium uppercase tracking-widest"
            style={{ color: "hsl(228, 8%, 50%)" }}
          >
            {data.timeAgo}
          </p>
        </div>

        {/* Poll question */}
        <p className="text-sm font-medium" style={{ color: "hsl(0, 0%, 75%)" }}>
          {data.pollQuestion}
        </p>

        {/* Poll options — stacked vertically */}
        <div className="flex flex-col gap-2.5">
          {data.options.map((opt, i) => {
            const Icon = iconMap[opt.icon];
            return (
              <button
                key={i}
                className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-medium transition-all duration-150 active:scale-[0.97]"
                style={{
                  color: "hsl(0, 0%, 85%)",
                  background: "hsla(0, 0%, 100%, 0.06)",
                  border: "1px solid hsla(0, 0%, 100%, 0.1)",
                }}
              >
                <span className="truncate mr-2">{opt.label}</span>
                <Icon size={16} className="flex-shrink-0" style={{ color: "hsl(228, 8%, 50%)" }} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
