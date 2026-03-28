# How It Works — Scroll-Driven Sticky Section

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace 4 stacked "How it works" step sections with one premium scroll-driven sticky component where the phone screen and step text change as the user scrolls.

**Architecture:** A single `HowItWorksScroll` component uses a tall outer container (`400vh`) with a `position: sticky` inner panel (`100vh`). Scroll progress through the outer container maps to one of 4 active steps. The phone displays all 4 screen images stacked — only the active one is visible via opacity/blur/scale CSS transition. Left-side step list shows active step with expanded description. Auto-advance timer runs when the section is in view and the user is idle; scroll and click both override it.

**Tech Stack:** React (hooks: `useState`, `useEffect`, `useRef`, `useCallback`), CSS transitions (no animation library), IntersectionObserver, passive scroll listener, Next.js `'use client'`.

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| **Create** | `site/app/components/HowItWorksScroll.tsx` | Full new sticky scroll component |
| **Modify** | `site/app/page.tsx` | Remove 4 old functions + imports; add new import + `<HowItWorksScroll />` |

---

## Step data (reference for all tasks)

```ts
const STEPS = [
  {
    num: '01',
    title: 'Add your flight',
    desc: 'Enter a flight number or search by route. Full operational data loads instantly.',
    image: '/Images/asset-6d585e68-0d7f-496f-b018-4e5caf21dcec.png',
  },
  {
    num: '02',
    title: 'Understand it',
    desc: 'Review delay history, aircraft info, and turbulence before you reach the airport.',
    image: '/Images/asset-e7f0beef-9438-42ea-8d9c-bf615f9c17d2.png',
  },
  {
    num: '03',
    title: 'Track in real time',
    desc: 'Live updates on every leg — boarding, gate changes, connection windows, arrival.',
    image: '/Images/asset-60c1185f-d58c-4975-aa4f-d446835553c6.png',
  },
  {
    num: '04',
    title: 'Save to passport',
    desc: 'Completed journeys are recorded automatically to your personal travel history.',
    image: '/Images/asset-step04-passport-screen.png',
  },
];
```

Phone chrome assets (reused from Step 01):
```ts
const PHONE_CHROME  = '/Images/asset-86b895c0-a5f5-4a8b-9e32-263a0e68f3ce.svg';
const NOTCH_BG      = '/Images/asset-aafac9b6-51e8-4dce-90ec-e33c5c266600.svg';
const NOTCH_VEC     = '/Images/asset-a9fba400-bc77-420d-9de0-4da39c0394cf.svg';
const NOTCH_VEC1    = '/Images/asset-d8920231-1efa-4db9-b77a-6ef32b757dfb.svg';
const NOTCH_VEC2    = '/Images/asset-45fae47c-d437-4da1-b971-3a16255445ac.svg';
const NOTCH_VEC3    = '/Images/asset-f88c0c1f-631b-4f69-ad76-8b0f6fa8c05d.svg';
const NOTCH_VEC4    = '/Images/asset-c2d10e38-14b8-4db6-a401-eb9cf66c19af.svg';
const NOTCH_CAM     = '/Images/asset-49ef7b55-4973-4b48-a834-5bd8b06c49c5.png';
```

---

## Task 1: Create `HowItWorksScroll.tsx` — skeleton + state

**Files:**
- Create: `site/app/components/HowItWorksScroll.tsx`

- [ ] **Step 1: Create the file with 'use client', imports, STEPS data, and component skeleton**

