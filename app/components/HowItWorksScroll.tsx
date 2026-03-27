'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

type Phase = 'idle' | 'out' | 'in';

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
    title: 'Your flight passport',
    desc: 'A complete record of every flight — searchable, shareable, always in your pocket.',
    image: '/Images/asset-60c1185f-d58c-4975-aa4f-d446835553c6.png', // TODO: replace with actual step 4 screenshot
  },
];

const AUTO_MS = 4500;

// Chrome SVG native size: 364 × 756.789 px
// Screen area (percentage of frame):
const SCR_L = `${(12 / 364 * 100).toFixed(3)}%`;
const SCR_T = `${(10 / 756.789 * 100).toFixed(3)}%`;
const SCR_W = `${(340 / 364 * 100).toFixed(3)}%`;
const SCR_H = `${(747 / 756.789 * 100).toFixed(3)}%`;

export default function HowItWorksScroll() {
  const [active, setActive]   = useState(0);
  const [display, setDisplay] = useState(0);
  const [phase, setPhase]     = useState<Phase>('idle');

  const sectionRef   = useRef<HTMLElement>(null);
  const activeRef    = useRef(0);
  const phaseRef     = useRef<Phase>('idle');
  const inViewRef    = useRef(false);
  const timerRef     = useRef<ReturnType<typeof setInterval> | null>(null);
  const transRef     = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX  = useRef(0);

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
      }, 350);
    }, 200);
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
      stopAuto();
      goTo(delta > 0
        ? Math.min(STEPS.length - 1, activeRef.current + 1)
        : Math.max(0, activeRef.current - 1));
    }
  }, [goTo, stopAuto]);

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); stopAuto(); goTo(Math.min(STEPS.length - 1, activeRef.current + 1)); }
    if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   { e.preventDefault(); stopAuto(); goTo(Math.max(0, activeRef.current - 1)); }
    if (e.key === 'Home') { e.preventDefault(); stopAuto(); goTo(0); }
    if (e.key === 'End')  { e.preventDefault(); stopAuto(); goTo(STEPS.length - 1); }
  }, [goTo, stopAuto]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
        if (entry.isIntersecting) startAuto();
        else stopAuto();
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      observer.disconnect();
      stopAuto();
      if (transRef.current) clearTimeout(transRef.current);
    };
  }, [startAuto, stopAuto]);

  return (
    <section
      ref={sectionRef}
      className="hiw-section"
      aria-label="How FlightPassport works"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <style>{`
        /* ── Section shell ────────────────────────────────────────────── */
        .hiw-section {
          min-height: 100svh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 80px 60px;
          box-sizing: border-box;
          outline: none;
          background: #fafaf9;
        }

        /* ── Two-column grid ─────────────────────────────────────────── */
        .hiw-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          max-width: 1080px;
          width: 100%;
        }

        /* ── Left column ─────────────────────────────────────────────── */
        .hiw-left {
          display: flex;
          flex-direction: column;
        }
        .hiw-overline {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #a8a29e;
          margin: 0 0 14px;
        }
        .hiw-h2 {
          font-size: 40px;
          font-weight: 700;
          letter-spacing: -0.025em;
          line-height: 1.1;
          color: #1c1917;
          margin: 0 0 28px;
        }

        /* ── Vertical step list ──────────────────────────────────────── */
        .hiw-list-wrap {
          position: relative;
        }
        /* static connector line */
        .hiw-list-wrap::before {
          content: '';
          position: absolute;
          left: 10px;
          top: 20px;
          bottom: 20px;
          width: 1.5px;
          background: #e9eaec;
          z-index: 0;
        }
        .hiw-list {
          display: flex;
          flex-direction: column;
          list-style: none;
          margin: 0;
          padding: 0;
          gap: 0;
          position: relative;
        }
        .hiw-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 7px 8px 7px 0;
          cursor: pointer;
          background: none;
          border: none;
          text-align: left;
          width: 100%;
          border-radius: 10px;
          transition: background 180ms ease;
        }
        .hiw-item:hover {
          background: rgba(28, 25, 23, 0.03);
        }
        .hiw-dot {
          flex-shrink: 0;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.02em;
          background: white;
          border: 1.5px solid #dde0e5;
          color: #bcc1ca;
          transition: background 300ms ease, border-color 300ms ease,
                      color 300ms ease, transform 300ms ease, box-shadow 300ms ease;
          margin-top: 2px;
          position: relative;
          z-index: 1;
        }
        .hiw-item.completed .hiw-dot {
          background: #d1d5db;
          border-color: #d1d5db;
          color: white;
        }
        .hiw-item.active .hiw-dot {
          background: #1c1917;
          border-color: #1c1917;
          color: white;
          transform: scale(1.18);
          box-shadow: 0 0 0 4px rgba(28, 25, 23, 0.08);
        }
        .hiw-item:not(.active):not(.completed):hover .hiw-dot {
          border-color: #9ca3af;
        }
        .hiw-item-texts {
          display: flex;
          flex-direction: column;
          padding-top: 2px;
        }
        .hiw-item-name {
          font-size: 15px;
          font-weight: 500;
          line-height: 1.3;
          color: #bcc1ca;
          transition: color 300ms ease, font-weight 200ms ease;
        }
        .hiw-item.active .hiw-item-name {
          color: #111827;
          font-weight: 700;
        }
        .hiw-item.completed .hiw-item-name {
          color: #9ca3af;
        }
        /* expandable description */
        .hiw-item-desc {
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          margin-top: 0;
          transition: max-height 400ms cubic-bezier(0.4, 0, 0.2, 1),
                      opacity 350ms ease,
                      margin-top 300ms ease;
        }
        .hiw-item.active .hiw-item-desc {
          max-height: 100px;
          opacity: 1;
          margin-top: 5px;
        }
        .hiw-item-desc-text {
          font-size: 13.5px;
          font-weight: 400;
          line-height: 1.65;
          color: #6B7280;
          margin: 0;
        }

        /* ── Right column — phone ────────────────────────────────────── */
        .hiw-right {
          display: flex;
          justify-content: center;
          align-items: center;
          touch-action: pan-y;
        }
        .hiw-phone {
          position: relative;
          /* height drives the size; width follows aspect ratio */
          height: min(560px, calc(100svh - 160px));
          aspect-ratio: 364 / 756.789;
          filter:
            drop-shadow(0 2px 8px rgba(0,0,0,0.06))
            drop-shadow(0 16px 40px rgba(0,0,0,0.14))
            drop-shadow(0 32px 72px rgba(0,0,0,0.08));
          transition: filter 300ms ease;
        }
        .hiw-screen {
          position: absolute;
          left: ${SCR_L};
          top: ${SCR_T};
          width: ${SCR_W};
          height: ${SCR_H};
          overflow: hidden;
          border-radius: 12%;
        }
        .hiw-screen-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: opacity 200ms ease;
        }
        .hiw-phase-out .hiw-screen-img {
          opacity: 0;
        }
        .hiw-chrome-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
          display: block;
        }

        /* ── Tablet (768–1023px) ─────────────────────────────────────── */
        @media (min-width: 768px) and (max-width: 1023px) {
          .hiw-section { padding: 60px 40px; }
          .hiw-grid { gap: 48px; }
          .hiw-h2 { font-size: 32px; margin-bottom: 20px; }
          .hiw-phone { height: min(460px, calc(100svh - 160px)); }
        }

        /* ── Mobile (<768px) — vertical, compact ────────────────────── */
        @media (max-width: 767px) {
          .hiw-section {
            min-height: unset;
            padding: 72px 24px 80px;
            align-items: flex-start;
          }
          .hiw-grid {
            grid-template-columns: 1fr;
            gap: 0;
          }
          /* on mobile: right (phone) floats above, left (text) below */
          .hiw-left { order: 2; margin-top: 36px; }
          .hiw-right { order: 1; }

          .hiw-h2 { font-size: 28px; margin-bottom: 0; }
          .hiw-phone { height: min(420px, 52svh); }

          /* hide desktop step list, show mobile nav */
          .hiw-list { display: none; }
          .hiw-mobile-nav { display: flex; flex-direction: column; gap: 24px; margin-top: 28px; }
          .hiw-mobile-dots {
            display: flex; gap: 8px; justify-content: center;
          }
          .hiw-mobile-dot {
            height: 6px; border-radius: 3px;
            border: none; cursor: pointer; padding: 0;
            background: #e5e7eb;
            transition: background 300ms ease, width 300ms cubic-bezier(0.4,0,0.2,1);
            width: 6px;
          }
          .hiw-mobile-dot.active {
            background: #1c1917;
            width: 22px;
          }
          .hiw-mobile-text { text-align: center; }
          .hiw-mobile-label {
            font-size: 11px; font-weight: 600; letter-spacing: 0.14em;
            text-transform: uppercase; color: #9ca3af; margin: 0 0 8px;
          }
          .hiw-mobile-title {
            font-size: 22px; font-weight: 700; letter-spacing: -0.02em;
            line-height: 1.2; color: #111827; margin: 0 0 10px;
          }
          .hiw-mobile-desc {
            font-size: 15px; line-height: 1.65; color: #6B7280; margin: 0;
          }
          .hiw-mobile-btns {
            display: flex; gap: 12px; justify-content: center;
          }
          .hiw-mobile-btn {
            width: 44px; height: 44px; border-radius: 50%;
            border: 1.5px solid #e5e7eb; background: white;
            display: flex; align-items: center; justify-content: center;
            cursor: pointer; color: #1c1917;
            transition: background 200ms ease, border-color 200ms ease;
          }
          .hiw-mobile-btn:hover { background: #f5f5f4; border-color: #d1d5db; }
          .hiw-mobile-btn:disabled { opacity: 0.28; cursor: default; }
          .hiw-mobile-text.hiw-phase-out {
            opacity: 0;
            transform: translateY(-8px);
            transition: opacity 200ms ease, transform 200ms ease;
          }
          .hiw-mobile-text.hiw-phase-in {
            animation: hiw-rise 350ms cubic-bezier(0.22, 1, 0.36, 1) both;
          }
        }

        @media (min-width: 768px) {
          .hiw-mobile-nav { display: none; }
        }

        /* ── Shared animation ────────────────────────────────────────── */
        @keyframes hiw-rise {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Reduced motion ──────────────────────────────────────────── */
        @media (prefers-reduced-motion: reduce) {
          .hiw-screen-img,
          .hiw-item-desc,
          .hiw-item-name,
          .hiw-dot { transition: none !important; animation: none !important; }
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

      <div className="hiw-grid">

        {/* ── Left: heading + step list ───────────────────────────────── */}
        <div className="hiw-left">
          <p className="hiw-overline">How it works</p>
          <h2 className="hiw-h2">Four steps.<br />Zero confusion.</h2>

          {/* Desktop/tablet: vertical step list */}
          <div className="hiw-list-wrap">
            <ul className="hiw-list" role="tablist" aria-label="Steps">
              {STEPS.map((step, i) => {
                const cls = i < active ? 'completed' : i === active ? 'active' : '';
                return (
                  <li key={i} style={{ listStyle: 'none' }}>
                    <button
                      role="tab"
                      aria-selected={i === active}
                      aria-label={`Step ${step.num}: ${step.title}`}
                      className={`hiw-item${cls ? ` ${cls}` : ''}`}
                      onClick={() => { stopAuto(); goTo(i); }}
                    >
                      <span className="hiw-dot" aria-hidden="true">{step.num}</span>
                      <span className="hiw-item-texts">
                        <span className="hiw-item-name">{step.title}</span>
                        <span className="hiw-item-desc" aria-hidden={i !== active}>
                          <p className="hiw-item-desc-text">{step.desc}</p>
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Mobile: dots + text + prev/next */}
          <div className="hiw-mobile-nav">
            <div className="hiw-mobile-dots" role="tablist">
              {STEPS.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Step ${i + 1}`}
                  className={`hiw-mobile-dot${i === active ? ' active' : ''}`}
                  onClick={() => { stopAuto(); goTo(i); }}
                />
              ))}
            </div>
            <div className={`hiw-mobile-text${phase !== 'idle' ? ` hiw-phase-${phase}` : ''}`}>
              <p className="hiw-mobile-label">Step {STEPS[display].num}</p>
              <h3 className="hiw-mobile-title">{STEPS[display].title}</h3>
              <p className="hiw-mobile-desc">{STEPS[display].desc}</p>
            </div>
            <div className="hiw-mobile-btns">
              <button
                className="hiw-mobile-btn"
                onClick={() => { stopAuto(); goTo(Math.max(0, active - 1)); }}
                disabled={active === 0}
                aria-label="Previous step"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                className="hiw-mobile-btn"
                onClick={() => { stopAuto(); goTo(Math.min(STEPS.length - 1, active + 1)); }}
                disabled={active === STEPS.length - 1}
                aria-label="Next step"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ── Right: phone ────────────────────────────────────────────── */}
        <div
          className={`hiw-right${phase !== 'idle' ? ` hiw-phase-${phase}` : ''}`}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="hiw-phone">
            <div className="hiw-screen">
              <img
                src={STEPS[display].image}
                alt={`App screen for step ${display + 1}: ${STEPS[display].title}`}
                className="hiw-screen-img"
                draggable={false}
              />
            </div>
            <img
              src="/Images/hero-phone-chrome.svg"
              alt=""
              className="hiw-chrome-svg"
              aria-hidden="true"
              draggable={false}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
