'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

// ── Step data — exact text from Figma ────────────────────────────────────────
const STEPS = [
  {
    num:     '01',
    regular: 'Find any flight ',
    italic:  'in seconds',
    desc:    'Search by flight number or route. We instantly retrieve real operational data — schedules, aircraft, and route details.',
    image:   '/Images/hiw-step01.png',
  },
  {
    num:     '02',
    regular: 'Understand ',
    italic:  'what to expect',
    desc:    'See delay history, reliability, turbulence, and aircraft details before your trip begins.',
    image:   '/Images/hiw-step02.png',
  },
  {
    num:     '03',
    regular: 'Stay ahead ',
    italic:  'of every change',
    desc:    'We monitor your flight continuously and notify you when something important happens.',
    image:   '/Images/hiw-step03.png',
  },
  {
    num:     '04',
    regular: 'Build your ',
    italic:  'travel history',
    desc:    'A complete record of your travels, flights, and destinations — built automatically.',
    image:   '/Images/hiw-step04.png',
  },
];

const AUTO_MS = 4000;

// ── Phone dimensions — from Figma (scaled to 238px card width) ────────────────
// Figma phone container: 242.667 × 504.526 px  →  scale = 238/242.667 = 0.9808
const CARD_W = 238;
const CARD_H = 495;   // 504.526 × 0.9808
const SCR_L  = 6;     // 5.66  × 0.9808
const SCR_W  = 222;   // 226.355 × 0.9808
const SCR_H  = 481;   // 490.708 × 0.9808
const SCR_T  = Math.round((CARD_H - SCR_H) / 2); // vertically centered = 7px
const SCR_R  = 29;    // 29.817 × 0.9808

