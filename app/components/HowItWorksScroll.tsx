'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

const STEPS = [
  {
    num:     '01',
    regular: 'Find any flight',
    italic:  'in seconds',
    desc:    'Search by flight number or route. We instantly retrieve real operational data.',
    image:   '/Images/hiw-step01.png',
  },
  {
    num:     '02',
    regular: 'Understand',
    italic:  'what to expect',
    desc:    'See delay history, reliability, and flight conditions before your trip begins.',
    image:   '/Images/hiw-step02.png',
  },
  {
    num:     '03',
    regular: 'Stay ahead',
    italic:  'of every change',
    desc:    'Get live updates for every phase — boarding, delays, connections, and arrival.',
    image:   '/Images/hiw-step03.png',
  },
  {
    num:     '04',
    regular: 'Build your',
    italic:  'travel history',
    desc:    'Every journey is logged automatically — flights, countries, and distance traveled.',
    image:   '/Images/hiw-step04.png',
  },
];

// Comfortable reading time + transition overhead
const AUTO_MS  = 5000;
const FADE_OUT = 180; // ms to fade out before swap

// Phone card dimensions (Figma, 238px display width)
const CARD_W = 238;
const CARD_H = 495;
const SCR_L  = 6;
const SCR_W  = 222;
const SCR_H  = 481;
const SCR_T  = Math.round((CARD_H - SCR_H) / 2);
const SCR_R  = 29;
const CARD_R = 36;

