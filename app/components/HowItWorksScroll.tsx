'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────────
   Step config — label + responsive image paths
   ───────────────────────────────────────────── */
interface StepConfig {
  label: string;
  xs: string;  // ≤559px  — Mobile L
  sm: string;  // 560–959px — Tablet
  md: string;  // 960–1199px — Desktop
  lg: string;  // 1200–1599px — Desktop L
  xl: string;  // ≥1600px — Full HD
}

const STEPS: StepConfig[] = [
  {
    label: 'Find any flight in seconds',
    xs: '/Images/hiw-c1-xs.png',
    sm: '/Images/hiw-c1-sm.png',
    md: '/Images/hiw-c1-md.png',
    lg: '/Images/hiw-c1-lg.png',
    xl: '/Images/hiw-c1-xl.png',
  },
  {
    label: 'Understand what to expect',
    xs: '/Images/hiw-c2-xs.png',
    sm: '/Images/hiw-c2-sm.png',
    md: '/Images/hiw-c2-md.png',
    lg: '/Images/hiw-c2-lg.png',
    xl: '/Images/hiw-c2-xl.png',
  },
  {
    label: 'Stay ahead of every change',
    xs: '/Images/hiw-c3-xs.png',
    sm: '/Images/hiw-c3-sm.png',
    md: '/Images/hiw-c3-md.png',
    lg: '/Images/hiw-c3-lg.png',
    xl: '/Images/hiw-c3-xl.png',
  },
  {
    label: 'Build your travel history',
    xs: '/Images/hiw-c4-xs.png',
    sm: '/Images/hiw-c4-sm.png',
    md: '/Images/hiw-c4-md.png',
    lg: '/Images/hiw-c4-lg.png',
    xl: '/Images/hiw-c4-xl.png',
  },
];

const AUTO_MS  = 10000;
const CARD_GAP = 32;
const M_GAP    = 24;

/* ─────────────────────────────────────────────
   Main slider component
   ───────────────────────────────────────────── */
