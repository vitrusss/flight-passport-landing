'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

const STEPS = [
  {
    num: '01',
    regular: 'Find any flight ',
    italic:  'in seconds',
    desc:    'Search by flight number or route. We instantly retrieve real operational data — schedules, aircraft, and route details.',
    image:   '/Images/asset-6d585e68-0d7f-496f-b018-4e5caf21dcec.png',
  },
  {
    num: '02',
    regular: 'Understand ',
    italic:  'what to expect',
    desc:    'See delay history, reliability, turbulence, and aircraft details before your trip begins.',
    image:   '/Images/asset-e7f0beef-9438-42ea-8d9c-bf615f9c17d2.png',
  },
  {
    num: '03',
    regular: 'Stay ahead ',
    italic:  'of every change',
    desc:    'We monitor your flight continuously and notify you when something important happens.',
    image:   '/Images/asset-60c1185f-d58c-4975-aa4f-d446835553c6.png',
  },
  {
    num: '04',
    regular: 'Build your ',
    italic:  'travel history',
    desc:    'A complete record of your travels, flights, and destinations — built automatically.',
    image:   '/Images/asset-60c1185f-d58c-4975-aa4f-d446835553c6.png', // TODO: replace
  },
];

const AUTO_MS = 4000;

// Phone card dimensions (238px display width, chrome SVG 364×756.789)
const CARD_W  = 238;
const CARD_H  = Math.round(756.789 / 364 * CARD_W); // 495
const SCR_L   = Math.round(12   / 364     * CARD_W); // 8
const SCR_T   = Math.round(10   / 756.789 * CARD_H); // 7
const SCR_W   = Math.round(340  / 364     * CARD_W); // 222
const SCR_H   = Math.round(747  / 756.789 * CARD_H); // 489
const SCR_R   = 30; // border-radius of screen (matches Figma ~29.8px)
const CARD_R  = Math.round(55.09 / 364 * CARD_W);   // 36 — matches chrome outer radius

