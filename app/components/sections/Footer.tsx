'use client';

import React from 'react';

// ── Footer asset URLs (node 7300-49765) ──────────────────────────────────────
const imgFooterLogo    = "/Favicon.png";
const imgFiFooter      = "/Images/asset-63c22fa0-1773-4419-952c-5ed5bb51d114.svg";

const FOOTER_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Support",  href: "#faq" },
  { label: "Privacy",  href: "#" },
  { label: "Terms",    href: "#" },
];

export default function Footer() {
  return (
    <>
      <style>{`
        .footer-root {
          background: linear-gradient(to bottom, #1c1917, #3f3731);
          width: 100%;
          padding: 12px max(24px, calc((100% - 1200px) / 2)) 16px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        .footer-links-row {
          width: 100%;
          display: flex;
          align-items: center;
          position: relative;
        }
        .footer-logo-block {
          display: flex;
          gap: 8px;
          align-items: center;
          flex-shrink: 0;
          position: absolute;
          left: 0;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
        }
        .footer-nav {
          flex: 1;
          display: flex;
          gap: 24px;
          align-items: center;
          justify-content: center;
        }
        .footer-link {
          display: flex;
          align-items: center;
          padding: 8px 12px;
          text-decoration: none;
          font-family: Inter, sans-serif;
          font-weight: 400;
          font-size: 12px;
          color: #a8a29e;
          line-height: 1.3;
          white-space: nowrap;
          transition: color 150ms ease;
        }
        .footer-link:hover { color: white; }
        .footer-divider {
          width: 100%;
          height: 1px;
          background: rgba(168, 162, 158, 0.15);
          flex-shrink: 0;
        }
        .footer-copyright {
          font-family: Inter, sans-serif;
          font-weight: 400;
          font-size: 12px;
          color: #6c6760;
          line-height: 1.3;
          white-space: nowrap;
        }
        @media (max-width: 767px) {
          .footer-root {
            padding: 24px 24px 20px;
            gap: 16px;
          }
          .footer-links-row {
            flex-direction: column;
            gap: 16px;
          }
          .footer-logo-block { position: static; }
          .footer-nav { flex-wrap: wrap; justify-content: center; gap: 0; }
          .footer-copyright { text-align: center; }
        }
      `}</style>
      <footer className="footer-root">
        {/* Row 1 — logo (absolute left) + centered nav links */}
        <div className="footer-links-row">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="footer-logo-block">
            <img src={imgFooterLogo} alt="Flight Passport" style={{ width: 32, height: 32, flexShrink: 0, display: "block", borderRadius: 7, imageRendering: "-webkit-optimize-contrast" }} />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <span style={{ fontSize: 15, fontWeight: 600, color: "white", whiteSpace: "nowrap", lineHeight: 1.4 }}>
                FlightPassport
              </span>
              <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
                <span style={{ fontSize: 8, fontWeight: 500, color: "#a8a29e", letterSpacing: "0.16px", lineHeight: "14px", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                  BORN IN FINLAND
                </span>
                <img alt="Finnish flag" src={imgFiFooter} style={{ width: 14, height: 10, flexShrink: 0, display: "block" }} />
              </div>
            </div>
          </button>
          <nav className="footer-nav">
            {FOOTER_LINKS.map(({ label, href }) => (
              <a key={label} href={href} className="footer-link">{label}</a>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="footer-divider" />

        {/* Row 2 — copyright */}
        <span className="footer-copyright">
          &copy; 2026 Flight Passport. All rights reserved.
        </span>
      </footer>
    </>
  );
}
