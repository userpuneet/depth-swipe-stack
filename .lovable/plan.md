

## News Card Stack UI with Swipe Navigation

### Design Analysis (from screenshot)

- Dark theme, full-screen mobile layout
- Cards with: image area (with "LIVE" badge), headline text, timestamp, and poll options (e.g. "Promising development" / "Damaging take")
- Previous card peeks at top with depth/scale effect
- Next card peeks at bottom with depth/scale effect
- Swipe up to advance; current card shrinks to top, next card slides up

### Architecture

**Files to create/modify:**

1. **`src/pages/Index.tsx`** - Main page rendering the card stack
2. **`src/components/CardStack.tsx`** - Core swipe logic with touch handling and card positioning
3. **`src/components/NewsCard.tsx`** - Individual card UI (image, LIVE badge, headline, time, poll options)
4. **`src/index.css`** - Dark theme variables
5. **`tailwind.config.ts`** - Add custom keyframes for slide transitions

### Card Stack Behavior

- Track `currentIndex` state
- Render 3 cards at a time: previous (scaled down, partially visible at top), current (full), next (peeking at bottom)
- Touch events: `onTouchStart`, `onTouchMove`, `onTouchEnd` to detect vertical swipe
- On swipe up beyond threshold (~80px): animate current card up and shrink, bring next card to center
- On swipe down: reverse (go to previous)
- CSS transforms: `translateY`, `scale`, and `opacity` for depth effect
- Use `transition` for smooth 300ms animations

### Card Layout

```text
┌─────────────────────┐
│ ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄ │  ← prev card (scale:0.92, opacity:0.5, peek ~60px)
├─────────────────────┤
│  [LIVE]             │
│  ┌───────────────┐  │
│  │   Image       │  │
│  │               │  │
│  └───────────────┘  │
│  Headline text...   │  ← current card (full size)
│  5H AGO             │
│  [Option 1    ✓]    │
│  [Option 2    ⚠]    │
├─────────────────────┤
│ ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄ │  ← next card (scale:0.92, peek ~60px)
└─────────────────────┘
```

### Mock Data

5-6 sample news cards with placeholder images, headlines, timestamps, and poll options to demonstrate the interaction.

### Key Implementation Details

- Use `useRef` for touch tracking, `useState` for current index and transition state
- Cards use `position: absolute` within a relative container, positioned via `transform`
- During drag: interpolate translateY based on finger position for fluid feel
- Poll options: rounded pill buttons with icons (check, warning triangle) using lucide-react
- LIVE badge: green background, white text, rounded pill
- Dark background: `bg-gray-950`, cards: `bg-gray-900` with subtle border

