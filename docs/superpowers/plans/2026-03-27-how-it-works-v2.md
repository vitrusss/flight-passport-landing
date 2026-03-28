# How It Works v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Completely rewrite `HowItWorksScroll.tsx` to a premium, production-grade section with phased screen transitions, staggered text animations, step indicator states, fixed progress bar, and a full mobile carousel — matching the v2 design spec.

**Architecture:** Single component file (~700 lines). Desktop/tablet use scroll-driven sticky mechanics (500vh container). Mobile (<768px) uses a tap/swipe carousel with no scroll-driving. All breakpoints share the same step data, state machine, and `goTo()` logic. Section heading lives inside the component above the sticky container.

**Tech Stack:** React 18, TypeScript, Next.js `'use client'`, inline `<style>` tag (no Tailwind for this component — custom CSS only), CSS keyframe animations, `IntersectionObserver`, `requestAnimationFrame` for scroll reads.

---

## File Map

| Action | Path |
|--------|------|
| **Rewrite** | `site/app/components/HowItWorksScroll.tsx` |
| **No change** | `site/app/page.tsx` — already imports and renders `<HowItWorksScroll />` |

---

## Task 1: Logic skeleton — state, refs, and all business logic

**Files:**
- Modify: `site/app/components/HowItWorksScroll.tsx` (full rewrite)

Write the entire non-JSX portion of the component: types, constants, state, refs, and every logic function. The `return` statement at the end is a placeholder stub. No CSS yet.

- [ ] **Step 1: Replace the entire file content with the logic skeleton**