export default function HowItWorksScroll() {
  const [active,  setActive]  = useState(0);
  const [display, setDisplay] = useState(0);
  const [fading,  setFading]  = useState(false);
  const [dotKey,  setDotKey]  = useState(0); // increment to restart CSS animation

  const sectionRef = useRef<HTMLElement>(null);
  const activeRef  = useRef(0);
  const fadingRef  = useRef(false);
  const inViewRef  = useRef(false);
  const autoTimer  = useRef<ReturnType<typeof setInterval> | null>(null);
  const fadeTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchX     = useRef(0);

  // ── Core navigation ──────────────────────────────────────────────────────────
  const goTo = useCallback((next: number) => {
    if (fadingRef.current) return;
    if (next === activeRef.current) return;

    activeRef.current = next;
    setActive(next);
    setDotKey(k => k + 1); // restart dot progress animation

    fadingRef.current = true;
    setFading(true);

    fadeTimer.current = setTimeout(() => {
      setDisplay(next);
      fadingRef.current = false;
      setFading(false);
    }, 240);
  }, []);

  const stopAuto = useCallback(() => {
    if (autoTimer.current) { clearInterval(autoTimer.current); autoTimer.current = null; }
  }, []);

  const startAuto = useCallback(() => {
    stopAuto();
    autoTimer.current = setInterval(() => {
      if (!inViewRef.current) return;
      goTo((activeRef.current + 1) % STEPS.length);
    }, AUTO_MS);
  }, [stopAuto, goTo]);

  // ── Intersection observer — start/stop auto ──────────────────────────────────
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
        entry.isIntersecting ? startAuto() : stopAuto();
      },
      { threshold: 0.25 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => {
      obs.disconnect();
      stopAuto();
      if (fadeTimer.current) clearTimeout(fadeTimer.current);
    };
  }, [startAuto, stopAuto]);

  // ── Touch swipe ──────────────────────────────────────────────────────────────
  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    const d = touchX.current - e.changedTouches[0].clientX;
    if (Math.abs(d) > 48) { stopAuto(); goTo(d > 0 ? Math.min(3, activeRef.current + 1) : Math.max(0, activeRef.current - 1)); }
  };

  // ── Keyboard ─────────────────────────────────────────────────────────────────
  const onKeyDown = (e: React.KeyboardEvent) => {
    const k = e.key;
    if (k === 'ArrowRight' || k === 'ArrowDown') { e.preventDefault(); stopAuto(); goTo(Math.min(3, activeRef.current + 1)); }
    if (k === 'ArrowLeft'  || k === 'ArrowUp')   { e.preventDefault(); stopAuto(); goTo(Math.max(0, activeRef.current - 1)); }
    if (k === 'Home') { e.preventDefault(); stopAuto(); goTo(0); }
    if (k === 'End')  { e.preventDefault(); stopAuto(); goTo(3); }
  };

  const step = STEPS[display];

  return (
    <section
      ref={sectionRef}
      className="hiw"
      tabIndex={0}
      onKeyDown={onKeyDown}
      aria-label="How FlightPassport works"
    >
      <style>{`
        /* ── Section shell ──────────────────────────────────────────── */
        .hiw {
          min-height: 100svh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 120px 24px;
          box-sizing: border-box;
          outline: none;
          border-top: 1px solid #e7e5e4;
          border-bottom: 1px solid #e7e5e4;
          background: linear-gradient(261.64deg, #e6e6e6 6.85%, #ffffff 83.93%);
        }

        /* ── Inner — justify-content:center, exact Figma gap ─────── */
        .hiw-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 80px;
          width: 100%;
        }

        /* ── Text column — 384px, centered ─────────────────────────── */
        .hiw-text {
          width: 384px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          text-align: center;
          transition: opacity 240ms ease, transform 240ms ease;
        }
        .hiw-text.fading {
          opacity: 0;
          transform: translateY(10px);
        }

        /* step label — "STEP 01" */
        .hiw-step-label {
          font-size: 18px;
          font-weight: 600;
          letter-spacing: -0.01em;
          text-transform: uppercase;
          color: #a8a29e;
          margin: 0;
          line-height: 1.4;
        }

        /* heading — 48px bold + italic blue */
        .hiw-heading {
          font-size: 48px;
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.1;
          color: #1c1917;
          margin: 0;
        }
        .hiw-heading em {
          font-style: italic;
          font-weight: 400;
          color: #0284c7;
        }

        /* description */
        .hiw-desc {
          font-size: 17px;
          font-weight: 400;
          line-height: 1.4;
          color: #6c6760;
          margin: 0;
          max-width: 342px;
        }

        /* ── Dot indicators ─────────────────────────────────────────── */
        .hiw-dots {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 8px;
        }
        .hiw-dot-btn {
          padding: 0;
          background: none;
          border: none;
          cursor: pointer;
          line-height: 0;
          flex-shrink: 0;
        }
        /* track — pill for active, circle for inactive */
        .hiw-dot-track {
          display: block;
          height: 10px;
          border-radius: 999px;
          background: #d6d3d1;
          overflow: hidden;
          position: relative;
          width: 10px;
          transition: width 320ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hiw-dot-btn.active .hiw-dot-track {
          width: 32px;
        }
        /* progress fill — animates over AUTO_MS */
        .hiw-dot-progress {
          position: absolute;
          inset: 0 auto 0 0;
          width: 0%;
          border-radius: 999px;
          background: #1c1917;
        }
        .hiw-dot-btn.active .hiw-dot-progress {
          animation: hiw-progress ${AUTO_MS}ms linear forwards;
        }
        @keyframes hiw-progress {
          from { width: 0%; }
          to   { width: 100%; }
        }

        /* ── Phone column — fixed width, no flex growth ────────────── */
        .hiw-phone-col {
          flex-shrink: 0;
          touch-action: pan-y;
        }

        /* white card — Figma: bg-white, rounded-[48px], shadow
           NO overflow:hidden — it clips the chrome SVG corners.
           Chrome SVG outer radius at 238px ≈ 36px, card matches. */
        .hiw-card {
          position: relative;
          width: ${CARD_W}px;
          height: ${CARD_H}px;
          background: #ffffff;
          border-radius: 36px;
          box-shadow:
            0px 4px 12px 0px rgba(0, 0, 0, 0.05),
            32px 32px 64px 0px rgba(23, 29, 46, 0.12);
          transition: opacity 240ms ease, transform 240ms ease;
        }
        .hiw-card.fading {
          opacity: 0;
          transform: scale(0.975);
        }

        /* screen — Figma: left 5.66, vertically centered, rounded 29.8 */
        .hiw-screen {
          position: absolute;
          left: ${SCR_L}px;
          top: ${SCR_T}px;
          width: ${SCR_W}px;
          height: ${SCR_H}px;
          border-radius: ${SCR_R}px;
          overflow: hidden;
          background: #f0f0f0;
        }
        .hiw-screen img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* chrome overlay — on top of screen */
        .hiw-chrome {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
          display: block;
        }

        /* ── Tablet (768–1099px) ────────────────────────────────────── */
        @media (min-width: 768px) and (max-width: 1099px) {
          .hiw { padding: 80px 24px; }
          .hiw-inner { gap: 48px; max-width: 860px; }
          .hiw-text { width: 320px; }
          .hiw-heading { font-size: 38px; }
          .hiw-step-label { font-size: 15px; }
          .hiw-desc { font-size: 15px; max-width: 280px; }
        }

        /* ── Mobile (<768px) ────────────────────────────────────────── */
        @media (max-width: 767px) {
          .hiw { padding: 64px 24px 72px; min-height: unset; }
          .hiw-inner { flex-direction: column; gap: 40px; }
          .hiw-text { width: 100%; max-width: 360px; order: 2; }
          .hiw-phone-col { order: 1; }
          .hiw-heading { font-size: 34px; }
          .hiw-step-label { font-size: 14px; }
          .hiw-desc { font-size: 15px; }
        }

        /* ── Reduced motion ─────────────────────────────────────────── */
        @media (prefers-reduced-motion: reduce) {
          .hiw-text, .hiw-card { transition: none !important; }
          .hiw-dot-progress { animation: none !important; width: 100% !important; }
          .hiw-dot-track { transition: none !important; }
        }
      `}</style>

      {/* Accessibility live region */}
      <div aria-live="polite" aria-atomic="true" style={{ position:'absolute', width:1, height:1, overflow:'hidden', clip:'rect(0,0,0,0)', whiteSpace:'nowrap' }}>
        Step {display + 1} of {STEPS.length}: {step.regular}{step.italic}
      </div>

      <div className="hiw-inner">

        {/* ── Left: text ──────────────────────────────────────────────── */}
        <div className={`hiw-text${fading ? ' fading' : ''}`}>

          {/* "STEP 01" */}
          <p className="hiw-step-label">Step {step.num}</p>

          {/* "Find any flight in seconds" */}
          <h2 className="hiw-heading">
            {step.regular}<em>{step.italic}</em>
          </h2>

          {/* description */}
          <p className="hiw-desc">{step.desc}</p>

          {/* dot progress indicators */}
          <div className="hiw-dots" role="tablist" aria-label="Steps">
            {STEPS.map((s, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === active}
                aria-label={`Step ${i + 1}: ${s.regular}${s.italic}`}
                className={`hiw-dot-btn${i === active ? ' active' : ''}`}
                onClick={() => { stopAuto(); goTo(i); }}
              >
                <span className="hiw-dot-track">
                  {/* key forces animation restart when active step changes */}
                  {i === active && (
                    <span key={`${i}-${dotKey}`} className="hiw-dot-progress" />
                  )}
                </span>
              </button>
            ))}
          </div>

        </div>

        {/* ── Right: phone ────────────────────────────────────────────── */}
        <div
          className="hiw-phone-col"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className={`hiw-card${fading ? ' fading' : ''}`}>

            {/* app screenshot */}
            <div className="hiw-screen">
              <img
                src={step.image}
                alt={`Step ${display + 1}: ${step.regular}${step.italic}`}
                draggable={false}
              />
            </div>

            {/* phone chrome frame on top */}
            <img
              src="/Images/hero-phone-chrome.svg"
              className="hiw-chrome"
              alt=""
              aria-hidden="true"
              draggable={false}
            />

          </div>
        </div>

      </div>
    </section>
  );
}
