# How It Works v2 — Design Spec

**Goal:** Rewrite `HowItWorksScroll.tsx` to a premium, production-grade section with proper mobile support, phased screen transitions, staggered text animations, step indicator states (completed/active/upcoming), and a fixed vertical progress bar.

**Architecture:** Single component file. Desktop uses scroll-driven sticky mechanics (500vh container). Mobile (<768px) drops scroll-driven entirely and uses a tap/swipe carousel. Tablet (768–1023px) uses the same scroll-driven logic but with a stacked vertical layout. All three breakpoints share the same step data, state machine, and `goTo()` logic.

---

## Layout

### Desktop (≥1024px)

```
┌──────────────────────────────────────────────────────┐  ●
│                                                      │  │
│    [Phone 375×812px]   140px gap   [Text 480px max]  │  │ fixed
│       left half                   step 01            │  │ right
│                                   Title 48px         │  │ 40px
│                                   Description        │  │ from
│                                                      │  │ edge
└──────────────────────────────────────────────────────┘  ○
              max-width: 1200px, centered
```

- Container max-width: `1200px`, centered, `padding: 0 60px`
- Phone: `width: 280px` (frame width, proportional to chrome SVG assets we have), left column
- Gap between phone and text: `140px`
- Text column: `max-width: 440px`, flex: 1
- Progress bar: `position: fixed`, `right: 40px`, `top: 50%`, `translateY(-50%)`, `height: 240px`, `width: 2px`, z-index above page content

> Note: Phone frame uses existing SVG chrome assets. Frame width `280px` (not the Figma 375px) to match the chrome asset proportions already in the codebase.

### Tablet (768–1023px)

- Phone centered, `width: 220px`
- Text block centered below phone, `max-width: 400px`
- Progress bar: horizontal, `position: absolute`, `bottom: 0`, `left: 0`, `right: 0`, `height: 2px` (same as current)
- Fixed right-side bar hidden

### Mobile (<768px)

- Static section height (no scroll-driven, no 500vh container)
- Tab dots at top (4 circles, active = 12px, inactive = 8px)
- Phone centered, `width: 200px`
- Step text below phone (label + title + description)
- Prev/Next buttons below text
- Swipe left/right on phone area → navigate
- Auto-advance continues (same 3500ms timer)

---

## Section Heading

"How it works" heading lives **outside** the sticky container — it's a normal block element above the scroll zone that scrolls away as the sticky section begins.

```tsx
{/* Section heading — scrolls away before sticky kicks in */}
<div className="hiw-section-header">
  <p className="hiw-overline">How it works</p>
  <h2 className="hiw-heading">Four steps.<br />Zero confusion.</h2>
</div>

{/* Scroll container — 500vh */}
<div ref={outerRef} style={{ height: '500vh', position: 'relative' }}>
  <div className="hiw-scroll-sticky" style={{ position: 'sticky', top: 0 }}>
    ...
  </div>
</div>
```

Heading styles:
- Overline: `11px`, `600 weight`, `0.1em tracking`, uppercase, `#a8a29e`
- H2: `56px`, `700 weight`, `-0.02em tracking`, `1.1 line-height`, `#1c1917`
- Padding: `120px 60px 80px`, max-width `1200px`, centered

---

## Scroll Logic (Desktop & Tablet)

**Container:** `500vh` outer div with `position: relative`.
**Sticky panel:** `position: sticky; top: 0; height: 100vh`.
**Scrollable distance:** `500vh - 100vh = 400vh` = 4 zones × 100vh each.

**Zone math with dead zone:**
```ts
const totalScroll = outerRef.current.offsetHeight - window.innerHeight; // 400vh in px
const scrolled = Math.max(0, -rect.top);
const raw = Math.min(1, scrolled / totalScroll); // 0 → 1
const raw4 = raw * 4; // 0 → 4

// Dead zone: each step activates at 30% into its zone (not at the zone boundary).
// This prevents twitchy transitions when scrolling near a zone boundary.
// Step 0: active from raw4 = 0 to 1.3
// Step 1: active from raw4 = 1.3 to 2.3
// Step 2: active from raw4 = 2.3 to 3.3
// Step 3: active from raw4 = 3.3 to 4.0
const nextStep =
  raw4 >= 3.3 ? 3 :
  raw4 >= 2.3 ? 2 :
  raw4 >= 1.3 ? 1 : 0;
```

The `nextStep` value is compared to the current `active` state. If different and no transition is in progress, trigger the state machine. Feels calm, never twitchy.

---

## Transition State Machine

