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

const AUTO_MS  = 10000;
const FADE_OUT = 180;

// Desktop phone card dimensions
const CARD_W = 238;
const CARD_H = 495;
const SCR_L  = 6;
const SCR_W  = 222;
const SCR_H  = 481;
const SCR_T  = Math.round((CARD_H - SCR_H) / 2);
const SCR_R  = 29;
const CARD_R = 36;

// Mobile phone card dimensions (proportionally scaled to 240px width)
const M_CARD_W = 240;
const M_CARD_H = Math.round(495 * (M_CARD_W / 238));
const M_SCR_L  = Math.round(SCR_L  * (M_CARD_W / 238));
const M_SCR_W  = M_CARD_W - M_SCR_L * 2;
const M_SCR_H  = Math.round(SCR_H  * (M_CARD_W / 238));
const M_SCR_T  = Math.round((M_CARD_H - M_SCR_H) / 2);
const M_SCR_R  = Math.round(SCR_R  * (M_CARD_W / 238));
const M_CARD_R = Math.round(CARD_R * (M_CARD_W / 238));

// Mobile carousel: 32px side peek shows adjacent cards
const PEEK = 32;
const SLIDE_GAP = 12;

export default function HowItWorksScroll() {
  // ── Shared state ──────────────────────────────────────────────────────────
  const [active,  setActive]  = useState(0);
  const [display, setDisplay] = useState(0); // desktop: delayed swap; mobile: same as active
  const [visible, setVisible] = useState(true);
  const [dotKey,  setDotKey]  = useState(0);

  // ── Mobile-specific state ─────────────────────────────────────────────────
  const [isMobile,          setIsMobile]          = useState(false);
  const [paused,            setPaused]            = useState(false);
  const [completed,         setCompleted]         = useState(false);
  const [dragOffset,        setDragOffset]        = useState(0);
  const [dragging,          setDragging]          = useState(false);
  const [paginationVisible, setPaginationVisible] = useState(false);
  const [pillBottom,        setPillBottom]        = useState(32);

  // ── Refs (avoid stale closures in setInterval / navigate) ─────────────────
  const activeRef    = useRef(0);
  const visibleRef   = useRef(true);
  const sectionRef   = useRef<HTMLElement>(null);
  const swapTimer    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMobileRef  = useRef(false);
  const pausedRef    = useRef(false);
  const completedRef = useRef(false);
  const touchStartX  = useRef(0);

  // ── isMobile detection ────────────────────────────────────────────────────
  useEffect(() => {
    const check = () => {
      const m = window.innerWidth < 768;
      isMobileRef.current = m;
      setIsMobile(m);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // ── Pagination pill visibility + Apple-style "follows section on exit" ───
  // Appears when section top scrolls past ~40% of viewport (carousel well in view).
  // While section bottom is below viewport: pill is fixed at bottom: 32px.
  // When section bottom rises into viewport: pill bottom tracks section
  //   so it moves up with the section seamlessly — no jump at transition point.
  useEffect(() => {
    const NATURAL_B = 32; // desired bottom offset in px
    const check = () => {
      if (!sectionRef.current || !isMobileRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh   = window.innerHeight;

      // Show when section entered enough; hide only when section fully gone
      const show = rect.top < vh * 0.4 && rect.bottom > 0;
      setPaginationVisible(show);

      // Follow section bottom when it enters viewport — no jump, no cap.
      // naturalB=32 while section extends below fold (section.bottom > vh).
      // Once section bottom rises into viewport, pill stays 32px above it.
      const b = rect.bottom >= vh
        ? NATURAL_B
        : Math.max(NATURAL_B, vh - rect.bottom + NATURAL_B);
      setPillBottom(b);
    };
    window.addEventListener('scroll', check, { passive: true });
    check();
    return () => window.removeEventListener('scroll', check);
  }, []);

  // ── Navigate ──────────────────────────────────────────────────────────────
  const navigate = useCallback((next: number) => {
    if (next === activeRef.current) return;

    activeRef.current = next;
    setActive(next);
    setDotKey(k => k + 1);

    if (isMobileRef.current) {
      // Mobile: instant (CSS transform handles the animation)
      setDisplay(next);
    } else {
      // Desktop: fade out → swap content → fade in
      if (!visibleRef.current) return;
      visibleRef.current = false;
      setVisible(false);
      swapTimer.current = setTimeout(() => {
        setDisplay(next);
        visibleRef.current = true;
        setVisible(true);
      }, FADE_OUT + 10);
    }
  }, []);

  // ── Auto-advance ──────────────────────────────────────────────────────────
  useEffect(() => {
    const id = setInterval(() => {
      if (pausedRef.current || completedRef.current) return;
      const next = activeRef.current + 1;
      // Mobile: stop at end and show replay; desktop: loop
      if (isMobileRef.current && next >= STEPS.length) {
        completedRef.current = true;
        setCompleted(true);
        return;
      }
      navigate(next % STEPS.length);
    }, AUTO_MS);
    return () => {
      clearInterval(id);
      if (swapTimer.current) clearTimeout(swapTimer.current);
    };
  }, [navigate]);

  // ── Mobile: pause / replay ────────────────────────────────────────────────
  const togglePause = () => {
    pausedRef.current = !pausedRef.current;
    setPaused(p => !p);
  };

  const replay = () => {
    completedRef.current = false;
    pausedRef.current    = false;
    setCompleted(false);
    setPaused(false);
    activeRef.current = 0;
    setActive(0);
    setDisplay(0);
    setDotKey(k => k + 1);
  };

  // ── Touch / drag ─────────────────────────────────────────────────────────
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    if (isMobileRef.current) setDragging(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isMobileRef.current) return;
    const raw = e.touches[0].clientX - touchStartX.current;
    // Rubber-band at edges
    const atStart = activeRef.current === 0;
    const atEnd   = activeRef.current === STEPS.length - 1;
    let offset = raw;
    if (atStart && raw > 0) offset = raw * 0.25;
    if (atEnd   && raw < 0) offset = raw * 0.25;
    setDragOffset(offset);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    setDragging(false);
    setDragOffset(0);
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) {
      const next = delta > 0
        ? Math.min(STEPS.length - 1, activeRef.current + 1)
        : Math.max(0, activeRef.current - 1);
      // Un-complete on manual back-swipe
      if (completedRef.current && delta < 0) {
        completedRef.current = false;
        setCompleted(false);
      }
      navigate(next);
    }
  };

  // ── Keyboard (desktop) ────────────────────────────────────────────────────
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); navigate(Math.min(3, activeRef.current + 1)); }
    if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   { e.preventDefault(); navigate(Math.max(0, activeRef.current - 1)); }
    if (e.key === 'Home') { e.preventDefault(); navigate(0); }
    if (e.key === 'End')  { e.preventDefault(); navigate(3); }
  };

  const step = STEPS[display];

  // ── Mobile carousel transform ─────────────────────────────────────────────
  // Each slide = 100vw - 2*PEEK wide. Step = slideWidth + gap = (100vw - 64px + 12px)
  const trackTransform = `calc(-${active} * (100vw - ${PEEK * 2 - SLIDE_GAP}px) + ${dragOffset}px)`;

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="hiw"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      aria-label="How FlightPassport works"
    >
      <style>{`
        /* ── Base ── */
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
          position: relative;
        }

        /* ── Desktop layout ── */
        .hiw-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 80px;
          width: 100%;
        }
        .hiw-text {
          width: 384px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          text-align: center;
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
          min-height: calc(17px * 1.4 * 2);
          transition: opacity ${FADE_OUT}ms ease;
        }
        .hiw-text.fade .hiw-label,
        .hiw-text.fade .hiw-heading,
        .hiw-text.fade .hiw-desc { opacity: 0; }

        /* ── Desktop nav ── */
        .hiw-nav {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: 8px;
          transition: opacity ${FADE_OUT}ms ease;
        }
        .hiw-text.fade .hiw-nav { opacity: 0; }
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
        .hiw-arrow:hover:not(:disabled) { opacity: 1; }
        .hiw-arrow:disabled { opacity: 0.18; cursor: default; }

        /* ── Dots (shared) ── */
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

        /* ── Desktop phone card ── */
        .hiw-phone-col { flex-shrink: 0; }
        .hiw-card {
          position: relative;
          width: ${CARD_W}px;
          height: ${CARD_H}px;
          background: #ffffff;
          border-radius: ${CARD_R}px;
          box-shadow:
            0px 4px 12px 0px rgba(0, 0, 0, 0.05),
            32px 32px 64px 0px rgba(23, 29, 46, 0.12);
          transition: opacity ${FADE_OUT}ms ease, transform ${FADE_OUT}ms ease;
        }
        .hiw-card.fade { opacity: 0; transform: scale(0.96); }
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

        /* ── Mobile carousel ── */
        @media (max-width: 767px) {
          .hiw {
            padding: 48px 0 100px;
            min-height: unset;
            display: block;
            overflow: hidden;
          }

          /* Hide desktop layout on mobile */
          .hiw-inner { display: none; }

          /* Carousel track — all 4 slides side by side */
          .hiw-carousel-track {
            display: flex;
            gap: ${SLIDE_GAP}px;
            padding: 0 ${PEEK}px;
            /* Transition driven by JS inline style */
          }
          .hiw-carousel-track.is-animating {
            transition: transform 480ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }

          /* Each slide = full width minus the 2 peek zones */
          .hiw-slide {
            flex: 0 0 calc(100vw - ${PEEK * 2}px);
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
          }

          /* Slide text block */
          .hiw-slide-text {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            text-align: center;
            padding: 0 8px;
            width: 100%;
          }
          .hiw-slide-text .hiw-label  { font-size: 12px; }
          .hiw-slide-text .hiw-heading { font-size: 32px; }
          .hiw-slide-text .hiw-desc   { font-size: 15px; min-height: unset; max-width: 100%; }

          /* Mobile phone card (proportionally scaled) */
          .hiw-slide-phone {
            position: relative;
            width: ${M_CARD_W}px;
            height: ${M_CARD_H}px;
            background: #ffffff;
            border-radius: ${M_CARD_R}px;
            box-shadow:
              0px 4px 12px 0px rgba(0, 0, 0, 0.05),
              24px 24px 48px 0px rgba(23, 29, 46, 0.12);
            flex-shrink: 0;
          }
          .hiw-slide-screen {
            position: absolute;
            left: ${M_SCR_L}px;
            top: ${M_SCR_T}px;
            width: ${M_SCR_W}px;
            height: ${M_SCR_H}px;
            border-radius: ${M_SCR_R}px;
            overflow: hidden;
            background: #f0f0f0;
          }
          .hiw-slide-screen img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }
          .hiw-slide-chrome {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            display: block;
          }

          /* Apple-style pagination pill — fixed, bottom set via JS (follows section on exit) */
          .hiw-pagination {
            position: fixed;
            /* bottom set via inline style — tracks section on exit, no CSS transition on it */
            left: 50%;
            transform: translateX(-50%) translateY(80px);
            opacity: 0;
            pointer-events: none;
            display: flex;
            align-items: center;
            gap: 8px;
            background: rgba(255, 255, 255, 0.72);
            backdrop-filter: blur(32px) saturate(2);
            -webkit-backdrop-filter: blur(32px) saturate(2);
            border-radius: 999px;
            padding: 8px 10px 8px 14px;
            box-shadow: 0 2px 20px rgba(0,0,0,0.12), inset 0 0.5px 0 rgba(255,255,255,0.9);
            z-index: 200;
            /* Only animate the slide-in transform/opacity, never bottom */
            transition:
              transform 480ms cubic-bezier(0.34, 1.4, 0.64, 1),
              opacity 320ms ease;
          }
          .hiw-pagination.visible {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
            pointer-events: auto;
          }
          .hiw-pagination .hiw-dots { gap: 5px; }
          .hiw-pagination .hiw-dot-track { background: rgba(28,25,23,0.2); }
          .hiw-pagination .hiw-dot-btn.active .hiw-dot-progress { background: #1c1917; }

          /* Pause / replay button */
          .hiw-ctrl-btn {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: rgba(28, 25, 23, 0.08);
            border: none;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: #1c1917;
            flex-shrink: 0;
            transition: background 180ms ease;
          }
          .hiw-ctrl-btn:hover { background: rgba(28, 25, 23, 0.14); }
        }

        /* ── Reduced motion ── */
        @media (prefers-reduced-motion: reduce) {
          .hiw-label, .hiw-heading, .hiw-desc, .hiw-nav, .hiw-card { transition: none !important; }
          .hiw-dot-progress { animation: none !important; }
          .hiw-dot-track { transition: none !important; }
          .hiw-carousel-track { transition: none !important; }
        }
      `}</style>

      {/* Screen-reader live region */}
      <div aria-live="polite" aria-atomic="true" style={{ position:'absolute', width:1, height:1, overflow:'hidden', clip:'rect(0,0,0,0)', whiteSpace:'nowrap' }}>
        Step {active + 1} of {STEPS.length}: {STEPS[active].regular} {STEPS[active].italic}
      </div>

      {/* ── Desktop layout (hidden on mobile via CSS) ── */}
      <div className="hiw-inner">
        <div className={`hiw-text${visible ? '' : ' fade'}`}>
          <p className="hiw-label">Step {step.num}</p>
          <h2 className="hiw-heading">
            {step.regular}
            <em>{step.italic}</em>
          </h2>
          <p className="hiw-desc">{step.desc}</p>

          <div className="hiw-nav">
            <button className="hiw-arrow" onClick={() => navigate(Math.max(0, active - 1))} disabled={active === 0} aria-label="Previous step">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M8.5 2.5L4 7L8.5 11.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="hiw-dots" role="tablist" aria-label="Steps">
              {STEPS.map((s, i) => (
                <button key={i} role="tab" aria-selected={i === active} aria-label={`Step ${i + 1}: ${s.regular} ${s.italic}`} className={`hiw-dot-btn${i === active ? ' active' : ''}`} onClick={() => navigate(i)}>
                  <span className="hiw-dot-track">
                    {i === active && <span key={`${i}-${dotKey}`} className="hiw-dot-progress" />}
                  </span>
                </button>
              ))}
            </div>
            <button className="hiw-arrow" onClick={() => navigate(Math.min(3, active + 1))} disabled={active === 3} aria-label="Next step">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5.5 2.5L10 7L5.5 11.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="hiw-phone-col">
          <div className={`hiw-card${visible ? '' : ' fade'}`}>
            <div className="hiw-screen">
              <img src={step.image} alt={`Step ${display + 1}: ${step.regular} ${step.italic}`} draggable={false} />
            </div>
            <img src="/Images/hero-phone-chrome.svg" className="hiw-chrome" alt="" aria-hidden="true" draggable={false} />
          </div>
        </div>
      </div>

      {/* ── Mobile carousel (visible only on mobile via CSS) ── */}
      {isMobile && (
        <div style={{ position: 'relative' }}>
          {/* Track — all 4 slides in DOM */}
          <div
            className={`hiw-carousel-track${dragging ? '' : ' is-animating'}`}
            style={{ transform: `translateX(${trackTransform})` }}
          >
            {STEPS.map((s, i) => (
              <div key={i} className="hiw-slide">
                {/* Text: label + heading + desc */}
                <div className="hiw-slide-text">
                  <p className="hiw-label">Step {s.num}</p>
                  <h2 className="hiw-heading">
                    {s.regular}
                    <em>{s.italic}</em>
                  </h2>
                  <p className="hiw-desc">{s.desc}</p>
                </div>

                {/* Phone card */}
                <div className="hiw-slide-phone">
                  <div className="hiw-slide-screen">
                    <img src={s.image} alt={`Step ${i + 1}: ${s.regular} ${s.italic}`} draggable={false} />
                  </div>
                  <img src="/Images/hero-phone-chrome.svg" className="hiw-slide-chrome" alt="" aria-hidden="true" draggable={false} />
                </div>
              </div>
            ))}
          </div>

          {/* Apple-style pagination overlay — fixed, bottom tracks section on exit */}
          <div
            className={`hiw-pagination${paginationVisible ? ' visible' : ''}`}
            style={{ bottom: `${pillBottom}px` }}
          >
            <div className="hiw-dots" role="tablist" aria-label="Steps">
              {STEPS.map((s, i) => (
                <button key={i} role="tab" aria-selected={i === active} aria-label={`Step ${i + 1}`} className={`hiw-dot-btn${i === active ? ' active' : ''}`} onClick={() => { if (completed) { completedRef.current = false; setCompleted(false); } navigate(i); }}>
                  <span className="hiw-dot-track">
                    {i === active && !completed && <span key={`m-${i}-${dotKey}`} className="hiw-dot-progress" />}
                  </span>
                </button>
              ))}
            </div>

            {/* Pause / replay button */}
            <button
              className="hiw-ctrl-btn"
              onClick={completed ? replay : togglePause}
              aria-label={completed ? 'Replay' : paused ? 'Play' : 'Pause'}
            >
              {completed ? (
                /* Replay icon — Feather refresh-cw style */
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="1 4 1 10 7 10"/>
                  <path d="M3.51 15a9 9 0 1 0 .49-6.56"/>
                </svg>
              ) : paused ? (
                /* Play icon */
                <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
                  <path d="M2 1.5L10.5 7L2 12.5V1.5Z" fill="currentColor"/>
                </svg>
              ) : (
                /* Pause icon */
                <svg width="10" height="13" viewBox="0 0 10 13" fill="none">
                  <rect x="0.5" y="0.5" width="3" height="12" rx="1.5" fill="currentColor"/>
                  <rect x="6.5" y="0.5" width="3" height="12" rx="1.5" fill="currentColor"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
