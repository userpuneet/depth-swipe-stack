import { useState, useRef, useCallback } from "react";
import NewsCard, { type NewsCardData } from "./NewsCard";

interface CardStackProps {
  cards: NewsCardData[];
}

const SWIPE_THRESHOLD = 60;

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

  const onTouchStart = useCallback((e: React.TouchEvent) => handleDragStart(e.touches[0].clientY), [handleDragStart]);
  const onTouchMove = useCallback((e: React.TouchEvent) => handleDragMove(e.touches[0].clientY), [handleDragMove]);
  const onTouchEnd = useCallback(() => handleDragEnd(), [handleDragEnd]);

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

    // Current card — centered with equal padding on all sides
    if (offset === 0) {
      return {
        transform: `translateY(${dragProgress}px)`,
        opacity: 1,
        zIndex: 10,
        transition,
      };
    }

    // Previous card — peeking from top
    if (offset === -1) {
      const pullDown = dragProgress > 0 ? Math.min(dragProgress * 0.6, 150) : 0;
      return {
        transform: `translateY(calc(-82% + ${pullDown}px)) scale(0.94)`,
        opacity: 0.5 + (pullDown / 150) * 0.5,
        zIndex: 5,
        transition,
        filter: "blur(2px)",
      };
    }

    // Next card — peeking from bottom
    if (offset === 1) {
      const pushUp = dragProgress < 0 ? Math.min(Math.abs(dragProgress) * 0.6, 150) : 0;
      return {
        transform: `translateY(calc(82% - ${pushUp}px)) scale(0.94)`,
        opacity: 0.5 + (pushUp / 150) * 0.5,
        zIndex: 5,
        transition,
        filter: "blur(2px)",
      };
    }

    // Off-screen cards
    if (offset < -1) {
      return { transform: "translateY(-120%) scale(0.88)", opacity: 0, zIndex: 1, transition, pointerEvents: "none" };
    }
    return { transform: "translateY(120%) scale(0.88)", opacity: 0, zIndex: 1, transition, pointerEvents: "none" };
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
      {renderRange.map((i) => (
        <div
          key={cards[i].id}
          className="absolute inset-x-0 flex items-center justify-center px-5"
          style={{
            top: "env(safe-area-inset-top, 0px)",
            bottom: "0px",
            paddingTop: "8px",
            paddingBottom: "8px",
            ...getCardStyle(i),
          }}
        >
          <div className="w-full h-full max-h-full">
            <NewsCard data={cards[i]} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardStack;