```tsx
'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

const STEPS = [
  {
    num: '01',
    title: 'Add your flight',
    desc: 'Enter a flight number or search by route. Full operational data loads instantly.',
    image: '/Images/asset-6d585e68-0d7f-496f-b018-4e5caf21dcec.png',
  },
  {
    num: '02',
    title: 'Understand it',
    desc: 'Review delay history, aircraft info, and turbulence before you reach the airport.',
    image: '/Images/asset-e7f0beef-9438-42ea-8d9c-bf615f9c17d2.png',
  },
  {
    num: '03',
    title: 'Track in real time',
    desc: 'Live updates on every leg — boarding, gate changes, connection windows, arrival.',
    image: '/Images/asset-60c1185f-d58c-4975-aa4f-d446835553c6.png',
  },
  {
    num: '04',
    title: 'Save to passport',
    desc: 'Completed journeys are recorded automatically to your personal travel history.',
    image: '/Images/asset-step04-passport-screen.png',
  },
];

const PHONE_CHROME = '/Images/asset-86b895c0-a5f5-4a8b-9e32-263a0e68f3ce.svg';
const NOTCH_BG     = '/Images/asset-aafac9b6-51e8-4dce-90ec-e33c5c266600.svg';
const NOTCH_VEC    = '/Images/asset-a9fba400-bc77-420d-9de0-4da39c0394cf.svg';
const NOTCH_VEC1   = '/Images/asset-d8920231-1efa-4db9-b77a-6ef32b757dfb.svg';
const NOTCH_VEC2   = '/Images/asset-45fae47c-d437-4da1-b971-3a16255445ac.svg';
const NOTCH_VEC3   = '/Images/asset-f88c0c1f-631b-4f69-ad76-8b0f6fa8c05d.svg';
const NOTCH_VEC4   = '/Images/asset-c2d10e38-14b8-4db6-a401-eb9cf66c19af.svg';
const NOTCH_CAM    = '/Images/asset-49ef7b55-4973-4b48-a834-5bd8b06c49c5.png';

export default function HowItWorksScroll() {
  const outerRef   = useRef<HTMLDivElement>(null);
  const [active, setActive]       = useState(0);
  const isScrollingRef            = useRef(false);
  const scrollTimerRef            = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoTimerRef              = useRef<ReturnType<typeof setInterval> | null>(null);
  const inViewRef                 = useRef(false);

  return (
    <div ref={outerRef} style={{ height: '400vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh' }}>
        <p>Step {active + 1}</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify the file compiles — run dev server**

```bash
cd "/Users/vitaliitrus/Projects/flight passport landing/site" && npm run dev
```

Expected: server starts, no TypeScript errors.

---

## Task 2: Scroll-driven step logic

**Files:**
- Modify: `site/app/components/HowItWorksScroll.tsx`

- [ ] **Step 1: Add the scroll handler and auto-advance logic inside `HowItWorksScroll`, replacing the placeholder `useEffect` area after the refs are declared**

Add these hooks inside the component body, before `return`:

```tsx
  // ── Scroll → step mapping ──────────────────────────────────────────────────
  const handleScroll = useCallback(() => {
    if (!outerRef.current) return;

    // Track "user is scrolling" to pause auto-advance
    isScrollingRef.current = true;
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 150);

    const rect      = outerRef.current.getBoundingClientRect();
    const totalScroll = outerRef.current.offsetHeight - window.innerHeight; // 300vh
    const scrolled    = Math.max(0, -rect.top);
    const progress    = Math.min(1, scrolled / totalScroll);          // 0 → 1
    const step        = Math.min(STEPS.length - 1, Math.floor(progress * STEPS.length));
    setActive(step);
  }, []);

  // ── Auto-advance (runs when idle + section in view) ────────────────────────
  const startAuto = useCallback(() => {
    if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    autoTimerRef.current = setInterval(() => {
      if (!isScrollingRef.current && inViewRef.current) {
        setActive(prev => (prev + 1) % STEPS.length);
      }
    }, 3500);
  }, []);

  const stopAuto = useCallback(() => {
    if (autoTimerRef.current) {
      clearInterval(autoTimerRef.current);
      autoTimerRef.current = null;
    }
  }, []);

  // ── Wire up scroll listener + IntersectionObserver ────────────────────────
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    const obs = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          startAuto();
        } else {
          stopAuto();
        }
      },
      { threshold: 0.1 }
    );
    if (outerRef.current) obs.observe(outerRef.current);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      obs.disconnect();
      stopAuto();
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, [handleScroll, startAuto, stopAuto]);

  // ── Click handler (manual step jump) ──────────────────────────────────────
  const goTo = useCallback((index: number) => {
    setActive(index);
    // Restart auto after manual selection
    stopAuto();
    startAuto();
  }, [startAuto, stopAuto]);
