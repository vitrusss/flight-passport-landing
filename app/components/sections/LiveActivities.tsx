'use client';

import React, { useRef, useEffect } from 'react';

const LA_CARDS = [
  { src: "/Images/Live%20Activity%20Cards/BOARDING.png",            alt: "Boarding now"       },
  { src: "/Images/Live%20Activity%20Cards/GATE_CHANGED.png",        alt: "Gate changed"       },
  { src: "/Images/Live%20Activity%20Cards/IN_AIR.png",              alt: "In air"             },
  { src: "/Images/Live%20Activity%20Cards/CONNECTION_AT_RISK.png",  alt: "Connection at risk" },
  { src: "/Images/Live%20Activity%20Cards/ARRIVED_FINAL.png",       alt: "Arrived"            },
  { src: "/Images/Live%20Activity%20Cards/CANCELLED.png",           alt: "Cancelled"          },
];

export default function LiveActivities() {
  const headerRef  = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([]);
  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.currentTarget.classList.add('la-card-pressing');
  }
  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    e.currentTarget.classList.remove('la-card-pressing');
  }

  useEffect(() => {
    // Header — blur + slide + fade
    const header = headerRef.current;
    if (header) {
      header.style.opacity = "0";
      header.style.transform = "translateY(24px)";
      header.style.filter = "blur(8px)";
      header.style.transition = "opacity 700ms cubic-bezier(0.25,0.46,0.45,0.94), transform 700ms cubic-bezier(0.25,0.46,0.45,0.94), filter 700ms cubic-bezier(0.25,0.46,0.45,0.94)";
      const obsH = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            header.style.opacity = "1";
            header.style.transform = "translateY(0)";
            header.style.filter = "blur(0px)";
            obsH.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      obsH.observe(header);
    }

    // Cards — set initial hidden state
    cardRefs.current.forEach((card) => {
      if (!card) return;
      card.style.opacity = "0";
      card.style.transform = "translateY(40px) scale(0.94)";
      card.style.filter = "blur(6px)";
      card.style.transition = "opacity 700ms cubic-bezier(0.25,0.46,0.45,0.94), transform 700ms cubic-bezier(0.34,1.2,0.64,1), filter 700ms cubic-bezier(0.25,0.46,0.45,0.94)";
    });

    // Cards — staggered entrance on scroll
    const grid = gridRef.current;
    if (!grid) return;
    const obsG = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cardRefs.current.forEach((card, i) => {
            if (!card) return;
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "translateY(0) scale(1)";
              card.style.filter = "blur(0px)";
              // After animation ends — clear inline styles so CSS hover takes over
              setTimeout(() => {
                card.style.transform = "";
                card.style.filter = "";
                card.style.transition = "";
                card.style.opacity = "";
              }, 750);
            }, i * 100);
          });
          obsG.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    obsG.observe(grid);
    return () => obsG.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .la-section {
          background: linear-gradient(to bottom, #1c1917, #3f3731);
          width: 100%;
          position: relative;
          overflow: hidden;
          padding: 120px 24px 140px;
          box-sizing: border-box;
        }
        .la-container {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 48px;
          align-items: center;
        }
        .la-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          width: 100%;
          max-width: 1160px;
          margin: 0 auto;
        }
        @keyframes laFloatA {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-9px); }
        }
        @keyframes laFloatB {
          0%, 100% { transform: translateY(-5px); }
          50%       { transform: translateY(5px); }
        }
        @keyframes laFloatC {
          0%, 100% { transform: translateY(-2px); }
          50%       { transform: translateY(-11px); }
        }
        .la-card {
          width: 100%;
          cursor: pointer;
        }
        /* Float animation on .la-card-inner (has real content) — avoids Safari
           painting a grey compositing rect on the empty transparent .la-card wrapper */
        .la-card:nth-child(1) .la-card-inner { animation: laFloatA 6.0s ease-in-out 0.0s infinite; }
        .la-card:nth-child(2) .la-card-inner { animation: laFloatB 7.2s ease-in-out 0.4s infinite; }
        .la-card:nth-child(3) .la-card-inner { animation: laFloatC 5.8s ease-in-out 1.1s infinite; }
        .la-card:nth-child(4) .la-card-inner { animation: laFloatB 6.6s ease-in-out 0.7s infinite; }
        .la-card:nth-child(5) .la-card-inner { animation: laFloatA 7.4s ease-in-out 1.4s infinite; }
        .la-card:nth-child(6) .la-card-inner { animation: laFloatC 6.2s ease-in-out 0.2s infinite; }
        .la-card-inner {
          width: 100%;
          transition: transform 0.4s cubic-bezier(0.34, 1.28, 0.64, 1);
          -webkit-transition: transform 0.4s cubic-bezier(0.34, 1.28, 0.64, 1);
        }
        .la-card:hover .la-card-inner {
          animation-play-state: paused;
          transform: scale(1.04);
        }
        .la-card img {
          width: 100%;
          height: auto;
          aspect-ratio: 752 / 352;
          display: block;
          object-fit: cover;
          border-radius: 44px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.28);
          transition: box-shadow 0.4s ease, transform 0.4s ease;
          -webkit-transition: box-shadow 0.4s ease, transform 0.4s ease;
        }
        .la-card:hover img {
          box-shadow: 0 20px 44px rgba(0,0,0,0.36), 0 4px 12px rgba(0,0,0,0.18);
        }
        /* ── Press reaction ── */
        .la-card.la-card-pressing .la-card-inner {
          transform: scale(0.972);
          transition: transform 90ms ease-out;
        }
        @media (max-width: 767px) {
          .la-section { padding: 64px 20px !important; }
          .la-container { gap: 40px !important; }
          .la-title { font-size: 32px !important; letter-spacing: -0.64px !important; }
          .la-desc { font-size: 15px !important; width: 100% !important; max-width: 100% !important; }
          .la-cards-grid { grid-template-columns: 1fr; gap: 20px; max-width: 370px !important; }
          /* Disable float animation on mobile — saves battery, avoids jitter */
          .la-card .la-card-inner { animation: none !important; }
          /* Show only 3 cards on mobile: Boarding (1), Gate Arrival in air (3), Connection at risk (4) */
          .la-card:nth-child(2),
          .la-card:nth-child(5),
          .la-card:nth-child(6) { display: none !important; }
        }
      `}</style>
      <section id="live-activities" className="la-section">
          {/* Blue glow — soft vertical oval centered on the text */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: '-120px',
            transform: 'translateX(-50%)',
            width: '560px',
            height: '620px',
            background: 'radial-gradient(ellipse, rgba(14,165,233,0.28) 0%, transparent 60%)',
            filter: 'blur(80px)',
            pointerEvents: 'none',
            zIndex: 0,
          }} />

        <div className="la-container">

          {/* Header */}
          <div
            ref={headerRef}
            style={{position: 'relative', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', textAlign: 'center', width: '654.5px', maxWidth: '100%'}}
          >

            <p style={{position: 'relative', zIndex: 1, fontFamily: 'Inter', fontWeight: 700, fontSize: '12px', color: 'rgba(255,255,255,0.72)', letterSpacing: '0.48px', textTransform: 'uppercase', lineHeight: 1, margin: 0}}>
              State driven system
            </p>
            <div style={{position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', width: '100%'}}>
              <p className="la-title" style={{fontFamily: 'Inter', fontSize: '48px', color: 'white', letterSpacing: '-0.96px', lineHeight: 1.1, textAlign: 'center', margin: 0, textShadow: '0 4px 16px rgba(10,16,40,0.08)', width: '518px', maxWidth: '100%'}}>
                <span style={{fontWeight: 700}}>See problems </span>
                <span style={{fontWeight: 400, fontStyle: 'italic', color: '#0ea5e9', letterSpacing: '-1.44px'}}>before</span>
                <span style={{fontWeight: 700}}> they become yours.</span>
              </p>
              <p className="la-desc" style={{fontFamily: 'Inter', fontWeight: 400, fontSize: '17px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.4, width: '540px', maxWidth: '100%', textAlign: 'center', margin: 0}}>
                Flight Passport reads every phase of your journey and surfaces only what matters at that moment.
              </p>
            </div>
          </div>

          {/* Cards grid — 6 individual cards with staggered entrance */}
          <div ref={gridRef} className="la-cards-grid">
            {LA_CARDS.map((card, i) => (
              <div
                key={i}
                ref={el => { cardRefs.current[i] = el; }}
                className="la-card"
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
              >
                <div className="la-card-inner">
                  <img src={card.src} alt={card.alt} />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
