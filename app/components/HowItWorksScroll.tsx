'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

// ── Step data ─────────────────────────────────────────────────────────────────
const STEPS = [
  {
    num:     '01',
    regular: 'Find any flight',
    italic:  'in seconds',
    desc:    'Search by flight number or route. We instantly retrieve real operational data — schedules, aircraft, and route details.',
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
    desc:    'Every completed journey is saved automatically — flights, countries, and distance traveled.',
    image:   '/Images/hiw-step04.png',
  },
];

// Auto-advance interval — comfortable reading time
const AUTO_MS = 5500;

// ── Phone dimensions (Figma scale: 238px card width) ─────────────────────────
const CARD_W = 238;
const CARD_H = 495;
const SCR_L  = 6;
const SCR_W  = 222;
const SCR_H  = 481;
const SCR_T  = Math.round((CARD_H - SCR_H) / 2); // 7
const SCR_R  = 29;
// Chrome SVG outer radius at 238px: 55.09 × (238/364) ≈ 36px
const CARD_R = 36;

type Phase = 'idle' | 'exit' | 'enter';

export default function HowItWorksScroll() {
  const [active,  setActive]  = useState(0);
  const [display, setDisplay] = useState(0);
  const [phase,   setPhase]   = useState<Phase>('idle');
  const [dotKey,  setDotKey]  = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const activeRef  = useRef(0);
  const phaseRef   = useRef<Phase>('idle');
  const inViewRef  = useRef(false);
  const autoTimer  = useRef<ReturnType<typeof setInterval> | null>(null);
  const t1         = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t2         = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchX     = useRef(0);

  // ── Navigation ───────────────────────────────────────────────────────────────
  const goTo = useCallback((next: number) => {
    if (phaseRef.current !== 'idle') return;
    if (next === activeRef.current) return;

    // Dot indicator snaps immediately
    activeRef.current = next;
    setActive(next);
    setDotKey(k => k + 1);

    // Exit phase (200ms)
    phaseRef.current = 'exit';
    setPhase('exit');

    t1.current = setTimeout(() => {
      // Swap content while invisible, then enter
      setDisplay(next);
      phaseRef.current = 'enter';
      setPhase('enter');

      t2.current = setTimeout(() => {
        phaseRef.current = 'idle';
        setPhase('idle');
      }, 420);
    }, 210);
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

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        inViewRef.current = e.isIntersecting;
        e.isIntersecting ? startAuto() : stopAuto();
      },
      { threshold: 0.25 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => {
      obs.disconnect();
      stopAuto();
      if (t1.current) clearTimeout(t1.current);
      if (t2.current) clearTimeout(t2.current);
    };
  }, [startAuto, stopAuto]);

  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    const d = touchX.current - e.changedTouches[0].clientX;
    if (Math.abs(d) > 48) { stopAuto(); goTo(d > 0 ? Math.min(3, activeRef.current + 1) : Math.max(0, activeRef.current - 1)); }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const k = e.key;
    if (k === 'ArrowRight' || k === 'ArrowDown') { e.preventDefault(); stopAuto(); goTo(Math.min(3, activeRef.current + 1)); }
    if (k === 'ArrowLeft'  || k === 'ArrowUp')   { e.preventDefault(); stopAuto(); goTo(Math.max(0, activeRef.current - 1)); }
    if (k === 'Home') { e.preventDefault(); stopAuto(); goTo(0); }
    if (k === 'End')  { e.preventDefault(); stopAuto(); goTo(3); }
  };

  const step = STEPS[display];
  const textCls  = phase === 'exit' ? ' hiw-exit' : phase === 'enter' ? ' hiw-enter' : '';
  const phoneCls = phase === 'exit' ? ' hiw-exit' : phase === 'enter' ? ' hiw-enter' : '';

  return (
    <section
      ref={sectionRef}
      className="hiw"
      tabIndex={0}
      onKeyDown={onKeyDown}
      aria-label="How FlightPassport works"
    >
      <style>{`
        /* ── Section ────────────────────────────────────────────────── */
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

        /* ── Inner ──────────────────────────────────────────────────── */
        .hiw-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 80px;
          width: 100%;
        }

        /* ── Text column ────────────────────────────────────────────── */
        .hiw-text {
          width: 384px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          text-align: center;
        }

        /* EXIT: fade up */
        .hiw-text.hiw-exit {
          opacity: 0;
          transform: translateY(-12px);
          transition: opacity 200ms ease-in, transform 200ms ease-in;
        }
        /* ENTER: rise from below */
        .hiw-text.hiw-enter {
          animation: hiw-text-rise 420ms cubic-bezier(0.22, 1, 0.36, 1) both;
          animation-delay: 30ms;
        }
        @keyframes hiw-text-rise {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Typography ─────────────────────────────────────────────── */
        .hiw-label {
          font-size: 18px;
          font-weight: 600;
          letter-spacing: -0.01em;
          text-transform: uppercase;
          color: #a8a29e;
          margin: 0;
          line-height: 1.4;
        }
        .hiw-heading {
          font-size: 48px;
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.1;
          color: #1c1917;
          margin: 0;
        }
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
        }

        /* ── Dot indicators — 8px ───────────────────────────────────── */
        .hiw-dots {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 8px;
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
        .hiw-dot-btn.active .hiw-dot-track {
          width: 28px;
        }
        .hiw-dot-progress {
          position: absolute;
          inset: 0 auto 0 0;
          width: 0%;
          border-radius: 999px;
          background: #1c1917;
        }
        .hiw-dot-btn.active .hiw-dot-progress {
          animation: hiw-dot-fill ${AUTO_MS}ms linear forwards;
        }
        @keyframes hiw-dot-fill {
          from { width: 0%; }
          to   { width: 100%; }
        }

        /* ── Phone column ───────────────────────────────────────────── */
        .hiw-phone-col {
          flex-shrink: 0;
          touch-action: pan-y;
        }

        /* White card — Figma shadow, no overflow:hidden to preserve chrome corners */
        .hiw-card {
          position: relative;
          width: ${CARD_W}px;
          height: ${CARD_H}px;
          background: #ffffff;
          border-radius: ${CARD_R}px;
          box-shadow:
            0px 4px 12px 0px rgba(0, 0, 0, 0.05),
            32px 32px 64px 0px rgba(23, 29, 46, 0.12);
        }

        /* EXIT: scale down + fade */
        .hiw-card.hiw-exit {
          opacity: 0;
          transform: scale(0.93) translateY(-10px);
          transition: opacity 210ms ease-in, transform 210ms ease-in;
        }
        /* ENTER: scale up from slightly below */
        .hiw-card.hiw-enter {
          animation: hiw-card-rise 440ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes hiw-card-rise {
          from { opacity: 0; transform: scale(0.95) translateY(16px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        /* Screen area */
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

        /* Chrome SVG on top */
        .hiw-chrome {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
          display: block;
        }

        /* ── Tablet ─────────────────────────────────────────────────── */
        @media (min-width: 768px) and (max-width: 1099px) {
          .hiw { padding: 80px 24px; }
          .hiw-inner { gap: 48px; }
          .hiw-text { width: 300px; }
          .hiw-heading { font-size: 38px; }
          .hiw-label { font-size: 15px; }
          .hiw-desc { font-size: 15px; max-width: 280px; }
        }

        /* ── Mobile (<768px) ────────────────────────────────────────── */
        @media (max-width: 767px) {
          .hiw { padding: 64px 24px 72px; min-height: unset; }
          .hiw-inner { flex-direction: column; gap: 40px; }
          .hiw-text { width: 100%; max-width: 360px; order: 2; }
          .hiw-phone-col { order: 1; }
          .hiw-heading { font-size: 34px; }
          .hiw-label { font-size: 14px; }
          .hiw-desc { font-size: 15px; }
        }

        /* ── Reduced motion ─────────────────────────────────────────── */
        @media (prefers-reduced-motion: reduce) {
          .hiw-text.hiw-exit, .hiw-card.hiw-exit { transition: none !important; }
          .hiw-text.hiw-enter, .hiw-card.hiw-enter { animation: none !important; }
          .hiw-dot-progress { animation: none !important; width: 100% !important; }
          .hiw-dot-track { transition: none !important; }
        }
      `}</style>

      {/* sr */}
      <div aria-live="polite" aria-atomic="true" style={{ position:'absolute', width:1, height:1, overflow:'hidden', clip:'rect(0,0,0,0)', whiteSpace:'nowrap' }}>
        Step {display + 1} of {STEPS.length}: {step.regular} {step.italic}
      </div>

      <div className="hiw-inner">

        {/* ── Text ────────────────────────────────────────────────────── */}
        <div className={`hiw-text${textCls}`}>
          <p className="hiw-label">Step {step.num}</p>

          {/* Two-line heading: line 1 black, line 2 blue italic */}
          <h2 className="hiw-heading">
            {step.regular}
            <em>{step.italic}</em>
          </h2>

          <p className="hiw-desc">{step.desc}</p>

          {/* Dot progress indicators */}
          <div className="hiw-dots" role="tablist" aria-label="Steps">
            {STEPS.map((s, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === active}
                aria-label={`Step ${i + 1}: ${s.regular} ${s.italic}`}
                className={`hiw-dot-btn${i === active ? ' active' : ''}`}
                onClick={() => { stopAuto(); goTo(i); }}
              >
                <span className="hiw-dot-track">
                  {i === active && (
                    <span key={`${i}-${dotKey}`} className="hiw-dot-progress" />
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Phone ───────────────────────────────────────────────────── */}
        <div
          className="hiw-phone-col"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className={`hiw-card${phoneCls}`}>
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