export default function HowItWorksScroll() {
  const [active,            setActive]            = useState(0);
  const [dotKey,            setDotKey]            = useState(0);
  const [autoStarted,       setAutoStarted]       = useState(false);
  const [paused,            setPaused]            = useState(false);
  const [completed,         setCompleted]         = useState(false);
  const [paginationVisible, setPaginationVisible] = useState(false);
  const [pillBottom,        setPillBottom]        = useState(32);
  const [stepPx,            setStepPx]            = useState(0);
  const [dragOffset,        setDragOffset]        = useState(0);
  const [dragging,          setDragging]          = useState(false);

  const activeRef       = useRef(0);
  const pausedRef       = useRef(false);
  const completedRef    = useRef(false);
  const inViewRef       = useRef(false);
  const sectionRef      = useRef<HTMLElement>(null);
  const firstCardRef    = useRef<HTMLDivElement>(null);
  const touchStartX     = useRef(0);
  const timerRef        = useRef<ReturnType<typeof setTimeout> | null>(null);
  const slideEnteredRef = useRef<number>(Date.now());
  const remainingRef    = useRef<number>(AUTO_MS);

  useEffect(() => {
    const check = () => {};
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const update = () => {
      if (!firstCardRef.current) return;
      const gap = window.innerWidth < 768 ? M_GAP : CARD_GAP;
      setStepPx(firstCardRef.current.offsetWidth + gap);
    };
    update();
    const ro = new ResizeObserver(update);
    if (firstCardRef.current) ro.observe(firstCardRef.current);
    window.addEventListener('resize', update);
    return () => { ro.disconnect(); window.removeEventListener('resize', update); };
  }, []);

  useEffect(() => {
    const NATURAL_B = 32;
    const check = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh   = window.innerHeight;
      setPaginationVisible(rect.top < vh * 0.5 && rect.bottom > 0);
      setPillBottom(
        rect.bottom >= vh ? NATURAL_B : Math.max(NATURAL_B, vh - rect.bottom + NATURAL_B)
      );
    };
    window.addEventListener('scroll', check, { passive: true });
    check();
    return () => window.removeEventListener('scroll', check);
  }, []);

  const clearTimer = () => {
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
  };

  const scheduleAdvance = useCallback((delay: number) => {
    clearTimer();
    slideEnteredRef.current = Date.now() - (AUTO_MS - delay);
    timerRef.current = setTimeout(() => {
      if (pausedRef.current || completedRef.current) return;
      const next = activeRef.current + 1;
      if (next >= STEPS.length) {
        completedRef.current = true;
        setCompleted(true);
        return;
      }
      activeRef.current = next;
      setActive(next);
      setDotKey(k => k + 1);
      remainingRef.current = AUTO_MS;
    }, delay);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        const wasInView = inViewRef.current;
        inViewRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !wasInView) {
          if (!pausedRef.current && !completedRef.current) {
            setAutoStarted(true);
            setDotKey(k => k + 1);
            scheduleAdvance(remainingRef.current);
          }
        } else if (!entry.isIntersecting && wasInView) {
          const elapsed = Date.now() - slideEnteredRef.current;
          remainingRef.current = Math.max(200, AUTO_MS - elapsed);
          clearTimer();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(sectionRef.current);
    return () => io.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheduleAdvance]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => clearTimer, []);

  useEffect(() => {
    if (pausedRef.current || completedRef.current || !inViewRef.current) return;
    scheduleAdvance(AUTO_MS);
    remainingRef.current = AUTO_MS;
  }, [active, scheduleAdvance]);

  const navigate = useCallback((next: number) => {
    if (next === activeRef.current) return;
    clearTimer();
    if (completedRef.current) { completedRef.current = false; setCompleted(false); }
    activeRef.current = next;
    setActive(next);
    setDotKey(k => k + 1);
    remainingRef.current = AUTO_MS;
  }, []);

  const handlePause = () => {
    const elapsed = Date.now() - slideEnteredRef.current;
    remainingRef.current = Math.max(200, AUTO_MS - elapsed);
    clearTimer();
    pausedRef.current = true;
    setPaused(true);
  };

  const handleResume = () => {
    pausedRef.current = false;
    setPaused(false);
    scheduleAdvance(remainingRef.current);
  };

  const togglePause = () => {
    if (pausedRef.current) handleResume();
    else handlePause();
  };

  const replay = () => {
    completedRef.current = false;
    pausedRef.current    = false;
    setCompleted(false);
    setPaused(false);
    remainingRef.current = AUTO_MS;
    if (activeRef.current === 0) {
      setDotKey(k => k + 1);
      scheduleAdvance(AUTO_MS);
    } else {
      activeRef.current = 0;
      setActive(0);
      setDotKey(k => k + 1);
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setDragging(true);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    const raw    = e.touches[0].clientX - touchStartX.current;
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
      navigate(next);
    }
  };

  const trackX = stepPx > 0 ? `${-active * stepPx + dragOffset}px` : '0px';

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="hiw"
      aria-label="How FlightPassport works"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <style>{`
        /* ══════════════════════════════════════
           Section
           ══════════════════════════════════════ */
        .hiw {
          padding: 96px 0 200px;
          box-sizing: border-box;
          border-top: 1px solid #e7e5e4;
          border-bottom: 1px solid #e7e5e4;
          background: linear-gradient(26deg, #e6e6e6 0%, #ffffff 100%);
          position: relative;
          overflow: hidden;
        }
        .hiw-header {
          text-align: center;
          padding: 0 24px;
          margin-bottom: 48px;
        }
        .hiw-title {
          font-size: 48px;
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.1;
          color: #1c1917;
          margin: 0;
        }

        /* ══════════════════════════════════════
           Carousel mechanics
           ══════════════════════════════════════ */
        .hiw-carousel { overflow: visible; }
        .hiw-track {
          display: flex;
          align-items: stretch;
          gap: ${CARD_GAP}px;
          padding: 0 max(120px, calc((100vw - 1200px) / 2));
          will-change: transform;
        }
        .hiw-track.is-animating {
          transition: transform 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        /* ── Card shell ── */
        .hiw-card {
          flex: 0 0 min(1200px, calc(100vw - 240px));
          aspect-ratio: 1200 / 680;
          border-radius: 40px;
          overflow: hidden;
          cursor: pointer;
          flex-shrink: 0;
          user-select: none;
          position: relative;
        }
        .hiw-card.is-active { cursor: default; }

        /* ── Card image ── */
        .hiw-card-img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
          -webkit-user-drag: none;
        }

        /* ══════════════════════════════════════
           XL (≥1600px)
           ══════════════════════════════════════ */
        @media (min-width: 1600px) {
          .hiw-card {
            flex: 0 0 min(1600px, calc(100vw - 240px));
            aspect-ratio: 1600 / 680;
          }
          .hiw-track {
            padding: 0 max(120px, calc((100vw - 1600px) / 2));
          }
        }

        /* ══════════════════════════════════════
           MD tablet (768–1199px) — shared shell
           ══════════════════════════════════════ */
        @media (min-width: 768px) and (max-width: 1199px) {
          .hiw-card {
            flex: 0 0 min(960px, calc(100vw - 80px));
            aspect-ratio: 960 / 620;
            border-radius: 32px;
          }
          .hiw-track {
            gap: ${CARD_GAP}px;
            padding: 0 max(40px, calc((100vw - 960px) / 2));
          }
        }
        /* Narrow tablet override for taller cards */
        @media (min-width: 768px) and (max-width: 959px) {
          .hiw-card { aspect-ratio: 640 / 538; }
        }

        /* ══════════════════════════════════════
           SM mobile (560–767px)
           ══════════════════════════════════════ */
        @media (min-width: 560px) and (max-width: 767px) {
          .hiw { padding: 64px 0 104px; }
          .hiw-title { font-size: 32px; }
          .hiw-header { margin-bottom: 32px; }
          .hiw-track {
            align-items: flex-start;
            gap: ${M_GAP}px;
            padding: 0 max(32px, calc((100vw - 560px) / 2));
          }
          .hiw-card {
            flex: 0 0 560px;
            width: 560px;
            min-width: 560px;
            max-width: 560px;
            height: 538px;
            aspect-ratio: auto;
            border-radius: 24px;
          }
        }

        /* ══════════════════════════════════════
           XS mobile (≤559px)
           ══════════════════════════════════════ */
        @media (max-width: 559px) {
          .hiw { padding: 64px 0 104px; }
          .hiw-title { font-size: 32px; }
          .hiw-header { margin-bottom: 32px; }
          .hiw-track {
            align-items: flex-start;
            gap: ${M_GAP}px;
            padding: 0 max(24px, calc((100vw - 320px) / 2));
          }
          .hiw-card {
            flex: 0 0 320px;
            width: 320px;
            min-width: 320px;
            max-width: 320px;
            height: 538px;
            aspect-ratio: auto;
            border-radius: 24px;
          }
        }

        /* ══════════════════════════════════════
           Dots / Pagination / Pill
           ══════════════════════════════════════ */
        .hiw-dots {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .hiw-dot-btn {
          padding: 6px 0;
          background: none;
          border: none;
          cursor: pointer;
          line-height: 0;
        }
        .hiw-dot-track {
          display: block;
          height: 8px;
          border-radius: 999px;
          background: rgba(28, 25, 23, 0.25);
          overflow: hidden;
          position: relative;
          width: 8px;
          transition: width 300ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hiw-dot-btn.active .hiw-dot-track { width: 47px; }
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

        .hiw-pagination.is-paused .hiw-dot-btn.active .hiw-dot-progress {
          animation-play-state: paused;
        }

        .hiw-pagination {
          position: fixed;
          left: 50%;
          transform: translateX(-50%) translateY(80px);
          opacity: 0;
          pointer-events: none;
          display: flex;
          align-items: center;
          gap: 16px;
          z-index: 200;
          transition:
            transform 500ms cubic-bezier(0.34, 1.4, 0.64, 1),
            opacity 320ms ease;
        }
        .hiw-pagination.visible {
          transform: translateX(-50%) translateY(0);
          opacity: 1;
          pointer-events: auto;
        }

        .hiw-dots-pill {
          display: flex;
          align-items: center;
          height: 56px;
          padding: 0 24px;
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(24px) saturate(1.8);
          -webkit-backdrop-filter: blur(24px) saturate(1.8);
          border-radius: 999px;
          box-shadow:
            0 2px 24px rgba(0, 0, 0, 0.10),
            inset 0 0.5px 0 rgba(255, 255, 255, 0.9);
        }

        .hiw-action-btn {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(24px) saturate(1.8);
          -webkit-backdrop-filter: blur(24px) saturate(1.8);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #1c1917;
          flex-shrink: 0;
          line-height: 0;
          box-shadow:
            0 2px 24px rgba(0, 0, 0, 0.10),
            inset 0 0.5px 0 rgba(255, 255, 255, 0.9);
          transition: transform 150ms ease;
        }
        .hiw-action-btn:hover { transform: scale(1.07); }

        /* ── Reduced motion ── */
        @media (prefers-reduced-motion: reduce) {
          .hiw-track        { transition: none !important; }
          .hiw-card         { transition: none !important; }
          .hiw-dot-progress { animation: none !important; }
          .hiw-dot-track    { transition: none !important; }
          .hiw-pagination   { transition: none !important; }
        }
      `}</style>

      {/* SR live region */}
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}
      >
        Slide {active + 1} of {STEPS.length}: {STEPS[active].label}
      </div>

      {/* Title */}
      <div className="hiw-header">
        <h2 className="hiw-title">How it works</h2>
      </div>

      {/* Carousel */}
      <div className="hiw-carousel">
        <div
          className={`hiw-track${dragging ? '' : ' is-animating'}`}
          style={{ transform: `translateX(${trackX})` }}
        >
          {STEPS.map((s, i) => (
            <div
              key={i}
              ref={i === 0 ? firstCardRef : undefined}
              className={`hiw-card${i === active ? ' is-active' : ''}`}
              onClick={() => { if (i !== active) navigate(i); }}
              role={i !== active ? 'button' : undefined}
              aria-label={i !== active ? s.label : undefined}
              tabIndex={i !== active ? 0 : undefined}
              onKeyDown={i !== active
                ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate(i); } }
                : undefined
              }
            >
              <picture>
                <source media="(max-width: 559px)"                          srcSet={s.xs} />
                <source media="(min-width: 560px) and (max-width: 959px)"   srcSet={s.sm} />
                <source media="(min-width: 960px) and (max-width: 1199px)"  srcSet={s.md} />
                <source media="(min-width: 1200px) and (max-width: 1599px)" srcSet={s.lg} />
                <source media="(min-width: 1600px)"                         srcSet={s.xl} />
                <img
                  src={s.lg}
                  alt={s.label}
                  className="hiw-card-img"
                  loading={i === 0 ? 'eager' : 'lazy'}
                  draggable={false}
                />
              </picture>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Apple-style pagination pill */}
      <div
        className={`hiw-pagination${paginationVisible ? ' visible' : ''}${paused ? ' is-paused' : ''}`}
        style={{ bottom: `${pillBottom}px` }}
      >
        <div className="hiw-dots-pill">
          <div className="hiw-dots" role="tablist" aria-label="Slides">
            {STEPS.map((s, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === active}
                aria-label={`Slide ${i + 1}: ${s.label}`}
                className={`hiw-dot-btn${i === active ? ' active' : ''}`}
                onClick={() => navigate(i)}
              >
                <span className="hiw-dot-track">
                  {i === active && !completed && autoStarted &&
                    <span key={`${i}-${dotKey}`} className="hiw-dot-progress" />
                  }
                </span>
              </button>
            ))}
          </div>
        </div>

        <button
          className="hiw-action-btn"
          onClick={completed ? replay : togglePause}
          aria-label={completed ? 'Restart' : paused ? 'Play' : 'Pause'}
        >
          {completed ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1 4 1 10 7 10"/>
              <path d="M3.51 15a9 9 0 1 0 .49-6.56"/>
            </svg>
          ) : paused ? (
            <svg width="13" height="15" viewBox="0 0 13 15" fill="none">
              <path d="M2 1.5L11.5 7.5L2 13.5V1.5Z" fill="currentColor"/>
            </svg>
          ) : (
            <svg width="11" height="14" viewBox="0 0 11 14" fill="none">
              <rect x="0.5" y="0.5" width="3.5" height="13" rx="1.75" fill="currentColor"/>
              <rect x="7" y="0.5" width="3.5" height="13" rx="1.75" fill="currentColor"/>
            </svg>
          )}
        </button>
      </div>
    </section>
  );
}
