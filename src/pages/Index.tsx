import CardStack from "../components/CardStack";
import { newsCards } from "../data/newsCards";

const Index = () => {
  return (
    <div
      className="fixed inset-0 w-full"
      style={{ background: "hsl(228, 15%, 7%)" }}
    >
      <CardStack cards={newsCards} />
    </div>
  );
};

export default Index;