Step changes go through a 3-phase sequence instead of an instant swap.

```
idle
 │
 ├─ step change requested
 ▼
exiting (400ms)
  • old screen: opacity 1→0, blur 0→24px, scale 1→0.92
  • old text: opacity 1→0, translateY 0→-12px (label→title→desc staggered)
 │
 ▼
paused (300ms)
  • screen area shows background color (#000 or dark)
  • displayStep switches to new step here (images swap while hidden)
 │
 ▼
entering (400ms)
  • new screen: opacity 0→1, blur 24px→0, scale 0.92→1
  • new text: opacity 0→1, translateY 16px→0 (label→title→desc staggered)
 │
 ▼
idle
```

**State variables:**
```ts
const [active, setActive] = useState(0);          // target step
const [displayStep, setDisplayStep] = useState(0); // currently rendered step
const [phase, setPhase] = useState<'idle'|'exiting'|'paused'|'entering'>('idle');
```

**On step change** (`active` changes and `phase === 'idle'`):
```ts
setPhase('exiting');
setTimeout(() => {
  setPhase('paused');
  setDisplayStep(newStep);           // swap images while invisible
  setTimeout(() => {
    setPhase('entering');
    setTimeout(() => setPhase('idle'), 400);
  }, 300);
}, 400);
```

**Guard:** if a new step change arrives during a transition, queue it and apply after `entering` completes.

---

## Step Indicators (Left vertical track, desktop only)

Three states:

| State | Size | Fill | Extra |
|-------|------|------|-------|
| Completed (i < active) | 12px | `#10B981` green | White checkmark SVG, `0 0 0 3px rgba(16,185,129,0.15)` shadow |
| Active (i === active) | 14px | `#1c1917` black | `0 0 0 4px rgba(28,25,23,0.12)` shadow, pulse animation |
| Upcoming (i > active) | 8px | transparent | `2px solid #d1d5db` border |

**Connector line** between dots:
- Full line: `2px wide`, `#e5e7eb` grey, connects all dots
- Filled portion: green (`#10B981`) from top to bottom of last completed dot, transitions with `height` animation `600ms ease-out`

**Active pulse:**
```css
@keyframes hiw-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.08); }
}
animation: hiw-pulse 2s ease-in-out infinite;
```

**Hover on inactive/upcoming dots:**
```css
.hiw-indicator:not(.active):not(.completed):hover {
  transform: scale(1.15);
  border-color: #0EA5E9;
}
```

---

## Text Block (Desktop right column)

Each step has three elements: label, title, description. They animate with stagger.

**CSS classes driven by `phase`:**

```css
/* Exit phase */
.hiw-text-label,
.hiw-text-title,
.hiw-text-desc {
  transition: opacity 400ms ease-in, transform 400ms ease-in;
}
.hiw-text-block.exiting .hiw-text-label { opacity: 0; transform: translateY(-12px); transition-delay: 0ms; }
.hiw-text-block.exiting .hiw-text-title { opacity: 0; transform: translateY(-12px); transition-delay: 50ms; }
.hiw-text-block.exiting .hiw-text-desc  { opacity: 0; transform: translateY(-12px); transition-delay: 100ms; }

/* Enter phase */
.hiw-text-block.entering .hiw-text-label { animation: hiw-text-in 400ms ease-out 0ms both; }
.hiw-text-block.entering .hiw-text-title { animation: hiw-text-in 400ms ease-out 100ms both; }
.hiw-text-block.entering .hiw-text-desc  { animation: hiw-text-in 400ms ease-out 200ms both; }

@keyframes hiw-text-in {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

**Typography:**
```css
.hiw-text-label {
  font-size: 11px; font-weight: 600; letter-spacing: 0.16em;
  text-transform: uppercase; color: #9CA3AF; line-height: 1;
}
.hiw-text-title {
  font-size: 40px; font-weight: 700; letter-spacing: -0.02em;
  line-height: 1.1; color: #111827; margin-top: 12px;
}
.hiw-text-desc {
  font-size: 18px; font-weight: 400; line-height: 1.65;
  color: #6B7280; margin-top: 16px; max-width: 440px;
}
```

**Hover on inactive step text (desktop):**
- Non-active step titles color: `#D1D5DB`
- On hover: title turns `#0EA5E9` (brand blue), cursor: pointer
- Active step: always `#111827`, no hover change

---

## Fixed Progress Bar (Desktop only)

```
position: fixed
right: 40px
top: 50%
transform: translateY(-50%)
height: 240px
width: 2px
background: rgba(28,25,23,0.08)
z-index: 100
```

