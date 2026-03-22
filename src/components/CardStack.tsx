import { useState, useRef, useCallback } from "react";
import NewsCard, { type NewsCardData } from "./NewsCard";

interface CardStackProps {
  cards: NewsCardData[];
}

const SWIPE_THRESHOLD = 60;
const PEEK_HEIGHT = 64;

const CardStack = ({ cards }: CardStackProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragY, setDragY] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const startY = useRef(0);
  const isDragging = useRef(false);

  const handleDragStart = useCallback(
    (clientY: number) => {
      if (isTransitioning) return;
      startY.current = clientY;
      isDragging.current = true;
      setDragY(0);
    },
    [isTransitioning]
  );

  const handleDragMove = useCallback(
    (clientY: number) => {
      if (!isDragging.current || isTransitioning) return;
      const delta = clientY - startY.current;
      if (delta > 0 && currentIndex === 0) {
        setDragY(delta * 0.2);
        return;
      }
      if (delta < 0 && currentIndex === cards.length - 1) {
        setDragY(delta * 0.2);
        return;
      }
      setDragY(delta);
    },
    [isTransitioning, currentIndex, cards.length]
  );

  const handleDragEnd = useCallback(() => {
    if (!isDragging.current || isTransitioning) return;
    isDragging.current = false;

    if (dragY < -SWIPE_THRESHOLD && currentIndex < cards.length - 1) {
      setIsTransitioning(true);
      setDragY(0);
      setCurrentIndex((i) => i + 1);
      setTimeout(() => setIsTransitioning(false), 350);
    } else if (dragY > SWIPE_THRESHOLD && currentIndex > 0) {
      setIsTransitioning(true);
      setDragY(0);
      setCurrentIndex((i) => i - 1);
      setTimeout(() => setIsTransitioning(false), 350);
    } else {
      setDragY(0);
    }
  }, [dragY, isTransitioning, currentIndex, cards.length]);

  // Touch handlers
  const onTouchStart = useCallback((e: React.TouchEvent) => handleDragStart(e.touches[0].clientY), [handleDragStart]);
  const onTouchMove = useCallback((e: React.TouchEvent) => handleDragMove(e.touches[0].clientY), [handleDragMove]);
  const onTouchEnd = useCallback(() => handleDragEnd(), [handleDragEnd]);

  // Mouse handlers
  const onMouseDown = useCallback((e: React.MouseEvent) => { e.preventDefault(); handleDragStart(e.clientY); }, [handleDragStart]);
  const onMouseMove = useCallback((e: React.MouseEvent) => handleDragMove(e.clientY), [handleDragMove]);
  const onMouseUp = useCallback(() => handleDragEnd(), [handleDragEnd]);
  const onMouseLeave = useCallback(() => { if (isDragging.current) handleDragEnd(); }, [handleDragEnd]);

  const getCardStyle = (index: number): React.CSSProperties => {
    const offset = index - currentIndex;
    const dragging = isDragging.current && !isTransitioning;
    const dragProgress = dragging ? dragY : 0;

    const transition = isTransitioning || !dragging
      ? "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1)"
      : "none";

    if (offset === 0) {
      const progress = Math.min(Math.abs(dragProgress) / 300, 1);
      const scale = 1 - progress * 0.08;
      return {
        transform: `translateY(${dragProgress}px) scale(${scale})`,
        opacity: 1,
        zIndex: 10,
        transition,
      };
    }

    if (offset === -1) {
      const pullDown = dragProgress > 0 ? Math.min(dragProgress * 0.5, 120) : 0;
      return {
        transform: `translateY(calc(-100% + ${PEEK_HEIGHT + pullDown}px)) scale(0.92)`,
        opacity: 0.5 + (pullDown / 120) * 0.5,
        zIndex: 5,
        transition,
      };
    }

    if (offset === 1) {
      const pushUp = dragProgress < 0 ? Math.min(Math.abs(dragProgress) * 0.5, 120) : 0;
      return {
        transform: `translateY(calc(100% - ${PEEK_HEIGHT + pushUp}px)) scale(0.92)`,
        opacity: 0.5 + (pushUp / 120) * 0.5,
        zIndex: 5,
        transition,
      };
    }

    if (offset < -1) {
      return { transform: "translateY(-120%) scale(0.85)", opacity: 0, zIndex: 1, transition, pointerEvents: "none" };
    }
    return { transform: "translateY(120%) scale(0.85)", opacity: 0, zIndex: 1, transition, pointerEvents: "none" };
  };

  const renderRange = [currentIndex - 1, currentIndex, currentIndex + 1].filter(
    (i) => i >= 0 && i < cards.length
  );

  return (
    <div
      className="relative h-full w-full overflow-hidden select-none"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
    >
      {/* Card indicator dots */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-1.5">
        {cards.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-300"
            style={{
              width: 6,
              height: i === currentIndex ? 18 : 6,
              backgroundColor: i === currentIndex ? "hsl(0, 0%, 95%)" : "hsl(228, 8%, 35%)",
            }}
          />
        ))}
      </div>

      {renderRange.map((i) => (
        <div
          key={cards[i].id}
          className="absolute inset-0 p-4"
          style={getCardStyle(i)}
        >
          <NewsCard data={cards[i]} />
        </div>
      ))}
    </div>
  );
};

export default CardStack;
