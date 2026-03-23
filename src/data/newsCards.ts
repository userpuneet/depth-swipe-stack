import type { NewsCardData } from "../components/NewsCard";

export const newsCards: NewsCardData[] = [
  {
    id: 1,
    image: "https://picsum.photos/seed/climate/800/500",
    isLive: true,
    headline: "Senate passes landmark climate bill with bipartisan support in late-night session",
    timeAgo: "5H AGO",
    pollQuestion: "What's your take on this development?",
    options: [
      { label: "Promising development", icon: "check" },
      { label: "Damaging take", icon: "warning" },
    ],
  },
  {
    id: 2,
    image: "https://picsum.photos/seed/tech/800/500",
    isLive: false,
    headline: "Tech giants report record earnings amid growing AI investment wave",
    timeAgo: "2H AGO",
    pollQuestion: "How do you see the AI market?",
    options: [
      { label: "Market confidence", icon: "check" },
      { label: "Bubble forming", icon: "warning" },
    ],
  },
  {
    id: 3,
    image: "https://picsum.photos/seed/cyber/800/500",
    isLive: true,
    headline: "Global cybersecurity breach exposes millions of records across 40 countries",
    timeAgo: "45M AGO",
    pollQuestion: "Is this being taken seriously enough?",
    options: [
      { label: "Wake-up call needed", icon: "check" },
      { label: "Overblown threat", icon: "warning" },
    ],
  },
  {
    id: 4,
    image: "https://picsum.photos/seed/space/800/500",
    isLive: false,
    headline: "Space agency confirms discovery of water signatures on distant exoplanet",
    timeAgo: "8H AGO",
    pollQuestion: "What does this mean for space exploration?",
    options: [
      { label: "Breakthrough moment", icon: "check" },
      { label: "Premature claims", icon: "warning" },
    ],
  },
  {
    id: 5,
    image: "https://picsum.photos/seed/health/800/500",
    isLive: false,
    headline: "World Health Organization declares new pandemic preparedness framework",
    timeAgo: "1D AGO",
    pollQuestion: "Is this the right approach?",
    options: [
      { label: "Proactive step", icon: "check" },
      { label: "Too restrictive", icon: "warning" },
    ],
  },
];
