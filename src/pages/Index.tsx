import CardStack from "../components/CardStack";
import { newsCards } from "../data/newsCards";

const Index = () => {
  return (
    <div
      className="fixed inset-0 w-full"
      style={{
        background: "hsl(0, 0%, 0%)",
        height: "100dvh",
      }}
    >
      <CardStack cards={newsCards} />
      {/* Tilt-shift blur overlays */}
      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-50"
        style={{
          height: "18%",
          background: "linear-gradient(to bottom, hsla(0,0%,0%,0.4) 0%, transparent 100%)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
        }}
      />
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-50"
        style={{
          height: "18%",
          background: "linear-gradient(to top, hsla(0,0%,0%,0.4) 0%, transparent 100%)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          maskImage: "linear-gradient(to top, black 0%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 100%)",
        }}
      />
    </div>
  );
};

export default Index;
