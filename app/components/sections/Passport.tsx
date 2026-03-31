'use client';

import React, { useRef, useEffect } from 'react';
import { useCounter } from '../../lib/hooks/useCounter';
import { imgCloud1, imgCloud2, imgCloud4 } from '../../lib/constants/assets';

// ── Passport asset URLs ──────────────────────────────────────────────────────
const imgPassportIcon0 = "/Images/asset-f666c8bb-7021-4db4-950b-3c926692867b.svg";
const imgPassportIcon1 = "/Images/asset-0253905e-4beb-46e3-ab04-b0081f10a5a7.svg";
const imgPassportIcon2 = "/Images/asset-963ebc02-1135-4773-8241-9ae0b36fbbc8.svg";
const imgPassportIcon3 = "/Images/asset-b5b5912a-0ca5-46a2-bd4c-014c2773e113.svg";

const PASSPORT_STATS = [
  { target: 47,  suffix: '',  label: 'Flights completed', icon: imgPassportIcon0, iconStyle: {top:'9.37%',left:'9.37%',right:'9.38%',bottom:'9.38%'}, iconOpacity: 1 },
  { target: 23,  suffix: '',  label: 'Countries visited',  icon: imgPassportIcon1, iconStyle: {top:'6.25%',left:'6.25%',right:'6.25%',bottom:'6.25%'}, iconOpacity: 1 },
  { target: 138, suffix: 'k', label: 'km traveled',        icon: imgPassportIcon2, iconStyle: {top:'5.21%',left:'5.21%',right:'5.21%',bottom:'5.21%'}, iconOpacity: 0.5 },
  { target: 18,  suffix: '',  label: 'Airlines flown',     icon: imgPassportIcon3, iconStyle: {top:'5.62%',left:'8.08%',right:'5.63%',bottom:'9.79%'}, iconOpacity: 0.5 },
];

