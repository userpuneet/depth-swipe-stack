import type { NewsCardData } from "../components/NewsCard";

export const newsCards: NewsCardData[] = [
  {
    id: 1,
    image: "https://picsum.photos/seed/climate/800/500",
    isLive: true,
    headline: "Senate passes landmark climate bill with bipartisan support in late-night session",
    timeAgo: "5H AGO",
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
    options: [
      { label: "Market confidence", icon: "check" },
      { label: "Bubble forming", icon: "warning" },
    ],
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=500&fit=crop",
    isLive: true,
    headline: "Global cybersecurity breach exposes millions of records across 40 countries",
    timeAgo: "45M AGO",
    options: [
      { label: "Wake-up call needed", icon: "check" },
      { label: "Overblown threat", icon: "warning" },
    ],
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1574169208507-84376898527d?w=800&h=500&fit=crop",
    isLive: false,
    headline: "Space agency confirms discovery of water signatures on distant exoplanet",
    timeAgo: "8H AGO",
    options: [
      { label: "Breakthrough moment", icon: "check" },
      { label: "Premature claims", icon: "warning" },
    ],
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=500&fit=crop",
    isLive: false,
    headline: "World Health Organization declares new pandemic preparedness framework",
    timeAgo: "1D AGO",
    options: [
      { label: "Proactive step", icon: "check" },
      { label: "Too restrictive", icon: "warning" },
    ],
  },
];