```

- [ ] **Step 2: Verify dev server still starts cleanly, no TS errors**

```bash
cd "/Users/vitaliitrus/Projects/flight passport landing/site" && npm run build 2>&1 | tail -20
```

Expected: no TypeScript errors. Build may warn about other things — ignore those.

---

## Task 3: CSS styles (the premium look)

**Files:**
- Modify: `site/app/components/HowItWorksScroll.tsx`

- [ ] **Step 1: Add the `<style>` JSX block at the top of the return statement**

Replace the placeholder `return (...)` with:

```tsx
  return (
    <>
      <style>{`
        /* ── Section wrapper ── */
        .hiw-scroll-sticky {
          width: 100%;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-image: linear-gradient(261.66deg, #e6e6e6 6.85%, #ffffff 83.93%);
          border-top: 1px solid #e7e5e4;
          border-bottom: 1px solid #e7e5e4;
          overflow: hidden;
        }

        /* ── Inner layout: left + right ── */
        .hiw-scroll-inner {
          display: flex;
          align-items: center;
          gap: 80px;
          width: 100%;
          max-width: 960px;
          padding: 0 40px;
          box-sizing: border-box;
        }

        /* ── LEFT: step list ── */
        .hiw-steps-col {
          display: flex;
          flex-direction: column;
          gap: 0;
          flex-shrink: 0;
          width: 340px;
          position: relative;
        }

        /* Vertical connector line */
        .hiw-steps-col::before {
          content: '';
          position: absolute;
          left: 11px;
          top: 22px;
          bottom: 22px;
          width: 1px;
          background: linear-gradient(to bottom, transparent, #e7e5e4 10%, #e7e5e4 90%, transparent);
          pointer-events: none;
        }

        /* Fill line (tracks active step) */
        .hiw-track-fill {
          position: absolute;
          left: 11px;
          top: 22px;
          width: 1px;
          background: #1c1917;
          transition: height 0.45s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
          border-radius: 1px;
        }

        .hiw-step-item {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          padding: 14px 16px 14px 0;
          border-radius: 16px;
          cursor: pointer;
          transition: background 0.25s ease;
          position: relative;
        }
        .hiw-step-item:hover {
          background: rgba(28,25,23,0.04);
        }

        /* Dot */
        .hiw-step-dot {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 1.5px solid #d6d3d1;
          background: #f9f8f6;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: border-color 0.35s ease, background 0.35s ease, box-shadow 0.35s ease;
          position: relative;
          z-index: 1;
          margin-top: 2px;
        }
        .hiw-step-dot-inner {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: transparent;
          transition: background 0.35s ease, transform 0.35s ease;
          transform: scale(0);
        }
        .hiw-step-item.active .hiw-step-dot {
          border-color: #1c1917;
          background: #1c1917;
          box-shadow: 0 0 0 4px rgba(28,25,23,0.08);
        }
        .hiw-step-item.active .hiw-step-dot-inner {
          background: white;
          transform: scale(1);
        }

        /* Text */
        .hiw-step-text {
          display: flex;
          flex-direction: column;
          gap: 3px;
          flex: 1;
          padding-top: 2px;
        }
        .hiw-step-num {
          font-family: var(--font-inter), sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #c4bfbb;
          transition: color 0.35s ease;
          line-height: 1;
        }
        .hiw-step-title {
          font-family: var(--font-inter), sans-serif;
          font-size: 18px;
          font-weight: 600;
          color: #a8a29e;
          letter-spacing: -0.02em;
          line-height: 1.25;
          transition: color 0.35s ease;
        }
        .hiw-step-item.active .hiw-step-num  { color: #78716c; }
        .hiw-step-item.active .hiw-step-title { color: #1c1917; }

        .hiw-step-desc {
          font-family: var(--font-inter), sans-serif;
          font-size: 15px;
          font-weight: 400;
          color: #78716c;
          line-height: 1.55;
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transform: translateY(6px);
          transition:
            max-height 0.42s cubic-bezier(0.4, 0, 0.2, 1),
            opacity    0.38s ease,
            transform  0.38s ease,
            margin-top 0.35s ease;
          margin-top: 0;
        }
        .hiw-step-item.active .hiw-step-desc {
          max-height: 80px;
          opacity: 1;
          transform: translateY(0);
          margin-top: 8px;
        }

        /* ── RIGHT: Phone column ── */
        .hiw-phone-col {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* Phone outer sizing matches original Step 01 phone */
        .hiw-phone-outer {
          position: relative;
          width: 233px;
          flex-shrink: 0;
        }

        /* Phone frame (chrome) */
        .hiw-phone-frame {
          position: relative;
          height: 504.526px;
          width: 242.667px;
          margin-left: -4.83px; /* compensate for Figma left offset */
        }

        /* Screen area */
        .hiw-screen-area {
          position: absolute;
          background: white;
          height: 490.708px;
          left: 5.32px;
          overflow: hidden;
          border-radius: 29.817px;
          top: 50%;
          transform: translateY(-50%);
          width: 226.355px;
        }

        /* Individual screen images */
        .hiw-screen-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          filter: blur(14px);
          transform: scale(0.97);
          transition:
            opacity   0.6s cubic-bezier(0.4, 0, 0.2, 1),
            filter    0.6s cubic-bezier(0.4, 0, 0.2, 1),
            transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: opacity, filter, transform;
        }
        .hiw-screen-img.active {
          opacity: 1;
          filter: blur(0px);
          transform: scale(1);
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .hiw-scroll-inner {
            flex-direction: column;
            gap: 40px;
            padding: 0 24px;
          }
          .hiw-steps-col {
            width: 100%;
            max-width: 480px;
          }
          .hiw-phone-col { order: -1; }
          .hiw-phone-outer { width: 180px; }
          .hiw-phone-frame { height: 389px; width: 186px; }
          .hiw-screen-area { height: 378px; width: 173px; }
        }
        @media (max-width: 600px) {
          .hiw-scroll-sticky {
            padding: 0;
          }
          .hiw-phone-outer { width: 160px; }
          .hiw-phone-frame { height: 346px; width: 166px; }
          .hiw-screen-area { height: 336px; width: 154px; }
          .hiw-step-title { font-size: 16px; }
          .hiw-step-desc  { font-size: 14px; }
          .hiw-scroll-inner { gap: 28px; }
        }
      `}</style>

      {/* Outer scroll container — 400vh gives scroll room for 4 steps */}
      <div
        id="how-it-works"
        ref={outerRef}
        style={{ height: '400vh', position: 'relative' }}
      >
        {/* Sticky panel */}
        <div className="hiw-scroll-sticky" style={{ position: 'sticky', top: 0 }}>
          <div className="hiw-scroll-inner">

            {/* ── LEFT: steps ── */}
            <div className="hiw-steps-col">
              {/* Animated fill line */}
              <div
                className="hiw-track-fill"
                style={{ height: `calc(${active / (STEPS.length - 1)} * (100% - 44px))` }}
              />
              {STEPS.map((step, i) => (
                <div
                  key={step.num}
                  className={`hiw-step-item${active === i ? ' active' : ''}`}
                  onClick={() => goTo(i)}
                >
                  <div className="hiw-step-dot">
                    <div className="hiw-step-dot-inner" />
                  </div>
                  <div className="hiw-step-text">
                    <span className="hiw-step-num">Step {step.num}</span>
                    <span className="hiw-step-title">{step.title}</span>
                    <span className="hiw-step-desc">{step.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* ── RIGHT: phone ── */}
            <div className="hiw-phone-col">
              <div className="hiw-phone-outer">
                <div className="hiw-phone-frame">

                  {/* Screen area with stacked images */}
                  <div className="hiw-screen-area">
                    {STEPS.map((step, i) => (
                      <img
                        key={step.num}
                        alt=""
                        src={step.image}
                        className={`hiw-screen-img${active === i ? ' active' : ''}`}
                      />
                    ))}
                  </div>

                  {/* Phone chrome overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      height: 504.526,
                      left: -2.83,
                      top: 0,
                      width: 242.667,
                      pointerEvents: 'none',
                    }}
                  >
                    <img
                      alt=""
                      src={PHONE_CHROME}
                      style={{ position: 'absolute', display: 'block', maxWidth: 'none', width: '100%', height: '100%' }}
                    />
                  </div>

                  {/* Notch group */}
                  <div
                    style={{
                      position: 'absolute',
                      height: 21.455,
                      left: 82.26,
                      top: 14.29,
                      width: 72.483,
                      pointerEvents: 'none',
                    }}
                  >
                    <div style={{ position: 'absolute', height: 21.455, left: 0, top: 0, width: 72.483 }}>
                      <img alt="" src={NOTCH_BG} style={{ position: 'absolute', display: 'block', maxWidth: 'none', width: '100%', height: '100%' }} />
                    </div>
                    <div style={{ position: 'absolute', inset: '28.68% 12.22% 28.7% 75.16%' }}>
                      <img alt="" src={NOTCH_VEC} style={{ position: 'absolute', display: 'block', maxWidth: 'none', width: '100%', height: '100%' }} />
                    </div>
                    <div style={{ position: 'absolute', inset: '28.65% 12.21% 28.71% 75.17%' }} aria-hidden="true">
                      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
                        <img alt="" src={NOTCH_CAM} style={{ position: 'absolute', left: 0, top: 0, maxWidth: 'none', width: '100%', height: '100%' }} />
                      </div>
                      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />
                    </div>
                    <div style={{ position: 'absolute', inset: '37.82% 14.93% 37.83% 77.86%' }}>
                      <img alt="" src={NOTCH_VEC1} style={{ position: 'absolute', display: 'block', maxWidth: 'none', width: '100%', height: '100%' }} />
                    </div>
                    <div style={{ position: 'absolute', inset: '39.34% 15.38% 39.35% 78.31%' }}>
                      <img alt="" src={NOTCH_VEC2} style={{ position: 'absolute', display: 'block', maxWidth: 'none', width: '100%', height: '100%' }} />
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
```

- [ ] **Step 2: Verify no TypeScript errors**

```bash
cd "/Users/vitaliitrus/Projects/flight passport landing/site" && npm run build 2>&1 | grep -E "error|Error" | head -20
```

Expected: no output (no errors).

---

## Task 4: Wire into `page.tsx`

**Files:**
- Modify: `site/app/page.tsx`

- [ ] **Step 1: Add the import at the top of `page.tsx` (after the last existing import)**

Find the last `import` line in `page.tsx` (around the top of the file) and add after it:

```tsx
import HowItWorksScroll from './components/HowItWorksScroll';
```

- [ ] **Step 2: Replace the 4 old component calls with the new one**

Find these 4 lines (currently around line 3981–3984):
```tsx
        <HowItWorks />
        <MiddleSection />
        <LowerSection />
        <BottomSection />
```

Replace with:
```tsx
        <HowItWorksScroll />
```

- [ ] **Step 3: Delete the 4 old function bodies from `page.tsx`**

Remove all code between (and including) these comment markers and closing braces:
- `// ── How it works ──────────────────────` → `function HowItWorks()` block
- `// ── How it works — Step 02 ────────────` → `function MiddleSection()` block
- `// ── How it works — Step 03 ────────────` → `function LowerSection()` block
- `// ── How it works — Step 04 ────────────` → `function BottomSection()` block

Each block ends with `}\n` at the same indentation level as the `function` keyword.

- [ ] **Step 4: Remove now-unused asset `const` declarations at the top of `page.tsx`**

Remove these const blocks (they were only used by the deleted functions):
```
// ── How It Works Step 01 asset URLs …
// ── How It Works Step 04 asset URLs …
// ── How It Works Step 03 asset URLs …
// ── How It Works Step 02 asset URLs …
```

Lines ~84–130 in the current file. Only remove lines inside those comment blocks. Do NOT remove any consts used by other sections.

- [ ] **Step 5: Run dev server and visually verify**

```bash
cd "/Users/vitaliitrus/Projects/flight passport landing/site" && npm run dev
```

Open http://localhost:3000, scroll to the "How it works" section. Check:
- Section sticks while scrolling through it
- Phone screen changes with blur transition between steps
- Step text activates / collapses
- Auto-advance runs when idle (~3.5 s per step)
- Clicking a step item jumps to it immediately

- [ ] **Step 6: Verify `npm run build` completes without errors**

```bash
cd "/Users/vitaliitrus/Projects/flight passport landing/site" && npm run build 2>&1 | tail -10
```

Expected last line contains: `✓ Compiled successfully` or similar success message.

---

## Task 5: Polish pass — premium feel

**Files:**
- Modify: `site/app/components/HowItWorksScroll.tsx`

These tweaks elevate the component from functional to premium. Apply all in one edit pass.

- [ ] **Step 1: Add section-level label above steps (inside `.hiw-scroll-inner`, before the steps column)**

Add a "How it works" label visible at the very top of the sticky panel — above the two-column layout. Insert before `<div className="hiw-steps-col">`:

Inside `.hiw-scroll-inner`, wrap the two columns in a `flex-col` wrapper and prepend:

```tsx
{/* Section label */}
<p style={{
  fontFamily: 'var(--font-inter), sans-serif',
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#a8a29e',
  marginBottom: 40,
  textAlign: 'center',
}}>
  How it works
</p>
```

Place this ABOVE the `flex-direction: row` container that holds steps + phone. The full inner layout becomes column-then-row:

```tsx
<div className="hiw-scroll-inner" style={{ flexDirection: 'column', gap: 0 }}>
  {/* Label */}
  <p style={{ ... }}>How it works</p>
  {/* Two columns */}
  <div style={{ display: 'flex', alignItems: 'center', gap: 80, width: '100%' }}>
    <div className="hiw-steps-col"> ... </div>
    <div className="hiw-phone-col"> ... </div>
  </div>
</div>
```

Update `.hiw-scroll-inner` CSS to `flex-direction: column; gap: 0; align-items: center;`.

- [ ] **Step 2: Add a subtle progress bar at the bottom of the sticky panel**

At the very bottom of the sticky panel (inside `.hiw-scroll-sticky`), add after the inner content:

```tsx
{/* Progress bar */}
<div style={{
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: 2,
  background: '#f0efed',
}}>
  <div style={{
    height: '100%',
    background: '#1c1917',
    borderRadius: '0 2px 2px 0',
    transition: 'width 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
    width: `${((active + 1) / STEPS.length) * 100}%`,
  }} />
</div>
```

- [ ] **Step 3: Add a subtle glow behind the phone that changes per step**

Inside `.hiw-phone-col`, wrap the phone in a relative div with a color-tinted radial glow:

```tsx
<div className="hiw-phone-col">
  <div style={{ position: 'relative' }}>
    {/* Ambient glow — color shifts with active step */}
    <div style={{
      position: 'absolute',
      inset: '-40px',
      borderRadius: '50%',
      background: [
        'radial-gradient(ellipse, rgba(14,120,198,0.13) 0%, transparent 70%)',
        'radial-gradient(ellipse, rgba(245,158,11,0.10) 0%, transparent 70%)',
        'radial-gradient(ellipse, rgba(16,185,129,0.10) 0%, transparent 70%)',
        'radial-gradient(ellipse, rgba(124,58,237,0.10) 0%, transparent 70%)',
      ][active],
      transition: 'background 0.7s ease',
      pointerEvents: 'none',
      zIndex: 0,
    }} />
    <div className="hiw-phone-outer" style={{ position: 'relative', zIndex: 1 }}>
      {/* ...existing phone frame... */}
    </div>
  </div>
</div>
```

- [ ] **Step 4: Run dev server final visual check**

```bash
cd "/Users/vitaliitrus/Projects/flight passport landing/site" && npm run dev
```

Check: label appears, progress bar fills as steps advance, glow color shifts with each step.

- [ ] **Step 5: Final build check**

```bash
cd "/Users/vitaliitrus/Projects/flight passport landing/site" && npm run build 2>&1 | tail -5
```

Expected: success, no errors.
