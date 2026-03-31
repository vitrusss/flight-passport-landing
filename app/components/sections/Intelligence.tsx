'use client';

import React, { useRef, useEffect } from 'react';

// ── Intelligence asset URLs (node 7300:48922) ─────────────────────────────────
const imgIntelIcon  = "/Images/asset-0d27bc45-intel-search.svg";
const imgIntelIcon1 = "/Images/asset-f795357a-intel-location.svg";
const imgIntelIcon2 = "/Images/asset-447d565c-intel-policy.svg";

export default function Intelligence() {
  const p0 = useRef<HTMLDivElement>(null);
  const p1 = useRef<HTMLDivElement>(null);
  const p2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panels = [p0.current, p1.current, p2.current];

    // 1. Hide instantly — NO transition yet (prevents flash animation on load)
    panels.forEach((el) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(28px)';
      el.style.transition = 'none';
      el.style.willChange = 'transform, opacity';
    });

    const observers: IntersectionObserver[] = [];

    // 2. Setup observers after a tick — ensures page is at scroll 0 before observing
    const setup = setTimeout(() => {
      panels.forEach((el, i) => {
        if (!el) return;
        const obs = new IntersectionObserver(
          ([entry]) => {
            if (!entry.isIntersecting) return;
            const delay = i * 150;
            // 3. Add transition only NOW — just before revealing
            el.style.transition = 'opacity 600ms ease, transform 600ms ease';
            setTimeout(() => {
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
            }, delay);
            // 4. Clear inline styles after reveal so CSS hover works
            setTimeout(() => {
              el.style.transform = '';
              el.style.transition = '';
              el.style.willChange = 'auto';
            }, delay + 650);
            obs.disconnect();
          },
          // threshold 0.25 + negative bottom margin = panel must be well into viewport
          { threshold: 0.25, rootMargin: '0px 0px -60px 0px' }
        );
        obs.observe(el);
        observers.push(obs);
      });
    }, 150);

    return () => {
      clearTimeout(setup);
      observers.forEach(o => o.disconnect());
    };
  }, []);

  return (
<>
<style>{`
  @media (max-width: 767px) {
    .intelligence-section { padding-top: 72px !important; padding-bottom: 72px !important; }
    .intelligence-inner { padding: 0 20px !important; box-sizing: border-box !important; gap: 48px !important; }
    .intelligence-panels { flex-direction: column !important; align-items: stretch !important; gap: 16px !important; }
    .intel-panel { flex: none !important; min-width: unset !important; width: 100% !important; max-width: 400px !important; margin-left: auto !important; margin-right: auto !important; }
    .intel-section-title { font-size: clamp(28px, 7vw, 36px) !important; letter-spacing: -0.6px !important; }
    .intel-section-sub { font-size: 15px !important; }
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    .intelligence-section { padding-top: 80px !important; padding-bottom: 80px !important; }
    .intelligence-inner { padding: 0 32px !important; box-sizing: border-box !important; }
    .intelligence-panels { flex-wrap: wrap !important; }
    .intel-panel { flex: 1 1 280px !important; min-width: 280px !important; }
  }
`}</style>
<section id="features" className="intelligence-section" style={{background: 'white', width: '100%', paddingTop: '120px', paddingBottom: '120px', borderTop: '1px solid #e7e5e4'}}>
  <div className="intelligence-inner" style={{maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '64px', alignItems: 'center'}}>

    {/* Header */}
    <div style={{display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', textAlign: 'center', maxWidth: '654.5px', width: '100%'}}>
      <p style={{fontFamily: 'Inter', fontWeight: 700, fontSize: '12px', color: '#a8a29e', letterSpacing: '0.48px', textTransform: 'uppercase', lineHeight: 1}}>
        Three modes, one system
      </p>
      <div style={{display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', width: '100%'}}>
        <p className="intel-section-title" style={{fontFamily: 'Inter', fontWeight: 700, fontSize: '48px', color: '#1c1917', letterSpacing: '-0.96px', lineHeight: 1.1, textAlign: 'center'}}>
          <span style={{fontWeight: 700}}>Before. </span>
          <span style={{fontWeight: 400, fontStyle: 'italic', color: '#0ea5e9'}}>During.</span>
          <span style={{fontWeight: 700}}> After</span>
        </p>
        <p className="intel-section-sub" style={{fontFamily: 'Inter', fontWeight: 400, fontSize: '17px', color: '#6c6760', lineHeight: 1.4, maxWidth: '510px', width: '100%', textAlign: 'center'}}>
          Most apps only track flights you&#39;ve already booked. Flight Passport stays with you across the entire journey lifecycle.
        </p>
      </div>
    </div>

    {/* Three Panels */}
    <div className="intelligence-panels" style={{display: 'flex', gap: '24px', alignItems: 'stretch', width: '100%'}}>

      {/* Panel 1 — Before */}
      <div ref={p0} className="intel-panel" style={{flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center', justifyContent: 'center', padding: '32px 24px', borderRadius: '24px', border: '1px solid #e7e5e4', backgroundImage: 'linear-gradient(138.2deg, rgb(255,255,255) 3.222%, rgb(245,245,244) 117.85%)'}}>
        <div className="intel-icon" style={{width: '48px', height: '48px', background: 'white', border: '1px solid #e7e5e4', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
          <div style={{position: 'relative', width: '24px', height: '24px', overflow: 'clip'}}>
            <img src={imgIntelIcon} alt="" style={{position: 'absolute', top: '5%', right: '5%', bottom: '7.08%', left: '7.08%', width: 'calc(100% - 12.08%)', height: 'calc(100% - 12.08%)'}} />
          </div>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', textAlign: 'center', width: '100%'}}>
          <p style={{fontFamily: 'Inter', fontWeight: 700, fontSize: '12px', color: '#a8a29e', letterSpacing: '0.48px', textTransform: 'uppercase', lineHeight: 1, width: '100%', textAlign: 'center'}}>Before you book</p>
          <div style={{display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', width: '100%'}}>
            <p style={{fontFamily: 'Inter', fontWeight: 600, fontSize: '24px', color: '#1c1917', letterSpacing: '-0.24px', lineHeight: 1.2, width: '267px', textAlign: 'center'}}>Explore before booking</p>
            <p style={{fontFamily: 'Inter', fontWeight: 400, fontSize: '17px', color: '#78716c', lineHeight: '24px', width: '308px', textAlign: 'center'}}>Delay history, reliability scores, aircraft details, and turbulence forecasts before you choose a flight.</p>
          </div>
        </div>
      </div>

      {/* Panel 2 — During (live) */}
      <div ref={p1} className="intel-panel" style={{flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center', justifyContent: 'center', padding: '32px 24px', borderRadius: '24px', border: '1px solid #e7e5e4', backgroundImage: 'linear-gradient(138.2deg, rgb(255,255,255) 3.222%, rgb(245,245,244) 117.85%)'}}>
        <div className="intel-icon" style={{width: '48px', height: '48px', background: 'white', border: '1px solid #e7e5e4', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
          <div style={{position: 'relative', width: '24px', height: '24px', overflow: 'clip'}}>
            <img src={imgIntelIcon1} alt="" style={{position: 'absolute', top: '4.58%', right: '8.75%', bottom: '4.58%', left: '8.75%', width: 'calc(100% - 17.5%)', height: 'calc(100% - 9.16%)'}} />
          </div>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', textAlign: 'center', width: '100%'}}>
          <p style={{fontFamily: 'Inter', fontWeight: 700, fontSize: '12px', color: '#a8a29e', letterSpacing: '0.48px', textTransform: 'uppercase', lineHeight: 1, width: '100%', textAlign: 'center'}}>
            <span className="intel-live-dot" />While you travel
          </p>
          <div style={{display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', width: '100%'}}>
            <p style={{fontFamily: 'Inter', fontWeight: 600, fontSize: '24px', color: '#1c1917', letterSpacing: '-0.24px', lineHeight: 1.2, width: '273px', textAlign: 'center'}}>Track every leg live</p>
            <p style={{fontFamily: 'Inter', fontWeight: 400, fontSize: '17px', color: '#78716c', lineHeight: '24px', textAlign: 'center'}}>Boarding alerts, gate changes, connection timing, and live progress — across multi-leg journeys.</p>
          </div>
        </div>
      </div>

      {/* Panel 3 — After */}
      <div ref={p2} className="intel-panel" style={{flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center', justifyContent: 'center', padding: '32px 24px', borderRadius: '24px', border: '1px solid #e7e5e4', backgroundImage: 'linear-gradient(138.2deg, rgb(255,255,255) 3.222%, rgb(245,245,244) 117.85%)'}}>
        <div className="intel-icon" style={{width: '48px', height: '48px', background: 'white', border: '1px solid #e7e5e4', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
          <div style={{position: 'relative', width: '24px', height: '24px', overflow: 'clip'}}>
            <img src={imgIntelIcon2} alt="" style={{position: 'absolute', top: '5.21%', right: '5.21%', bottom: '5.2%', left: '9.37%', width: 'calc(100% - 14.58%)', height: 'calc(100% - 10.41%)'}} />
          </div>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', textAlign: 'center', width: '100%'}}>
          <p style={{fontFamily: 'Inter', fontWeight: 700, fontSize: '12px', color: '#a8a29e', letterSpacing: '0.48px', textTransform: 'uppercase', lineHeight: 1, width: '100%', textAlign: 'center'}}>After you land</p>
          <div style={{display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', width: '100%'}}>
            <p style={{fontFamily: 'Inter', fontWeight: 600, fontSize: '24px', color: '#1c1917', letterSpacing: '-0.24px', lineHeight: 1.2, width: '244px', textAlign: 'center'}}>Build your passport</p>
            <p style={{fontFamily: 'Inter', fontWeight: 400, fontSize: '17px', color: '#78716c', lineHeight: '24px', width: '308px', textAlign: 'center'}}>Every completed journey is recorded automatically — countries, airlines, distance, aircraft types.</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>
</>
  );
}
