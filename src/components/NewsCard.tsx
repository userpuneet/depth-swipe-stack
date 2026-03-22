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
    <div className="flex h-full w-full flex-col rounded-3xl bg-white/[0.08] backdrop-blur-2xl border border-white/[0.12] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.10)]">
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
      <div className="flex flex-1 flex-col justify-between p-5 gap-4 bg-gradient-to-b from-black/20 to-black/50">
        <div className="space-y-2">
          <h2
            className="text-[hsl(0,0%,95%)] font-semibold leading-snug"
            style={{ fontSize: "clamp(1rem, 4.5vw, 1.25rem)", lineHeight: 1.3, textWrap: "balance" }}
          >
            {data.headline}
          </h2>
          <p className="text-xs font-medium uppercase tracking-widest text-[hsl(228,8%,50%)]">
            {data.timeAgo}
          </p>
          <p className="text-sm font-semibold text-[hsl(0,0%,82%)] leading-snug">
            {data.pollQuestion}
          </p>
        </div>

        {/* Poll options — side by side */}
        <div className="flex flex-row gap-2.5">
          {data.options.map((opt, i) => {
            const Icon = iconMap[opt.icon];
            return (
              <button
                key={i}
                className="flex flex-1 items-center justify-between rounded-2xl border border-white/[0.12] bg-white/[0.06] px-4 py-3.5 text-sm font-medium text-[hsl(0,0%,85%)] transition-all duration-150 hover:bg-white/[0.12] hover:border-white/[0.20] active:scale-[0.97]"
              >
                <span>{opt.label}</span>
                <Icon size={16} className="text-[hsl(228,8%,60%)] ml-2 flex-shrink-0" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