```tsx
'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

type TransitionPhase = 'idle' | 'exiting' | 'paused' | 'entering';

interface Step {
  num: string;
  title: string;
  desc: string;
  image: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const STEPS: Step[] = [
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
    title: 'Your flight passport',
    desc: 'A complete record of every flight — searchable, shareable, always in your pocket.',
    image: '/Images/asset-7ca5fa0f-d9dc-4e3e-a4b3-4a7dc5a9f6e1.png',
  },
];

const AUTO_ADVANCE_MS = 3500;

// ─── Component ────────────────────────────────────────────────────────────────

export default function HowItWorksScroll() {
  // ── Visible step state (two-track for transitions) ──────────────────────
  const [active, setActive] = useState(0);          // drives indicators (immediate)
  const [displayStep, setDisplayStep] = useState(0); // drives rendered content (lags)
  const [phase, setPhase] = useState<TransitionPhase>('idle');
  const [isMobile, setIsMobile] = useState(false);
  const [inView, setInView] = useState(false);       // drives fixed progress bar visibility

  // ── Refs ──────────────────────────────────────────────────────────────────
  const outerRef = useRef<HTMLDivElement>(null);     // 500vh scroll container
  const sectionRef = useRef<HTMLElement>(null);      // for IntersectionObserver

  const activeRef = useRef(0);                       // sync ref for scroll handler closure
  const phaseRef = useRef<TransitionPhase>('idle');  // sync ref to avoid stale closure
  const pendingStepRef = useRef<number | null>(null);
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const autoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isScrollingRef = useRef(false);              // suppress auto-advance during scroll
  const inViewRef = useRef(false);                   // sync ref for interval callback
  const isMobileRef = useRef(false);                 // sync ref for resize/scroll handlers

  const touchStartXRef = useRef(0);

  // ── Transition state machine ──────────────────────────────────────────────
  const triggerTransition = useCallback((nextStep: number, fromQueue = false) => {
    // Guard: skip if already on target and idle (unless we're processing a queue item)
    if (!fromQueue) {
      if (nextStep === activeRef.current && phaseRef.current === 'idle') return;
      // Update indicator immediately
      activeRef.current = nextStep;
      setActive(nextStep);
      // If mid-transition, queue and return — will be picked up at end of current transition
      if (phaseRef.current !== 'idle') {
        pendingStepRef.current = nextStep;
        return;
      }
    }

    pendingStepRef.current = null;

    // Clear any existing timers
    if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);

    // Phase 1: exiting (400ms)
    phaseRef.current = 'exiting';
    setPhase('exiting');

    transitionTimerRef.current = setTimeout(() => {
      // Phase 2: paused (300ms) — swap content while invisible
      phaseRef.current = 'paused';
      setPhase('paused');
      setDisplayStep(nextStep);

      transitionTimerRef.current = setTimeout(() => {
        // Phase 3: entering (400ms)
        phaseRef.current = 'entering';
        setPhase('entering');

        transitionTimerRef.current = setTimeout(() => {
          // Back to idle
          phaseRef.current = 'idle';
          setPhase('idle');

          // Process any queued step change
          if (pendingStepRef.current !== null) {
            const queued = pendingStepRef.current;
            triggerTransition(queued, true);
          }
        }, 400);
      }, 300);
    }, 400);
  }, []);

  // ── Public goTo ───────────────────────────────────────────────────────────
  const goTo = useCallback((step: number) => {
    triggerTransition(step);
  }, [triggerTransition]);

  // ── Auto-advance ──────────────────────────────────────────────────────────
  const stopAuto = useCallback(() => {
    if (autoTimerRef.current) {
      clearInterval(autoTimerRef.current);
      autoTimerRef.current = null;
    }
  }, []);

  const startAuto = useCallback(() => {
    stopAuto();
    autoTimerRef.current = setInterval(() => {
      if (!inViewRef.current || isScrollingRef.current) return;
      const next = (activeRef.current + 1) % STEPS.length;
      triggerTransition(next);
    }, AUTO_ADVANCE_MS);
  }, [stopAuto, triggerTransition]);

  // ── Scroll handler (desktop/tablet only) ─────────────────────────────────
  const handleScroll = useCallback(() => {
    if (!outerRef.current || isMobileRef.current) return;
    const rect = outerRef.current.getBoundingClientRect();
    const totalScroll = outerRef.current.offsetHeight - window.innerHeight; // ~400vh in px
    const scrolled = Math.max(0, -rect.top);
    const raw = Math.min(1, scrolled / totalScroll); // 0→1
    const raw4 = raw * 4; // 0→4

    // Dead zone: each step activates at 30% into its zone
    const nextStep =
      raw4 >= 3.3 ? 3 :
      raw4 >= 2.3 ? 2 :
      raw4 >= 1.3 ? 1 : 0;

    if (nextStep !== activeRef.current) {
      isScrollingRef.current = true;
      triggerTransition(nextStep);
      // Reset scroll flag after 1s of no scroll events
      clearTimeout((handleScroll as { _t?: ReturnType<typeof setTimeout> })._t);
      (handleScroll as { _t?: ReturnType<typeof setTimeout> })._t = setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000);
    }
  }, [triggerTransition]);

  // ── Swipe handlers (mobile) ───────────────────────────────────────────────
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  }, []);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    const delta = touchStartXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) {
      if (delta > 0) goTo(Math.min(STEPS.length - 1, activeRef.current + 1));
      else           goTo(Math.max(0, activeRef.current - 1));
    }
  }, [goTo]);

  // ── Keyboard handler ──────────────────────────────────────────────────────
  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') goTo(Math.min(STEPS.length - 1, activeRef.current + 1));
    if (e.key === 'ArrowUp'   || e.key === 'ArrowLeft')  goTo(Math.max(0, activeRef.current - 1));
    if (e.key === 'Home') goTo(0);
    if (e.key === 'End')  goTo(STEPS.length - 1);
  }, [goTo]);

  // ── isMobile detection ────────────────────────────────────────────────────
  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      isMobileRef.current = mobile;
      setIsMobile(mobile);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // ── Scroll listener + IntersectionObserver + auto-advance lifecycle ───────
  useEffect(() => {
    // IntersectionObserver for inView state + auto-advance guard
    const threshold = isMobileRef.current ? 0.5 : 0.25;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        inViewRef.current = visible;
        setInView(visible);
        if (visible) startAuto();
        else stopAuto();
      },
      { threshold }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);

    // Scroll listener (desktop/tablet only)
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      stopAuto();
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    };
  }, [handleScroll, startAuto, stopAuto]);

  // ─────────────────────────────────────────────────────────────────────────
  // Placeholder return — replaced in Task 3 & 4
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <section ref={sectionRef} aria-label="How FlightPassport works">
      <p style={{ padding: '40px', color: '#999' }}>HowItWorksScroll v2 — logic skeleton (Tasks 2–4 will add CSS and JSX)</p>
    </section>
  );
}
```

- [ ] **Step 2: Verify the file saves without TypeScript errors**

Run: `cd "/Users/vitaliitrus/Projects/flight passport landing/site" && npx tsc --noEmit 2>&1 | grep HowItWorksScroll`

Expected: No output (no errors in this file). If you see errors about the `_t` property on `handleScroll`, that's OK — it will be resolved in the next step by using a separate timer ref instead.

> **Note:** If TypeScript complains about `(handleScroll as { _t?: ... })._t`, replace the `isScrollingRef` reset logic with a dedicated ref:
> ```ts
> const scrollScrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
> // inside handleScroll, replace the _t lines with:
> if (scrollScrollTimeoutRef.current) clearTimeout(scrollScrollTimeoutRef.current);
> scrollScrollTimeoutRef.current = setTimeout(() => {
>   isScrollingRef.current = false;
> }, 1000);
> ```
> Add `const scrollScrollTimeoutRef = useRef<...>(null)` with the other refs. Clean up in the main `useEffect` return.