- 4 dot markers positioned at `0%`, `33%`, `66%`, `100%` of the bar height (6px × 6px circles)
- Active dot: `#1c1917`, inactive: `#d1d5db`
- Fill line: grows from `0` to `step/3 * 100%` of bar height, `#1c1917`, `600ms ease-out`
- Visible only when section is in view (controlled by `inViewRef` via IntersectionObserver)
- Hidden on tablet/mobile via media query

---

## Mobile Carousel (<768px)

No `400vh`/`500vh` outer container. Section has `auto` height.

**Layout (top to bottom):**
1. Tab dots (4 circles, flexbox centered, `gap: 12px`)
2. Phone (`width: 200px`, centered, `touch-action: pan-y` on wrapper)
3. Text block (label + title + description, centered, `padding: 0 32px`)
4. Prev/Next buttons (flexbox, space-between, `padding: 0 32px`)

**Swipe detection:**
```ts
const touchStartX = useRef(0);
const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
const onTouchEnd = (e: React.TouchEvent) => {
  const delta = touchStartX.current - e.changedTouches[0].clientX;
  if (Math.abs(delta) > 50) {
    if (delta > 0) goTo(Math.min(3, active + 1)); // swipe left → next
    else           goTo(Math.max(0, active - 1)); // swipe right → prev
  }
};
```

**Slide transitions (no blur on mobile — performance):**
```css
.hiw-mobile-content {
  transition: opacity 300ms ease, transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
}
.hiw-mobile-content.exiting {
  opacity: 0;
  transform: translateX(-40px);
}
.hiw-mobile-content.entering {
  opacity: 0;
  transform: translateX(40px);
}
```

Auto-advance continues on mobile (same 3500ms, same `inViewRef` guard).

---

## `isMobile` Detection

Detected on mount via `window.innerWidth`, updated on resize with debounce.

```ts
const [isMobile, setIsMobile] = useState(false);
useEffect(() => {
  const check = () => setIsMobile(window.innerWidth < 768);
  check();
  window.addEventListener('resize', check);
  return () => window.removeEventListener('resize', check);
}, []);
```

When `isMobile === true`:
- Skip scroll listener attachment
- Render mobile layout (no `500vh` outer)

---

## Hover States (Desktop)

**Inactive step indicators:**
```css
.hiw-indicator:not(.active):not(.completed):hover {
  transform: scale(1.15);
  border-color: #0EA5E9;
  cursor: pointer;
}
```

**Inactive step text titles:**
```css
.hiw-text-block:not(.active):hover .hiw-text-title {
  color: #0EA5E9;
  cursor: pointer;
}
.hiw-text-block.active .hiw-text-title {
  color: #111827;
}
```

---

## Accessibility

```html
<section role="region" aria-label="How FlightPassport works">
  <div aria-live="polite" aria-atomic="true" className="sr-only">
    Step {displayStep + 1} of 4: {STEPS[displayStep].title}
  </div>
```

Keyboard:
- `Arrow Down` / `Arrow Right` → next step
- `Arrow Up` / `Arrow Left` → previous step
- `Home` → step 1, `End` → step 4
- `Tab` navigates to each indicator dot, `Enter`/`Space` activates

```tsx
onKeyDown={(e) => {
  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') goTo(Math.min(3, active + 1));
  if (e.key === 'ArrowUp'   || e.key === 'ArrowLeft')  goTo(Math.max(0, active - 1));
  if (e.key === 'Home') goTo(0);
  if (e.key === 'End')  goTo(3);
}}
```

Reduced motion:
```css
@media (prefers-reduced-motion: reduce) {
  .hiw-screen-img { filter: none !important; transform: none !important; }
  .hiw-text-label, .hiw-text-title, .hiw-text-desc { animation: none !important; transition: opacity 200ms ease !important; }
  @keyframes hiw-pulse { from, to { transform: scale(1); } }
}
```

---

## What Is Out of Scope

- Sound design
- Lazy loading images (4 small images, unnecessary)
- Phone tilt parallax (deferred to future polish pass)
- Analytics / success metrics

---

## File Map

| Action | Path |
|--------|------|
| **Rewrite** | `site/app/components/HowItWorksScroll.tsx` |
| **Modify** | `site/app/page.tsx` — add `<div className="hiw-section-header">` wrapping element before `<HowItWorksScroll />` if needed, or put heading inside the component |

The section heading will live inside `HowItWorksScroll.tsx` (above the scroll container) to keep everything self-contained.
