'use client';

import React, { useState, useRef, useEffect } from 'react';

// ── FAQ asset URLs ────────────────────────────────────────────────────────────
const imgFaqIcon = "/Images/asset-da12b6f2-d6cc-4a7a-b21e-c1e5b1c44487.svg";

const FAQ_DATA = [
  {
    q: "How accurate is the flight data?",
    a: "We combine FlightAware, AeroDataBox, and Aviationstack — cross-verified in real time. When one source has gaps, the system falls back automatically. Gate changes and delays typically surface 8–12 minutes before official airline announcements.",
  },
  {
    q: "Can I track connecting flights?",
    a: "Yes. Flight Passport models entire journeys, not isolated flights. Multi-leg itineraries are tracked as a single journey, with automatic connection window monitoring and risk alerts when your inbound is running late.",
  },
  {
    q: "Does it work when live data is unavailable?",
    a: "The app shows the last known state and clearly indicates when data is stale. For most major routes, coverage is near-continuous. Smaller regional airports may have gaps of 5–15 minutes.",
  },
  {
    q: "What is the Passport feature?",
    a: "Passport is your permanent travel history. Every completed journey is recorded automatically — countries visited, airports, airlines, aircraft types, and distance flown. It builds over time without any manual input.",
  },
  {
    q: "Which airlines and routes are supported?",
    a: "Flight Passport covers 1,200+ airlines across all major global routes. Coverage includes commercial, regional, and low-cost carriers. Private and charter flights are not currently supported.",
  },
  {
    q: "Is Flight Passport free?",
    a: "Flight Passport is free to download with core tracking included. A premium subscription unlocks advanced delay predictions, full journey history export, turbulence maps, and priority data refresh.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const rowRefs  = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Title reveal
    const title = titleRef.current;
    if (title) {
      title.style.opacity = "0";
      title.style.transform = "translateY(20px)";
      title.style.transition = "opacity 500ms ease, transform 500ms ease";
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            title.style.opacity = "1";
            title.style.transform = "translateY(0)";
            obs.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      obs.observe(title);
    }
    // Row reveals with stagger
    const observers: IntersectionObserver[] = [];
    rowRefs.current.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = `opacity 500ms ease ${i * 50}ms, transform 500ms ease ${i * 50}ms`;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            obs.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <>
      <style>{`
        .faq-section {
          background: #f9f8f6;
          padding: 120px 0;
          width: 100%;
          box-sizing: border-box;
        }
        .faq-container {
          max-width: 690px;
          margin: 0 auto;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 48px;
          align-items: center;
        }
        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
        }
        .faq-row {
          display: flex;
          gap: 71px;
          align-items: center;
          padding: 12px 0;
          cursor: pointer;
          user-select: none;
        }
        .faq-question {
          flex: 1;
          font-family: var(--font-inter), sans-serif;
          font-weight: 500;
          font-size: 17px;
          color: #1c1917;
          line-height: 1.4;
          margin: 0;
          transition: color 150ms ease;
        }
        .faq-row:hover .faq-question { color: #0284c7; }
        .faq-icon-wrap {
          position: relative;
          width: 20px;
          height: 20px;
          flex-shrink: 0;
        }
        .faq-icon-wrap img {
          position: absolute;
          inset: 11.67%;
          width: calc(100% - 23.34%);
          height: calc(100% - 23.34%);
          transition: transform 380ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .faq-divider {
          height: 0;
          width: 100%;
          border: none;
          border-top: 1px solid #e7e5e4;
          margin: 0;
        }
        .faq-answer-wrap {
          display: grid;
          grid-template-rows: 0fr;
          opacity: 0;
          transition: grid-template-rows 420ms cubic-bezier(0.4, 0, 0.2, 1), opacity 320ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .faq-answer-wrap.open {
          grid-template-rows: 1fr;
          opacity: 1;
        }
        .faq-answer-inner {
          overflow: hidden;
        }
        .faq-answer {
          font-family: var(--font-inter), sans-serif;
          font-weight: 400;
          font-size: 15px;
          color: #6c6760;
          line-height: 1.6;
          padding-bottom: 16px;
          margin: 0;
          padding-top: 2px;
        }
        @media (max-width: 767px) {
          .faq-section { padding: 80px 0; }
          .faq-container { padding: 0 24px; }
          .faq-title { font-size: 36px !important; }
          .faq-row { padding: 20px 0 !important; }
          .faq-question { font-size: 16px !important; }
        }
      `}</style>
      <section id="faq" className="faq-section" data-name="FAQ">
        <div className="faq-container">

          {/* Title */}
          <div ref={titleRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <p style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontWeight: 700,
              fontSize: 12,
              color: "#a8a29e",
              textAlign: "center",
              letterSpacing: "0.48px",
              textTransform: "uppercase",
              margin: 0,
            }}>
              Common questions
            </p>
            <h2
              className="faq-title"
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontWeight: 700,
                fontSize: 48,
                color: "#1c1917",
                textAlign: "center",
                letterSpacing: "-0.96px",
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              What people ask
            </h2>
          </div>

          {/* Questions list */}
          <div className="faq-list">
            {FAQ_DATA.map((item, i) => (
              <React.Fragment key={i}>
                {i > 0 && <hr className="faq-divider" />}
                <div ref={(el) => { rowRefs.current[i] = el; }}>
                  {/* Question row */}
                  <div
                    className="faq-row"
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    role="button"
                    aria-expanded={openIndex === i}
                  >
                    <p className="faq-question">{item.q}</p>
                    <div className="faq-icon-wrap">
                      <img
                        alt=""
                        src={imgFaqIcon}
                        style={{ transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)" }}
                      />
                    </div>
                  </div>

                  {/* Answer panel */}
                  <div className={`faq-answer-wrap${openIndex === i ? " open" : ""}`}>
                    <div className="faq-answer-inner">
                      <p className="faq-answer">{item.a}</p>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