export default function HowItWorksScroll() {
  const [active,  setActive]  = useState(0);
  const [display, setDisplay] = useState(0);
  const [visible, setVisible] = useState(true);  // drives opacity
  const [dotKey,  setDotKey]  = useState(0);

  const activeRef  = useRef(0);
  const visibleRef = useRef(true);
  const swapTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchX     = useRef(0);

  // ── Navigation (stable — empty deps, uses only refs) ─────────────────────────
  const navigate = useCallback((next: number) => {
    if (!visibleRef.current) return;      // already mid-transition
    if (next === activeRef.current) return;

    // Dots snap immediately
    activeRef.current = next;
    setActive(next);
    setDotKey(k => k + 1);

    // Fade out → swap content → fade in (CSS transition handles fade-in)
    visibleRef.current = false;
    setVisible(false);

    swapTimer.current = setTimeout(() => {
      setDisplay(next);
      visibleRef.current = true;
      setVisible(true);
    }, FADE_OUT + 10);
  }, []);

  // ── Auto-advance — starts on mount, always runs ───────────────────────────────
  useEffect(() => {
    const id = setInterval(() => {
      navigate((activeRef.current + 1) % STEPS.length);
    }, AUTO_MS);
    return () => {
      clearInterval(id);
      if (swapTimer.current) clearTimeout(swapTimer.current);
    };
  }, [navigate]);

  // ── Swipe ────────────────────────────────────────────────────────────────────
  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    const d = touchX.current - e.changedTouches[0].clientX;
    if (Math.abs(d) > 48) navigate(d > 0 ? Math.min(3, activeRef.current + 1) : Math.max(0, activeRef.current - 1));
  };

  // ── Keyboard ─────────────────────────────────────────────────────────────────
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); navigate(Math.min(3, activeRef.current + 1)); }
    if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   { e.preventDefault(); navigate(Math.max(0, activeRef.current - 1)); }
    if (e.key === 'Home') { e.preventDefault(); navigate(0); }
    if (e.key === 'End')  { e.preventDefault(); navigate(3); }
  };

  const step = STEPS[display];

  return (
    <section
      className="hiw"
      tabIndex={0}
      onKeyDown={onKeyDown}
      aria-label="How FlightPassport works"
    >
      <style>{`
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
        .hiw-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 80px;
          width: 100%;
        }

        /* ── Text column ── */
        .hiw-text {
          width: 384px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          text-align: center;
        }
        /* ONLY opacity — no translateY so layout never shifts */
        .hiw-text-content {
          display: contents;
        }
        .hiw-label {
          font-size: 18px;
          font-weight: 600;
          letter-spacing: -0.01em;
          text-transform: uppercase;
          color: #a8a29e;
          margin: 0;
          line-height: 1.4;
          transition: opacity ${FADE_OUT}ms ease;
        }
        .hiw-heading {
          font-size: 48px;
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.1;
          color: #1c1917;
          margin: 0;
          transition: opacity ${FADE_OUT}ms ease;
        }
        /* Second line (italic) always on its own line */
        .hiw-heading em {
          display: block;
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
          /* fixed 2 lines height — prevents layout shifts when text varies */
          min-height: calc(17px * 1.4 * 2);
          transition: opacity ${FADE_OUT}ms ease;
        }

        /* Fade state — applies to all text children */
        .hiw-text.fade .hiw-label,
        .hiw-text.fade .hiw-heading,
        .hiw-text.fade .hiw-desc { opacity: 0; }

        /* ── Prev / Next + Dots row ── */
        .hiw-nav {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: 8px;
          transition: opacity ${FADE_OUT}ms ease;
        }
        .hiw-text.fade .hiw-nav { opacity: 0; }

        /* Arrow buttons — borderless, Apple-style */
        .hiw-arrow {
          background: none;
          border: none;
          padding: 4px 6px;
          cursor: pointer;
          color: #1c1917;
          opacity: 0.45;
          transition: opacity 180ms ease;
          flex-shrink: 0;
          line-height: 0;
        }
        .hiw-arrow:hover:not(:disabled) {
          opacity: 1;
        }
        .hiw-arrow:disabled {
          opacity: 0.18;
          cursor: default;
        }

        /* Dots */
        .hiw-dots {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .hiw-dot-btn {
          padding: 4px 0;
          background: none;
          border: none;
          cursor: pointer;
          line-height: 0;
        }
        .hiw-dot-track {
          display: block;
          height: 8px;
          border-radius: 999px;
          background: #d6d3d1;
          overflow: hidden;
          position: relative;
          width: 8px;
          transition: width 300ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hiw-dot-btn.active .hiw-dot-track { width: 28px; }
        .hiw-dot-progress {
          position: absolute;
          inset: 0 auto 0 0;
          width: 0%;
          border-radius: 999px;
          background: #1c1917;
        }
        .hiw-dot-btn.active .hiw-dot-progress {
          animation: hiw-fill ${AUTO_MS}ms linear forwards;
        }
        @keyframes hiw-fill { from { width: 0%; } to { width: 100%; } }

        /* ── Phone card ── */
        .hiw-phone-col {
          flex-shrink: 0;
          touch-action: pan-y;
        }
        .hiw-card {
          position: relative;
          width: ${CARD_W}px;
          height: ${CARD_H}px;
          background: #ffffff;
          border-radius: ${CARD_R}px;
          box-shadow:
            0px 4px 12px 0px rgba(0, 0, 0, 0.05),
            32px 32px 64px 0px rgba(23, 29, 46, 0.12);
          /* Premium card transition: opacity + gentle scale */
          transition:
            opacity ${FADE_OUT}ms ease,
            transform ${FADE_OUT}ms ease;
        }
        .hiw-card.fade {
          opacity: 0;
          transform: scale(0.96);
        }
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
        .hiw-chrome {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
          display: block;
        }

        /* ── Tablet ── */
        @media (min-width: 768px) and (max-width: 1099px) {
          .hiw { padding: 80px 24px; }
          .hiw-inner { gap: 48px; }
          .hiw-text { width: 300px; }
          .hiw-heading { font-size: 38px; }
          .hiw-label { font-size: 15px; }
          .hiw-desc { font-size: 15px; max-width: 260px; }
        }

        /* ── Mobile ── */
        @media (max-width: 767px) {
          .hiw { padding: 56px 24px 64px; min-height: unset; }
          .hiw-inner { flex-direction: column; align-items: center; gap: 20px; }

          /* Mobile header: label + heading above phone */
          .hiw-mobile-header {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 6px;
            text-align: center;
            width: 100%;
            order: 1;
          }
          .hiw-mobile-header .hiw-label { font-size: 12px; }
          .hiw-mobile-header .hiw-heading { font-size: 34px; }

          /* Fade applies to mobile header too */
          .hiw-mobile-header.fade .hiw-label,
          .hiw-mobile-header.fade .hiw-heading { opacity: 0; }

          /* Phone — slightly larger on mobile for max visual impact */
          .hiw-phone-col { order: 2; }
          .hiw-card {
            width: 264px !important;
            height: 549px !important;
            border-radius: 40px !important;
          }
          .hiw-screen {
            left: 7px !important;
            top: 7px !important;
            width: 250px !important;
            height: 535px !important;
            border-radius: 33px !important;
          }

          /* Text col on mobile: only desc + nav (label+heading hidden) */
          .hiw-text { width: 264px; order: 3; gap: 12px; }
          .hiw-desktop-only { display: none !important; }
          .hiw-desc {
            font-size: 15px;
            min-height: calc(15px * 1.4 * 2);
            text-align: center;
          }
          .hiw-nav { margin-top: 4px; }
          .hiw-label { font-size: 12px; }
          .hiw-heading { font-size: 34px; }
        }

        /* Mobile header hidden on desktop/tablet */
        .hiw-mobile-header { display: none; }

        /* ── Reduced motion ── */
        @media (prefers-reduced-motion: reduce) {
          .hiw-label, .hiw-heading, .hiw-desc, .hiw-nav, .hiw-card { transition: none !important; }
          .hiw-dot-progress { animation: none !important; }
          .hiw-dot-track { transition: none !important; }
        }
      `}</style>

      {/* sr */}
      <div aria-live="polite" aria-atomic="true" style={{ position:'absolute', width:1, height:1, overflow:'hidden', clip:'rect(0,0,0,0)', whiteSpace:'nowrap' }}>
        Step {display + 1} of {STEPS.length}: {step.regular} {step.italic}
      </div>

      <div className="hiw-inner">

        {/* ── Mobile header: label + heading above phone (hidden on desktop) ── */}
        <div className={`hiw-mobile-header${visible ? '' : ' fade'}`}>
          <p className="hiw-label">Step {step.num}</p>
          <h2 className="hiw-heading">
            {step.regular}
            <em>{step.italic}</em>
          </h2>
        </div>

        {/* ── Text ── */}
        <div className={`hiw-text${visible ? '' : ' fade'}`}>
          <p className="hiw-label hiw-desktop-only">Step {step.num}</p>

          <h2 className="hiw-heading hiw-desktop-only">
            {step.regular}
            <em>{step.italic}</em>
          </h2>

          <p className="hiw-desc">{step.desc}</p>

          {/* Prev / Dots / Next */}
          <div className="hiw-nav">
            <button
              className="hiw-arrow"
              onClick={() => navigate(Math.max(0, active - 1))}
              disabled={active === 0}
              aria-label="Previous step"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M8.5 2.5L4 7L8.5 11.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className="hiw-dots" role="tablist" aria-label="Steps">
              {STEPS.map((s, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Step ${i + 1}: ${s.regular} ${s.italic}`}
                  className={`hiw-dot-btn${i === active ? ' active' : ''}`}
                  onClick={() => navigate(i)}
                >
                  <span className="hiw-dot-track">
                    {i === active && (
                      <span key={`${i}-${dotKey}`} className="hiw-dot-progress" />
                    )}
                  </span>
                </button>
              ))}
            </div>

            <button
              className="hiw-arrow"
              onClick={() => navigate(Math.min(3, active + 1))}
              disabled={active === 3}
              aria-label="Next step"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5.5 2.5L10 7L5.5 11.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* ── Phone ── */}
        <div
          className="hiw-phone-col"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className={`hiw-card${visible ? '' : ' fade'}`}>
            <div className="hiw-screen">
              <img
                src={step.image}
                alt={`Step ${display + 1}: ${step.regular} ${step.italic}`}
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
