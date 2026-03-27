'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

const STEPS = [
  {
    title: 'Add your flight',
    desc: 'Enter a flight number or search by route. Full operational data loads instantly.',
    image: '/Images/asset-6d585e68-0d7f-496f-b018-4e5caf21dcec.png',
  },
  {
    title: 'Understand it',
    desc: 'Review delay history, aircraft info, and turbulence before you reach the airport.',
    image: '/Images/asset-e7f0beef-9438-42ea-8d9c-bf615f9c17d2.png',
  },
  {
    title: 'Track in real time',
    desc: 'Live updates on every leg — boarding, gate changes, connection windows, arrival.',
    image: '/Images/asset-60c1185f-d58c-4975-aa4f-d446835553c6.png',
  },
  {
    title: 'Your flight passport',
    desc: 'A complete record of every flight — searchable, shareable, always in your pocket.',
    image: '/Images/asset-60c1185f-d58c-4975-aa4f-d446835553c6.png',
  },
];

// Chrome SVG native: 364 × 756.789 — screen area as percentages
const S = {
  l: `${(12   / 364     * 100).toFixed(3)}%`,
  t: `${(10   / 756.789 * 100).toFixed(3)}%`,
  w: `${(340  / 364     * 100).toFixed(3)}%`,
  h: `${(747  / 756.789 * 100).toFixed(3)}%`,
};

export default function HowItWorksScroll() {
  const [active,  setActive]  = useState(0);  // dot indicator
  const [display, setDisplay] = useState(0);  // rendered content
  const [fading,  setFading]  = useState(false);

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

    // dot snaps immediately — phone/text crossfades
    activeRef.current = next;
    setActive(next);
    fadingRef.current = true;
    setFading(true);

    fadeTimer.current = setTimeout(() => {
      setDisplay(next);
      fadingRef.current = false;
      setFading(false);
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
    }, 4000);
  }, [stopAuto, goTo]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { inViewRef.current = e.isIntersecting; e.isIntersecting ? startAuto() : stopAuto(); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => { obs.disconnect(); stopAuto(); if (fadeTimer.current) clearTimeout(fadeTimer.current); };
  }, [startAuto, stopAuto]);

  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    const d = touchX.current - e.changedTouches[0].clientX;
    if (Math.abs(d) > 48) { stopAuto(); goTo(d > 0 ? Math.min(3, activeRef.current + 1) : Math.max(0, activeRef.current - 1)); }
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
        .hiw {
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 72px 40px 64px;
          box-sizing: border-box;
          outline: none;
          background: #f9f9f8;
          gap: 0;
        }

        /* heading */
        .hiw-over {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #a8a29e;
          margin: 0 0 12px;
          text-align: center;
        }
        .hiw-h2 {
          font-size: 38px;
          font-weight: 700;
          letter-spacing: -0.025em;
          line-height: 1.1;
          color: #1c1917;
          margin: 0 0 44px;
          text-align: center;
        }

        /* phone */
        .hiw-phone-area {
          position: relative;
          height: min(460px, 52svh);
          aspect-ratio: 364 / 756.789;
          cursor: grab;
          touch-action: pan-y;
          filter:
            drop-shadow(0 4px 12px rgba(0,0,0,0.08))
            drop-shadow(0 20px 48px rgba(0,0,0,0.16))
            drop-shadow(0 40px 80px rgba(0,0,0,0.08));
          transition: opacity 200ms ease, transform 200ms ease;
        }
        .hiw-phone-area.fading {
          opacity: 0;
          transform: scale(0.985);
        }
        .hiw-screen {
          position: absolute;
          left: ${S.l}; top: ${S.t};
          width: ${S.w}; height: ${S.h};
          overflow: hidden;
          border-radius: 13%;
        }
        .hiw-screen img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
        }
        .hiw-chrome {
          position: absolute;
          inset: 0;
          width: 100%; height: 100%;
          pointer-events: none;
          z-index: 1;
          display: block;
        }

        /* dots */
        .hiw-dots {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 22px 0 20px;
        }
        .hiw-dot-btn {
          padding: 4px;
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hiw-dot-inner {
          height: 6px;
          border-radius: 3px;
          background: #d4d4d0;
          transition: width 350ms cubic-bezier(0.4, 0, 0.2, 1),
                      background 300ms ease;
          width: 6px;
        }
        .hiw-dot-btn.active .hiw-dot-inner {
          width: 24px;
          background: #1c1917;
        }

        /* text */
        .hiw-text {
          text-align: center;
          max-width: 420px;
          transition: opacity 200ms ease, transform 200ms ease;
        }
        .hiw-text.fading {
          opacity: 0;
          transform: translateY(6px);
        }
        .hiw-title {
          font-size: 20px;
          font-weight: 700;
          letter-spacing: -0.015em;
          color: #111827;
          margin: 0 0 8px;
        }
        .hiw-desc {
          font-size: 15px;
          font-weight: 400;
          line-height: 1.65;
          color: #6b7280;
          margin: 0;
        }

        /* tablet */
        @media (min-width: 768px) and (max-width: 1023px) {
          .hiw { padding: 60px 40px 56px; }
          .hiw-h2 { font-size: 32px; margin-bottom: 36px; }
          .hiw-phone-area { height: min(420px, 50svh); }
        }

        /* mobile */
        @media (max-width: 767px) {
          .hiw { padding: 64px 24px 56px; min-height: unset; }
          .hiw-h2 { font-size: 28px; margin-bottom: 32px; }
          .hiw-phone-area { height: min(380px, 48svh); }
          .hiw-title { font-size: 18px; }
          .hiw-desc { font-size: 14px; }
        }

        /* reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .hiw-phone-area, .hiw-text, .hiw-dot-inner { transition: none !important; }
        }
      `}</style>

      {/* sr live region */}
      <div aria-live="polite" aria-atomic="true" style={{ position:'absolute', width:1, height:1, overflow:'hidden', clip:'rect(0,0,0,0)', whiteSpace:'nowrap' }}>
        Step {display + 1} of {STEPS.length}: {STEPS[display].title}
      </div>

      <p className="hiw-over">How it works</p>
      <h2 className="hiw-h2">Four steps.<br />Zero confusion.</h2>

      {/* Phone */}
      <div
        className={`hiw-phone-area${fading ? ' fading' : ''}`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="hiw-screen">
          <img src={STEPS[display].image} alt={STEPS[display].title} draggable={false} />
        </div>
        <img src="/Images/hero-phone-chrome.svg" className="hiw-chrome" alt="" aria-hidden="true" draggable={false} />
      </div>

      {/* Dots */}
      <div className="hiw-dots" role="tablist" aria-label="Steps">
        {STEPS.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === active}
            aria-label={`Step ${i + 1}: ${STEPS[i].title}`}
            className={`hiw-dot-btn${i === active ? ' active' : ''}`}
            onClick={() => { stopAuto(); goTo(i); }}
          >
            <span className="hiw-dot-inner" />
          </button>
        ))}
      </div>

      {/* Text */}
      <div className={`hiw-text${fading ? ' fading' : ''}`}>
        <h3 className="hiw-title">{STEPS[display].title}</h3>
        <p className="hiw-desc">{STEPS[display].desc}</p>
      </div>
    </section>
  );
}
