'use client';

import React, { useState, useEffect, useRef } from 'react';
import { imgCloud1, imgCloud2, imgCloud4 } from '../../lib/constants/assets';

// ── Figma Hero asset URLs (node 7300:48506) ───────────────────────────────────
const imgImage41 = "/Images/Connection%20Card_New.png";
const imgImage40 = "/Images/Journey%20Card_New.png";
const imgPhoneApp        = "/Images/hero-phone-app.png";
const imgPhonePlane      = "/Images/hero-plane.svg";
const imgImage = "/Images/asset-5a211c9a-dfde-4974-a28f-85d89adba13e.png";
const imgImage1 = "/Images/asset-5c9f351a-c7f7-4758-b5d8-04b195b27a49.png";
const imgImage2 = "/Images/asset-6a39772a-5b02-4ad3-9487-dee07348776a.png";
const imgAirlineEmblem2 = "/Images/asset-39c5e315-e991-46d5-81ed-b705385a5dba.png";
const imgImage3 = "/Images/asset-b61964ad-de04-4f23-be0f-28c28b94b143.png";
const imgImage4 = "/Images/asset-0505c840-7628-4810-a407-1ed132e03847.png";
const imgImage5 = "/Images/asset-041eba01-d8b1-492d-a149-b6e32186787b.png";
const imgImage6 = "/Images/asset-948cf4c5-bc29-492f-af61-cbc365dcbaf3.png";
const imgImage7 = "/Images/asset-58873d07-2b7a-4b8d-9c6d-1cf2b077deaa.png";
const imgImage8 = "/Images/asset-722eb3b9-84f7-42eb-9850-78aeee66d07a.png";
const imgAirlineEmblem6 = "/Images/asset-e5922254-eb94-445a-811f-58a54ed81ed0.png";
const imgImage9 = "/Images/asset-5e3b8204-05fa-48b1-82da-2ebe76c7281b.png";
const imgImage10 = "/Images/asset-1cfe1b40-1f2d-4a7b-8d08-b437e82d841d.png";
const imgImage11 = "/Images/asset-1d4dcf12-d22f-4f3b-9eec-b78d3087fc90.png";
const imgImage12 = "/Images/asset-dbff2d50-0ada-415d-8ed5-da8d91927ecb.png";
const imgAirlineEmblem9 = "/Images/asset-a3854cc2-6ffc-42e2-b7da-5a366ad41577.png";
const imgAirlineEmblem11 = "/Images/asset-613b939f-e093-42e8-8370-f36da05332bc.png";
const imgImage13 = "/Images/asset-0f4651aa-3968-4372-ab10-db0d79a7351b.png";
const imgAirlineEmblem14 = "/Images/asset-5f7a719d-09de-4668-bef2-904c7629111d.png";
const imgAirlineEmblem15 = "/Images/asset-aada227f-2a11-4cc4-b8b8-433dcdc91f64.png";
const imgAirlineEmblem17 = "/Images/asset-03e2b3f7-76b4-4131-a2e4-1caf97d1d443.png";
const imgAirlineEmblem19 = "/Images/asset-c0433751-6c26-498e-b2fe-ce6b65e6aed1.png";
const imgAirlineEmblem20 = "/Images/asset-752442d2-c03a-455a-9093-9f94fee6976c.png";
const imgImage14 = "/Images/asset-c0f980be-f61d-4525-aeb9-2424ffaf590d.png";
const imgEllipse1889 = "/Images/asset-8c24ba7e-4953-49f2-b8fc-0476d0112718.svg";
const imgIconColor = "/Images/asset-3f8a650c-7e01-4f57-abaa-bfdfd95080c3.svg";
const imgLine207 = "/Images/asset-91feb9b5-f026-48fd-a8cb-3f626d150d20.svg";
const imgEllipse2 = "/Images/asset-3f174842-748e-4c3f-a393-f48d77268373.svg";
const imgEllipse3 = "/Images/asset-1d1e3d8e-e681-43b2-9f7b-66e38726c99d.svg";
const imgLine210 = "/Images/asset-50ee9d68-1c1c-4c7f-bbeb-5690df663bca.svg";
const imgLine208 = "/Images/asset-76b390a9-6f72-47f1-942c-65d5d2bc40c0.svg";
const imgEllipse4 = "/Images/asset-3927421c-302d-420a-9991-f127d5dc876a.svg";
const imgLine211 = "/Images/asset-c0944040-767d-4045-afea-6fac56c83254.svg";
const imgEllipse5 = "/Images/asset-3ace5494-43dc-49b3-a4e9-cabc68478069.svg";
const imgEllipse6 = "/Images/asset-59e159be-bb7c-4d13-b5a4-904fd8be8263.svg";
const imgPaths = "/Images/asset-9c57a498-9808-412d-8e0a-fb444b859961.svg";
const imgAirlineEmblem = "/Images/asset-5e5f819d-47a6-42f4-94f9-c04e05c1e00a.svg";
const imgPaths1 = "/Images/asset-82fc4045-2d03-4f69-9baa-8ff20ed29863.svg";
const imgAirlineEmblem1 = "/Images/asset-c937568d-2fb8-4a42-8419-545dce147f11.svg";
const imgAirlineEmblem3 = "/Images/asset-5eeee18f-31d3-4908-be46-adaa4c12b35b.svg";
const imgPaths2 = "/Images/asset-e3a8c180-e982-4c54-88e5-7dd3bb37e53e.svg";
const imgAirlineEmblem4 = "/Images/asset-361a4dc1-1411-45da-a1a4-76a385099172.svg";
const imgPaths3 = "/Images/asset-c2e5924e-a986-4540-be1e-aed848b6e210.svg";
const imgPaths4 = "/Images/asset-3f816001-5301-4a5c-8b9d-0349583efec2.svg";
const imgPaths5 = "/Images/asset-1c1e56f8-f206-4017-bcb0-caa8ac4331b9.svg";
const imgAirlineEmblem5 = "/Images/asset-cfa6670d-a6f9-4d59-b320-252db190b9d5.svg";
const imgPaths6 = "/Images/asset-11ca07d9-be69-4d54-86a8-27fe266e6ae8.svg";
const imgPaths7 = "/Images/asset-259a8f42-f0f2-4bed-a727-cde3e7857a27.svg";
const imgAirlineEmblem7 = "/Images/asset-fed55540-cfab-4afe-bb03-5abbfe99cc1b.svg";
const imgPaths8 = "/Images/asset-3e0d7597-bb3a-4e17-aadb-55b36faf7d16.svg";
const imgAirlineEmblem8 = "/Images/asset-0fcb2424-b66b-4ae0-a119-5d27d99ea32f.svg";
const imgAirlineEmblem10 = "/Images/asset-7402dd1d-a89a-4b50-9c0e-3e94d83b1882.svg";
const imgAirlineEmblem12 = "/Images/asset-201dc588-aae6-400a-8a17-493b924baaa5.svg";
const imgAirlineEmblem13 = "/Images/asset-d9ff3803-7414-4773-a45f-573eabca19e1.svg";
const imgVector = "/Images/asset-91d300d5-7339-4496-a466-990acf04f838.svg";
const imgAirlineEmblem16 = "/Images/asset-c6e1d5a7-f548-4aa0-b25c-7602829024bc.svg";
const imgAirlineEmblem18 = "/Images/asset-8cd63d71-2cca-470f-beef-65b2e67bcdb7.svg";
const imgPaths9 = "/Images/asset-ed458cbf-490b-474a-acfb-95bf5d6e3a4e.svg";
const imgPaths10 = "/Images/asset-b6674836-1ac5-4c76-b33c-cb8de474dce8.svg";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [phoneVisible, setPhoneVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);

  // Smooth plane movement via rAF — direct DOM, no React re-render per frame
  const CYCLE_MS   = 140_000; // full lap in 140s
  const TOTAL_MINS = 565;     // 9h 25m total flight
  const TRAVEL_PX  = 280;     // plane travels full track 0 → 280px
  const startRef   = useRef<number | null>(null);
  const planeElRef = useRef<HTMLDivElement>(null);
  const fillElRef  = useRef<HTMLDivElement>(null);
  const rafRef     = useRef<number | null>(null);

  useEffect(() => {
    const FADE = 0.05; // fade zone = 5% of cycle at start and end
    function tick(now: number) {
      if (startRef.current === null) startRef.current = now;
      const progress = ((now - startRef.current) % CYCLE_MS) / CYCLE_MS;
      const x = progress * TRAVEL_PX;
      // Fade in at start, fade out at end — smooth loop, no visible jump
      let opacity = 1;
      if (progress < FADE) {
        opacity = progress / FADE;
      } else if (progress > 1 - FADE) {
        opacity = (1 - progress) / FADE;
      }
      if (planeElRef.current) {
        planeElRef.current.style.transform = `translateX(${x}px)`;
        planeElRef.current.style.opacity = String(opacity);
      }
      if (fillElRef.current) {
        fillElRef.current.style.width   = `${x + 14}px`;
        fillElRef.current.style.opacity = String(opacity);
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  // Counter — synced every 1s to stay in step with the plane position
  const [landingMins, setLandingMins] = useState(TOTAL_MINS);
  useEffect(() => {
    const id = setInterval(() => {
      const progress = startRef.current !== null
        ? ((performance.now() - startRef.current) % CYCLE_MS) / CYCLE_MS
        : 0;
      setLandingMins(Math.round((1 - progress) * TOTAL_MINS));
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const formatLanding = (m: number) => {
    const h = Math.floor(m / 60);
    const rem = m % 60;
    if (h === 0) return `${rem}m`;
    if (rem === 0) return `${h}h`;
    return `${h}h ${rem}m`;
  };

  // Badge refs — line elements (clip-path animation) and pill elements (badge-pop animation)
  const lineConnRef     = useRef<HTMLDivElement>(null);
  const lineGateRef     = useRef<HTMLDivElement>(null);
  const lineAircraftRef = useRef<HTMLDivElement>(null);
  const lineRealRef     = useRef<HTMLDivElement>(null);
  const lineHistRef     = useRef<HTMLDivElement>(null);
  const lineDelayRef    = useRef<HTMLDivElement>(null);
  const pillConnRef     = useRef<HTMLDivElement>(null);
  const pillGateRef     = useRef<HTMLDivElement>(null);
  const pillAircraftRef = useRef<HTMLDivElement>(null);
  const pillRealRef     = useRef<HTMLDivElement>(null);
  const pillHistRef     = useRef<HTMLDivElement>(null);
  const pillDelayRef    = useRef<HTMLDivElement>(null);

  // Reveal text on mount; phone + cards reveal on scroll
  useEffect(() => {
    const t1 = setTimeout(() => setTextVisible(true), 60);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setPhoneVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  // Blur + slide + fade helper — applied per text element with staggered delay
  const textReveal = (delay: number): React.CSSProperties => ({
    opacity: textVisible ? 1 : 0,
    transform: textVisible ? 'translateY(0px)' : 'translateY(22px)',
    filter: textVisible ? 'blur(0px)' : 'blur(10px)',
    transition: 'opacity 0.75s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.75s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.75s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    transitionDelay: `${delay}ms`,
  });


  // Badge animations — scroll-triggered, fires once when badge area scrolls into view
  useEffect(() => {
    const badges: [React.RefObject<HTMLDivElement | null>, React.RefObject<HTMLDivElement | null>, number, number, boolean][] = [
      [lineRealRef,     pillRealRef,     0,    300,  true],
      [lineAircraftRef, pillAircraftRef, 200,  500,  false],
      [lineConnRef,     pillConnRef,     400,  700,  false],
      [lineHistRef,     pillHistRef,     600,  900,  false],
      [lineDelayRef,    pillDelayRef,    800,  1100, true],
      [lineGateRef,     pillGateRef,     1000, 1300, true],
    ];

    function runBadges() {
      badges.forEach(([lineRef, pillRef, lineDelay, pillDelay, isLeft]) => {
        setTimeout(() => {
          if (lineRef.current) {
            lineRef.current.style.transformOrigin = isLeft ? 'right center' : 'left center';
            lineRef.current.style.animation = `${isLeft ? 'line-reveal-rtl' : 'line-reveal'} 0.45s ease-out forwards`;
          }
        }, lineDelay);
        setTimeout(() => {
          if (pillRef.current) pillRef.current.style.animation = 'badge-pop 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
        }, pillDelay);
      });
    }

    // Check if the MIDDLE badge row is actually visible in the viewport
    function isBadgesInView() {
      if (!pillConnRef.current) return false;
      const rect = pillConnRef.current.getBoundingClientRect();
      return rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
    }

    let triggered = false;
    function onScroll() {
      if (triggered) return;
      if (!isBadgesInView()) return;
      triggered = true;
      window.removeEventListener('scroll', onScroll);
      runBadges();
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="hero-section relative w-full bg-[#f9f8f6] [overflow-x:clip]" ref={heroRef}>
      {/* SKY GRADIENT — exactly 100vh, phone overlaps from below */}
      <div
        className="hero-sky-section relative w-full overflow-hidden"
        style={{ height: '100vh', background: 'linear-gradient(180deg, #0A6DB8 0%, #0F7EC6 30%, #1589D8 60%, #1E9AE8 82%, #4BBEF5 100%)' }}
      >
        {/* Hero-specific keyframes (cloudFlight is in globals.css) */}
        <style>{`
          @keyframes cardFloatL {
            0%, 100% { transform: translateY(0px); }
            50%       { transform: translateY(-10px); }
          }
          @keyframes cardFloatR {
            0%, 100% { transform: translateY(0px); }
            50%       { transform: translateY(-10px); }
          }
@keyframes countTick {
            0%   { opacity: 1; transform: translateY(0px); }
            30%  { opacity: 0; transform: translateY(-7px); }
            60%  { opacity: 0; transform: translateY(7px); }
            100% { opacity: 1; transform: translateY(0px); }
          }
          .count-tick { animation: countTick 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
          @keyframes line-reveal {
            from { transform: scaleX(0); }
            to   { transform: scaleX(1); }
          }
          @keyframes line-reveal-rtl {
            from { transform: scaleX(0); }
            to   { transform: scaleX(1); }
          }
          @keyframes badge-pop {
            0%   { opacity: 0; transform: scale(0.78); filter: blur(5px); }
            65%  { opacity: 1; transform: scale(1.05); filter: blur(0px); }
            100% { opacity: 1; transform: scale(1);    filter: blur(0px); }
          }

          /* ── Plane pulse ring ── */
          @keyframes planeRing {
            0%   { transform: translate(-50%, -50%) scale(1);   opacity: 0.55; }
            100% { transform: translate(-50%, -50%) scale(2.6); opacity: 0; }
          }
          .plane-ring {
            position: absolute;
            width: 18px; height: 18px;
            border-radius: 50%;
            background: rgba(255,255,255,0.35);
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            animation: planeRing 2.2s ease-out infinite;
            pointer-events: none;
          }

          /* ── Track shimmer ── */
          @keyframes trackShimmer {
            0%   { left: -60%; opacity: 0; }
            15%  { opacity: 1; }
            85%  { opacity: 1; }
            100% { left: 110%; opacity: 0; }
          }
          .track-shimmer {
            position: absolute;
            top: 0; height: 100%;
            width: 45%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent);
            animation: trackShimmer 3.5s ease-in-out infinite;
            pointer-events: none;
          }

          /* ── Hero Responsive ── */
          .sky-fade { height: 160px; }
          @media (max-width: 1023px) {
            .hero-badge { display: none !important; }
          }
          @media (max-width: 1100px) {
            .hero-card { display: none !important; }
            .hero-phone-row { left: calc(50vw - 182px) !important; width: 364px !important; }
            .hero-content-container {
              width: 100% !important;
              height: auto !important;
              min-height: 350px !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
            }
            /* Tablet phone: scale to ~300px (300/364 = 0.824) */
            .hero-phone-mockup {
              transform: scale(0.824) !important;
              transform-origin: top center !important;
            }
            .airlines-strip-wrapper {
              padding-top: 0 !important;
            }
            /* Ensure sky is tall enough and fade is smooth at tablet */
            .hero-sky-section {
              min-height: 700px !important;
            }
            .sky-fade { height: 35% !important; }
          }
          /* ── 1024–1100px: cards + badges pinned to phone ── */
          @media (min-width: 1024px) and (max-width: 1100px) {
            .hero-card { display: flex !important; }
            /* gap: 0 + negative margin to compensate for scale(0.824) leaving 32px of dead space */
            .hero-phone-row { left: calc(50vw - 508px) !important; width: 1016px !important; gap: 0px !important; }
            .hero-card:first-child { margin-right: -24px !important; }
            .hero-card:last-child  { margin-left:  -24px !important; }
            .airlines-strip-wrapper { margin-top: -64px !important; }
            .badge-conn, .badge-aircraft, .badge-hist {
              left: calc(50vw + 146px) !important;
            }
            .badge-gate, .badge-real, .badge-delay {
              left: auto !important;
              right: calc(50vw + 146px) !important;
            }
            .badge-aircraft, .badge-real { top: -10px !important; }
            .badge-conn, .badge-gate     { top: 84px !important; }
            .badge-hist, .badge-delay    { top: 180px !important; }
          }
          @media (max-width: 767px) {
            /* Sky fills the viewport on mobile */
            .hero-sky-section {
              height: 100svh !important;
              min-height: 620px !important;
            }
            /* Push content down from header */
            .hero-sky-content {
              padding-top: 80px !important;
              padding-bottom: 420px !important;
            }
            /* Title */
            .hero-title span { font-size: 36px !important; line-height: 1.12 !important; letter-spacing: -0.72px !important; }
            .hero-description-bg { display: none !important; }
            /* Subtitle wraps naturally */
            .hero-subtitle {
              white-space: normal !important;
              max-width: 300px !important;
              margin: 0 auto !important;
            }
            /* Buttons: stacked, max-width constrained */
            .hero-buttons-row {
              flex-direction: column !important;
              width: 100% !important;
              max-width: 360px !important;
              padding: 0 20px !important;
              box-sizing: border-box !important;
              margin-left: auto !important;
              margin-right: auto !important;
            }
            .hero-buttons-row > * { width: 100% !important; justify-content: center !important; }
            /* Phone: in-flow, centered.
               Use svh (not vh) so positioning matches the sky section height on Safari,
               which shrinks the viewport when browser chrome (address/toolbar) is visible. */
            .hero-main-container {
              padding-top: 24px !important;
              margin-top: calc(322px - 45.6svh) !important;
            }
            .hero-content-container {
              width: 100% !important;
              height: auto !important;
              min-height: unset !important;
              display: flex !important;
              justify-content: center !important;
              align-items: flex-start !important;
            }
            /* Airlines text wraps */
            .hero-airlines-text { white-space: normal !important; padding: 0 24px !important; }
            /* Mobile phone: scale to ~280px (280/364 = 0.769) */
            .hero-phone-mockup {
              transform: scale(0.769) !important;
              transform-origin: top center !important;
            }
            /* Airlines strip — push down to clear scaled phone
               Phone visual bottom = -346 + 764*0.769 ≈ 242px, add gap */
            .airlines-strip-wrapper {
              padding-top: 210px !important;
            }
          }
          @media (max-width: 390px) {
            .hero-title span { font-size: 32px !important; letter-spacing: -0.5px !important; }
          }
          /* Mobile-only clouds — hidden on desktop */
          .mobile-cloud { display: none; }
          @media (max-width: 767px) {
            .mobile-cloud { display: block; }
          }
        `}</style>
        {/* CLOUDS — all left-0, horizontal position set via negative animation-delay */}

        {/* ── Upper sky: distant, faded, slow — z-10 so they fly over the text layer ── */}
        <div className="absolute z-[10] left-0 top-[-50px] w-[280px] h-[140px] opacity-[0.13] pointer-events-none" style={{ animation: "cloudFlight 250s linear -90s infinite", willChange: "translate" }}>
          <img alt="" className="block max-w-none w-full h-full" src={imgCloud1} />
        </div>
        <div className="absolute z-[10] left-0 top-[20px] w-[340px] h-[150px] opacity-[0.15] pointer-events-none" style={{ animation: "cloudFlight 270s linear -145s infinite", willChange: "translate" }}>
          <img alt="" className="block max-w-none w-full h-full" src={imgCloud2} />
        </div>
        <div className="absolute z-[10] left-0 top-[70px] w-[220px] h-[110px] opacity-[0.12] pointer-events-none" style={{ animation: "cloudFlight 260s linear -82s infinite", willChange: "translate" }}>
          <img alt="" className="block max-w-none w-full h-full" src={imgCloud4} />
        </div>
        <div className="absolute left-0 top-[110px] w-[190px] h-[95px] opacity-[0.14] pointer-events-none" style={{ animation: "cloudFlight 240s linear -200s infinite", willChange: "translate" }}>
          <img alt="" className="block max-w-none w-full h-full" src={imgCloud1} />
        </div>

        {/* ── Mid sky: medium depth, medium speed ── */}
        <div className="absolute left-0 top-[180px] w-[393px] h-[252px] rotate-[173.23deg] opacity-[0.30] pointer-events-none" style={{ animation: "cloudFlight 185s linear -60s infinite", willChange: "translate" }}>
          <img alt="" className="block max-w-none w-full h-full" src={imgCloud4} />
        </div>
        <div className="absolute left-0 top-[250px] w-[387px] h-[310px] opacity-[0.36] pointer-events-none" style={{ animation: "cloudFlight 175s linear -88s infinite", willChange: "translate" }}>
          <img alt="" className="block max-w-none w-full h-full" src={imgCloud1} />
        </div>
        <div className="absolute left-0 top-[340px] w-[399px] h-[224px] opacity-[0.28] pointer-events-none" style={{ animation: "cloudFlight 190s linear -52s infinite", willChange: "translate" }}>
          <img alt="" className="block max-w-none w-full h-full" src={imgCloud2} />
        </div>

        {/* ── Lower sky: foreground, denser, faster ── */}
        <div className="absolute left-0 top-[450px] w-[445px] h-[224px] opacity-[0.50] pointer-events-none" style={{ animation: "cloudFlight 120s linear -35s infinite", willChange: "translate" }}>
          <img alt="" className="block max-w-none w-full h-full" src={imgCloud4} />
        </div>
        <div className="absolute left-0 top-[490px] w-[257px] h-[183px] opacity-[0.22] pointer-events-none" style={{ animation: "cloudFlight 125s linear -50s infinite", willChange: "translate" }}>
          <img alt="" className="block max-w-none w-full h-full" src={imgCloud1} />
        </div>
        <div className="absolute left-0 top-[520px] w-[478px] h-[433px] rotate-[-173.07deg] opacity-[0.38] pointer-events-none" style={{ animation: "cloudFlight 135s linear -55s infinite", willChange: "translate" }}>
          <img alt="" className="block max-w-none w-full h-full" src={imgCloud1} />
        </div>
        <div className="absolute left-0 top-[600px] w-[379px] h-[248px] -scale-y-100 rotate-180 opacity-[0.20] pointer-events-none" style={{ animation: "cloudFlight 128s linear -42s infinite", willChange: "translate" }}>
          <img alt="" className="block max-w-none w-full h-full" src={imgCloud1} />
        </div>
        <div className="absolute left-0 top-[645px] w-[434px] h-[182px] -scale-y-100 rotate-180 opacity-[0.55] pointer-events-none" style={{ animation: "cloudFlight 115s linear -68s infinite", willChange: "translate" }}>
          <img alt="" className="block max-w-none w-full h-full" src={imgCloud2} />
        </div>
        <div className="absolute left-0 top-[580px] w-[234px] h-[188px] opacity-[0.38] pointer-events-none" style={{ animation: "cloudFlight 118s linear -20s infinite", willChange: "translate" }}>
          <img alt="" className="block max-w-none w-full h-full" src={imgCloud1} />
        </div>


        {/* ── Mobile-only clouds — pre-positioned in viewport at load ── */}
        {/* top-[80px]: target x≈100px → delay=(1700-100)*160/2600≈98s */}
        <div className="mobile-cloud absolute left-0 top-[80px] w-[300px] h-[150px] opacity-[0.20] pointer-events-none" style={{ animation: "cloudFlight 160s linear -99s infinite", willChange: "translate" }}>
          <img alt="" className="block max-w-none w-full h-full" src={imgCloud4} />
        </div>
        {/* top-[280px]: target x≈180px → delay=(1700-180)*130/2600≈76s */}
        <div className="mobile-cloud absolute left-0 top-[280px] w-[340px] h-[190px] opacity-[0.32] pointer-events-none" style={{ animation: "cloudFlight 130s linear -76s infinite", willChange: "translate" }}>
          <img alt="" className="block max-w-none w-full h-full" src={imgCloud2} />
        </div>
        {/* top-[480px]: target x≈120px → delay=(1700-120)*100/2600≈61s */}
        <div className="mobile-cloud absolute left-0 top-[480px] w-[280px] h-[140px] opacity-[0.45] pointer-events-none" style={{ animation: "cloudFlight 100s linear -61s infinite", willChange: "translate" }}>
          <img alt="" className="block max-w-none w-full h-full" src={imgCloud1} />
        </div>

        {/* Sky-to-white fade — eliminates sharp horizon where sky meets page background */}
        <div
          className="sky-fade absolute bottom-0 left-0 right-0 pointer-events-none z-[6]"
          style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(249,248,246,0.08) 25%, rgba(249,248,246,0.25) 45%, rgba(249,248,246,0.55) 65%, rgba(249,248,246,0.82) 82%, #f9f8f6 100%)' }}
        />

        {/* CONTENT — centered in sky — z-5 keeps text above mid/lower clouds but below upper clouds (z-10) */}
        <div className="hero-sky-content relative z-[7] mx-auto max-w-[1200px] px-5 flex flex-col items-center justify-center h-full pb-[348px]">
          <div className="flex flex-col gap-[40px] items-center">
            <div className="flex flex-col gap-[16px] items-center">
              {/* Title + subtitle */}
              <div className="flex flex-col gap-[16px] items-center relative" data-name="Description Container" data-node-id="7300:48515">
                <div className="hero-description-bg absolute left-1/2 -translate-x-1/2 size-[625px] top-[-142px]">
                  <div className="absolute inset-[-22.4%]">
                    <img alt="" className="block max-w-none size-full" src={imgEllipse1889} />
                  </div>
                </div>
                <p className="hero-title font-bold relative text-[0px] text-white text-center tracking-[-1.68px] max-w-[610px] w-full" style={{ textShadow: '-4px 2px 12px rgba(16,32,64,0.08)', ...textReveal(130) }} data-node-id="7300:48517">
                  <span className="leading-[1.1] text-[56px]">Know your flight </span>
                  <span className="italic font-normal leading-[1.1] text-[#a7f3d0] text-[56px]">before</span>
                  <span className="leading-[1.1] text-[56px]"> the airport does.</span>
                </p>
                <p className="hero-subtitle font-normal leading-[1.4] relative text-[17px] text-white text-center" style={textReveal(240)} data-node-id="7300:48518">
                  Real-time tracking, predictive delay signals, and a personal travel history
                </p>
              </div>
            </div>
            {/* Buttons */}
            <div className="hero-buttons-row flex gap-[16px] items-center justify-center" data-name="Button Container" data-node-id="7300:48519" style={textReveal(360)}>
              <div className="cta-btn relative flex gap-[8px] h-[44px] items-center justify-center px-[20px] rounded-[999px] cursor-pointer" data-name="Primary Button" data-node-id="7300:48520">
                <div aria-hidden="true" className="absolute bg-[#1c1917] inset-0 pointer-events-none rounded-[999px]" />
                <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Icons / Apple" data-node-id="I7300:48520;1870:924">
                  <div className="absolute inset-[0_10.94%_4.17%_8.33%]">
                    <img alt="" className="absolute block max-w-none size-full" src={imgIconColor} />
                  </div>
                </div>
                <span className="font-semibold relative text-[15px] text-white text-center whitespace-nowrap leading-[20px]">Download</span>
                <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.15)]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTAINER — proportional: phone starts at 54.4% of sky height (matches Figma ratio 384/706) */}
      <div className="hero-main-container relative w-full z-[10]" style={{ marginTop: 'calc(322px - 45.6vh)' }} data-name="Main container">
        {/* Badge pills — absolutely positioned inside content container */}
        <div className="max-w-[1200px] mx-auto px-5">
        <div className="hero-content-container relative w-[1046px] h-[434px] mx-auto" data-name="Content container" data-node-id="7300:48532">
          {/* Connection awareness pill */}
          <div className="hero-badge badge-conn absolute flex gap-[14px] items-center left-[725px] top-[176px]" data-node-id="7300:48537">
            <div ref={lineConnRef} className="h-0 relative shrink-0 w-[74px]" style={{ transform: 'scaleX(0)', transformOrigin: 'left center' }}>
              <div className="absolute inset-[-1px_0_0_0]">
                <img alt="" className="block max-w-none size-full" src={imgLine207} />
              </div>
            </div>
            <div ref={pillConnRef} className="bg-gradient-to-b border border-[#e7e5e4] border-solid flex from-[38.542%] from-white gap-[12px] h-[48px] items-center justify-center px-[16px] py-[12px] relative rounded-[24px] shrink-0 to-[#f5f5f4] w-[239px]" data-name="Connection awareness" data-node-id="7300:48539" style={{ opacity: 0 }}>
              <div className="relative shrink-0 size-[8px]">
                <img alt="" className="absolute block max-w-none size-full" src={imgEllipse2} />
              </div>
              <span className="font-medium text-[15px] text-[#1c1917] text-center whitespace-nowrap leading-[1.4]">Connection awareness</span>
            </div>
          </div>
          {/* Gate & terminal changes pill */}
          <div className="hero-badge badge-gate absolute flex gap-[8px] items-center left-[-2px] top-[176px]" data-node-id="7300:48542">
            <div ref={pillGateRef} className="bg-gradient-to-b border border-[#e7e5e4] border-solid flex from-[38.542%] from-white gap-[12px] h-[48px] items-center justify-center px-[16px] py-[12px] relative rounded-[24px] shrink-0 to-[#f5f5f4] w-[251px]" data-name="Gate & terminal changes" data-node-id="7300:48543" style={{ opacity: 0 }}>
              <div className="relative shrink-0 size-[8px]">
                <img alt="" className="absolute block max-w-none size-full" src={imgEllipse3} />
              </div>
              <span className="font-medium text-[15px] text-[#1c1917] text-center whitespace-nowrap leading-[1.4]">{`Gate & terminal changes`}</span>
            </div>
            <div className="flex items-center justify-center relative shrink-0">
              <div className="flex-none rotate-180">
                <div ref={lineGateRef} className="h-0 relative w-[80px]" style={{ transform: 'scaleX(0)', transformOrigin: 'left center' }}>
                  <div className="absolute inset-[-1px_0_0_0]">
                    <img alt="" className="block max-w-none size-full" src={imgLine210} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Aircraft insights pill */}
          <div className="hero-badge badge-aircraft absolute flex gap-[8px] items-center left-[725px] top-[56px]" data-node-id="7300:48547">
            <div ref={lineAircraftRef} className="h-0 relative shrink-0 w-[40px]" style={{ transform: 'scaleX(0)', transformOrigin: 'left center' }}>
              <div className="absolute inset-[-1px_0_0_0]">
                <img alt="" className="block max-w-none size-full" src={imgLine208} />
              </div>
            </div>
            <div ref={pillAircraftRef} className="bg-gradient-to-b border border-[#e7e5e4] border-solid flex from-[38.542%] from-white gap-[12px] h-[48px] items-center justify-center px-[16px] py-[12px] relative rounded-[24px] shrink-0 to-[#f5f5f4] w-[182px]" data-name="Aircraft insights" data-node-id="7300:48549" style={{ opacity: 0 }}>
              <div className="relative shrink-0 size-[8px]">
                <img alt="" className="absolute block max-w-none size-full" src={imgEllipse4} />
              </div>
              <span className="font-medium text-[15px] text-[#1c1917] text-center whitespace-nowrap leading-[1.4]">Aircraft insights</span>
            </div>
          </div>
          {/* Real-time flight tracking pill */}
          <div className="hero-badge badge-real absolute flex gap-[8px] items-center left-[41px] top-[56px]" data-node-id="7300:48552">
            <div ref={pillRealRef} className="bg-gradient-to-b border border-[#e7e5e4] border-solid flex from-[38.542%] from-white gap-[12px] h-[48px] items-center justify-center px-[16px] py-[12px] relative rounded-[24px] shrink-0 to-[#f5f5f4] w-[248px]" data-name="Real-time flight tracking" data-node-id="7300:48553" style={{ opacity: 0 }}>
              <div className="relative shrink-0 size-[8px]">
                <img alt="" className="absolute block max-w-none size-full" src={imgEllipse2} />
              </div>
              <span className="font-medium text-[15px] text-[#1c1917] text-center whitespace-nowrap leading-[1.4]">Real-time flight tracking</span>
            </div>
            <div className="flex items-center justify-center relative shrink-0">
              <div className="flex-none rotate-180">
                <div ref={lineRealRef} className="h-0 relative w-[40px]" style={{ transform: 'scaleX(0)', transformOrigin: 'left center' }}>
                  <div className="absolute inset-[-1px_0_0_0]">
                    <img alt="" className="block max-w-none size-full" src={imgLine211} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Personal flight history pill */}
          <div className="hero-badge badge-hist absolute flex gap-[8px] items-center left-[725px] top-[296px]" data-node-id="7300:48557">
            <div ref={lineHistRef} className="h-0 relative shrink-0 w-[40px]" style={{ transform: 'scaleX(0)', transformOrigin: 'left center' }}>
              <div className="absolute inset-[-1px_0_0_0]">
                <img alt="" className="block max-w-none size-full" src={imgLine208} />
              </div>
            </div>
            <div ref={pillHistRef} className="bg-gradient-to-b border border-[#e7e5e4] border-solid flex from-[38.542%] from-white gap-[12px] h-[48px] items-center justify-center px-[16px] py-[12px] relative rounded-[24px] shrink-0 to-[#f5f5f4] w-[230px]" data-name="Personal flight history" data-node-id="7300:48559" style={{ opacity: 0 }}>
              <div className="relative shrink-0 size-[8px]">
                <img alt="" className="absolute block max-w-none size-full" src={imgEllipse5} />
              </div>
              <span className="font-medium text-[15px] text-[#1c1917] text-center whitespace-nowrap leading-[1.4]">Personal flight history</span>
            </div>
          </div>
          {/* Delay predictions pill */}
          <div className="hero-badge badge-delay absolute flex gap-[8px] items-center left-[97px] top-[296px]" data-node-id="7300:48562">
            <div ref={pillDelayRef} className="bg-gradient-to-b border border-[#e7e5e4] border-solid flex from-[38.542%] from-white gap-[12px] h-[48px] items-center justify-center px-[16px] py-[12px] relative rounded-[24px] shrink-0 to-[#f5f5f4] w-fit" data-name="Delay predictions" data-node-id="7300:48562" style={{ opacity: 0 }}>
              <div className="relative shrink-0 size-[8px]">
                <img alt="" className="absolute block max-w-none size-full" src={imgEllipse6} />
              </div>
              <span className="font-medium text-[15px] text-[#1c1917] text-center whitespace-nowrap leading-[1.4]">Delay predictions</span>
            </div>
            <div className="flex items-center justify-center relative shrink-0">
              <div className="flex-none rotate-180">
                <div ref={lineDelayRef} className="h-0 relative w-[52px]" style={{ transform: 'scaleX(0)', transformOrigin: 'left center' }}>
                  <svg width="52" height="1" viewBox="0 0 52 1" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', overflow: 'visible', position: 'absolute', top: '0px' }}><line y1="0.5" x2="52" y2="0.5" stroke="#A8A29E" strokeDasharray="5 5"/></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        {/* ── Figma node 7379:46095: flex row [left card | phone | right card] ── */}
        {/* Direct child of hero-main-container (relative w-full) — 50vw centers correctly */}
        <div
          className="hero-phone-row absolute flex gap-[34px] items-start top-[-346px] w-[1016px] pointer-events-none"
          style={{
            left: 'calc(50vw - 508px)',
            zIndex: 20,
            opacity: phoneVisible ? 1 : 0,
            transform: `translateY(${phoneVisible ? '0px' : '52px'}) scale(${phoneVisible ? 1 : 0.88})`,
            filter: phoneVisible ? 'blur(0px)' : 'blur(6px)',
            transition: 'opacity 0.9s cubic-bezier(0.34, 1.15, 0.64, 1), transform 0.9s cubic-bezier(0.34, 1.15, 0.64, 1), filter 0.9s cubic-bezier(0.34, 1.15, 0.64, 1)',
            transitionDelay: phoneVisible ? '180ms' : '0ms',
            willChange: 'transform, opacity',
          }}
        >
          {/* Left float card */}
          <div className="hero-card flex flex-col items-start pt-[120px] relative self-stretch shrink-0 w-[291px]">
            <div className="flex items-center justify-center relative shrink-0 w-full">
              <div className="flex-none" style={{
                transform: phoneVisible ? 'rotate(-5.43deg) translateX(0px)' : 'rotate(-5.43deg) translateX(170px)',
                transition: 'transform 0.95s cubic-bezier(0.34, 1.18, 0.64, 1)',
                transitionDelay: phoneVisible ? '220ms' : '0ms',
                willChange: 'transform',
              }}>
                <img alt="" className="block w-[281px] h-auto" src={imgImage41} style={{ animation: phoneVisible ? 'cardFloatL 6s ease-in-out 1.3s infinite' : 'none' }} />
              </div>
            </div>
          </div>

          {/* Phone mockup */}
          <div className="hero-phone-mockup h-[764px] overflow-clip relative shrink-0 w-[364px]" data-name="iphone 18" data-node-id="7379:46770">
            <div className="absolute h-[747px] left-[12px] top-[10px] w-[340px]" data-node-id="7379:46771">
              <div className="absolute h-[755px] left-[0.36px] top-[-4px] w-[341px]" data-name="image 44" data-node-id="7379:46772">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPhoneApp} />
              </div>
              <div className="absolute left-0 right-0 top-[132px] flex flex-col items-center gap-[3.5px] pointer-events-none">
                <p className="text-[11.5px] font-medium text-white/70 text-center leading-[1.38]">Leg 1 of 2</p>
                <p className="text-[24px] font-bold text-white text-center tracking-[-0.5px]" style={{ textShadow: '0px 3px 3px rgba(0,0,0,0.09)' }}>In Air</p>
              </div>
              <div className="absolute left-0 right-0 top-[226px] flex flex-col items-center pointer-events-none">
                <div className="flex items-center justify-center gap-[3.5px]">
                  <p className="text-[13px] font-semibold text-white/70 leading-[1.4]">Landing in</p>
                  <p key={landingMins} className="count-tick text-[13px] font-semibold text-white leading-[1.4]">
                    {formatLanding(landingMins)}
                  </p>
                </div>
              </div>
              <div className="absolute h-[30.848px] left-[15.36px] top-[187px] w-[74.331px]" data-node-id="7379:46773">
                <div className="absolute bg-[#97d0ef] h-[6px] left-0 rounded-[929.555px] top-[15px] w-[309px]" />
                <div ref={fillElRef} className="absolute bg-gradient-to-l from-white h-[6px] left-0 rounded-[929.555px] to-[rgba(255,255,255,0.04)] top-[15px] overflow-hidden" style={{width: 0}}>
                  <div className="track-shimmer" />
                </div>
                <div ref={planeElRef} className="absolute h-[30.848px] left-[0px] top-[2px] w-[27.806px]" data-name="Plane Model" data-node-id="7379:46775">
                  <div className="plane-ring" />
                  <div className="absolute flex items-center justify-center left-[1.18px] size-[25.412px] top-[2.97px]">
                    <div className="flex-none rotate-[2.91deg]">
                      <div className="relative size-[24.214px]">
                        <div className="absolute inset-[0_-2.1%_0_0]">
                          <img alt="" className="block max-w-none size-full" src={imgPhonePlane} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute h-[756.789px] left-0 top-0 w-[364px]" data-name="Flattened" data-node-id="7379:46808">
              <img alt="" className="absolute block max-w-none size-full" src="/Images/hero-phone-chrome.svg" />
            </div>
            <div className="absolute h-[32.182px] left-[127.64px] top-[21.44px] w-[108.724px]" data-node-id="7379:46809">
              <div className="absolute inset-0 bg-black rounded-[20px]" />
            </div>
          </div>

          {/* Right float card */}
          <div className="hero-card flex flex-col items-start pt-[120px] relative self-stretch shrink-0 w-[292px]">
            <div className="flex items-center justify-center relative shrink-0 w-full">
              <div className="flex-none" style={{
                transform: phoneVisible ? 'rotate(6.23deg) translateX(0px)' : 'rotate(6.23deg) translateX(-170px)',
                transition: 'transform 0.95s cubic-bezier(0.34, 1.18, 0.64, 1)',
                transitionDelay: phoneVisible ? '310ms' : '0ms',
                willChange: 'transform',
              }}>
                <img alt="" className="block w-[281px] h-auto" src={imgImage40} style={{ animation: phoneVisible ? 'cardFloatR 7s ease-in-out 1.4s infinite' : 'none' }} />
              </div>
            </div>
          </div>
        </div>
        {/* AIRLINES STRIP */}
        <div className="airlines-strip-wrapper w-full bg-[#f9f8f6] mt-[64px]">
        <div className="flex flex-col gap-[40px] items-center overflow-hidden py-[40px]" data-name="airlines-strip" data-node-id="7300:48567">
          <p className="hero-airlines-text font-normal leading-[1.4] text-[18px] text-[#a8a29e] text-center tracking-[-0.18px] whitespace-nowrap" data-node-id="7300:48569">
            Tracks flights across 1200+ airlines and airports worldwide
          </p>
          <div style={{overflow:'hidden', width:'100%', paddingTop:'10px', paddingBottom:'10px', maskImage:'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)', WebkitMaskImage:'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)'}}>
              <div className="marquee-track" data-name="Airline logos" data-node-id="7300:48570" style={{gap:'32px'}}>
              <div className="overflow-clip relative rounded-[999px] shrink-0 size-[40px]" data-name="Airline emblem" data-node-id="7300:48571">
                <div className="absolute inset-[21%_0_21.84%_0]" data-name="Paths" data-node-id="I7300:48571;1:6332">
                  <img alt="" className="absolute block max-w-none size-full" src={imgPaths} />
                </div>
                <div className="-translate-y-1/2 absolute aspect-[100/100] left-0 right-0 top-1/2" data-name="Image" data-node-id="I7300:48571;1:6338">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage} />
                </div>
              </div>
              <div className="overflow-clip relative rounded-[999px] shrink-0 size-[40px]" data-name="Airline emblem" data-node-id="7300:48572">
                <img alt="" className="absolute block max-w-none size-full" src={imgAirlineEmblem} />
                <div className="-translate-y-1/2 absolute aspect-[100/100] left-0 right-0 top-1/2" data-name="Image" data-node-id="I7300:48572;1:6886">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1} />
                </div>
              </div>
              <div className="overflow-clip relative rounded-[999px] shrink-0 size-[40px]" data-name="Airline emblem" data-node-id="7300:48573">
                <div className="absolute inset-[37%_0_36.1%_0]" data-name="Paths" data-node-id="I7300:48573;1:6929">
                  <img alt="" className="absolute block max-w-none size-full" src={imgPaths1} />
                </div>
                <div className="-translate-y-1/2 absolute aspect-[100/100] left-0 right-0 top-1/2" data-name="Image" data-node-id="I7300:48573;1:6933">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage2} />
                </div>
              </div>
              <div className="overflow-clip relative rounded-[999px] shrink-0 size-[40px]" data-name="Airline emblem" data-node-id="7300:48574">
                <img alt="" className="absolute block max-w-none size-full" src={imgAirlineEmblem1} />
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgAirlineEmblem2} />
              </div>
              <div className="overflow-clip relative rounded-[999px] shrink-0 size-[40px]" data-name="Airline emblem" data-node-id="7300:48575">
                <img alt="" className="absolute block max-w-none size-full" src={imgAirlineEmblem3} />
                <div className="-translate-y-1/2 absolute aspect-[100/100] left-0 right-0 top-1/2" data-name="Image" data-node-id="I7300:48575;1:6077">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage3} />
                </div>
              </div>
              <div className="overflow-clip relative rounded-[999px] shrink-0 size-[40px]" data-name="Airline emblem" data-node-id="7300:48576">
                <div className="absolute inset-[8.57%_0_11.43%_0]" data-name="Paths" data-node-id="I7300:48576;1:6114">
                  <img alt="" className="absolute block max-w-none size-full" src={imgPaths2} />
                </div>
                <div className="-translate-y-1/2 absolute aspect-[100/100] left-0 right-0 top-1/2" data-name="Image" data-node-id="I7300:48576;1:6118">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage4} />
                </div>
              </div>
              <div className="overflow-clip relative rounded-[999px] shrink-0 size-[40px]" data-name="Airline emblem" data-node-id="7300:48577">
                <img alt="" className="absolute block max-w-none size-full" src={imgAirlineEmblem4} />
                <div className="-translate-y-1/2 absolute aspect-[100/100] left-0 right-0 top-1/2" data-name="Image" data-node-id="I7300:48577;1:7019">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage5} />
                </div>
              </div>
              <div className="overflow-clip relative rounded-[999px] shrink-0 size-[40px]" data-name="Airline emblem" data-node-id="7300:48578">
                <div className="absolute inset-[16.13%_1.86%_16.39%_1.25%]" data-name="Paths" data-node-id="I7300:48578;1:6395">
                  <img alt="" className="absolute block max-w-none size-full" src={imgPaths3} />
                </div>
                <div className="-translate-y-1/2 absolute aspect-[100/100] left-0 right-0 top-1/2" data-name="Image" data-node-id="I7300:48578;1:6399">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage6} />
                </div>
              </div>
              <div className="overflow-clip relative rounded-[999px] shrink-0 size-[40px]" data-name="Airline emblem" data-node-id="7300:48579">
                <div className="absolute inset-[7.67%_0_5.87%_0]" data-name="Paths" data-node-id="I7300:48579;1:5922">
                  <img alt="" className="absolute block max-w-none size-full" src={imgPaths4} />
                </div>
                <div className="-translate-y-1/2 absolute aspect-[100/100] left-0 right-0 top-1/2" data-name="Image" data-node-id="I7300:48579;1:5940">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage7} />
                </div>
              </div>
              <div className="overflow-clip relative rounded-[999px] shrink-0 size-[40px]" data-name="Airline emblem" data-node-id="7300:48580">
                <div className="absolute inset-[11.43%_0_12.86%_0]" data-name="Paths" data-node-id="I7300:48580;1:6096">
                  <img alt="" className="absolute block max-w-none size-full" src={imgPaths5} />
                </div>
                <div className="-translate-y-1/2 absolute aspect-[100/100] left-0 right-0 top-1/2" data-name="Image" data-node-id="I7300:48580;1:6100">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage8} />
                </div>
              </div>
              <div className="overflow-clip relative rounded-[999px] shrink-0 size-[40px]" data-name="Airline emblem" data-node-id="7300:48581">
                <img alt="" className="absolute block max-w-none size-full" src={imgAirlineEmblem5} />
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgAirlineEmblem6} />
              </div>
              <div className="overflow-clip relative rounded-[999px] shrink-0 size-[40px]" data-name="Airline emblem" data-node-id="7300:48582">
                <div className="absolute inset-[5%_0_5.39%_0]" data-name="Paths" data-node-id="I7300:48582;1:6593">
                  <img alt="" className="absolute block max-w-none size-full" src={imgPaths6} />
                </div>
                <div className="-translate-y-1/2 absolute aspect-[100/100] left-0 right-0 top-1/2" data-name="Image" data-node-id="I7300:48582;1:6597">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage9} />
                </div>
              </div>
              <div className="overflow-clip relative rounded-[999px] shrink-0 size-[40px]" data-name="Airline emblem" data-node-id="7300:48583">
                <div className="absolute inset-[0_18.93%]" data-name="Paths" data-node-id="I7300:48583;1:6288">
                  <img alt="" className="absolute block max-w-none size-full" src={imgPaths7} />
                </div>
                <div className="-translate-y-1/2 absolute aspect-[100/100] left-0 right-0 top-1/2" data-name="Image" data-node-id="I7300:48583;1:6291">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage10} />
                </div>
              </div>
              <div className="overflow-clip relative rounded-[999px] shrink-0 size-[40px]" data-name="Airline emblem" data-node-id="7300:48584">
                <img alt="" className="absolute block max-w-none size-full" src={imgAirlineEmblem7} />
                <div className="-translate-y-1/2 absolute aspect-[100/100] left-0 right-0 top-1/2" data-name="Image" data-node-id="I7300:48584;1:6321">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage11} />
                </div>
              </div>
              <div className="overflow-clip relative rounded-[999px] shrink-0 size-[40px]" data-name="Airline emblem" data-node-id="7300:48585">
                <div className="absolute inset-[14%_0_14.81%_0]" data-name="Paths" data-node-id="I7300:48585;1:6057">
                  <img alt="" className="absolute block max-w-none size-full" src={imgPaths8} />
                </div>
                <div className="-translate-y-1/2 absolute aspect-[100/100] left-0 right-0 top-1/2" data-name="Image" data-node-id="I7300:48585;1:6065">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage12} />
                </div>
              </div>
              <div className="overflow-clip relative rounded-[999px] shrink-0 size-[40px]" data-name="Airline emblem" data-node-id="7300:48586">
                <img alt="" className="absolute block max-w-none size-full" src={imgAirlineEmblem8} />
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgAirlineEmblem9} />
              </div>
              <div className="overflow-clip relative rounded-[999px] shrink-0 size-[40px]" data-name="Airline emblem" data-node-id="7300:48587">
                <img alt="" className="absolute block max-w-none size-full" src={imgAirlineEmblem10} />
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgAirlineEmblem11} />
              </div>
              <div className="overflow-clip relative rounded-[999px] shrink-0 size-[40px]" data-name="Airline emblem" data-node-id="7300:48588">
                <img alt="" className="absolute block max-w-none size-full" src={imgAirlineEmblem12} />
                <div className="-translate-x-1/2 absolute aspect-[400/400] bottom-0 left-1/2 top-0" data-name="Image" data-node-id="I7300:48588;300:506">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage13} />
                </div>
              </div>
              <div className="overflow-clip relative rounded-[999px] shrink-0 size-[40px]" data-name="Airline emblem" data-node-id="7300:48589">
                <img alt="" className="absolute block max-w-none size-full" src={imgAirlineEmblem13} />
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgAirlineEmblem14} />
              </div>
              <div className="overflow-clip relative rounded-[999px] shrink-0 size-[40px]" data-name="Airline emblem" data-node-id="7300:48590">
                <div className="absolute inset-[6.06%_4.74%_6.56%_5.82%]" data-name="Vector" data-node-id="I7300:48590;162:1922">
                  <img alt="" className="absolute block max-w-none size-full" src={imgVector} />
                </div>
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgAirlineEmblem15} />
              </div>
              <div className="overflow-clip relative rounded-[999px] shrink-0 size-[40px]" data-name="Airline emblem" data-node-id="7300:48591">
                <img alt="" className="absolute block max-w-none size-full" src={imgAirlineEmblem16} />
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgAirlineEmblem17} />
              </div>
              <div className="overflow-clip relative rounded-[999px] shrink-0 size-[40px]" data-name="Airline emblem" data-node-id="7300:48592">
                <img alt="" className="absolute block max-w-none size-full" src={imgAirlineEmblem18} />
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgAirlineEmblem19} />
              </div>
              <div className="overflow-clip relative rounded-[999px] shrink-0 size-[40px]" data-name="Airline emblem" data-node-id="7300:48593">
                <div className="absolute inset-[13.01%_0_11.99%_0]" data-name="Paths" data-node-id="I7300:48593;213:2474">
                  <img alt="" className="absolute block max-w-none size-full" src={imgPaths9} />
                </div>
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgAirlineEmblem20} />
              </div>
              <div className="overflow-clip relative rounded-[999px] shrink-0 size-[40px]" data-name="Airline emblem" data-node-id="7300:48594">
                <div className="absolute inset-[12%_0]" data-name="Paths" data-node-id="I7300:48594;1:6052">
                  <img alt="" className="absolute block max-w-none size-full" src={imgPaths10} />
                </div>
                <div className="-translate-y-1/2 absolute aspect-[100/100] left-0 right-0 top-1/2" data-name="Image" data-node-id="I7300:48594;1:6055">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage14} />
                </div>
              </div>
              {/* Second copy — identical, for seamless loop */}
              <div className="overflow-clip relative rounded-[999px] shrink-0 size-[40px]" data-name="Airline emblem" aria-hidden="true">
                <div className="absolute inset-[21%_0_21.84%_0]"><img alt="" className="absolute block max-w-none size-full" src={imgPaths} /></div>
                <div className="-translate-y-1/2 absolute aspect-[100/100] left-0 right-0 top-1/2"><img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage} /></div>
              </div>
              <div className="overflow-clip relative rounded-[999px] shrink-0 size-[40px]" data-name="Airline emblem" aria-hidden="true">
                <img alt="" className="absolute block max-w-none size-full" src={imgAirlineEmblem} />
                <div className="-translate-y-1/2 absolute aspect-[100/100] left-0 right-0 top-1/2"><img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1} /></div>
              </div>
              <div className="overflow-clip relative rounded-[999px] shrink-0 size-[40px]" data-name="Airline emblem" aria-hidden="true">
                <div className="absolute inset-[37%_0_36.1%_0]"><img alt="" className="absolute block max-w-none size-full" src={imgPaths1} /></div>
                <div className="-translate-y-1/2 absolute aspect-[100/100] left-0 right-0 top-1/2"><img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage2} /></div>
              </div>
              <div className="overflow-clip relative rounded-[999px] shrink-0 size-[40px]" data-name="Airline emblem" aria-hidden="true">
                <img alt="" className="absolute block max-w-none size-full" src={imgAirlineEmblem1} />
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgAirlineEmblem2} />
              </div>
              <div className="overflow-clip relative rounded-[999px] shrink-0 size-[40px]" data-name="Airline emblem" aria-hidden="true">
                <img alt="" className="absolute block max-w-none size-full" src={imgAirlineEmblem3} />
                <div className="-translate-y-1/2 absolute aspect-[100/100] left-0 right-0 top-1/2"><img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage3} /></div>
              </div>
              <div className="overflow-clip relative rounded-[999px] shrink-0 size-[40px]" data-name="Airline emblem" aria-hidden="true">
                <div className="absolute inset-[8.57%_0_11.43%_0]"><img alt="" className="absolute block max-w-none size-full" src={imgPaths2} /></div>
                <div className="-translate-y-1/2 absolute aspect-[100/100] left-0 right-0 top-1/2"><img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage4} /></div>
              </div>
              <div className="overflow-clip relative rounded-[999px] shrink-0 size-[40px]" data-name="Airline emblem" aria-hidden="true">
                <img alt="" className="absolute block max-w-none size-full" src={imgAirlineEmblem4} />
                <div className="-translate-y-1/2 absolute aspect-[100/100] left-0 right-0 top-1/2"><img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage5} /></div>
              </div>
              <div className="overflow-clip relative rounded-[999px] shrink-0 size-[40px]" data-name="Airline emblem" aria-hidden="true">
                <div className="absolute inset-[16.13%_1.86%_16.39%_1.25%]"><img alt="" className="absolute block max-w-none size-full" src={imgPaths3} /></div>
                <div className="-translate-y-1/2 absolute aspect-[100/100] left-0 right-0 top-1/2"><img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage6} /></div>
              </div>
              <div className="overflow-clip relative rounded-[999px] shrink-0 size-[40px]" data-name="Airline emblem" aria-hidden="true">
                <div className="absolute inset-[7.67%_0_5.87%_0]"><img alt="" className="absolute block max-w-none size-full" src={imgPaths4} /></div>
                <div className="-translate-y-1/2 absolute aspect-[100/100] left-0 right-0 top-1/2"><img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage7} /></div>
              </div>
              <div className="overflow-clip relative rounded-[999px] shrink-0 size-[40px]" data-name="Airline emblem" aria-hidden="true">
                <div className="absolute inset-[11.43%_0_12.86%_0]"><img alt="" className="absolute block max-w-none size-full" src={imgPaths5} /></div>
                <div className="-translate-y-1/2 absolute aspect-[100/100] left-0 right-0 top-1/2"><img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage8} /></div>
              </div>
              <div className="overflow-clip relative rounded-[999px] shrink-0 size-[40px]" data-name="Airline emblem" aria-hidden="true">
                <img alt="" className="absolute block max-w-none size-full" src={imgAirlineEmblem5} />
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgAirlineEmblem6} />
              </div>
              <div className="overflow-clip relative rounded-[999px] shrink-0 size-[40px]" data-name="Airline emblem" aria-hidden="true">
                <div className="absolute inset-[5%_0_5.39%_0]"><img alt="" className="absolute block max-w-none size-full" src={imgPaths6} /></div>
                <div className="-translate-y-1/2 absolute aspect-[100/100] left-0 right-0 top-1/2"><img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage9} /></div>
              </div>
              <div className="overflow-clip relative rounded-[999px] shrink-0 size-[40px]" data-name="Airline emblem" aria-hidden="true">
                <div className="absolute inset-[0_18.93%]"><img alt="" className="absolute block max-w-none size-full" src={imgPaths7} /></div>
                <div className="-translate-y-1/2 absolute aspect-[100/100] left-0 right-0 top-1/2"><img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage10} /></div>
              </div>
              <div className="overflow-clip relative rounded-[999px] shrink-0 size-[40px]" data-name="Airline emblem" aria-hidden="true">
                <img alt="" className="absolute block max-w-none size-full" src={imgAirlineEmblem7} />
                <div className="-translate-y-1/2 absolute aspect-[100/100] left-0 right-0 top-1/2"><img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage11} /></div>
              </div>
              <div className="overflow-clip relative rounded-[999px] shrink-0 size-[40px]" data-name="Airline emblem" aria-hidden="true">
                <div className="absolute inset-[14%_0_14.81%_0]"><img alt="" className="absolute block max-w-none size-full" src={imgPaths8} /></div>
                <div className="-translate-y-1/2 absolute aspect-[100/100] left-0 right-0 top-1/2"><img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage12} /></div>
              </div>
              <div className="overflow-clip relative rounded-[999px] shrink-0 size-[40px]" data-name="Airline emblem" aria-hidden="true">
                <img alt="" className="absolute block max-w-none size-full" src={imgAirlineEmblem8} />
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgAirlineEmblem9} />
              </div>
              <div className="overflow-clip relative rounded-[999px] shrink-0 size-[40px]" data-name="Airline emblem" aria-hidden="true">
                <img alt="" className="absolute block max-w-none size-full" src={imgAirlineEmblem10} />
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgAirlineEmblem11} />
              </div>
              <div className="overflow-clip relative rounded-[999px] shrink-0 size-[40px]" data-name="Airline emblem" aria-hidden="true">
                <img alt="" className="absolute block max-w-none size-full" src={imgAirlineEmblem12} />
                <div className="-translate-x-1/2 absolute aspect-[400/400] bottom-0 left-1/2 top-0"><img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage13} /></div>
              </div>
              <div className="overflow-clip relative rounded-[999px] shrink-0 size-[40px]" data-name="Airline emblem" aria-hidden="true">
                <img alt="" className="absolute block max-w-none size-full" src={imgAirlineEmblem13} />
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgAirlineEmblem14} />
              </div>
              <div className="overflow-clip relative rounded-[999px] shrink-0 size-[40px]" data-name="Airline emblem" aria-hidden="true">
                <div className="absolute inset-[6.06%_4.74%_6.56%_5.82%]"><img alt="" className="absolute block max-w-none size-full" src={imgVector} /></div>
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgAirlineEmblem15} />
              </div>
              <div className="overflow-clip relative rounded-[999px] shrink-0 size-[40px]" data-name="Airline emblem" aria-hidden="true">
                <img alt="" className="absolute block max-w-none size-full" src={imgAirlineEmblem16} />
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgAirlineEmblem17} />
              </div>
              <div className="overflow-clip relative rounded-[999px] shrink-0 size-[40px]" data-name="Airline emblem" aria-hidden="true">
                <img alt="" className="absolute block max-w-none size-full" src={imgAirlineEmblem18} />
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgAirlineEmblem19} />
              </div>
              <div className="overflow-clip relative rounded-[999px] shrink-0 size-[40px]" data-name="Airline emblem" aria-hidden="true">
                <div className="absolute inset-[13.01%_0_11.99%_0]"><img alt="" className="absolute block max-w-none size-full" src={imgPaths9} /></div>
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgAirlineEmblem20} />
              </div>
              <div className="overflow-clip relative rounded-[999px] shrink-0 size-[40px]" data-name="Airline emblem" aria-hidden="true">
                <div className="absolute inset-[12%_0]"><img alt="" className="absolute block max-w-none size-full" src={imgPaths10} /></div>
                <div className="-translate-y-1/2 absolute aspect-[100/100] left-0 right-0 top-1/2"><img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage14} /></div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
