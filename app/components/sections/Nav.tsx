'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

// ── Nav asset URLs (node 7300-48867) ──────────────────────────────────────────
const imgNavLogo   = "/Favicon.png";
const imgNavFi     = "/Images/asset-ced73d69-cb1b-4ed2-a9ff-08b795fd1549.svg";
const imgNavApple  = "/Images/asset-ae0b76f7-15b2-4a17-ad03-611555e2e9da.svg";

const NAV_LINKS = [
  { label: "Features",        href: "#features",        section: "features"        },
  { label: "How it works",    href: "#how-it-works",    section: "how-it-works"    },
  { label: "Live Activities", href: "#live-activities", section: "live-activities" },
  { label: "Passport",        href: "#passport",        section: "passport"        },
  { label: "FAQ",             href: "#faq",             section: "faq"             },
];

// ── Mobile Nav overlay + burger trigger ───────────────────────────────────────
function MobileNav({ links }: { links: typeof NAV_LINKS }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setIsOpen(false); };
    window.addEventListener("keydown", onKey);
    // iOS-safe scroll lock
    const scrollY = window.scrollY;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo({ top: scrollY, behavior: "instant" });
    };
  }, [isOpen]);

  return (
    <>
      <style>{`
        /* ── Burger button — mobile only */
        .mnav-burger {
          display: none;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          flex-shrink: 0;
          border-radius: 10px;
          transition: background 140ms ease;
        }
        .mnav-burger:active { background: rgba(28, 25, 23, 0.07); }
        @media (max-width: 767px) {
          .mnav-burger { display: flex; }
          .nav-download-btn { display: none !important; }
          .nav-logo-btn { width: auto !important; }
        }

        /* ── Animated 3-line icon → X */
        .mnav-icon {
          position: relative;
          width: 22px;
          height: 14px;
          flex-shrink: 0;
        }
        .mnav-line {
          position: absolute;
          left: 0;
          width: 22px;
          height: 1.5px;
          background: #1c1917;
          border-radius: 2px;
          transition:
            top 280ms cubic-bezier(0.4, 0, 0.2, 1),
            transform 280ms cubic-bezier(0.4, 0, 0.2, 1),
            opacity 180ms ease;
        }
        .mnav-line-1 { top: 0; }
        .mnav-line-2 { top: 6px; }
        .mnav-line-3 { top: 12px; }

        .mnav-burger.is-open .mnav-line-1 {
          top: 6px;
          transform: rotate(45deg);
        }
        .mnav-burger.is-open .mnav-line-2 {
          opacity: 0;
          transform: scaleX(0);
        }
        .mnav-burger.is-open .mnav-line-3 {
          top: 6px;
          transform: rotate(-45deg);
        }

        /* ── Full-screen overlay (z-95; nav header z-100 stays on top) */
        .mnav-overlay {
          position: fixed;
          inset: 0;
          z-index: 95;
          background: rgba(249, 248, 246, 0.97);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          pointer-events: none;
          opacity: 0;
          visibility: hidden;
          overscroll-behavior: none;
          transition: opacity 280ms ease, visibility 0ms linear 280ms;
        }
        .mnav-overlay.mnav-open {
          pointer-events: all;
          opacity: 1;
          visibility: visible;
          transition: opacity 280ms ease, visibility 0ms linear 0ms;
        }

        /* Spacer pushes links below the nav bar */
        .mnav-spacer {
          height: calc(48px + env(safe-area-inset-top));
          flex-shrink: 0;
        }

        /* Links — vertically centered */
        .mnav-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0 24px;
        }
        .mnav-links {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 400px;
          gap: 4px;
        }
        .mnav-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 60px;
          text-decoration: none;
          font-family: var(--font-inter), sans-serif;
          font-size: 24px;
          font-weight: 500;
          color: #1c1917;
          letter-spacing: -0.5px;
          border-radius: 14px;
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 300ms ease, transform 300ms ease, background 120ms ease;
        }
        .mnav-overlay.mnav-open .mnav-link {
          opacity: 1;
          transform: translateY(0);
        }
        .mnav-link:hover  { background: rgba(28, 25, 23, 0.05); }
        .mnav-link:active { background: rgba(28, 25, 23, 0.09); }

        /* ── Footer: thin divider + CTA */
        .mnav-footer {
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 24px calc(48px + env(safe-area-inset-bottom));
          width: 100%;
          box-sizing: border-box;
        }
        .mnav-divider {
          width: 100%;
          max-width: 360px;
          height: 1px;
          background: rgba(28, 25, 23, 0.1);
          margin-bottom: 24px;
          opacity: 0;
          transition: opacity 300ms ease;
        }
        .mnav-overlay.mnav-open .mnav-divider { opacity: 1; }

        .mnav-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          height: 56px;
          width: 100%;
          max-width: 360px;
          border-radius: 999px;
          background: #1c1917;
          border: none;
          cursor: pointer;
          flex-shrink: 0;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 300ms ease, transform 300ms ease, background 140ms ease;
        }
        .mnav-overlay.mnav-open .mnav-cta {
          opacity: 1;
          transform: translateY(0);
        }
        .mnav-cta:active { background: #292524; }
      `}</style>

      {/* ── Burger — 3 CSS lines that morph to X */}
      <button
        className={`mnav-burger${isOpen ? " is-open" : ""}`}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen(o => !o)}
      >
        <span className="mnav-icon" aria-hidden="true">
          <span className="mnav-line mnav-line-1" />
          <span className="mnav-line mnav-line-2" />
          <span className="mnav-line mnav-line-3" />
        </span>
      </button>

      {/* ── Full-screen overlay via portal */}
      {mounted && createPortal(
        <div
          className={`mnav-overlay${isOpen ? " mnav-open" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          aria-hidden={!isOpen}
        >
          {/* Pushes content below the nav bar */}
          <div className="mnav-spacer" />

          {/* Nav links — vertically centered */}
          <div className="mnav-body">
            <nav className="mnav-links">
              {links.map(({ label, href }, i) => (
                <a
                  key={href}
                  href={href}
                  className="mnav-link"
                  style={{ transitionDelay: isOpen ? `${50 + i * 55}ms` : "0ms" }}
                  onClick={(e) => {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (!target) return;
                    // body is position:fixed while menu is open — window.scrollY = 0
                    // read actual scroll from body.style.top set by the scroll lock
                    const savedY = -parseInt(document.body.style.top || "0", 10);
                    const targetTop = target.getBoundingClientRect().top + savedY - 48;
                    setIsOpen(false);
                    // wait one frame for body lock to be released, then scroll
                    setTimeout(() => {
                      history.replaceState(null, "", window.location.pathname);
                      window.scrollTo({ top: targetTop, behavior: "smooth" });
                    }, 16);
                  }}
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* Divider + App Store CTA */}
          <div className="mnav-footer">
            <div
              className="mnav-divider"
              style={{ transitionDelay: isOpen ? `${50 + links.length * 55}ms` : "0ms" }}
            />
            <button
              className="mnav-cta"
              style={{ transitionDelay: isOpen ? `${50 + links.length * 55 + 40}ms` : "0ms" }}
              onClick={() => setIsOpen(false)}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="white" aria-hidden="true">
                <path d="M15.5 10.5c0-2.5 2-3.5 2.1-3.6-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.6.9s-1.9-.8-3.1-.8c-1.6 0-3 .9-3.9 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.4 1.2 0 1.6-.7 3-.7s1.9.7 3.1.7c1.3 0 2-1.2 2.8-2.3.9-1.3 1.3-2.5 1.3-2.6-.1 0-2.5-1-2.5-3.7zM13 4.5c.7-.8 1.1-2 1-3.1-1 0-2.2.7-2.9 1.5-.6.7-1.1 1.9-1 3 1.1.1 2.2-.5 2.9-1.4z"/>
              </svg>
              <span style={{ fontSize: 15, fontWeight: 600, color: "white", lineHeight: "20px" }}>
                Download on App Store
              </span>
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

export default function Nav() {
  const [scrolled,      setScrolled]      = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [indicator,     setIndicator]     = useState({ left: 0, width: 0, opacity: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const linkRefs     = useRef<(HTMLAnchorElement | null)[]>([]);
  const clickLock    = useRef(false);
  const clickLockRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Slide indicator to the active link's span
  useEffect(() => {
    if (!activeSection) { setIndicator(p => ({ ...p, opacity: 0 })); return; }
    const idx = NAV_LINKS.findIndex(l => l.section === activeSection);
    if (idx === -1) return;
    const linkEl   = linkRefs.current[idx];
    const containerEl = containerRef.current;
    if (!linkEl || !containerEl) return;
    const spanEl = linkEl.querySelector("span");
    if (!spanEl) return;
    const spanRect      = spanEl.getBoundingClientRect();
    const containerRect = containerEl.getBoundingClientRect();
    setIndicator({ left: spanRect.left - containerRect.left, width: spanRect.width, opacity: 1 });
  }, [activeSection]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Active section tracking — lower threshold (0.2) for faster response
    const observers: IntersectionObserver[] = [];
    NAV_LINKS.forEach(({ section }) => {
      const el = document.getElementById(section);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !clickLock.current) setActiveSection(section);
        },
        { threshold: 0.2 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observers.forEach((o) => o.disconnect());
      clearTimeout(clickLockRef.current);
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, section: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;
    // Immediately highlight — no waiting for IntersectionObserver
    setActiveSection(section);
    // Lock observer for 1.1s while smooth scroll plays out
    clickLock.current = true;
    clearTimeout(clickLockRef.current);
    clickLockRef.current = setTimeout(() => { clickLock.current = false; }, 1100);
    const top = target.getBoundingClientRect().top + window.scrollY - 48;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        .nav-links-container { display: flex; }
        @media (max-width: 767px) {
          .nav-links-container { display: none !important; }
          .nav-header { padding: 0 20px !important; }
          .nav-logo-btn { width: auto !important; }
        }

        /* Reserve bold width so layout never shifts on weight change */
        .nav-label {
          display: inline-grid;
          font-size: 11px;
          letter-spacing: 0.22px;
          white-space: nowrap;
          transition: color 200ms ease;
        }
        .nav-label::before {
          content: attr(data-label);
          font-weight: 500;
          visibility: hidden;
          height: 0;
          overflow: hidden;
          pointer-events: none;
          user-select: none;
        }
        /* Active label styling */
        .nav-label-active {
          color: #1c1917 !important;
          font-weight: 500;
        }
        /* Sliding indicator bar */
        .nav-indicator {
          position: absolute;
          bottom: 8px;
          height: 2px;
          background: #1c1917;
          border-radius: 1px;
          pointer-events: none;
          transition: left 320ms cubic-bezier(0.4, 0, 0.2, 1),
                      width 320ms cubic-bezier(0.4, 0, 0.2, 1),
                      opacity 200ms ease;
        }
        /* Hover */
        .nav-link:hover .nav-label:not(.nav-label-active) {
          color: #1c1917;
        }
      `}</style>

      {/* Figma node 7300-48867 — header */}
      <div
        className="nav-header"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          width: "100%",
          height: "calc(48px + env(safe-area-inset-top, 0px))",
          paddingTop: "env(safe-area-inset-top, 0px)",
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 max(16px, calc((100% - 1200px) / 2))",
          backgroundColor: scrolled ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.8)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderBottom: scrolled ? "1px solid #E9EAEF" : "1px solid rgba(233,234,239,0.6)",
          boxShadow: scrolled ? "0px 1px 12px rgba(0,0,0,0.06)" : "none",
        }}
      >
        {/* Left — Logo + wordmark */}
        <button
          onClick={() => window.location.reload()}
          aria-label="Reload page"
          className="nav-logo-btn"
          style={{ display: "flex", gap: 8, alignItems: "center", width: 349, flexShrink: 0, background: "none", border: "none", padding: 0, cursor: "pointer" }}
        >
          <img
            alt="Flight Passport"
            src={imgNavLogo}
            style={{ width: 32, height: 32, flexShrink: 0, display: "block", borderRadius: 7, imageRendering: "-webkit-optimize-contrast" }}
          />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#1c1917", whiteSpace: "nowrap", lineHeight: 1.4 }}>
              FlightPassport
            </span>
            <div style={{ display: "flex", gap: 2, alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 8, fontWeight: 500, color: "#a8a29e", letterSpacing: "0.16px", lineHeight: "14px", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                BORN IN FINLAND
              </span>
              <img
                alt="Finnish flag"
                src={imgNavFi}
                style={{ width: 10, height: 7, flexShrink: 0, display: "block" }}
              />
            </div>
          </div>
        </button>

        {/* Right — Download button + mobile burger */}
        <div className="nav-download-btn" style={{ display: "flex", alignItems: "center", flexShrink: 0, position: "relative", zIndex: 1 }}>
          <button
            className="cta-btn no-shimmer"
            style={{
              display: "flex",
              gap: 6,
              height: 32,
              alignItems: "center",
              justifyContent: "center",
              padding: "0 16px",
              borderRadius: 999,
              background: "#1c1917",
              border: "none",
              flexShrink: 0,
            }}
          >
            <div style={{ position: "relative", width: 16, height: 16, flexShrink: 0, overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, right: "10.94%", bottom: "4.17%", left: "8.33%" }}>
                <img
                  alt=""
                  style={{ position: "absolute", display: "block", maxWidth: "none", width: "100%", height: "100%" }}
                  src={imgNavApple}
                />
              </div>
            </div>
            <span style={{ fontSize: 13, fontWeight: 500, color: "white", whiteSpace: "nowrap", lineHeight: "18px" }}>
              Download
            </span>
          </button>
        </div>

        {/* Mobile burger + overlay */}
        <MobileNav links={NAV_LINKS} />

        {/* Center — Nav links (absolute, centered) */}
        <div
          ref={containerRef}
          className="nav-links-container"
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translateX(-50%) translateY(-50%)",
            gap: 24,
            height: 40,
            alignItems: "center",
          }}
        >
          {NAV_LINKS.map(({ label, href, section }, i) => {
            const isActive = activeSection === section;
            return (
              <a
                key={section}
                ref={el => { linkRefs.current[i] = el; }}
                href={href}
                className="nav-link"
                onClick={(e) => handleClick(e, href, section)}
                style={{
                  display: "flex",
                  height: "100%",
                  alignItems: "center",
                  padding: "0 12px",
                  textDecoration: "none",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                <span
                  className={isActive ? "nav-label nav-label-active" : "nav-label"}
                  data-label={label}
                  style={{
                    position: "relative",
                    color: isActive ? "#1c1917" : "#6c6760",
                    fontWeight: isActive ? 500 : 300,
                  }}
                >
                  {label}
                </span>
              </a>
            );
          })}
          {/* Sliding active indicator — slides smoothly between links */}
          <div
            className="nav-indicator"
            style={{ left: indicator.left, width: indicator.width, opacity: indicator.opacity }}
          />
        </div>
      </div>
    </>
  );
}