- [ ] **Step 3: Verify dev server still compiles**

Run: `cd "/Users/vitaliitrus/Projects/flight passport landing/site" && npx next build 2>&1 | tail -20`

Expected: Build succeeds (may show the placeholder paragraph but no errors).

- [ ] **Step 4: Commit**

```bash
cd "/Users/vitaliitrus/Projects/flight passport landing/site"
git add app/components/HowItWorksScroll.tsx
git commit -m "refactor: HowItWorksScroll v2 logic skeleton — state machine, scroll, mobile detection"
```

---

## Task 2: CSS block — all styles, animations, reduced motion

**Files:**
- Modify: `site/app/components/HowItWorksScroll.tsx`

Add the full `<style jsx global>` (or inline `<style>`) block. No JSX layout changes yet — the placeholder return stays. All CSS for desktop, tablet, mobile, keyframes, and reduced motion goes here.

- [ ] **Step 1: Replace the placeholder return with one that includes the full style block + the placeholder paragraph**

Replace the entire `return (...)` statement in the file with:

```tsx
  return (
    <section
      ref={sectionRef}
      className="hiw-section"
      aria-label="How FlightPassport works"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <style>{`
        /* ── Section wrapper ─────────────────────────────────────────── */
        .hiw-section {
          position: relative;
          outline: none;
        }

        /* ── Section header (scrolls away before sticky) ─────────────── */
        .hiw-section-header {
          max-width: 1200px;
          margin: 0 auto;
          padding: 120px 60px 80px;
        }
        .hiw-overline {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #a8a29e;
          margin: 0 0 16px;
        }
        .hiw-heading {
          font-size: 56px;
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.1;
          color: #1c1917;
          margin: 0;
        }

        /* ── Sticky container ────────────────────────────────────────── */
        .hiw-scroll-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        /* ── Inner layout: phone + steps ─────────────────────────────── */
        .hiw-inner {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          padding: 0 60px;
          display: flex;
          align-items: center;
          gap: 140px;
        }

        /* ── Phone column (left) ─────────────────────────────────────── */
        .hiw-phone-col {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .hiw-phone-frame {
          width: 280px;
          position: relative;
          border-radius: 36px;
          overflow: hidden;
          box-shadow: 0 32px 80px rgba(0, 0, 0, 0.18), 0 8px 24px rgba(0, 0, 0, 0.12);
          background: #000;
        }
        .hiw-phone-frame::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 36px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          pointer-events: none;
          z-index: 2;
        }
        /* ambient glow behind phone */
        .hiw-phone-glow {
          position: absolute;
          inset: -40px;
          border-radius: 50%;
          background: radial-gradient(ellipse at center, rgba(14, 165, 233, 0.12) 0%, transparent 70%);
          pointer-events: none;
          z-index: -1;
          transition: opacity 600ms ease;
        }

        /* ── Screen image wrapper (handles transition animations) ──── */
        .hiw-screen-wrap {
          width: 100%;
          aspect-ratio: 390 / 844;
          position: relative;
          overflow: hidden;
        }
        .hiw-screen-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Screen transition via phase class on wrapper */
        .phase-exiting .hiw-screen-img {
          animation: hiw-screen-out 400ms ease-in both;
        }
        .phase-entering .hiw-screen-img {
          animation: hiw-screen-in 400ms ease-out both;
        }
        .phase-paused .hiw-screen-img {
          opacity: 0;
        }

        @keyframes hiw-screen-out {
          from { opacity: 1; filter: blur(0px);   transform: scale(1);    }
          to   { opacity: 0; filter: blur(24px);  transform: scale(0.92); }
        }
        @keyframes hiw-screen-in {
          from { opacity: 0; filter: blur(24px);  transform: scale(0.92); }
          to   { opacity: 1; filter: blur(0px);   transform: scale(1);    }
        }

        /* ── Text column (right) ─────────────────────────────────────── */
        .hiw-text-col {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        /* ── Step item in text column ────────────────────────────────── */
        .hiw-step-item {
          cursor: pointer;
          user-select: none;
        }
        .hiw-step-item.active {
          cursor: default;
        }

        /* ── Step indicator dots (left of text col, vertical track) ─── */
        .hiw-indicators {
          position: absolute;
          left: -48px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }
        .hiw-indicator-track {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }
        .hiw-track-line-bg {
          position: absolute;
          left: 50%;
          top: 7px;
          bottom: 7px;
          width: 2px;
          transform: translateX(-50%);
          background: #e5e7eb;
          border-radius: 2px;
          z-index: 0;
        }
        .hiw-track-line-fill {
          position: absolute;
          left: 50%;
          top: 7px;
          width: 2px;
          transform: translateX(-50%);
          background: #10B981;
          border-radius: 2px;
          z-index: 1;
          transition: height 600ms ease-out;
        }
        .hiw-indicator-slot {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          margin: 8px 0;
        }
        .hiw-dot {
          border-radius: 50%;
          transition: width 300ms ease, height 300ms ease, background 300ms ease, box-shadow 300ms ease, border-color 300ms ease;
        }
        .hiw-dot.upcoming {
          width: 8px;
          height: 8px;
          background: transparent;
          border: 2px solid #d1d5db;
        }
        .hiw-dot.upcoming:hover {
          transform: scale(1.15);
          border-color: #0EA5E9;
          cursor: pointer;
        }
        .hiw-dot.completed {
          width: 12px;
          height: 12px;
          background: #10B981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hiw-dot.active-dot {
          width: 14px;
          height: 14px;
          background: #1c1917;
          box-shadow: 0 0 0 4px rgba(28, 25, 23, 0.12);
          animation: hiw-pulse 2s ease-in-out infinite;
        }

        @keyframes hiw-pulse {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.08); }
        }

        /* ── Step text ────────────────────────────────────────────────── */
        .hiw-step-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #9CA3AF;
          line-height: 1;
          margin: 0;
        }
        .hiw-step-title {
          font-size: 40px;
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin: 12px 0 0;
          transition: color 200ms ease;
        }
        .hiw-step-item.active .hiw-step-title {
          color: #111827;
        }
        .hiw-step-item:not(.active) .hiw-step-title {
          color: #D1D5DB;
        }
        .hiw-step-item:not(.active):hover .hiw-step-title {
          color: #0EA5E9;
        }
        .hiw-step-desc {
          font-size: 18px;
          font-weight: 400;
          line-height: 1.65;
          color: #6B7280;
          margin: 16px 0 0;
          max-width: 440px;
        }
        .hiw-step-item:not(.active) .hiw-step-desc {
          display: none;
        }

        /* Text stagger enter animation on active step */
        .hiw-step-item.active .hiw-step-label {
          animation: hiw-text-in 400ms ease-out 0ms both;
        }
        .hiw-step-item.active .hiw-step-title {
          animation: hiw-text-in 400ms ease-out 100ms both;
        }
        .hiw-step-item.active .hiw-step-desc {
          animation: hiw-text-in 400ms ease-out 200ms both;
        }

        /* Override: no animation on idle active items (only animate on enter phase) */
        .phase-idle .hiw-step-item.active .hiw-step-label,
        .phase-idle .hiw-step-item.active .hiw-step-title,
        .phase-idle .hiw-step-item.active .hiw-step-desc {
          animation: none;
        }
        /* Trigger stagger only during entering phase */
        .phase-entering .hiw-step-item.active .hiw-step-label {
          animation: hiw-text-in 400ms ease-out 0ms both;
        }
        .phase-entering .hiw-step-item.active .hiw-step-title {
          animation: hiw-text-in 400ms ease-out 100ms both;
        }
        .phase-entering .hiw-step-item.active .hiw-step-desc {
          animation: hiw-text-in 400ms ease-out 200ms both;
        }

        @keyframes hiw-text-in {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Fixed progress bar (desktop only) ───────────────────────── */
        .hiw-progress-bar {
          position: fixed;
          right: 40px;
          top: 50%;
          transform: translateY(-50%);
          height: 240px;
          width: 2px;
          background: rgba(28, 25, 23, 0.08);
          border-radius: 2px;
          z-index: 100;
          transition: opacity 400ms ease;
        }
        .hiw-progress-bar.hidden {
          opacity: 0;
          pointer-events: none;
        }
        .hiw-progress-fill {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          background: #1c1917;
          border-radius: 2px;
          transition: height 600ms ease-out;
        }
        .hiw-progress-dot {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 6px;
          height: 6px;
          border-radius: 50%;
          transition: background 300ms ease;
        }
        .hiw-progress-dot.active-dot {
          background: #1c1917;
        }
        .hiw-progress-dot.inactive-dot {
          background: #d1d5db;
        }

        /* ── Tablet (768–1023px) ──────────────────────────────────────── */
        @media (min-width: 768px) and (max-width: 1023px) {
          .hiw-inner {
            flex-direction: column;
            gap: 32px;
            padding: 0 32px;
          }
          .hiw-phone-frame {
            width: 220px;
          }
          .hiw-text-col {
            align-items: center;
            text-align: center;
            max-width: 400px;
          }
          .hiw-step-desc {
            max-width: 400px;
          }
          .hiw-indicators {
            left: -40px;
          }
          .hiw-section-header {
            padding: 80px 32px 48px;
          }
          .hiw-heading {
            font-size: 40px;
          }
          .hiw-progress-bar {
            display: none;
          }
        }

        /* ── Mobile (<768px) — carousel, no scroll-driven ────────────── */
        @media (max-width: 767px) {
          .hiw-scroll-outer {
            display: none !important;
          }
          .hiw-progress-bar {
            display: none;
          }
          .hiw-section-header {
            padding: 64px 24px 40px;
          }
          .hiw-heading {
            font-size: 32px;
          }

          /* Mobile carousel layout */
          .hiw-mobile {
            padding: 0 0 64px;
          }
          .hiw-mobile-dots {
            display: flex;
            justify-content: center;
            gap: 12px;
            margin-bottom: 32px;
          }
          .hiw-mobile-tab {
            border-radius: 50%;
            background: #d1d5db;
            transition: width 200ms ease, height 200ms ease, background 200ms ease;
            cursor: pointer;
          }
          .hiw-mobile-tab.active {
            width: 12px;
            height: 12px;
            background: #1c1917;
          }
          .hiw-mobile-tab:not(.active) {
            width: 8px;
            height: 8px;
          }
          .hiw-mobile-phone-wrap {
            display: flex;
            justify-content: center;
            margin-bottom: 28px;
            touch-action: pan-y;
          }
          .hiw-mobile-phone-frame {
            width: 200px;
            border-radius: 28px;
            overflow: hidden;
            box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
            background: #000;
          }
          .hiw-mobile-screen-wrap {
            width: 100%;
            aspect-ratio: 390 / 844;
            overflow: hidden;
          }
          .hiw-mobile-screen-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }
          .hiw-mobile-content {
            padding: 0 32px;
            text-align: center;
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
          .hiw-mobile-label {
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 0.16em;
            text-transform: uppercase;
            color: #9CA3AF;
            margin: 0 0 8px;
          }
          .hiw-mobile-title {
            font-size: 28px;
            font-weight: 700;
            letter-spacing: -0.02em;
            line-height: 1.15;
            color: #111827;
            margin: 0 0 12px;
          }
          .hiw-mobile-desc {
            font-size: 16px;
            font-weight: 400;
            line-height: 1.65;
            color: #6B7280;
            margin: 0;
          }
          .hiw-mobile-nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 24px 32px 0;
          }
          .hiw-mobile-btn {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 14px;
            font-weight: 500;
            color: #6B7280;
            background: none;
            border: none;
            cursor: pointer;
            padding: 8px 0;
            transition: color 150ms ease;
          }
          .hiw-mobile-btn:hover {
            color: #1c1917;
          }
          .hiw-mobile-btn:disabled {
            opacity: 0.3;
            cursor: default;
          }
        }

        /* ── Reduced motion ──────────────────────────────────────────── */
        @media (prefers-reduced-motion: reduce) {
          .hiw-screen-img,
          .phase-exiting .hiw-screen-img,
          .phase-entering .hiw-screen-img {
            filter: none !important;
            transform: none !important;
            animation: none !important;
            transition: opacity 200ms ease !important;
          }
          .phase-exiting .hiw-screen-img { opacity: 0; }
          .phase-paused .hiw-screen-img  { opacity: 0; }
          .phase-entering .hiw-screen-img { opacity: 1; }

          .hiw-step-label,
          .hiw-step-title,
          .hiw-step-desc {
            animation: none !important;
            transition: opacity 200ms ease !important;
          }
          @keyframes hiw-pulse {
            from, to { transform: scale(1); }
          }
          .hiw-mobile-content {
            transition: opacity 200ms ease !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* Placeholder — JSX added in Tasks 3 & 4 */}
      <p style={{ padding: '40px', color: '#999' }}>CSS loaded — JSX coming in Task 3</p>
    </section>
  );
