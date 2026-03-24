import CardStack from "../components/CardStack";
import { newsCards } from "../data/newsCards";

const Index = () => {
  return (
    <div
      className="fixed w-full"
      style={{
        background: "hsl(0, 0%, 0%)",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: "100%",
      }}
    >
      <CardStack cards={newsCards} />
    </div>
  );
};

export default Index;
