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
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
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
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
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
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [handleScroll, startAuto, stopAuto]);

  // Progress bar fill % and indicator track fill height
  const progressFillPct = (active / (STEPS.length - 1)) * 100;
  const trackFillHeightPx = active * 40; // 40px per slot (8px margin + 24px dot area + 8px margin)

  // ─────────────────────────────────────────────────────────────────────────
  // Return — CSS block added in Task 2; JSX added in Tasks 3 & 4
  // ─────────────────────────────────────────────────────────────────────────
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

        /* ── Screen image wrapper (handles transition animations) ────── */
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

        /* Screen transition via phase class on sticky container wrapper */
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

        /* ── Step indicator track (left of text col) ─────────────────── */
        .hiw-indicator-track {
          position: absolute;
          left: -48px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
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
          transition: width 300ms ease, height 300ms ease, background 300ms ease, box-shadow 300ms ease, border-color 300ms ease, transform 200ms ease;
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

        /* Text stagger enter animation — only during entering phase */
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
            border: none;
            padding: 0;
            display: block;
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
          /* Mobile screen — reuse desktop phase classes */
          .hiw-mobile-screen-wrap.phase-exiting .hiw-mobile-screen-img {
            animation: hiw-screen-out 300ms ease-in both;
          }
          .hiw-mobile-screen-wrap.phase-entering .hiw-mobile-screen-img {
            animation: hiw-screen-in 300ms ease-out both;
          }
          .hiw-mobile-screen-wrap.phase-paused .hiw-mobile-screen-img {
            opacity: 0;
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

          .hiw-mobile-screen-wrap.phase-exiting .hiw-mobile-screen-img,
          .hiw-mobile-screen-wrap.phase-entering .hiw-mobile-screen-img {
            filter: none !important;
            transform: none !important;
            animation: none !important;
            transition: opacity 200ms ease !important;
          }
          .hiw-mobile-screen-wrap.phase-exiting .hiw-mobile-screen-img { opacity: 0; }
          .hiw-mobile-screen-wrap.phase-paused .hiw-mobile-screen-img  { opacity: 0; }
          .hiw-mobile-screen-wrap.phase-entering .hiw-mobile-screen-img { opacity: 1; }

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

      {/* ── Accessibility live region ────────────────────────────────────── */}
      <div aria-live="polite" aria-atomic="true" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}>
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

                {/* Step indicator track — positioned left of text col */}
                <div className="hiw-indicator-track">
                  <div className="hiw-track-line-bg" />
                  <div
                    className="hiw-track-line-fill"
                    style={{ height: `${trackFillHeightPx}px` }}
                  />
                  {STEPS.map((step, i) => {
                    const dotState = i < active ? 'completed' : i === active ? 'active-dot' : 'upcoming';
                    return (
                      <div
                        key={i}
                        className="hiw-indicator-slot"
                        role="button"
                        tabIndex={0}
                        aria-label={`Go to step ${i + 1}: ${step.title}`}
                        onClick={() => goTo(i)}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goTo(i); } }}
                      >
                        <div className={`hiw-dot ${dotState}`}>
                          {dotState === 'completed' && (
                            <svg width="7" height="6" viewBox="0 0 7 6" fill="none" aria-hidden="true">
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
                    className={`hiw-step-item${i === active ? ' active' : ''}`}
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
      <div className={`hiw-progress-bar${inView && !isMobile ? '' : ' hidden'}`}>
        <div
          className="hiw-progress-fill"
          style={{ height: `${progressFillPct}%` }}
        />
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`hiw-progress-dot ${i <= active ? 'active-dot' : 'inactive-dot'}`}
            style={{ top: `${(i / (STEPS.length - 1)) * 100}%` }}
          />
        ))}
      </div>

      {/* ── Mobile carousel — added in Task 4 ───────────────────────────── */}
      {isMobile && (
        <p style={{ padding: '40px', color: '#999', textAlign: 'center' }}>Mobile carousel — Task 4</p>
      )}
    </section>
  );
}
