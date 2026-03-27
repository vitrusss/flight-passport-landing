'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

type Phase = 'idle' | 'out' | 'in';

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
    title: 'Your flight passport',
    desc: 'A complete record of every flight — searchable, shareable, always in your pocket.',
    image: '/Images/asset-60c1185f-d58c-4975-aa4f-d446835553c6.png', // TODO: replace with actual step 4 screenshot
  },
];

const AUTO_MS = 4000;

// Chrome SVG is 364 × 756.789 px
// Scale factors: desktop 280/364, tablet 240/364, mobile 200/364
const CHROME_W = 364;
const CHROME_H = 756.789;
const SCREEN_L = 12;   // screen area left in native chrome coords
const SCREEN_T = 10;   // screen area top
const SCREEN_W = 340;  // screen area width
const SCREEN_H = 747;  // screen area height

function phoneMetrics(displayW: number) {
  const s = displayW / CHROME_W;
  return {
    frameH: Math.round(CHROME_H * s),
    screenL: Math.round(SCREEN_L * s),
    screenT: Math.round(SCREEN_T * s),
    screenW: Math.round(SCREEN_W * s),
    screenH: Math.round(SCREEN_H * s),
  };
}

export default function HowItWorksScroll() {
  const [active, setActive] = useState(0);
  const [display, setDisplay] = useState(0);
  const [phase, setPhase] = useState<Phase>('idle');

  const sectionRef = useRef<HTMLElement>(null);
  const activeRef = useRef(0);
  const phaseRef = useRef<Phase>('idle');
  const inViewRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const transRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef(0);

  const goTo = useCallback((next: number) => {
    if (phaseRef.current !== 'idle') return;
    if (next === activeRef.current) return;
    if (transRef.current) clearTimeout(transRef.current);

    activeRef.current = next;
    setActive(next);
    phaseRef.current = 'out';
    setPhase('out');

    transRef.current = setTimeout(() => {
      setDisplay(next);
      phaseRef.current = 'in';
      setPhase('in');
      transRef.current = setTimeout(() => {
        phaseRef.current = 'idle';
        setPhase('idle');
      }, 300);
    }, 250);
  }, []);

  const stopAuto = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, []);

  const startAuto = useCallback(() => {
    stopAuto();
    timerRef.current = setInterval(() => {
      if (!inViewRef.current) return;
      goTo((activeRef.current + 1) % STEPS.length);
    }, AUTO_MS);
  }, [stopAuto, goTo]);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) {
      if (delta > 0) goTo(Math.min(STEPS.length - 1, activeRef.current + 1));
      else           goTo(Math.max(0, activeRef.current - 1));
    }
  }, [goTo]);

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goTo(Math.min(STEPS.length - 1, activeRef.current + 1));
    if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   goTo(Math.max(0, activeRef.current - 1));
    if (e.key === 'Home') goTo(0);
    if (e.key === 'End')  goTo(STEPS.length - 1);
  }, [goTo]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
        if (entry.isIntersecting) startAuto();
        else stopAuto();
      },
      { threshold: 0.25 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      observer.disconnect();
      stopAuto();
      if (transRef.current) clearTimeout(transRef.current);
    };
  }, [startAuto, stopAuto]);

  const fillPct = (active / (STEPS.length - 1)) * 100;
  const d = phoneMetrics(280);
  const dt = phoneMetrics(240); // tablet
  const dm = phoneMetrics(200); // mobile

  return (
    <section
      ref={sectionRef}
      className="hiw-section"
      aria-label="How FlightPassport works"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <style>{`
        /* ── Section ─────────────────────────────────────────────────── */
        .hiw-section {
          padding: 120px 24px 128px;
          text-align: center;
          outline: none;
        }

        /* ── Heading ─────────────────────────────────────────────────── */
        .hiw-header {
          margin-bottom: 72px;
        }
        .hiw-overline {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #a8a29e;
          margin: 0 0 14px;
        }
        .hiw-h2 {
          font-size: 56px;
          font-weight: 700;
          letter-spacing: -0.025em;
          line-height: 1.08;
          color: #1c1917;
          margin: 0;
        }

        /* ── Stepper ─────────────────────────────────────────────────── */
        .hiw-stepper {
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          max-width: 540px;
          margin: 0 auto 60px;
        }
        /* connecting track */
        .hiw-track {
          position: absolute;
          top: 17px;   /* vertically center on 36px circles */
          left: 18px;  /* half of circle */
          right: 18px;
          height: 2px;
          background: #e5e7eb;
          border-radius: 2px;
          z-index: 0;
          overflow: hidden;
        }
        .hiw-track-fill {
          position: absolute;
          inset: 0 auto 0 0;
          background: linear-gradient(90deg, #10B981, #1c1917 80%);
          transition: width 700ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        /* step button */
        .hiw-step-btn {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          text-align: center;
        }
        .hiw-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.02em;
          /* default: upcoming */
          background: white;
          border: 2px solid #e5e7eb;
          color: #b0b7c3;
          transition: background 350ms ease, border-color 350ms ease, color 350ms ease,
                      box-shadow 350ms ease, transform 350ms ease;
        }
        .hiw-step-btn.completed .hiw-circle {
          background: #10B981;
          border-color: #10B981;
          color: white;
        }
        .hiw-step-btn.active .hiw-circle {
          background: #1c1917;
          border-color: #1c1917;
          color: white;
          box-shadow: 0 0 0 5px rgba(28, 25, 23, 0.08);
          transform: scale(1.12);
        }
        .hiw-step-btn:not(.active):not(.completed):hover .hiw-circle {
          border-color: #9ca3af;
          transform: scale(1.06);
        }
        .hiw-step-lbl {
          font-size: 11px;
          font-weight: 500;
          line-height: 1.35;
          max-width: 88px;
          color: #b0b7c3;
          transition: color 350ms ease, font-weight 250ms ease;
        }
        .hiw-step-btn.active .hiw-step-lbl {
          color: #1c1917;
          font-weight: 600;
        }
        .hiw-step-btn.completed .hiw-step-lbl {
          color: #9ca3af;
        }

        /* ── Phone ───────────────────────────────────────────────────── */
        .hiw-phone-col {
          display: flex;
          justify-content: center;
          margin-bottom: 52px;
          touch-action: pan-y;
        }
        .hiw-phone {
          width: ${d.frameH === 0 ? 280 : d.frameH ? d.frameH : 280}px;
          width: 280px;
          height: ${d.frameH}px;
          position: relative;
          /* drop-shadow follows the chrome SVG shape */
          filter:
            drop-shadow(0 2px 4px rgba(0,0,0,0.06))
            drop-shadow(0 12px 32px rgba(0,0,0,0.14))
            drop-shadow(0 32px 64px rgba(0,0,0,0.10));
        }
        .hiw-screen {
          position: absolute;
          left: ${d.screenL}px;
          top: ${d.screenT}px;
          width: ${d.screenW}px;
          height: ${d.screenH}px;
          overflow: hidden;
        }
        .hiw-screen-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: opacity 250ms ease;
        }
        .hiw-phase-out .hiw-screen-img {
          opacity: 0;
        }
        .hiw-chrome {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
          display: block;
        }

        /* ── Step content ────────────────────────────────────────────── */
        .hiw-content {
          max-width: 440px;
          margin: 0 auto;
        }
        .hiw-content.hiw-phase-out {
          opacity: 0;
          transform: translateY(-10px);
          transition: opacity 250ms ease, transform 250ms ease;
        }
        .hiw-content.hiw-phase-in {
          animation: hiw-rise 300ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes hiw-rise {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hiw-step-num {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #9ca3af;
          margin: 0 0 12px;
        }
        .hiw-step-title {
          font-size: 36px;
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.15;
          color: #111827;
          margin: 0 0 16px;
        }
        .hiw-step-desc {
          font-size: 18px;
          font-weight: 400;
          line-height: 1.7;
          color: #6B7280;
          margin: 0;
        }

        /* ── Tablet (768–1023px) ─────────────────────────────────────── */
        @media (min-width: 768px) and (max-width: 1023px) {
          .hiw-h2 { font-size: 44px; }
          .hiw-phone { width: 240px; height: ${dt.frameH}px; }
          .hiw-screen {
            left: ${dt.screenL}px; top: ${dt.screenT}px;
            width: ${dt.screenW}px; height: ${dt.screenH}px;
          }
          .hiw-step-title { font-size: 30px; }
        }

        /* ── Mobile (<768px) ─────────────────────────────────────────── */
        @media (max-width: 767px) {
          .hiw-section { padding: 80px 20px 96px; }
          .hiw-h2 { font-size: 32px; }
          .hiw-header { margin-bottom: 48px; }
          .hiw-stepper { max-width: 320px; margin-bottom: 44px; }
          .hiw-circle { width: 28px; height: 28px; font-size: 10px; }
          .hiw-track { top: 13px; }
          .hiw-step-lbl { display: none; }
          .hiw-phone { width: 200px; height: ${dm.frameH}px; }
          .hiw-screen {
            left: ${dm.screenL}px; top: ${dm.screenT}px;
            width: ${dm.screenW}px; height: ${dm.screenH}px;
          }
          .hiw-step-title { font-size: 26px; }
          .hiw-step-desc { font-size: 16px; }
          .hiw-content { max-width: 320px; }
        }

        /* ── Reduced motion ──────────────────────────────────────────── */
        @media (prefers-reduced-motion: reduce) {
          .hiw-screen-img { transition: none !important; }
          .hiw-content.hiw-phase-out { transition: none !important; }
          .hiw-content.hiw-phase-in  { animation: none !important; }
        }
      `}</style>

      {/* Accessibility live region */}
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}
      >
        Step {display + 1} of {STEPS.length}: {STEPS[display].title}
      </div>

      {/* Heading */}
      <div className="hiw-header">
        <p className="hiw-overline">How it works</p>
        <h2 className="hiw-h2">Four steps.<br />Zero confusion.</h2>
      </div>

      {/* Stepper */}
      <div className="hiw-stepper" role="tablist" aria-label="Steps">
        <div className="hiw-track">
          <div className="hiw-track-fill" style={{ width: `${fillPct}%` }} />
        </div>
        {STEPS.map((step, i) => {
          const cls = i < active ? 'completed' : i === active ? 'active' : '';
          return (
            <button
              key={i}
              role="tab"
              aria-selected={i === active}
              aria-label={`Step ${step.num}: ${step.title}`}
              className={`hiw-step-btn${cls ? ` ${cls}` : ''}`}
              onClick={() => goTo(i)}
            >
              <span className="hiw-circle">
                {i < active ? (
                  <svg width="12" height="10" viewBox="0 0 12 10" fill="none" aria-hidden="true">
                    <path d="M1.5 5L4.5 8L10.5 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  step.num
                )}
              </span>
              <span className="hiw-step-lbl">{step.title}</span>
            </button>
          );
        })}
      </div>

      {/* Phone */}
      <div
        className={`hiw-phone-col${phase !== 'idle' ? ` hiw-phase-${phase}` : ''}`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="hiw-phone">
          <div className="hiw-screen">
            <img
              src={STEPS[display].image}
              alt={`Step ${display + 1}: ${STEPS[display].title}`}
              className="hiw-screen-img"
              draggable={false}
            />
          </div>
          <img
            src="/Images/hero-phone-chrome.svg"
            alt=""
            className="hiw-chrome"
            aria-hidden="true"
            draggable={false}
          />
        </div>
      </div>

      {/* Content */}
      <div className={`hiw-content${phase !== 'idle' ? ` hiw-phase-${phase}` : ''}`}>
        <p className="hiw-step-num">Step {STEPS[display].num}</p>
        <h3 className="hiw-step-title">{STEPS[display].title}</h3>
        <p className="hiw-step-desc">{STEPS[display].desc}</p>
      </div>
    </section>
  );
}
