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
    </div>
  );
};

export default Index;