export default function HowItWorksScroll() {
  const [active,  setActive]  = useState(0);
  const [display, setDisplay] = useState(0);
  const [fading,  setFading]  = useState(false);
  // key forces CSS animation restart on active change
  const [dotKey, setDotKey]   = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const activeRef  = useRef(0);
  const fadingRef  = useRef(false);
  const inViewRef  = useRef(false);
  const timerRef   = useRef<ReturnType<typeof setInterval> | null>(null);
  const fadeTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchX     = useRef(0);

  const goTo = useCallback((next: number) => {
    if (fadingRef.current) return;
    if (next === activeRef.current) return;

    activeRef.current = next;
    setActive(next);
    setDotKey(k => k + 1);
    fadingRef.current = true;
    setFading(true);

    fadeTimer.current = setTimeout(() => {
      setDisplay(next);
      fadingRef.current = false;
      setFading(false);
    }, 220);
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

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { inViewRef.current = e.isIntersecting; e.isIntersecting ? startAuto() : stopAuto(); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => {
      obs.disconnect();
      stopAuto();
      if (fadeTimer.current) clearTimeout(fadeTimer.current);
    };
  }, [startAuto, stopAuto]);

  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    const d = touchX.current - e.changedTouches[0].clientX;
    if (Math.abs(d) > 48) {
      stopAuto();
      goTo(d > 0 ? Math.min(3, activeRef.current + 1) : Math.max(0, activeRef.current - 1));
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); stopAuto(); goTo(Math.min(3, activeRef.current + 1)); }
    if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   { e.preventDefault(); stopAuto(); goTo(Math.max(0, activeRef.current - 1)); }
    if (e.key === 'Home') { e.preventDefault(); stopAuto(); goTo(0); }
    if (e.key === 'End')  { e.preventDefault(); stopAuto(); goTo(3); }
  };

  return (
    <section
      ref={sectionRef}
      className="hiw"
      tabIndex={0}
      onKeyDown={onKeyDown}
      aria-label="How FlightPassport works"
    >
      <style>{`
        /* ── Section ─────────────────────────────────────────────────── */
        .hiw {
          min-height: 100svh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 80px 24px;
          box-sizing: border-box;
          outline: none;
          border-top: 1px solid #e7e5e4;
          border-bottom: 1px solid #e7e5e4;
          background: linear-gradient(261.64deg, #e6e6e6 6.85%, #ffffff 83.93%);
        }

        /* ── Inner layout ─────────────────────────────────────────────── */
        .hiw-inner {
          display: flex;
          align-items: center;
          gap: 80px;
          max-width: 1020px;
          width: 100%;
        }

        /* ── Text column ─────────────────────────────────────────────── */
        .hiw-text-col {
          width: 384px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          text-align: center;
          transition: opacity 220ms ease, transform 220ms ease;
        }
        .hiw-text-col.fading {
          opacity: 0;
          transform: translateY(8px);
        }
        .hiw-label {
          font-size: 18px;
          font-weight: 600;
          letter-spacing: -0.01em;
          text-transform: uppercase;
          color: #a8a29e;
          margin: 0;
        }
        .hiw-heading {
          font-size: 48px;
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.1;
          color: #1c1917;
          margin: 0;
        }
        .hiw-accent {
          font-style: italic;
          font-weight: 400;
          color: #0284c7;
        }
        .hiw-desc {
          font-size: 17px;
          font-weight: 400;
          line-height: 1.4;
          color: #6c6760;
          margin: 0;
          max-width: 342px;
        }

        /* ── Dot indicators ──────────────────────────────────────────── */
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
        }
        .hiw-dot-track {
          height: 10px;
          border-radius: 999px;
          background: #d6d3d1;
          overflow: hidden;
          position: relative;
          transition: width 300ms cubic-bezier(0.4, 0, 0.2, 1);
          width: 10px;
        }
        .hiw-dot-btn.active .hiw-dot-track {
          width: 32px;
        }
        /* progress fill — CSS animation driven by dotKey to reset on step change */
        .hiw-dot-fill {
          position: absolute;
          left: 0; top: 0; bottom: 0;
          border-radius: 999px;
          background: #1c1917;
          width: 0%;
        }
        .hiw-dot-btn.active .hiw-dot-fill {
          animation: hiw-dot-progress ${AUTO_MS}ms linear forwards;
        }
        @keyframes hiw-dot-progress {
          from { width: 0%; }
          to   { width: 100%; }
        }

        /* ── Phone card ──────────────────────────────────────────────── */
        .hiw-phone-col {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          touch-action: pan-y;
        }
        .hiw-phone-card {
          position: relative;
          width: ${CARD_W}px;
          height: ${CARD_H}px;
          background: white;
          border-radius: ${CARD_R}px;
          box-shadow:
            0px 4px 12px rgba(0, 0, 0, 0.05),
            32px 32px 64px rgba(23, 29, 46, 0.12);
          transition: opacity 220ms ease, transform 220ms ease;
        }
        .hiw-phone-card.fading {
          opacity: 0;
          transform: scale(0.97);
        }
        .hiw-screen {
          position: absolute;
          left: ${SCR_L}px;
          top: ${SCR_T}px;
          width: ${SCR_W}px;
          height: ${SCR_H}px;
          border-radius: ${SCR_R}px;
          overflow: hidden;
        }
        .hiw-screen img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
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

        /* ── Tablet ──────────────────────────────────────────────────── */
        @media (min-width: 768px) and (max-width: 1099px) {
          .hiw-inner { gap: 48px; }
          .hiw-text-col { width: 320px; }
          .hiw-heading { font-size: 38px; }
          .hiw-label { font-size: 15px; }
          .hiw-desc { font-size: 15px; }
        }

        /* ── Mobile (<768px) — vertical stack ───────────────────────── */
        @media (max-width: 767px) {
          .hiw {
            padding: 64px 24px 72px;
            min-height: unset;
          }
          .hiw-inner {
            flex-direction: column;
            gap: 40px;
            align-items: center;
          }
          .hiw-text-col {
            width: 100%;
            max-width: 360px;
            order: 2;
          }
          .hiw-phone-col { order: 1; }
          .hiw-heading { font-size: 34px; }
          .hiw-label { font-size: 14px; }
          .hiw-desc { font-size: 15px; }
        }

        /* ── Reduced motion ──────────────────────────────────────────── */
        @media (prefers-reduced-motion: reduce) {
          .hiw-text-col, .hiw-phone-card { transition: none !important; }
          .hiw-dot-fill { animation: none !important; }
          .hiw-dot-track { transition: none !important; }
        }
      `}</style>

      {/* sr live region */}
      <div aria-live="polite" aria-atomic="true" style={{ position:'absolute', width:1, height:1, overflow:'hidden', clip:'rect(0,0,0,0)', whiteSpace:'nowrap' }}>
        Step {display + 1} of {STEPS.length}: {STEPS[display].regular}{STEPS[display].italic}
      </div>

      <div className="hiw-inner">

        {/* ── Text column ─────────────────────────────────────────────── */}
        <div className={`hiw-text-col${fading ? ' fading' : ''}`}>
          <p className="hiw-label">Step {STEPS[display].num}</p>
          <h2 className="hiw-heading">
            {STEPS[display].regular}
            <em className="hiw-accent">{STEPS[display].italic}</em>
          </h2>
          <p className="hiw-desc">{STEPS[display].desc}</p>

          {/* Dot navigation */}
          <div className="hiw-dots" role="tablist" aria-label="Steps">
            {STEPS.map((step, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === active}
                aria-label={`Step ${i + 1}: ${step.regular}${step.italic}`}
                className={`hiw-dot-btn${i === active ? ' active' : ''}`}
                onClick={() => { stopAuto(); goTo(i); }}
              >
                <span className="hiw-dot-track">
                  {i === active && <span key={dotKey} className="hiw-dot-fill" />}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Phone column ────────────────────────────────────────────── */}
        <div
          className="hiw-phone-col"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className={`hiw-phone-card${fading ? ' fading' : ''}`}>
            <div className="hiw-screen">
              <img
                src={STEPS[display].image}
                alt={`App screen — ${STEPS[display].regular}${STEPS[display].italic}`}
                draggable={false}
              />
            </div>
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
