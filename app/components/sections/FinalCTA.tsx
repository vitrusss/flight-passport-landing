'use client';

import React, { useRef, useEffect } from 'react';

// ── Final CTA asset URLs ──────────────────────────────────────────────────────
const imgCtaIcon = "/Images/asset-ad8c634f-6331-482a-bd5a-7bbe7a2b8fc4.svg";

export default function FinalCTA() {
  const titleRef    = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef   = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const items = [
      { el: titleRef.current,    delay: 0,   from: "translateY(20px)", to: "translateY(0)", scale: false },
      { el: subtitleRef.current, delay: 100, from: "translateY(20px)", to: "translateY(0)", scale: false },
      { el: buttonRef.current,   delay: 200, from: "scale(0.96)",       to: "scale(1)",     scale: true  },
    ];
    const observers: IntersectionObserver[] = [];
    items.forEach(({ el, delay, from, to, scale }) => {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = from;
      el.style.transition = `opacity 500ms ease ${delay}ms, transform 500ms ease ${delay}ms`;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = to;
            obs.disconnect();
            if (scale) {
              // Clear inline transform/transition after reveal so CSS :hover/:active take over
              setTimeout(() => {
                el.style.transform = "";
                el.style.transition = "";
              }, 500 + delay + 50);
            }
          }
        },
        { threshold: 0.15 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <>
      <style>{`
        .cta-section {
          background: white;
          border-top: 1px solid #e7e5e4;
          border-bottom: 1px solid #e7e5e4;
          padding: 120px 367px;
          width: 100%;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .cta-inner {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 48px;
          align-items: center;
        }
        .cta-content {
          max-width: 706px;
          width: 100%;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: center;
        }
        @media (min-width: 1024px) and (max-width: 1439px) {
          .cta-section { padding: 80px 120px; }
        }
        @media (max-width: 1023px) {
          .cta-section { padding: 80px 80px; }
        }
        @media (max-width: 767px) {
          .cta-section { padding: 64px 20px; }
          .cta-content { max-width: 100%; }
          .cta-title { font-size: 32px !important; letter-spacing: -0.64px !important; }
          .cta-btn { width: 100% !important; max-width: 400px !important; }
        }
      `}</style>
      <section id="cta" className="cta-section" data-name="Final CTA">
        <div className="cta-inner">

          {/* Text block */}
          <div className="cta-content">

            {/* Title */}
            <h2
              ref={titleRef}
              className="cta-title"
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontWeight: 700,
                fontSize: 48,
                color: "#1c1917",
                letterSpacing: "-0.96px",
                lineHeight: 1.1,
                margin: 0,
                textAlign: "center",
              }}
            >
              Travel{" "}
              <em style={{ fontWeight: 400, fontStyle: "italic", color: "#0ea5e9" }}>with clarity</em>
              {","}
              <br />
              from departure to destination
            </h2>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontWeight: 400,
                fontSize: 17,
                color: "#6c6760",
                lineHeight: 1.4,
                textAlign: "center",
                margin: 0,
              }}
            >
              Flight Passport is available now on iPhone.
            </p>
          </div>

          {/* CTA Button */}
          <button
            ref={buttonRef}
            className="cta-btn"
            style={{
              height: 52,
              padding: "0 32px",
              width: "auto",
              background: "#1c1917",
              borderRadius: 999,
              border: "none",
              display: "flex",
              gap: 8,
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            {/* Apple icon */}
            <div style={{ width: 20, height: 20, overflow: "clip", position: "relative", flexShrink: 0 }}>
              <img
                alt=""
                src={imgCtaIcon}
                style={{
                  position: "absolute",
                  top: 0,
                  right: "10.94%",
                  bottom: "4.17%",
                  left: "8.33%",
                  width: "calc(100% - 19.27%)",
                  height: "calc(100% - 4.17%)",
                  objectFit: "contain",
                }}
              />
            </div>
            {/* Label */}
            <span
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontWeight: 600,
                fontSize: 15,
                color: "white",
                lineHeight: "20px",
                whiteSpace: "nowrap",
              }}
            >
              Download from App Store
            </span>
          </button>

        </div>
      </section>
    </>
  );
}
