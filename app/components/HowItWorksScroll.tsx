'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

interface Step {
  num: string;
  title: string;
  desc: string;
  image: string;
}

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
    title: 'Save to passport',
    desc: 'Completed journeys are recorded automatically to your personal travel history.',
    image: '/Images/asset-step04-passport-screen.png',
  },
];

// ── Phone chrome asset URLs ─────────────────────────────────────────────────

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
  const manualJumpRef = useRef(false);
  const manualJumpTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const totalScrollRef = useRef(0);

  // ── Scroll → step mapping ──────────────────────────────────────────────────
  const handleScroll = useCallback(() => {
    if (!outerRef.current) return;
    if (manualJumpRef.current) return; // ignore scroll during manual step jump

    // Track "user is scrolling" to pause auto-advance
    isScrollingRef.current = true;
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 150);

    const rect      = outerRef.current.getBoundingClientRect();
    const totalScroll = totalScrollRef.current || (outerRef.current.offsetHeight - window.innerHeight); // 400vh container - 100vh viewport = 300vh scrollable
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
    // Cache scroll height once to avoid layout reflow on every scroll tick
    if (outerRef.current) {
      totalScrollRef.current = outerRef.current.offsetHeight - window.innerHeight;
    }

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
      { threshold: 0.25 }
    );
    if (outerRef.current) obs.observe(outerRef.current);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      obs.disconnect();
      stopAuto();
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      if (manualJumpTimerRef.current) clearTimeout(manualJumpTimerRef.current);
    };
  }, [handleScroll, startAuto, stopAuto]);

  // ── Click handler (manual step jump) ──────────────────────────────────────
  const goTo = useCallback((index: number) => {
    setActive(index);
    // Block scroll handler briefly so it doesn't override the manual jump
    manualJumpRef.current = true;
    if (manualJumpTimerRef.current) clearTimeout(manualJumpTimerRef.current);
    manualJumpTimerRef.current = setTimeout(() => {
      manualJumpRef.current = false;
    }, 600);
    // Restart auto after manual selection
    stopAuto();
    startAuto();
  }, [startAuto, stopAuto]);

  return (
    <div ref={outerRef} style={{ height: '400vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh' }}>
        <p>Step {active + 1}</p>
      </div>
    </div>
  );
}
