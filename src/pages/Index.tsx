import CardStack from "../components/CardStack";
import { newsCards } from "../data/newsCards";

const Index = () => {
  return (
    <div className="h-[100dvh] w-full bg-[hsl(228,15%,7%)]">
      <CardStack cards={newsCards} />
    </div>
  );
};

export default Index;