```

- [ ] **Step 2: Verify TypeScript — no new errors**

Run: `cd "/Users/vitaliitrus/Projects/flight passport landing/site" && npx tsc --noEmit 2>&1 | grep -i error | head -20`

Expected: No output.

- [ ] **Step 3: Commit**

```bash
cd "/Users/vitaliitrus/Projects/flight passport landing/site"
git add app/components/HowItWorksScroll.tsx
git commit -m "style: HowItWorksScroll v2 — full CSS block, keyframes, responsive, reduced motion"
```

---

## Task 3: Desktop JSX — sticky section, phone, step list, progress bar

**Files:**
- Modify: `site/app/components/HowItWorksScroll.tsx`

Replace the entire `return (...)` statement with the full desktop/tablet JSX. Mobile will be added in Task 4 with conditional rendering.

The step indicator track (left side of text column) shows completed/active/upcoming states. The fixed progress bar shows on desktop only. Section heading is above the sticky scroll container.

- [ ] **Step 1: Replace the entire return statement with the full desktop/tablet JSX**

Replace the `return (...)` block (everything from `return (` to the matching `)` closing paren of the return) with:

```tsx
  // ── Progress bar fill height calculation ────────────────────────────────
  // fill covers: 0% for step 0, 33% for step 1, 66% for step 2, 100% for step 3
  const progressFillPct = (active / (STEPS.length - 1)) * 100;
  // progress dot positions: 0%, 33%, 66%, 100%
  const progressDotPositions = STEPS.map((_, i) => `${(i / (STEPS.length - 1)) * 100}%`);

  // ── Track line fill height ────────────────────────────────────────────────
  // Fills from top-of-first-dot to bottom-of-last-completed-dot
  // Each slot is 40px (8px margin top + 24px slot + 8px margin bottom)
  // Fill height: active * 40px (distance between first and last completed dot)
  const trackFillHeightPx = active * 40;

  return (
    <section
      ref={sectionRef}
      className="hiw-section"
      aria-label="How FlightPassport works"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <style>{`
        /* ... (CSS from Task 2 — already in file, do not duplicate) ... */
      `}</style>

      {/* ── Accessibility live region ────────────────────────────────────── */}
      <div aria-live="polite" aria-atomic="true" className="sr-only" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
        Step {displayStep + 1} of {STEPS.length}: {STEPS[displayStep].title}
      </div>

      {/* ── Section heading (scrolls away before sticky kicks in) ────────── */}
      <div className="hiw-section-header">
        <p className="hiw-overline">How it works</p>
        <h2 className="hiw-heading">Four steps.<br />Zero confusion.</h2>
      </div>

      {/* ── Desktop/Tablet: 500vh scroll container ───────────────────────── */}
      {!isMobile && (
        <div
          ref={outerRef}
          className="hiw-scroll-outer"
          style={{ height: '500vh', position: 'relative' }}
        >
          <div className={`hiw-scroll-sticky phase-${phase}`}>
            <div className="hiw-inner">

              {/* ── Phone (left column) ─────────────────────────────────── */}
              <div className="hiw-phone-col">
                <div className="hiw-phone-glow" />
                <div className="hiw-phone-frame">
                  <div className="hiw-screen-wrap">
                    <img
                      src={STEPS[displayStep].image}
                      alt={`Step ${displayStep + 1}: ${STEPS[displayStep].title}`}
                      className="hiw-screen-img"
                      draggable={false}
                    />
                  </div>
                </div>
              </div>

              {/* ── Text column (right) ─────────────────────────────────── */}
              <div className="hiw-text-col" style={{ position: 'relative' }}>

                {/* Step indicator track */}
                <div className="hiw-indicator-track" style={{ position: 'absolute', left: -48, top: 0, bottom: 0 }}>
                  <div className="hiw-track-line-bg" />
                  <div
                    className="hiw-track-line-fill"
                    style={{ height: trackFillHeightPx > 0 ? `${trackFillHeightPx}px` : '0px' }}
                  />
                  {STEPS.map((_, i) => {
                    const state = i < active ? 'completed' : i === active ? 'active-dot' : 'upcoming';
                    return (
                      <div
                        key={i}
                        className="hiw-indicator-slot"
                        role="button"
                        tabIndex={0}
                        aria-label={`Go to step ${i + 1}`}
                        onClick={() => goTo(i)}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goTo(i); } }}
                      >
                        <div className={`hiw-dot ${state}`}>
                          {state === 'completed' && (
                            <svg width="7" height="6" viewBox="0 0 7 6" fill="none">
                              <path d="M1 3L2.8 5L6 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Step text blocks */}
                {STEPS.map((step, i) => (
                  <div
                    key={i}
                    className={`hiw-step-item ${i === active ? 'active' : ''}`}
                    onClick={() => i !== active && goTo(i)}
                    role={i !== active ? 'button' : undefined}
                    tabIndex={i !== active ? 0 : undefined}
                    aria-label={i !== active ? `Jump to step ${i + 1}: ${step.title}` : undefined}
                    onKeyDown={(e) => { if (i !== active && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); goTo(i); } }}
                  >
                    <p className="hiw-step-label">Step {step.num}</p>
                    <h3 className="hiw-step-title">{step.title}</h3>
                    {i === active && <p className="hiw-step-desc">{step.desc}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Fixed progress bar (desktop only, visible when in view) ─────── */}
      <div className={`hiw-progress-bar ${inView && !isMobile ? '' : 'hidden'}`}>
        <div
          className="hiw-progress-fill"
          style={{ height: `${progressFillPct}%` }}
        />
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`hiw-progress-dot ${i <= active ? 'active-dot' : 'inactive-dot'}`}
            style={{ top: progressDotPositions[i] }}
          />
        ))}
      </div>

      {/* ── Mobile placeholder ── replaced in Task 4 ────────────────────── */}
      {isMobile && (
        <p style={{ padding: '40px', color: '#999', textAlign: 'center' }}>Mobile carousel — Task 4</p>
      )}
    </section>
  );
```

> **Important:** The `<style>` tag inside the return already exists from Task 2 — do NOT replace or re-add the full CSS block. The `{/* ... (CSS already in file) ... */}` comment is a marker in this plan only — in the actual file, keep the full CSS from Task 2 exactly as written. Only replace the JSX content outside the `<style>` tag.

- [ ] **Step 2: Verify TypeScript**

Run: `cd "/Users/vitaliitrus/Projects/flight passport landing/site" && npx tsc --noEmit 2>&1 | grep -i error | head -20`

Expected: No errors.

- [ ] **Step 3: Verify in browser — desktop layout looks correct**

Start the dev server (`npx next dev`) and visit `http://localhost:3000`. Scroll down to the "How it works" section and verify:
- Section heading ("How it works" / "Four steps. Zero confusion.") appears above the sticky area
- Phone appears on the left, step titles on the right
- Scrolling through triggers step changes with fade/blur/scale transitions
- Step indicator dots update (upcoming → active → completed with green fill)
- Fixed progress bar appears on the right edge when in view

- [ ] **Step 4: Commit**

```bash
cd "/Users/vitaliitrus/Projects/flight passport landing/site"
git add app/components/HowItWorksScroll.tsx
git commit -m "feat: HowItWorksScroll v2 desktop/tablet JSX — sticky scroll, transitions, step indicators, progress bar"
```

---

## Task 4: Mobile carousel JSX

**Files:**
- Modify: `site/app/components/HowItWorksScroll.tsx`

Replace the mobile placeholder with the full carousel layout: tab dots, phone with swipe detection, text content, and prev/next buttons.

- [ ] **Step 1: Replace the mobile placeholder block in the return statement**

Find and replace:
```tsx
      {/* ── Mobile placeholder ── replaced in Task 4 ────────────────────── */}
      {isMobile && (
        <p style={{ padding: '40px', color: '#999', textAlign: 'center' }}>Mobile carousel — Task 4</p>
      )}
```

With:
```tsx
      {/* ── Mobile carousel (<768px) ────────────────────────────────────── */}
      {isMobile && (
        <div className="hiw-mobile">
          {/* Tab dots */}
          <div className="hiw-mobile-dots" role="tablist" aria-label="Steps">
            {STEPS.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === active}
                aria-label={`Step ${i + 1}: ${STEPS[i].title}`}
                className={`hiw-mobile-tab ${i === active ? 'active' : ''}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>

          {/* Phone with swipe detection */}
          <div
            className="hiw-mobile-phone-wrap"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div className="hiw-mobile-phone-frame">
              <div className={`hiw-mobile-screen-wrap phase-${phase}`}>
                <img
                  src={STEPS[displayStep].image}
                  alt={`Step ${displayStep + 1}: ${STEPS[displayStep].title}`}
                  className="hiw-mobile-screen-img"
                  draggable={false}
                />
              </div>
            </div>
          </div>

          {/* Step text */}
          <div className={`hiw-mobile-content ${phase === 'exiting' ? 'exiting' : phase === 'entering' ? 'entering' : ''}`}>
            <p className="hiw-mobile-label">Step {STEPS[displayStep].num}</p>
            <h3 className="hiw-mobile-title">{STEPS[displayStep].title}</h3>
            <p className="hiw-mobile-desc">{STEPS[displayStep].desc}</p>
          </div>

          {/* Prev / Next buttons */}
          <div className="hiw-mobile-nav">
            <button
              className="hiw-mobile-btn"
              onClick={() => goTo(Math.max(0, active - 1))}
              disabled={active === 0}
              aria-label="Previous step"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Prev
            </button>
            <button
              className="hiw-mobile-btn"
              onClick={() => goTo(Math.min(STEPS.length - 1, active + 1))}
              disabled={active === STEPS.length - 1}
              aria-label="Next step"
            >
              Next
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      )}
```

Also add the mobile screen transition classes to the CSS. Find the existing CSS and add (after `.hiw-mobile-screen-img`):

```css
          /* Mobile screen transition — reuse desktop phase classes */
          .hiw-mobile-screen-wrap.phase-exiting .hiw-mobile-screen-img {
            animation: hiw-screen-out 300ms ease-in both;
          }
          .hiw-mobile-screen-wrap.phase-entering .hiw-mobile-screen-img {
            animation: hiw-screen-in 300ms ease-out both;
          }
          .hiw-mobile-screen-wrap.phase-paused .hiw-mobile-screen-img {
            opacity: 0;
          }
```

- [ ] **Step 2: Verify TypeScript**

Run: `cd "/Users/vitaliitrus/Projects/flight passport landing/site" && npx tsc --noEmit 2>&1 | grep -i error | head -20`

Expected: No errors.

- [ ] **Step 3: Verify mobile layout in browser**

Open DevTools → toggle device toolbar → select a mobile viewport (375px wide). Verify:
- Tab dots appear at top, active dot is larger and dark
- Phone displays correctly (200px wide, centered)
- Swiping left/right on the phone navigates steps
- Prev/Next buttons work, Prev disabled on step 1, Next disabled on step 4
- Auto-advance advances the carousel every ~3.5 seconds when in view

- [ ] **Step 4: Commit**

```bash
cd "/Users/vitaliitrus/Projects/flight passport landing/site"
git add app/components/HowItWorksScroll.tsx
git commit -m "feat: HowItWorksScroll v2 mobile carousel — swipe, tab dots, auto-advance, prev/next nav"
```

---

## Task 5: Build verification and final polish check

**Files:**
- Verify: `site/app/components/HowItWorksScroll.tsx`
- Verify: build output

- [ ] **Step 1: Run production build**

Run: `cd "/Users/vitaliitrus/Projects/flight passport landing/site" && npx next build 2>&1 | tail -30`

Expected: Build completes with no errors. Warnings about `img` vs `next/image` are acceptable (noted as known/intentional for this project).

- [ ] **Step 2: TypeScript full check**

Run: `cd "/Users/vitaliitrus/Projects/flight passport landing/site" && npx tsc --noEmit 2>&1`

Expected: No output (clean).

- [ ] **Step 3: Verify image paths exist**

Run:
```bash
ls "/Users/vitaliitrus/Projects/flight passport landing/site/public/Images/" | grep -E "asset-6d585e68|asset-e7f0beef|asset-60c1185f|asset-7ca5fa0f"
```

Expected: All 4 image files are listed. If `asset-7ca5fa0f` (step 4) is missing, that's OK for now — the `<img>` will show broken, but no JS error.

- [ ] **Step 4: Smoke-test dead zone scroll logic**

This is a manual verification — in the browser:
1. Scroll slowly from the top of the "How it works" section
2. Verify that Step 1 stays active until you've scrolled about 30% into the second zone (roughly 130vh of the 400vh total)
3. Verify transitions don't feel twitchy at zone boundaries

- [ ] **Step 5: Final commit**

```bash
cd "/Users/vitaliitrus/Projects/flight passport landing/site"
git add app/components/HowItWorksScroll.tsx
git commit -m "chore: HowItWorksScroll v2 — build verified, all 4 tasks complete"
```

---

## Self-Review Checklist

After writing this plan:

**Spec coverage:**
- [x] Desktop layout (phone left, text right, 140px gap, 280px phone, 440px text) — Task 3
- [x] 500vh container with dead zone scroll logic — Task 1 (handleScroll) + Task 3 (outerRef)
- [x] Transition state machine (exiting → paused → entering, 400+300+400ms) — Task 1 (triggerTransition)
- [x] Step indicator states (completed/active/upcoming) with connector fill — Task 3 JSX + Task 2 CSS
- [x] Fixed progress bar (right: 40px, 240px height, 4 dots, fill line) — Task 3 JSX + Task 2 CSS
- [x] Section heading outside sticky (overline + h2, scrolls away) — Task 3 JSX + Task 2 CSS
- [x] Mobile carousel (tab dots, 200px phone, swipe, prev/next, auto-advance) — Task 4
- [x] isMobile detection via window.innerWidth + resize — Task 1
- [x] Auto-advance (3500ms, inView guard, isScrolling guard) — Task 1
- [x] Staggered text enter animations (label 0ms, title 100ms, desc 200ms) — Task 2 CSS
- [x] Screen blur+scale exit/enter animations — Task 2 CSS
- [x] Hover states (inactive dot border-color, inactive title color) — Task 2 CSS
- [x] Keyboard navigation (Arrow/Home/End on section, Enter/Space on dots) — Task 1 + Task 3
- [x] Accessibility (aria-live region, aria-label, tabIndex, role) — Task 3
- [x] Reduced motion media query — Task 2 CSS
- [x] Tablet stacked layout (220px phone, centered text, no fixed bar) — Task 2 CSS

**No placeholders:** All code blocks contain actual implementation.

**Type consistency:** `TransitionPhase`, `Step` defined once in Task 1, used consistently in Tasks 2-4. `STEPS.length - 1` used for bounds everywhere (not hardcoded `3`). `activeRef.current` used in callbacks, `active` used in JSX rendering.