function PassportStatCard({ stat, delay }: { stat: typeof PASSPORT_STATS[0]; delay: number }) {
  const { count, ref: counterRef } = useCounter(stat.target);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 500ms ease, transform 500ms ease`;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; }, delay);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <div
      ref={(node) => {
        (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        (counterRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }}
      className="passport-stat-card"
      style={{
        flex: '1 0 0',
        borderRadius: '24px',
        padding: '24px',
        background: 'linear-gradient(145deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.07) 100%)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        boxShadow: [
          'inset 0 0.5px 0 rgba(255,255,255,0.75)',   /* top bright glass edge */
          'inset 0.5px 0 0 rgba(255,255,255,0.32)',   /* left gleam */
          'inset 0 -0.5px 0 rgba(255,255,255,0.10)',  /* bottom soft */
          'inset -0.5px 0 0 rgba(255,255,255,0.12)',  /* right soft */
          '0 20px 48px rgba(0,0,0,0.13)',
          '0 4px 12px rgba(0,0,0,0.07)',
        ].join(', '),
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        alignItems: 'center',
      }}
    >
      <div style={{position: 'relative', width: '40px', height: '40px', overflow: 'clip', flexShrink: 0}}>
        <img
          src={stat.icon}
          alt=""
          style={{
            position: 'absolute',
            top: stat.iconStyle.top,
            left: stat.iconStyle.left,
            right: stat.iconStyle.right,
            bottom: stat.iconStyle.bottom,
            width: `calc(100% - (${stat.iconStyle.left} + ${stat.iconStyle.right}))`,
            height: `calc(100% - (${stat.iconStyle.top} + ${stat.iconStyle.bottom}))`,
            opacity: stat.iconOpacity,
          }}
        />
      </div>
      <p className="passport-stat-number" style={{fontFamily: 'Inter', fontWeight: 700, fontSize: '48px', color: 'white', letterSpacing: '-0.96px', lineHeight: 1.1, textAlign: 'center', width: '100%', margin: 0}}>
        {count}{stat.suffix}
      </p>
      <p style={{fontFamily: 'Inter', fontWeight: 400, fontSize: '17px', color: 'rgba(255,255,255,0.72)', lineHeight: '24px', textAlign: 'center', width: '100%', margin: 0}}>
        {stat.label}
      </p>
      {/* Shimmer sweep — staggered per card via animationDelay */}
      <div className="passport-shimmer" style={{ animationDelay: `${delay * 0.8}ms` }} />
    </div>
  );
}

export default function Passport() {
  return (
    <>
      <style>{`
        .passport-section {
          background: linear-gradient(238.529deg, rgb(37,178,255) 0.585%, rgb(0,114,177) 84.571%);
          padding: 120px 0;
          width: 100%;
          position: relative;
          overflow: hidden;
        }
        .passport-grid {
          width: 1200px;
          max-width: 100%;
          margin: 0 auto;
          padding: 0 204px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .passport-grid-row {
          display: flex;
          gap: 24px;
          justify-content: center;
        }
        @media (max-width: 1439px) {
          .passport-grid { padding: 0 40px; }
        }
        @media (max-width: 1023px) {
          .passport-grid { padding: 0 80px; }
        }
        /* Glass card base */
        .passport-stat-card {
          position: relative;
          overflow: hidden;
          flex: 1 1 280px;
          max-width: 350px;
        }
        /* Shimmer sweep — diagonal light beam that crosses each card */
        .passport-shimmer {
          position: absolute;
          top: -60%;
          left: -100%;
          width: 45%;
          height: 220%;
          background: linear-gradient(
            100deg,
            transparent 0%,
            rgba(255,255,255,0.07) 35%,
            rgba(255,255,255,0.16) 50%,
            rgba(255,255,255,0.07) 65%,
            transparent 100%
          );
          transform: skewX(-18deg);
          animation: passport-shimmer 7s ease-in-out infinite;
          pointer-events: none;
          z-index: 2;
        }
        @keyframes passport-shimmer {
          0%, 55%, 100% { left: -100%; opacity: 0; }
          57%            { opacity: 1; }
          75%            { left: 140%;  opacity: 1; }
          78%            { opacity: 0; }
        }
        @media (max-width: 767px) {
          .passport-section { padding: 0 !important; }
          .passport-label { display: none !important; }
          .passport-inner { gap: 0 !important; max-width: 100% !important; align-items: stretch !important; }
          .passport-header {
            padding: 64px 20px 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
          }
          .passport-title { font-size: 32px !important; width: 100% !important; max-width: 100% !important; }
          .passport-grid { padding: 40px 20px 64px !important; gap: 24px !important; width: 100% !important; }
          .passport-grid-row { flex-direction: column !important; gap: 24px !important; align-items: center !important; }
          .passport-stat-card {
            flex: none !important;
            width: 100% !important;
            max-width: 350px !important;
            height: auto !important;
            border: 1px solid rgba(255,255,255,0.6) !important;
          }
          .passport-stat-number { font-size: 32px !important; letter-spacing: -0.64px !important; }
        }
      `}</style>
      <section id="passport" className="passport-section">

        {/* ── Clouds: top zone (distant, very soft) ── */}
        <div className="absolute left-0 top-[15px] w-[260px] h-[115px] opacity-[0.08] pointer-events-none" style={{ animation: "cloudFlight 275s linear -38s infinite", willChange: "translate" }}>
          <img alt="" className="block max-w-none w-full h-full" src={imgCloud2} />
        </div>
        <div className="absolute left-0 top-[60px] w-[340px] h-[140px] opacity-[0.10] pointer-events-none" style={{ animation: "cloudFlight 260s linear -152s infinite", willChange: "translate" }}>
          <img alt="" className="block max-w-none w-full h-full" src={imgCloud1} />
        </div>
        <div className="absolute left-0 top-[130px] w-[200px] h-[90px] opacity-[0.07] pointer-events-none" style={{ animation: "cloudFlight 248s linear -208s infinite", willChange: "translate" }}>
          <img alt="" className="block max-w-none w-full h-full" src={imgCloud4} />
        </div>

        {/* ── Clouds: upper-mid zone ── */}
        <div className="absolute left-0 top-[200px] w-[380px] h-[185px] opacity-[0.12] pointer-events-none" style={{ animation: "cloudFlight 210s linear -68s infinite", willChange: "translate" }}>
          <img alt="" className="block max-w-none w-full h-full" src={imgCloud1} />
        </div>
        <div className="absolute left-0 top-[270px] w-[300px] h-[145px] opacity-[0.09] pointer-events-none" style={{ animation: "cloudFlight 225s linear -135s infinite", willChange: "translate" }}>
          <img alt="" className="block max-w-none w-full h-full" src={imgCloud4} />
        </div>

        {/* ── Clouds: mid zone ── */}
        <div className="absolute left-0 top-[340px] w-[420px] h-[195px] opacity-[0.13] pointer-events-none" style={{ animation: "cloudFlight 195s linear -85s infinite", willChange: "translate" }}>
          <img alt="" className="block max-w-none w-full h-full" src={imgCloud2} />
        </div>
        <div className="absolute left-0 top-[420px] w-[290px] h-[135px] opacity-[0.09] pointer-events-none" style={{ animation: "cloudFlight 215s linear -172s infinite", willChange: "translate" }}>
          <img alt="" className="block max-w-none w-full h-full" src={imgCloud1} />
        </div>

        {/* ── Clouds: lower zone (foreground, still soft) ── */}
        <div className="absolute left-0 top-[510px] w-[450px] h-[195px] opacity-[0.18] pointer-events-none" style={{ animation: "cloudFlight 148s linear -22s infinite", willChange: "translate" }}>
          <img alt="" className="block max-w-none w-full h-full" src={imgCloud4} />
        </div>
        <div className="absolute left-0 top-[575px] w-[320px] h-[155px] opacity-[0.14] pointer-events-none" style={{ animation: "cloudFlight 158s linear -80s infinite", willChange: "translate" }}>
          <img alt="" className="block max-w-none w-full h-full" src={imgCloud1} />
        </div>
        <div className="absolute left-0 top-[645px] w-[400px] h-[165px] opacity-[0.16] pointer-events-none" style={{ animation: "cloudFlight 142s linear -48s infinite", willChange: "translate" }}>
          <img alt="" className="block max-w-none w-full h-full" src={imgCloud2} />
        </div>
        <div className="absolute left-0 top-[720px] w-[255px] h-[120px] opacity-[0.11] pointer-events-none" style={{ animation: "cloudFlight 152s linear -118s infinite", willChange: "translate" }}>
          <img alt="" className="block max-w-none w-full h-full" src={imgCloud4} />
        </div>

        {/* Main content */}
        <div className="passport-inner" style={{position:'relative', zIndex:1, maxWidth:'1200px', margin:'0 auto', display:'flex', flexDirection:'column', gap:'40px', alignItems:'center'}}>

          {/* Header */}
          <div className="passport-header" style={{display:'flex',flexDirection:'column',gap:'15px',alignItems:'center',textAlign:'center',width:'654.5px',maxWidth:'100%'}}>
            <p className="passport-label" style={{fontFamily:'Inter',fontWeight:700,fontSize:'12px',color:'rgba(255,255,255,0.72)',letterSpacing:'0.48px',textTransform:'uppercase',lineHeight:1,margin:0}}>
              Travel history
            </p>
            <div style={{display:'flex',flexDirection:'column',gap:'15px',alignItems:'center',width:'100%'}}>
              <p className="passport-title" style={{fontFamily:'Inter',fontSize:'48px',color:'white',letterSpacing:'-0.96px',lineHeight:1.1,textAlign:'center',margin:0,textShadow:'0 4px 16px rgba(10,16,40,0.08)',width:'518px',maxWidth:'100%'}}>
                <span style={{fontWeight:700}}>Every flight becomes part of </span>
                <span style={{fontWeight:400,fontStyle:'italic',color:'#a7f3d0',letterSpacing:'-1.44px'}}>your story.</span>
              </p>
              <p style={{fontFamily:'Inter',fontWeight:400,fontSize:'17px',color:'rgba(255,255,255,0.72)',lineHeight:1.4,width:'566px',maxWidth:'100%',textAlign:'center',margin:0}}>
                Flight Passport automatically creates a living timeline and archive of where you&#39;ve been and what happened on each trip. Meaningful, portable, and safe.
              </p>
            </div>
          </div>

          {/* Stats grid */}
          <div className="passport-grid">
            <div className="passport-grid-row">
              <PassportStatCard stat={PASSPORT_STATS[0]} delay={0} />
              <PassportStatCard stat={PASSPORT_STATS[1]} delay={100} />
            </div>
            <div className="passport-grid-row">
              <PassportStatCard stat={PASSPORT_STATS[2]} delay={200} />
              <PassportStatCard stat={PASSPORT_STATS[3]} delay={300} />
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
