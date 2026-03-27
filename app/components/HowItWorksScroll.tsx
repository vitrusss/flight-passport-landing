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

  // ─────────────────────────────────────────────────────────────────────────
  // Placeholder return — replaced in Task 3 & 4
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <section ref={sectionRef} aria-label="How FlightPassport works">
      <p style={{ padding: '40px', color: '#999' }}>HowItWorksScroll v2 — logic skeleton (Tasks 2–4 will add CSS and JSX)</p>
    </section>
  );
}
