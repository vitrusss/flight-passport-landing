"use client";

import React, { useState, useEffect, useRef } from "react";

// ── Figma Hero asset URLs (node 7300:48506) ───────────────────────────────────
const imgCloud1 = "/Images/asset-81419f0d-f299-4d1e-a3f5-1f41ab41cf92.png";
const imgCloud2 = "/Images/asset-207dbb73-c845-477b-98c1-cf72019ab12e.png";
const imgCloud4 = "/Images/asset-f5147741-a43c-48f9-81f3-12823a5b4d3f.png";
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

// ── Nav asset URLs (node 7300-48867) ──────────────────────────────────────────
const imgNavLogo   = "/Images/asset-77e23190-18e8-44ee-a291-2afd60b71878.svg";
const imgNavFi     = "/Images/asset-ced73d69-cb1b-4ed2-a9ff-08b795fd1549.svg";
const imgNavApple  = "/Images/asset-ae0b76f7-15b2-4a17-ad03-611555e2e9da.svg";

// ── Intelligence asset URLs (node 7300:48922) ─────────────────────────────────
const imgIntelIcon  = "/Images/asset-0d27bc45-intel-search.svg";
const imgIntelIcon1 = "/Images/asset-f795357a-intel-location.svg";
const imgIntelIcon2 = "/Images/asset-447d565c-intel-policy.svg";

// ── How It Works Step 01 asset URLs (node 7300:48957) ─────────────────────────
const imgHiwTopImage    = "/Images/asset-6d585e68-0d7f-496f-b018-4e5caf21dcec.png";
const imgHiwCameraImage = "/Images/asset-49ef7b55-4973-4b48-a834-5bd8b06c49c5.png";
const imgHiwEllipse1    = "/Images/asset-5b89eaa9-2c63-4bdc-b764-58e5120d7974.svg";
const imgHiwFlattened   = "/Images/asset-86b895c0-a5f5-4a8b-9e32-263a0e68f3ce.svg";
const imgHiwRectangle1  = "/Images/asset-aafac9b6-51e8-4dce-90ec-e33c5c266600.svg";
const imgHiwVector      = "/Images/asset-a9fba400-bc77-420d-9de0-4da39c0394cf.svg";
const imgHiwVector1     = "/Images/asset-d8920231-1efa-4db9-b77a-6ef32b757dfb.svg";
const imgHiwVector2     = "/Images/asset-45fae47c-d437-4da1-b971-3a16255445ac.svg";
const imgHiwVector3     = "/Images/asset-f88c0c1f-631b-4f69-ad76-8b0f6fa8c05d.svg";
const imgHiwVector4     = "/Images/asset-c2d10e38-14b8-4db6-a401-eb9cf66c19af.svg";

// ── How It Works Step 04 asset URLs ───────────────────────────────────────────
const imgBotMainContentImage = "/Images/asset-step04-passport-screen.png";
const imgBotUserImage        = "/Images/asset-3d5ed216-a1ee-4902-9fd2-cedadd00dfd8.png";
const imgBotFlattened        = "/Images/asset-e7582851-6534-4316-bffb-6af67ae77949.svg";
const imgBotRectangle1       = "/Images/asset-59e8a425-6ea2-47cc-ac21-fb6ccb85ea17.svg";
const imgBotVector           = "/Images/asset-77143b6b-0db1-47ca-8e18-2e5dcdd8b0b7.svg";
const imgBotVector1          = "/Images/asset-790accc2-b7fd-4c40-bc54-92cee0dda7c5.svg";
const imgBotVector2          = "/Images/asset-55ea1d8a-f488-4034-a0ca-22aec953ac57.svg";
const imgBotVector3          = "/Images/asset-d866a98c-a997-4865-9c78-99f1835dc853.svg";
const imgBotVector4          = "/Images/asset-e8f3a0dd-a920-4b77-a1f4-85c12ed26ee9.svg";
const imgBotEllipse1         = "/Images/asset-a77210d8-91c8-4cf5-9588-f4b2ee3c3dd7.svg";

// ── How It Works Step 03 asset URLs ───────────────────────────────────────────
const imgLowLowerImage  = "/Images/asset-60c1185f-d58c-4975-aa4f-d446835553c6.png";
const imgLowCameraImage = "/Images/asset-0f8ffc66-707f-48d6-8c5e-0d4686678c97.png";
const imgLowEllipse1    = "/Images/asset-f8a82626-b0df-4801-9bf1-9b21fed61e7d.svg";
const imgLowFlattened   = "/Images/asset-1eb4e9b5-50ae-4737-b860-f8defb3251a3.svg";
const imgLowRectangle1  = "/Images/asset-29a95fd9-b1ab-49ae-8de9-fe47886689de.svg";
const imgLowVector      = "/Images/asset-f1517653-33ba-40ee-9ed3-fac439550375.svg";
const imgLowVector1     = "/Images/asset-76609896-3674-4262-be50-e4606de0da67.svg";
const imgLowVector2     = "/Images/asset-f08ece90-1cf7-4ee1-8254-28b1dadbf618.svg";
const imgLowVector3     = "/Images/asset-f0c5b442-5145-4c0c-b9d4-8f7f451c46ca.svg";
const imgLowVector4     = "/Images/asset-ede3a099-214e-4d60-b4b3-a2a67c0cea75.svg";

// ── How It Works Step 02 asset URLs ───────────────────────────────────────────
const imgMidMiddleImage = "/Images/asset-e7f0beef-9438-42ea-8d9c-bf615f9c17d2.png";
const imgMidRectangle   = "/Images/asset-be971278-376f-466e-bb3e-c9cd34f5b501.png";
const imgMidFlattened   = "/Images/asset-c48ac6d9-3d7d-4d10-85b3-3c9906085eac.svg";
const imgMidRectangle1  = "/Images/asset-6d489c3b-2eb6-4bf8-a1ab-aff3f3c3f943.svg";
const imgMidVector      = "/Images/asset-f4763a5a-33c1-43c3-a2ab-a84624c380e3.svg";
const imgMidVector1     = "/Images/asset-cb2a9c22-24e5-44e1-871b-62d0170427ad.svg";
const imgMidVector2     = "/Images/asset-957f7264-1684-41d6-9d6a-6520da8833e5.svg";
const imgMidVector3     = "/Images/asset-19981006-88f3-4b0d-8191-fb62bcbacbf5.svg";
const imgMidVector4     = "/Images/asset-de680cb4-0130-41b3-971d-e4a86b594b75.svg";
const imgMidEllipse1    = "/Images/asset-5b15af98-de30-4735-ae96-ada6186e4938.svg";

// ── Scroll reveal hook ────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ── Stat counter hook ─────────────────────────────────────────────────────────
function useCounter(target: number, duration = 1200) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

// ── Mobile Nav overlay + burger trigger ───────────────────────────────────────
function MobileNav({ links }: { links: typeof NAV_LINKS }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setIsOpen(false); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <style>{`
        .mobile-burger {
          display: none;
        }
        @media (max-width: 767px) {
          .mobile-burger {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 5.5px;
            width: 44px;
            height: 44px;
            background: none;
            border: none;
            cursor: pointer;
            padding: 0;
            flex-shrink: 0;
            position: relative;
            z-index: 201;
          }
          .nav-download-btn { display: none !important; }
        }
        .mobile-burger-line {
          display: block;
          width: 22px;
          height: 1.5px;
          background: #1c1917;
          border-radius: 2px;
          transform-origin: center;
          transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1),
                      opacity  200ms ease,
                      width    250ms ease;
        }
        .mobile-burger[aria-expanded="true"] .mobile-burger-line:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }
        .mobile-burger[aria-expanded="true"] .mobile-burger-line:nth-child(2) {
          opacity: 0;
          width: 0;
        }
        .mobile-burger[aria-expanded="true"] .mobile-burger-line:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }
        .mobile-nav-overlay {
          position: fixed;
          inset: 0;
          z-index: 200;
          background: rgba(255, 255, 255, 0.97);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          display: flex;
          flex-direction: column;
          padding: 80px 24px 40px;
          box-sizing: border-box;
          pointer-events: none;
          opacity: 0;
          transform: scale(0.98) translateY(-6px);
          transition: opacity 280ms cubic-bezier(0.4, 0, 0.2, 1),
                      transform 280ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .mobile-nav-overlay.mobile-nav-open {
          pointer-events: all;
          opacity: 1;
          transform: scale(1) translateY(0);
        }
        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          justify-content: center;
          flex: 1;
          gap: 4px;
        }
        .mobile-nav-link {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 60px;
          text-decoration: none;
          font-family: var(--font-inter), sans-serif;
          font-size: 20px;
          font-weight: 400;
          color: #1c1917;
          letter-spacing: -0.3px;
          border-radius: 14px;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 350ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      transform 350ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      background 140ms ease;
        }
        .mobile-nav-overlay.mobile-nav-open .mobile-nav-link {
          opacity: 1;
          transform: translateY(0);
        }
        .mobile-nav-link:hover  { background: rgba(28, 25, 23, 0.05); }
        .mobile-nav-link:active { background: rgba(28, 25, 23, 0.09); }
        .mobile-nav-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          height: 52px;
          border-radius: 999px;
          background: #1c1917;
          border: none;
          cursor: pointer;
          width: 100%;
          flex-shrink: 0;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 350ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      transform 350ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .mobile-nav-overlay.mobile-nav-open .mobile-nav-cta {
          opacity: 1;
          transform: translateY(0);
        }
        .mobile-nav-cta:active { opacity: 0.85; }
      `}</style>

      {/* Burger trigger */}
      <button
        className="mobile-burger"
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen(o => !o)}
      >
        <span className="mobile-burger-line" />
        <span className="mobile-burger-line" />
        <span className="mobile-burger-line" />
      </button>

      {/* Overlay */}
      <nav
        className={`mobile-nav-overlay${isOpen ? " mobile-nav-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
      >
        <div className="mobile-nav-links">
          {links.map(({ label, href }, i) => (
            <a
              key={href}
              href={href}
              className="mobile-nav-link"
              style={{ transitionDelay: isOpen ? `${40 + i * 45}ms` : "0ms" }}
              onClick={() => setIsOpen(false)}
            >
              {label}
            </a>
          ))}
        </div>
        <button
          className="mobile-nav-cta"
          style={{ transitionDelay: isOpen ? `${40 + links.length * 45 + 30}ms` : "0ms" }}
          onClick={() => setIsOpen(false)}
        >
          <span style={{ fontSize: 15, fontWeight: 600, color: "white", lineHeight: "20px" }}>
            Download on the App Store
          </span>
        </button>
      </nav>
    </>
  );
}

// ── Nav (Figma node 7300:47109) ───────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Features",        href: "#features",        section: "features"        },
  { label: "How it works",    href: "#how-it-works",    section: "how-it-works"    },
  { label: "Live Activities", href: "#live-activities", section: "live-activities" },
  { label: "Passport",        href: "#passport",        section: "passport"        },
  { label: "FAQ",             href: "#faq",             section: "faq"             },
];

function Nav() {
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
        data-name="header"
        data-node-id="7300:48867"
        className="nav-header"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          height: 48,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 120px",
          backgroundColor: scrolled ? "rgba(255, 255, 255, 0.75)" : "#ffffff",
          backgroundImage: "none",
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0, 0, 0, 0.08)" : "1px solid #E9EAEF",
          boxShadow: scrolled
            ? "0 0.5px 0 rgba(255,255,255,0.9) inset, 0 1px 12px rgba(0,0,0,0.06)"
            : "none",
          transition: "background 350ms ease, backdrop-filter 350ms ease, border-color 350ms ease, box-shadow 350ms ease",
          boxSizing: "border-box",
        }}
      >
        {/* Left — Logo + wordmark */}
        <button
          onClick={() => window.location.reload()}
          aria-label="Reload page"
          style={{ display: "flex", gap: 8, alignItems: "center", width: 349, flexShrink: 0, background: "none", border: "none", padding: 0, cursor: "pointer" }}
        >
          <img
            alt="Flight Passport"
            src={imgNavLogo}
            style={{ width: 28, height: 28, flexShrink: 0, display: "block" }}
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

// ── Hero Section (responsive full-width) ──────────────────────────────────────
function FigmaHeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [phoneVisible, setPhoneVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [landingMinutes, setLandingMinutes] = useState(6 * 60 + 25);
  const [tickerKey, setTickerKey] = useState(0);
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

  // Landing countdown — decrements every 3–5 s with a ticker animation
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const tick = () => {
      const delay = 3000 + Math.random() * 2000;
      timeout = setTimeout(() => {
        setLandingMinutes(prev => (prev > 1 ? prev - 1 : 6 * 60 + 25));
        setTickerKey(k => k + 1);
        tick();
      }, delay);
    };
    tick();
    return () => clearTimeout(timeout);
  }, []);

  const landingH = Math.floor(landingMinutes / 60);
  const landingM = landingMinutes % 60;
  const landingStr = `${landingH}h ${landingM.toString().padStart(2, '0')}m`;

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
    const badges: [React.RefObject<HTMLDivElement | null>, React.RefObject<HTMLDivElement | null>, number, number][] = [
      [lineRealRef,     pillRealRef,     0,    300],
      [lineAircraftRef, pillAircraftRef, 200,  500],
      [lineConnRef,     pillConnRef,     400,  700],
      [lineHistRef,     pillHistRef,     600,  900],
      [lineDelayRef,    pillDelayRef,    800,  1100],
      [lineGateRef,     pillGateRef,     1000, 1300],
    ];

    function runBadges() {
      badges.forEach(([lineRef, pillRef, lineDelay, pillDelay]) => {
        setTimeout(() => {
          if (lineRef.current) lineRef.current.style.animation = 'line-reveal 0.45s ease-out forwards';
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
        {/* Cloud keyframe — from off-screen right to off-screen left, loop restart invisible */}
        <style>{`
          @keyframes cloudFlight {
            from { translate: 1700px 0px; }
            to   { translate: -900px 0px; }
          }
          @keyframes cardFloatL {
            0%, 100% { transform: translateY(0px); }
            50%       { transform: translateY(-10px); }
          }
          @keyframes cardFloatR {
            0%, 100% { transform: translateY(0px); }
            50%       { transform: translateY(-10px); }
          }
          @keyframes ticker-in {
            0%   { transform: translateY(7px); opacity: 0; }
            100% { transform: translateY(0px); opacity: 1; }
          }
          @keyframes plane-progress {
            0%   { transform: translateX(0px);    opacity: 1; }
            75%  { transform: translateX(235px);  opacity: 1; }
            83%  { transform: translateX(235px);  opacity: 0; }
            84%  { transform: translateX(0px);    opacity: 0; }
            93%  { transform: translateX(0px);    opacity: 1; }
            100% { transform: translateX(0px);    opacity: 1; }
          }
          @keyframes line-reveal {
            from { clip-path: inset(-2px 100% -2px -2px); }
            to   { clip-path: inset(-2px 0%   -2px -2px); }
          }
          @keyframes badge-pop {
            0%   { opacity: 0; transform: scale(0.78); filter: blur(5px); }
            65%  { opacity: 1; transform: scale(1.05); filter: blur(0px); }
            100% { opacity: 1; transform: scale(1);    filter: blur(0px); }
          }

          /* ── Hero Responsive ── */
          @media (max-width: 1100px) {
            .hero-card, .hero-badge { display: none !important; }
            /* When cards hidden — center just the 364px phone */
            .hero-phone-row {
              left: calc(50vw - 182px) !important;
              width: 364px !important;
            }
            .hero-content-container {
              width: 100% !important;
              height: auto !important;
              min-height: 540px !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
            }
          }
          @media (max-width: 767px) {
            /* Sky fills the viewport on mobile */
            .hero-sky-section {
              height: 100svh !important;
              min-height: 620px !important;
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
            /* Buttons: full width, stacked */
            .hero-buttons-row {
              flex-direction: column !important;
              width: 100% !important;
              padding: 0 20px !important;
              box-sizing: border-box !important;
            }
            .hero-buttons-row > * { width: 100% !important; justify-content: center !important; }
            /* Phone: in-flow, centered */
            .hero-main-container { padding-top: 24px !important; }
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
          }
          @media (max-width: 390px) {
            .hero-title span { font-size: 32px !important; letter-spacing: -0.5px !important; }
          }
        `}</style>
        {/* CLOUDS — all left-0, horizontal position set via negative animation-delay */}

        {/* ── Upper sky: distant, faded, slow — z-10 so they fly over the text layer ── */}
        <div className="absolute z-[10] left-0 top-[-50px] w-[280px] h-[140px] opacity-[0.13] pointer-events-none" style={{ animation: "cloudFlight 250s linear -28s infinite", willChange: "translate" }}>
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
        <div className="absolute left-0 top-[180px] w-[393px] h-[252px] rotate-[173.23deg] opacity-[0.30] pointer-events-none" style={{ animation: "cloudFlight 185s linear -14s infinite", willChange: "translate" }}>
          <img alt="" className="block max-w-none w-full h-full" src={imgCloud4} />
        </div>
        <div className="absolute left-0 top-[250px] w-[387px] h-[310px] opacity-[0.36] pointer-events-none" style={{ animation: "cloudFlight 175s linear -88s infinite", willChange: "translate" }}>
          <img alt="" className="block max-w-none w-full h-full" src={imgCloud1} />
        </div>
        <div className="absolute left-0 top-[340px] w-[399px] h-[224px] opacity-[0.28] pointer-events-none" style={{ animation: "cloudFlight 190s linear -52s infinite", willChange: "translate" }}>
          <img alt="" className="block max-w-none w-full h-full" src={imgCloud2} />
        </div>

        {/* ── Lower sky: foreground, denser, faster ── */}
        <div className="absolute left-0 top-[450px] w-[445px] h-[224px] opacity-[0.50] pointer-events-none" style={{ animation: "cloudFlight 120s linear -5s infinite", willChange: "translate" }}>
          <img alt="" className="block max-w-none w-full h-full" src={imgCloud4} />
        </div>
        <div className="absolute left-0 top-[490px] w-[257px] h-[183px] opacity-[0.22] pointer-events-none" style={{ animation: "cloudFlight 125s linear -31s infinite", willChange: "translate" }}>
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


        {/* Sky-to-white fade — eliminates sharp horizon where sky meets page background */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[160px] pointer-events-none z-[6]"
          style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(249,248,246,0.08) 25%, rgba(249,248,246,0.25) 45%, rgba(249,248,246,0.55) 65%, rgba(249,248,246,0.82) 82%, #f9f8f6 100%)' }}
        />

        {/* CONTENT — centered in sky — z-5 keeps text above mid/lower clouds but below upper clouds (z-10) */}
        <div className="hero-sky-content relative z-[7] mx-auto max-w-[1200px] px-5 flex flex-col items-center justify-center h-full pb-[348px]">
          <div className="flex flex-col gap-[40px] items-center">
            <div className="flex flex-col gap-[16px] items-center">
              {/* Title + subtitle */}
              <div className="flex flex-col gap-[16px] items-center relative" data-name="Description Container" data-node-id="7300:48515">
                <div className="hero-description-bg absolute left-[23px] size-[625px] top-[-67px]">
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
        <div className="max-w-[1200px] mx-auto px-5">
        <div className="hero-content-container relative w-[1046px] h-[434px] mx-auto" data-name="Content container" data-node-id="7300:48532">
          {/* Connection awareness pill */}
          <div className="hero-badge absolute flex gap-[8px] items-center left-[704px] top-[176px]" data-node-id="7300:48537">
            <div ref={lineConnRef} className="h-0 relative shrink-0 w-[52px]" style={{ clipPath: 'inset(-2px 100% -2px -2px)' }}>
              <svg width="52" height="1" viewBox="0 0 52 1" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', overflow: 'visible', position: 'absolute', top: '0px' }}><line y1="0.5" x2="52" y2="0.5" stroke="#A8A29E" strokeDasharray="5 5"/></svg>
            </div>
            <div ref={pillConnRef} className="bg-gradient-to-b border border-[#e7e5e4] border-solid flex from-[38.542%] from-white gap-[12px] h-[48px] items-center justify-center px-[16px] py-[12px] relative rounded-[24px] shrink-0 to-[#f5f5f4] w-[251px]" data-name="Connection awareness" data-node-id="7300:48539" style={{ opacity: 0 }}>
              <div className="relative shrink-0 size-[8px]">
                <img alt="" className="absolute block max-w-none size-full" src={imgEllipse2} />
              </div>
              <span className="font-medium text-[17px] text-[#1c1917] text-center whitespace-nowrap leading-[1.4]">Connection awareness</span>
            </div>
          </div>
          {/* Gate & terminal changes pill */}
          <div className="hero-badge absolute flex gap-[8px] items-center left-[29px] top-[176px]" data-node-id="7300:48542">
            <div ref={pillGateRef} className="bg-gradient-to-b border border-[#e7e5e4] border-solid flex from-[38.542%] from-white gap-[12px] h-[48px] items-center justify-center px-[16px] py-[12px] relative rounded-[24px] shrink-0 to-[#f5f5f4] w-[251px]" data-name="Gate & terminal changes" data-node-id="7300:48543" style={{ opacity: 0 }}>
              <div className="relative shrink-0 size-[8px]">
                <img alt="" className="absolute block max-w-none size-full" src={imgEllipse3} />
              </div>
              <span className="font-medium text-[17px] text-[#1c1917] text-center whitespace-nowrap leading-[1.4]">{`Gate & terminal changes`}</span>
            </div>
            <div className="flex items-center justify-center relative shrink-0">
              <div className="flex-none rotate-180">
                <div ref={lineGateRef} className="h-0 relative w-[52px]" style={{ clipPath: 'inset(-2px 100% -2px -2px)' }}>
                  <svg width="52" height="1" viewBox="0 0 52 1" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', overflow: 'visible', position: 'absolute', top: '0px' }}><line y1="0.5" x2="52" y2="0.5" stroke="#A8A29E" strokeDasharray="5 5"/></svg>
                </div>
              </div>
            </div>
          </div>
          {/* Aircraft insights pill */}
          <div className="hero-badge absolute flex gap-[8px] items-center left-[704px] top-[56px]" data-node-id="7300:48547">
            <div ref={lineAircraftRef} className="h-0 relative shrink-0 w-[52px]" style={{ clipPath: 'inset(-2px 100% -2px -2px)' }}>
              <svg width="52" height="1" viewBox="0 0 52 1" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', overflow: 'visible', position: 'absolute', top: '0px' }}><line y1="0.5" x2="52" y2="0.5" stroke="#A8A29E" strokeDasharray="5 5"/></svg>
            </div>
            <div ref={pillAircraftRef} className="bg-gradient-to-b border border-[#e7e5e4] border-solid flex from-[38.542%] from-white gap-[12px] h-[48px] items-center justify-center px-[16px] py-[12px] relative rounded-[24px] shrink-0 to-[#f5f5f4] w-[251px]" data-name="Aircraft insights" data-node-id="7300:48549" style={{ opacity: 0 }}>
              <div className="relative shrink-0 size-[8px]">
                <img alt="" className="absolute block max-w-none size-full" src={imgEllipse4} />
              </div>
              <span className="font-medium text-[17px] text-[#1c1917] text-center whitespace-nowrap leading-[1.4]">Aircraft insights</span>
            </div>
          </div>
          {/* Real-time flight tracking pill */}
          <div className="hero-badge absolute flex gap-[8px] items-center left-[29px] top-[56px]" data-node-id="7300:48552">
            <div ref={pillRealRef} className="bg-gradient-to-b border border-[#e7e5e4] border-solid flex from-[38.542%] from-white gap-[12px] h-[48px] items-center justify-center px-[16px] py-[12px] relative rounded-[24px] shrink-0 to-[#f5f5f4] w-[251px]" data-name="Real-time flight tracking" data-node-id="7300:48553" style={{ opacity: 0 }}>
              <div className="relative shrink-0 size-[8px]">
                <img alt="" className="absolute block max-w-none size-full" src={imgEllipse2} />
              </div>
              <span className="font-medium text-[17px] text-[#1c1917] text-center whitespace-nowrap leading-[1.4]">Real-time flight tracking</span>
            </div>
            <div className="flex items-center justify-center relative shrink-0">
              <div className="flex-none rotate-180">
                <div ref={lineRealRef} className="h-0 relative w-[52px]" style={{ clipPath: 'inset(-2px 100% -2px -2px)' }}>
                  <svg width="52" height="1" viewBox="0 0 52 1" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', overflow: 'visible', position: 'absolute', top: '0px' }}><line y1="0.5" x2="52" y2="0.5" stroke="#A8A29E" strokeDasharray="5 5"/></svg>
                </div>
              </div>
            </div>
          </div>
          {/* Personal flight history pill */}
          <div className="hero-badge absolute flex gap-[8px] items-center left-[704px] top-[296px]" data-node-id="7300:48557">
            <div ref={lineHistRef} className="h-0 relative shrink-0 w-[52px]" style={{ clipPath: 'inset(-2px 100% -2px -2px)' }}>
              <svg width="52" height="1" viewBox="0 0 52 1" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', overflow: 'visible', position: 'absolute', top: '0px' }}><line y1="0.5" x2="52" y2="0.5" stroke="#A8A29E" strokeDasharray="5 5"/></svg>
            </div>
            <div ref={pillHistRef} className="bg-gradient-to-b border border-[#e7e5e4] border-solid flex from-[38.542%] from-white gap-[12px] h-[48px] items-center justify-center px-[16px] py-[12px] relative rounded-[24px] shrink-0 to-[#f5f5f4] w-[251px]" data-name="Personal flight history" data-node-id="7300:48559" style={{ opacity: 0 }}>
              <div className="relative shrink-0 size-[8px]">
                <img alt="" className="absolute block max-w-none size-full" src={imgEllipse5} />
              </div>
              <span className="font-medium text-[17px] text-[#1c1917] text-center whitespace-nowrap leading-[1.4]">Personal flight history</span>
            </div>
          </div>
          {/* Delay predictions pill */}
          <div className="hero-badge absolute flex gap-[8px] items-center left-[29px] top-[296px]" data-node-id="7300:48562">
            <div ref={pillDelayRef} className="bg-gradient-to-b border border-[#e7e5e4] border-solid flex from-[38.542%] from-white gap-[12px] h-[48px] items-center justify-center px-[16px] py-[12px] relative rounded-[24px] shrink-0 to-[#f5f5f4] w-[251px]" data-name="Delay predictions" data-node-id="7300:48563" style={{ opacity: 0 }}>
              <div className="relative shrink-0 size-[8px]">
                <img alt="" className="absolute block max-w-none size-full" src={imgEllipse6} />
              </div>
              <span className="font-medium text-[17px] text-[#1c1917] text-center whitespace-nowrap leading-[1.4]">Delay predictions</span>
            </div>
            <div className="flex items-center justify-center relative shrink-0">
              <div className="flex-none rotate-180">
                <div ref={lineDelayRef} className="h-0 relative w-[52px]" style={{ clipPath: 'inset(-2px 100% -2px -2px)' }}>
                  <svg width="52" height="1" viewBox="0 0 52 1" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', overflow: 'visible', position: 'absolute', top: '0px' }}><line y1="0.5" x2="52" y2="0.5" stroke="#A8A29E" strokeDasharray="5 5"/></svg>
                </div>
              </div>
            </div>
          </div>

        </div>
        </div>
        {/* ── Figma node 7379:46095: flex row [left card | phone | right card] ── */}
        {/* Direct child of hero-main-container (relative w-full, x=0) — 50vw centers correctly */}
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
          {/* Left card — Connection card (Paris to Bangkok) */}
          <div className="hero-card flex flex-col items-start pt-[120px] relative self-stretch shrink-0 w-[291px]">
            <div className="flex items-center justify-center relative shrink-0 w-full">
              <div className="flex-none rotate-[-5.43deg]">
                <img alt="" className="block w-[281px] h-auto" src={imgImage41} style={{ animation: 'cardFloatL 6s ease-in-out 0.6s infinite' }} />
              </div>
            </div>
          </div>

          {/* Phone — Figma node 7379:46770 */}
          <div className="h-[756px] overflow-clip relative shrink-0 w-[364px]" data-name="iphone 18" data-node-id="7379:46770">
            <div className="absolute h-[747px] left-[12px] top-[10px] w-[340px]" data-node-id="7379:46771">
              <div className="absolute h-[755px] left-[0.36px] top-[-4px] w-[341px]" data-name="image 44" data-node-id="7379:46772">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPhoneApp} />
              </div>
              <div className="absolute h-[30.848px] left-[15.36px] top-[187px] w-[74.331px]" data-node-id="7379:46773">
                <div className="absolute bg-[#97d0ef] h-[6px] left-0 rounded-[929.555px] top-[15px] w-[309px]" />
                <div className="absolute bg-gradient-to-l from-white h-[6px] left-0 rounded-[929.555px] to-[rgba(255,255,255,0.04)] top-[15px] w-[65px]" style={{animation:'plane-progress 120s linear infinite'}} />
                <div className="absolute h-[30.848px] left-[45.88px] top-[2px] w-[27.806px]" data-name="Plane Model" data-node-id="7379:46775" style={{animation:'plane-progress 120s linear infinite'}}>
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
              {/* Landing countdown overlay — covers static text in the phone PNG */}
              <div className="absolute" style={{top:'228px', left:'15px', width:'200px', height:'20px', background:'white', display:'flex', alignItems:'center', overflow:'hidden'}}>
                <span style={{fontFamily:'Inter, sans-serif', fontSize:'12px', fontWeight:500, color:'#6b7280', letterSpacing:'0.01em', lineHeight:1}}>Landing in{' '}</span>
                <span key={tickerKey} style={{fontFamily:'Inter, sans-serif', fontSize:'12px', fontWeight:600, color:'#111827', letterSpacing:'0.01em', lineHeight:1, marginLeft:'3px', animation:'ticker-in 0.35s cubic-bezier(0.22,1,0.36,1) both'}}>{landingStr}</span>
              </div>
            </div>
            <div className="absolute h-[756.789px] left-0 top-0 w-[364px]" data-name="Flattened" data-node-id="7379:46808">
              <img alt="" className="absolute block max-w-none size-full" src="/Images/hero-phone-chrome.svg" />
            </div>
            <div className="absolute h-[32.182px] left-[127.64px] top-[21.44px] w-[108.724px]" data-node-id="7379:46809">
              <div className="absolute inset-0 bg-black rounded-[20px]" />
            </div>
          </div>

          {/* Right card — Journey card (San Francisco to Tokyo) */}
          <div className="hero-card flex flex-col items-start pt-[120px] relative self-stretch shrink-0 w-[292px]">
            <div className="flex items-center justify-center relative shrink-0 w-full">
              <div className="flex-none rotate-[6.23deg]">
                <img alt="" className="block w-[281px] h-auto" src={imgImage40} style={{ animation: 'cardFloatR 7s ease-in-out 0.8s infinite' }} />
              </div>
            </div>
          </div>
        </div>
        {/* AIRLINES STRIP */}
        <div className="w-full bg-[#f9f8f6] mt-[64px]">
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

// ── Intelligence ──────────────────────────────────────────────────────────────
function Intelligence() {
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
    .intel-panel { flex: none !important; min-width: unset !important; }
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
        <p className="intel-section-sub" style={{fontFamily: 'Inter', fontWeight: 400, fontSize: '15px', color: '#6c6760', lineHeight: 1.4, maxWidth: '510px', width: '100%', textAlign: 'center'}}>
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
            <p style={{fontFamily: 'Inter', fontWeight: 400, fontSize: '16px', color: '#78716c', lineHeight: '24px', width: '308px', textAlign: 'center'}}>Delay history, reliability scores, aircraft details, and turbulence forecasts before you choose a flight.</p>
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
            <p style={{fontFamily: 'Inter', fontWeight: 400, fontSize: '16px', color: '#78716c', lineHeight: '24px', textAlign: 'center'}}>Boarding alerts, gate changes, connection timing, and live progress — across multi-leg journeys.</p>
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
            <p style={{fontFamily: 'Inter', fontWeight: 400, fontSize: '16px', color: '#78716c', lineHeight: '24px', width: '286px', textAlign: 'center'}}>Every completed journey is recorded automatically — countries, airlines, distance, aircraft types.</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>
</>
  );
}

// ── How it works ──────────────────────────────────────────────────────────────
function HowItWorks() {
  const textRef  = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = [
      { el: textRef.current,  delay: 0,   fromX: "translateY(24px)", toX: "translateY(0)",  duration: 500 },
      { el: phoneRef.current, delay: 100, fromX: "scale(0.96)", toX: "scale(1)", duration: 600, easing: "ease" as const },
    ];
    const observers: IntersectionObserver[] = [];
    items.forEach(({ el, delay, fromX, toX, duration, easing = "cubic-bezier(0.25,0.46,0.45,0.94)" }) => {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = fromX;
      el.style.transition = `opacity ${duration}ms ${easing}, transform ${duration}ms ${easing}`;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => { el.style.opacity = "1"; el.style.transform = toX; }, delay);
            obs.disconnect();
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
        .hiw-section {
          background-image: linear-gradient(261.66deg, #e6e6e6 6.85%, #ffffff 83.93%);
          border-top: 1px solid #e7e5e4;
          border-bottom: 1px solid #e7e5e4;
          padding: 120px 24px;
          width: 100%;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .hiw-content {
          display: flex;
          flex-direction: row;
          gap: 80px;
          align-items: center;
          justify-content: center;
          width: 1020px;
          max-width: 100%;
        }
        .hiw-text-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 24px;
          flex-shrink: 0;
          width: 384px;
        }
        .hiw-phone-wrap {
          display: flex;
          align-items: center;
          width: 238px;
          flex-shrink: 0;
        }
        @media (max-width: 1023px) {
          .hiw-content {
            flex-direction: column-reverse;
            width: 100%;
            gap: 48px;
          }
          .hiw-phone-wrap {
            width: 70vw;
            max-width: 260px;
          }
          .hiw-text-block {
            width: 100%;
            max-width: 384px;
          }
        }
        @media (max-width: 767px) {
          .hiw-section { padding: 64px 20px; }
          .hiw-content { flex-direction: column !important; gap: 32px !important; }
          .hiw-phone-wrap { width: 320px !important; max-width: 320px !important; margin: 0 auto !important; justify-content: center !important; }
          .hiw-title  { font-size: clamp(24px, 6vw, 30px) !important; letter-spacing: -0.5px !important; }
          .hiw-desc   { font-size: 15px !important; }
        }
      `}</style>
      <section
        id="how-it-works"
        className="hiw-section"
        data-name="Top Section"
        data-node-id="7300-48957"
      >
        <div className="hiw-content" data-name="Top Content" data-node-id="7300-48958">

          {/* LEFT — Text block */}
          <div
            ref={textRef}
            className="hiw-text-block"
            data-name="Top Text Container"
            data-node-id="7300-48959"
          >
            <div
              data-name="Top Text Box"
              data-node-id="7300-48960"
              style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center", width: "100%" }}
            >
              {/* Step label pill */}
              <div
                data-name="Step Label"
                data-node-id="7300-48961"
                style={{
                  backgroundImage: "linear-gradient(to bottom, #ffffff 38.5%, #f5f5f4)",
                  border: "1px solid #e7e5e4",
                  borderRadius: 24,
                  padding: "12px 16px",
                  display: "flex",
                  flexDirection: "row",
                  gap: 12,
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <div
                  data-node-id="7300-48962"
                  style={{ position: "relative", flexShrink: 0, width: 8, height: 8 }}
                >
                  <img
                    alt=""
                    src={imgHiwEllipse1}
                    style={{ position: "absolute", display: "block", maxWidth: "none", width: "100%", height: "100%" }}
                  />
                </div>
                <p
                  data-node-id="7300-48963"
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontWeight: 600,
                    fontSize: 16,
                    color: "#a8a29e",
                    letterSpacing: "-0.16px",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    margin: 0,
                    lineHeight: 1.4,
                  }}
                >
                  Step 01
                </p>
              </div>

              {/* Title */}
              <p
                className="hiw-title"
                data-node-id="7300-48964"
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontWeight: 700,
                  fontSize: 32,
                  color: "#1c1917",
                  letterSpacing: "-0.64px",
                  lineHeight: 1.2,
                  textAlign: "center",
                  margin: 0,
                  width: "100%",
                }}
              >
                Add your flight
              </p>

              {/* Body */}
              <p
                className="hiw-desc"
                data-node-id="7300-48965"
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontWeight: 400,
                  fontSize: 16,
                  color: "#6c6760",
                  lineHeight: "24px",
                  textAlign: "center",
                  width: 323,
                  margin: 0,
                }}
              >
                Enter a flight number or search by route. Full operational data loads instantly.
              </p>
            </div>
          </div>

          {/* RIGHT — Phone */}
          <div
            className="hiw-phone-wrap"
            data-name="Screen Container"
            data-node-id="7300-48966"
          >
            <div
              ref={phoneRef}
              data-name="Top Image Container"
              data-node-id="7300-48967"
              style={{
                background: "white",
                borderRadius: 48,
                boxShadow: "0px 4px 12px 0px rgba(0,0,0,0.05), 32px 32px 64px 0px rgba(23,29,46,0.12)",
                flexShrink: 0,
                width: 233,
              }}
            >
              {/* Phone Frame */}
              <div
                data-name="Phone Frame"
                data-node-id="7300-48968"
                style={{ height: 504.526, position: "relative", flexShrink: 0, width: 242.667 }}
              >
                {/* Screen Frame */}
                <div
                  data-name="Screen Frame"
                  data-node-id="7300-48969"
                  style={{
                    position: "absolute",
                    background: "white",
                    height: 490.708,
                    left: 5.32,
                    overflow: "hidden",
                    borderRadius: 29.817,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 226.355,
                  }}
                >
                  <div
                    data-name="Top Image"
                    data-node-id="7300-48970"
                    style={{ position: "absolute", height: 490.667, left: -0.16, top: -0.24, width: 226.667 }}
                  >
                    <img
                      alt=""
                      src={imgHiwTopImage}
                      style={{ position: "absolute", inset: 0, maxWidth: "none", objectFit: "cover", pointerEvents: "none", width: "100%", height: "100%" }}
                    />
                  </div>
                </div>

                {/* Flattened overlay — phone chrome */}
                <div
                  data-name="Flattened"
                  data-node-id="7300-48971"
                  style={{ position: "absolute", height: 504.526, left: -2.83, top: 0, width: 242.667 }}
                >
                  <img
                    alt=""
                    src={imgHiwFlattened}
                    style={{ position: "absolute", display: "block", maxWidth: "none", width: "100%", height: "100%" }}
                  />
                </div>

                {/* Top notch group */}
                <div
                  data-name="Top Group Container"
                  data-node-id="7300-48972"
                  style={{ position: "absolute", height: 21.455, left: 82.26, top: 14.29, width: 72.483 }}
                >
                  {/* Notch background */}
                  <div
                    data-node-id="7300-48973"
                    style={{ position: "absolute", height: 21.455, left: 0, top: 0, width: 72.483 }}
                  >
                    <img
                      alt=""
                      src={imgHiwRectangle1}
                      style={{ position: "absolute", display: "block", maxWidth: "none", width: "100%", height: "100%" }}
                    />
                  </div>

                  {/* Camera detail — Vector */}
                  <div
                    data-name="Vector"
                    data-node-id="7300-48975"
                    style={{ position: "absolute", inset: "28.68% 12.22% 28.7% 75.16%" }}
                  >
                    <img alt="" src={imgHiwVector} style={{ position: "absolute", display: "block", maxWidth: "none", width: "100%", height: "100%" }} />
                  </div>

                  {/* Camera lens image */}
                  <div
                    data-name="Camera Image"
                    data-node-id="7300-48976"
                    aria-hidden="true"
                    style={{ position: "absolute", inset: "28.65% 12.21% 28.71% 75.17%" }}
                  >
                    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
                        <img alt="" src={imgHiwCameraImage} style={{ position: "absolute", left: 0, top: 0, maxWidth: "none", width: "100%", height: "100%" }} />
                      </div>
                      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }} />
                    </div>
                  </div>

                  {/* Vector1 */}
                  <div
                    data-name="Vector"
                    data-node-id="7300-48977"
                    style={{ position: "absolute", inset: "37.82% 14.93% 37.83% 77.86%" }}
                  >
                    <img alt="" src={imgHiwVector1} style={{ position: "absolute", display: "block", maxWidth: "none", width: "100%", height: "100%" }} />
                  </div>

                  {/* Vector2 */}
                  <div
                    data-name="Vector"
                    data-node-id="7300-48979"
                    style={{ position: "absolute", inset: "39.34% 15.38% 39.35% 78.31%" }}
                  >
                    <img alt="" src={imgHiwVector2} style={{ position: "absolute", display: "block", maxWidth: "none", width: "100%", height: "100%" }} />
                  </div>

                  {/* Vector3 — mix-blend-multiply */}
                  <div
                    data-name="Vector"
                    data-node-id="7300-48980"
                    style={{ position: "absolute", inset: "39.34% 15.38% 39.35% 78.31%", mixBlendMode: "multiply" }}
                  >
                    <img alt="" src={imgHiwVector3} style={{ position: "absolute", display: "block", maxWidth: "none", width: "100%", height: "100%" }} />
                  </div>

                  {/* Vector4 — mix-blend-screen */}
                  <div
                    data-name="Vector"
                    data-node-id="7300-48981"
                    style={{ position: "absolute", inset: "51.75% 15.67% 40.64% 82.07%", mixBlendMode: "screen" }}
                  >
                    <img alt="" src={imgHiwVector4} style={{ position: "absolute", display: "block", maxWidth: "none", width: "100%", height: "100%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

// ── How it works — Step 02 ────────────────────────────────────────────────────
function MiddleSection() {
  const textRef  = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = [
      { el: textRef.current,  delay: 0,   fromX: "translateY(24px)", toX: "translateY(0)", duration: 500 },
      { el: phoneRef.current, delay: 100, fromX: "scale(0.96)", toX: "scale(1)", duration: 600, easing: "ease" as const },
    ];
    const observers: IntersectionObserver[] = [];
    items.forEach(({ el, delay, fromX, toX, duration, easing = "cubic-bezier(0.25,0.46,0.45,0.94)" }) => {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = fromX;
      el.style.transition = `opacity ${duration}ms ${easing}, transform ${duration}ms ${easing}`;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => { el.style.opacity = "1"; el.style.transform = toX; }, delay);
            obs.disconnect();
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
        .mid-section {
          background: #ffffff;
          padding: 120px 24px;
          width: 100%;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .mid-content {
          display: flex;
          flex-direction: row;
          gap: 80px;
          align-items: center;
          justify-content: center;
          width: 1020px;
          max-width: 100%;
        }
        .mid-phone-wrap {
          display: flex;
          align-items: center;
          width: 237px;
          flex-shrink: 0;
        }
        .mid-text-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 24px;
          flex-shrink: 0;
          width: 384px;
        }
        @media (max-width: 1023px) {
          .mid-content {
            flex-direction: column;
            width: 100%;
            gap: 48px;
          }
          .mid-phone-wrap {
            width: 70vw;
            max-width: 260px;
          }
          .mid-text-block {
            width: 100%;
            max-width: 384px;
          }
        }
        @media (max-width: 767px) {
          .mid-section { padding: 64px 20px; }
          .mid-content { flex-direction: column-reverse !important; gap: 32px !important; }
          .mid-phone-wrap { max-width: 240px !important; }
        }
      `}</style>
      <section
        className="mid-section"
        data-name="Middle Section"
      >
        <div className="mid-content">

          {/* LEFT — Phone */}
          <div className="mid-phone-wrap">
            <div
              ref={phoneRef}
              style={{
                background: "white",
                borderRadius: 48,
                boxShadow: "0px 4px 12px 0px rgba(0,0,0,0.05), 32px 32px 64px 0px rgba(23,29,46,0.12)",
                flexShrink: 0,
                width: 237,
              }}
            >
              {/* Phone Frame */}
              <div
                style={{ height: 504.526, position: "relative", flexShrink: 0, width: 242.667 }}
              >
                {/* Screen Frame */}
                <div
                  style={{
                    position: "absolute",
                    background: "white",
                    height: 490.708,
                    left: 5.16,
                    overflow: "hidden",
                    borderRadius: 29.817,
                    top: "50%",
                    transform: "translateY(-50%) translateY(-0.47px)",
                    width: 226.355,
                  }}
                >
                  <div
                    style={{ position: "absolute", height: 490.667, left: -0.16, top: -0.24, width: 226.667 }}
                  >
                    <img
                      alt=""
                      src={imgMidMiddleImage}
                      style={{ position: "absolute", inset: 0, maxWidth: "none", objectFit: "cover", pointerEvents: "none", width: "100%", height: "100%" }}
                    />
                  </div>
                </div>

                {/* Flattened — phone chrome */}
                <div
                  style={{ position: "absolute", left: -3, top: -0.47, width: 242.667, height: 504.526 }}
                >
                  <img
                    alt=""
                    src={imgMidFlattened}
                    style={{ position: "absolute", display: "block", maxWidth: "none", width: "100%", height: "100%" }}
                  />
                </div>

                {/* Notch group */}
                <div
                  style={{ position: "absolute", height: 21.455, left: 82.09, top: 13.82, width: 72.483 }}
                >
                  {/* Notch background */}
                  <div
                    style={{ position: "absolute", height: 21.455, left: 0, top: 0, width: 72.483 }}
                  >
                    <img
                      alt=""
                      src={imgMidRectangle1}
                      style={{ position: "absolute", display: "block", maxWidth: "none", width: "100%", height: "100%" }}
                    />
                  </div>

                  {/* Camera detail — Vector */}
                  <div style={{ position: "absolute", inset: "28.68% 12.22% 28.7% 75.16%" }}>
                    <img alt="" src={imgMidVector} style={{ position: "absolute", display: "block", maxWidth: "none", width: "100%", height: "100%" }} />
                  </div>

                  {/* Camera lens image — imgRectangle with dark overlay */}
                  <div
                    aria-hidden="true"
                    style={{ position: "absolute", inset: "28.65% 12.21% 28.71% 75.17%" }}
                  >
                    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
                        <img alt="" src={imgMidRectangle} style={{ position: "absolute", left: 0, top: 0, maxWidth: "none", width: "100%", height: "100%" }} />
                      </div>
                      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }} />
                    </div>
                  </div>

                  {/* Vector1 */}
                  <div style={{ position: "absolute", inset: "37.82% 14.93% 37.83% 77.86%" }}>
                    <img alt="" src={imgMidVector1} style={{ position: "absolute", display: "block", maxWidth: "none", width: "100%", height: "100%" }} />
                  </div>

                  {/* Vector2 */}
                  <div style={{ position: "absolute", inset: "39.34% 15.38% 39.35% 78.31%" }}>
                    <img alt="" src={imgMidVector2} style={{ position: "absolute", display: "block", maxWidth: "none", width: "100%", height: "100%" }} />
                  </div>

                  {/* Vector3 — mix-blend-multiply */}
                  <div style={{ position: "absolute", inset: "39.34% 15.38% 39.35% 78.31%", mixBlendMode: "multiply" }}>
                    <img alt="" src={imgMidVector3} style={{ position: "absolute", display: "block", maxWidth: "none", width: "100%", height: "100%" }} />
                  </div>

                  {/* Vector4 — mix-blend-screen */}
                  <div style={{ position: "absolute", inset: "51.75% 15.67% 40.64% 82.07%", mixBlendMode: "screen" }}>
                    <img alt="" src={imgMidVector4} style={{ position: "absolute", display: "block", maxWidth: "none", width: "100%", height: "100%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Text block */}
          <div
            ref={textRef}
            className="mid-text-block"
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center", width: "100%" }}
            >
              {/* Step label pill */}
              <div
                style={{
                  backgroundImage: "linear-gradient(to bottom, #ffffff 38.5%, #f5f5f4)",
                  border: "1px solid #e7e5e4",
                  borderRadius: 24,
                  padding: "12px 16px",
                  display: "flex",
                  flexDirection: "row",
                  gap: 12,
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <div style={{ position: "relative", flexShrink: 0, width: 8, height: 8 }}>
                  <img
                    alt=""
                    src={imgMidEllipse1}
                    style={{ position: "absolute", display: "block", maxWidth: "none", width: "100%", height: "100%" }}
                  />
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontWeight: 600,
                    fontSize: 16,
                    color: "#a8a29e",
                    letterSpacing: "-0.16px",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    margin: 0,
                    lineHeight: 1.4,
                  }}
                >
                  Step 02
                </p>
              </div>

              {/* Title */}
              <p
                className="hiw-title"
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontWeight: 700,
                  fontSize: 32,
                  color: "#1c1917",
                  letterSpacing: "-0.64px",
                  lineHeight: 1.2,
                  textAlign: "center",
                  margin: 0,
                  width: "100%",
                }}
              >
                Understand it
              </p>

              {/* Body */}
              <p
                className="hiw-desc"
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontWeight: 400,
                  fontSize: 16,
                  color: "#6c6760",
                  lineHeight: "24px",
                  textAlign: "center",
                  width: 328,
                  margin: 0,
                }}
              >
                Review delay history, aircraft info, and turbulence before you reach the airport.
              </p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

// ── How it works — Step 03 ────────────────────────────────────────────────────
function LowerSection() {
  const textRef  = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = [
      { el: textRef.current,  delay: 0,   fromX: "translateY(24px)", toX: "translateY(0)", duration: 500 },
      { el: phoneRef.current, delay: 100, fromX: "scale(0.96)", toX: "scale(1)", duration: 600, easing: "ease" as const },
    ];
    const observers: IntersectionObserver[] = [];
    items.forEach(({ el, delay, fromX, toX, duration, easing = "cubic-bezier(0.25,0.46,0.45,0.94)" }) => {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = fromX;
      el.style.transition = `opacity ${duration}ms ${easing}, transform ${duration}ms ${easing}`;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => { el.style.opacity = "1"; el.style.transform = toX; }, delay);
            obs.disconnect();
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
        .low-section {
          background-image: linear-gradient(261.66deg, #e6e6e6 6.85%, #ffffff 83.93%);
          border-top: 1px solid #e7e5e4;
          border-bottom: 1px solid #e7e5e4;
          padding: 120px 24px;
          width: 100%;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .low-content {
          display: flex;
          flex-direction: row;
          gap: 80px;
          align-items: center;
          justify-content: center;
          width: 1020px;
          max-width: 100%;
        }
        .low-text-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 24px;
          flex-shrink: 0;
          width: 384px;
        }
        .low-phone-wrap {
          display: flex;
          align-items: center;
          width: 238px;
          flex-shrink: 0;
        }
        @media (max-width: 1023px) {
          .low-content {
            flex-direction: column-reverse;
            width: 100%;
            gap: 48px;
          }
          .low-phone-wrap {
            width: 70vw;
            max-width: 260px;
          }
          .low-text-block {
            width: 100%;
            max-width: 384px;
          }
        }
        @media (max-width: 767px) {
          .low-section { padding: 64px 20px; }
          .low-content { flex-direction: column !important; gap: 32px !important; }
          .low-phone-wrap { max-width: 240px !important; }
        }
      `}</style>
      <section
        className="low-section"
        data-name="Lower Section"
      >
        <div className="low-content">

          {/* LEFT — Text block */}
          <div ref={textRef} className="low-text-block">
            <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center", width: "100%" }}>

              {/* Step label pill */}
              <div
                style={{
                  backgroundImage: "linear-gradient(to bottom, #ffffff 38.5%, #f5f5f4)",
                  border: "1px solid #e7e5e4",
                  borderRadius: 24,
                  padding: "12px 16px",
                  display: "flex",
                  flexDirection: "row",
                  gap: 12,
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <div style={{ position: "relative", flexShrink: 0, width: 8, height: 8 }}>
                  <img
                    alt=""
                    src={imgLowEllipse1}
                    style={{ position: "absolute", display: "block", maxWidth: "none", width: "100%", height: "100%" }}
                  />
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontWeight: 600,
                    fontSize: 16,
                    color: "#a8a29e",
                    letterSpacing: "-0.16px",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    margin: 0,
                    lineHeight: 1.4,
                  }}
                >
                  Step 03
                </p>
              </div>

              {/* Title */}
              <p
                className="hiw-title"
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontWeight: 700,
                  fontSize: 32,
                  color: "#1c1917",
                  letterSpacing: "-0.64px",
                  lineHeight: 1.2,
                  textAlign: "center",
                  margin: 0,
                  width: "100%",
                }}
              >
                Track in real time
              </p>

              {/* Body */}
              <p
                className="hiw-desc"
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontWeight: 400,
                  fontSize: 16,
                  color: "#6c6760",
                  lineHeight: "24px",
                  textAlign: "center",
                  margin: 0,
                }}
              >
                Live updates on every leg — boarding, gate changes, connection windows, arrival.
              </p>
            </div>
          </div>

          {/* RIGHT — Phone */}
          <div className="low-phone-wrap">
            <div
              ref={phoneRef}
              style={{
                background: "white",
                borderRadius: 48,
                boxShadow: "0px 4px 12px 0px rgba(0,0,0,0.05), 32px 32px 64px 0px rgba(23,29,46,0.12)",
                flexShrink: 0,
                width: 238,
              }}
            >
              {/* Phone Frame */}
              <div style={{ height: 504.526, position: "relative", flexShrink: 0, width: 242.667 }}>

                {/* Screen Frame */}
                <div
                  style={{
                    position: "absolute",
                    background: "white",
                    height: 490.708,
                    left: 5.66,
                    overflow: "hidden",
                    borderRadius: 29.817,
                    top: "50%",
                    transform: "translateY(-50%) translateY(0.05px)",
                    width: 226.355,
                  }}
                >
                  <div style={{ position: "absolute", height: 490.667, left: -0.16, top: -0.24, width: 226.667 }}>
                    <img
                      alt=""
                      src={imgLowLowerImage}
                      style={{ position: "absolute", inset: 0, maxWidth: "none", objectFit: "cover", pointerEvents: "none", width: "100%", height: "100%" }}
                    />
                  </div>
                </div>

                {/* Flattened — phone chrome */}
                <div style={{ position: "absolute", left: -2.5, top: 0.05, width: 242.667, height: 504.526 }}>
                  <img
                    alt=""
                    src={imgLowFlattened}
                    style={{ position: "absolute", display: "block", maxWidth: "none", width: "100%", height: "100%" }}
                  />
                </div>

                {/* Notch group */}
                <div style={{ position: "absolute", height: 21.455, left: 82.59, top: 14.34, width: 72.483 }}>

                  {/* Notch background */}
                  <div style={{ position: "absolute", height: 21.455, left: 0, top: 0, width: 72.483 }}>
                    <img
                      alt=""
                      src={imgLowRectangle1}
                      style={{ position: "absolute", display: "block", maxWidth: "none", width: "100%", height: "100%" }}
                    />
                  </div>

                  {/* Camera detail — Vector */}
                  <div style={{ position: "absolute", inset: "28.68% 12.22% 28.7% 75.16%" }}>
                    <img alt="" src={imgLowVector} style={{ position: "absolute", display: "block", maxWidth: "none", width: "100%", height: "100%" }} />
                  </div>

                  {/* Camera lens — imgCameraImage with dark overlay */}
                  <div aria-hidden="true" style={{ position: "absolute", inset: "28.65% 12.21% 28.71% 75.17%" }}>
                    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
                        <img alt="" src={imgLowCameraImage} style={{ position: "absolute", left: 0, top: 0, maxWidth: "none", width: "100%", height: "100%" }} />
                      </div>
                      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }} />
                    </div>
                  </div>

                  {/* Vector1 */}
                  <div style={{ position: "absolute", inset: "37.82% 14.93% 37.83% 77.86%" }}>
                    <img alt="" src={imgLowVector1} style={{ position: "absolute", display: "block", maxWidth: "none", width: "100%", height: "100%" }} />
                  </div>

                  {/* Vector2 */}
                  <div style={{ position: "absolute", inset: "39.34% 15.38% 39.35% 78.31%" }}>
                    <img alt="" src={imgLowVector2} style={{ position: "absolute", display: "block", maxWidth: "none", width: "100%", height: "100%" }} />
                  </div>

                  {/* Vector3 — mix-blend-multiply */}
                  <div style={{ position: "absolute", inset: "39.34% 15.38% 39.35% 78.31%", mixBlendMode: "multiply" }}>
                    <img alt="" src={imgLowVector3} style={{ position: "absolute", display: "block", maxWidth: "none", width: "100%", height: "100%" }} />
                  </div>

                  {/* Vector4 — mix-blend-screen */}
                  <div style={{ position: "absolute", inset: "51.75% 15.67% 40.64% 82.07%", mixBlendMode: "screen" }}>
                    <img alt="" src={imgLowVector4} style={{ position: "absolute", display: "block", maxWidth: "none", width: "100%", height: "100%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

// ── How it works — Step 04 ────────────────────────────────────────────────────
function BottomSection() {
  const textRef  = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = [
      { el: textRef.current,  delay: 0,   fromX: "translateY(24px)", toX: "translateY(0)", duration: 500 },
      { el: phoneRef.current, delay: 100, fromX: "scale(0.96)", toX: "scale(1)", duration: 600, easing: "ease" as const },
    ];
    const observers: IntersectionObserver[] = [];
    items.forEach(({ el, delay, fromX, toX, duration, easing = "cubic-bezier(0.25,0.46,0.45,0.94)" }) => {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = fromX;
      el.style.transition = `opacity ${duration}ms ${easing}, transform ${duration}ms ${easing}`;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => { el.style.opacity = "1"; el.style.transform = toX; }, delay);
            obs.disconnect();
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
        .bot-section {
          background: #ffffff;
          padding: 120px 24px;
          width: 100%;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .bot-content {
          display: flex;
          flex-direction: row;
          gap: 80px;
          align-items: center;
          justify-content: center;
          width: 1020px;
          max-width: 100%;
        }
        .bot-phone-wrap {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }
        .bot-text-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 24px;
          flex-shrink: 0;
          width: 384px;
        }
        @media (max-width: 1023px) {
          .bot-content {
            flex-direction: column;
            width: 100%;
            gap: 48px;
          }
          .bot-phone-wrap {
            width: 70vw;
            max-width: 260px;
          }
          .bot-text-block {
            width: 100%;
            max-width: 384px;
          }
        }
        @media (max-width: 767px) {
          .bot-section { padding: 64px 20px; }
          .bot-content { flex-direction: column-reverse !important; gap: 32px !important; }
          .bot-phone-wrap { max-width: 240px !important; }
        }
      `}</style>
      <section className="bot-section" data-name="Bottom Section">
        <div className="bot-content">

          {/* LEFT — Phone */}
          <div className="bot-phone-wrap">
            <div
              ref={phoneRef}
              style={{
                background: "white",
                borderRadius: 48,
                boxShadow: "0px 4px 12px 0px rgba(0,0,0,0.05), 32px 32px 64px 0px rgba(23,29,46,0.12)",
                flexShrink: 0,
                width: 242.667,
              }}
            >
              {/* Phone Frame */}
              <div style={{ height: 504.526, position: "relative", flexShrink: 0, width: 242.667 }}>

                {/* Screen Frame */}
                <div
                  style={{
                    position: "absolute",
                    background: "white",
                    height: 490.708,
                    left: 8.16,
                    overflow: "hidden",
                    borderRadius: 29.817,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 226.355,
                  }}
                >
                  <div style={{ position: "absolute", height: "126.52%", left: -0.16, top: "-0.22%", width: 226.667 }}>
                    <img
                      alt=""
                      src={imgBotMainContentImage}
                      style={{ position: "absolute", inset: 0, maxWidth: "none", pointerEvents: "none", width: "100%", height: "100%" }}
                    />
                  </div>
                </div>

                {/* Flattened — phone chrome */}
                <div style={{ position: "absolute", left: 0, top: 0, width: 242.667, height: 504.526 }}>
                  <img
                    alt=""
                    src={imgBotFlattened}
                    style={{ position: "absolute", display: "block", maxWidth: "none", width: "100%", height: "100%" }}
                  />
                </div>

                {/* Notch group */}
                <div style={{ position: "absolute", height: 21.455, left: 85.09, top: 14.29, width: 72.483 }}>

                  {/* Notch background */}
                  <div style={{ position: "absolute", height: 21.455, left: 0, top: 0, width: 72.483 }}>
                    <img
                      alt=""
                      src={imgBotRectangle1}
                      style={{ position: "absolute", display: "block", maxWidth: "none", width: "100%", height: "100%" }}
                    />
                  </div>

                  {/* Camera detail — Vector */}
                  <div style={{ position: "absolute", inset: "28.68% 12.22% 28.7% 75.16%" }}>
                    <img alt="" src={imgBotVector} style={{ position: "absolute", display: "block", maxWidth: "none", width: "100%", height: "100%" }} />
                  </div>

                  {/* Camera lens — imgUserImage with dark overlay */}
                  <div aria-hidden="true" style={{ position: "absolute", inset: "28.65% 12.21% 28.71% 75.17%" }}>
                    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
                        <img alt="" src={imgBotUserImage} style={{ position: "absolute", left: 0, top: 0, maxWidth: "none", width: "100%", height: "100%" }} />
                      </div>
                      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }} />
                    </div>
                  </div>

                  {/* Vector1 */}
                  <div style={{ position: "absolute", inset: "37.82% 14.93% 37.83% 77.86%" }}>
                    <img alt="" src={imgBotVector1} style={{ position: "absolute", display: "block", maxWidth: "none", width: "100%", height: "100%" }} />
                  </div>

                  {/* Vector2 */}
                  <div style={{ position: "absolute", inset: "39.34% 15.38% 39.35% 78.31%" }}>
                    <img alt="" src={imgBotVector2} style={{ position: "absolute", display: "block", maxWidth: "none", width: "100%", height: "100%" }} />
                  </div>

                  {/* Vector3 — mix-blend-multiply */}
                  <div style={{ position: "absolute", inset: "39.34% 15.38% 39.35% 78.31%", mixBlendMode: "multiply" }}>
                    <img alt="" src={imgBotVector3} style={{ position: "absolute", display: "block", maxWidth: "none", width: "100%", height: "100%" }} />
                  </div>

                  {/* Vector4 — mix-blend-screen */}
                  <div style={{ position: "absolute", inset: "51.75% 15.67% 40.64% 82.07%", mixBlendMode: "screen" }}>
                    <img alt="" src={imgBotVector4} style={{ position: "absolute", display: "block", maxWidth: "none", width: "100%", height: "100%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Text block */}
          <div ref={textRef} className="bot-text-block">
            <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center", width: "100%" }}>

              {/* Step label pill */}
              <div
                style={{
                  backgroundImage: "linear-gradient(to bottom, #ffffff 38.5%, #f5f5f4)",
                  border: "1px solid #e7e5e4",
                  borderRadius: 24,
                  padding: "12px 16px",
                  display: "flex",
                  flexDirection: "row",
                  gap: 12,
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <div style={{ position: "relative", flexShrink: 0, width: 8, height: 8 }}>
                  <img
                    alt=""
                    src={imgBotEllipse1}
                    style={{ position: "absolute", display: "block", maxWidth: "none", width: "100%", height: "100%" }}
                  />
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontWeight: 600,
                    fontSize: 16,
                    color: "#a8a29e",
                    letterSpacing: "-0.16px",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    margin: 0,
                    lineHeight: 1.4,
                  }}
                >
                  Step 04
                </p>
              </div>

              {/* Title */}
              <p
                className="hiw-title"
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontWeight: 700,
                  fontSize: 32,
                  color: "#1c1917",
                  letterSpacing: "-0.64px",
                  lineHeight: 1.2,
                  textAlign: "center",
                  margin: 0,
                  width: "100%",
                }}
              >
                Save to passport
              </p>

              {/* Body */}
              <p
                className="hiw-desc"
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontWeight: 400,
                  fontSize: 16,
                  color: "#6c6760",
                  lineHeight: "24px",
                  textAlign: "center",
                  width: 357,
                  margin: 0,
                }}
              >
                Completed journeys are recorded automatically to your personal travel history.
              </p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

// ── Live Activities ───────────────────────────────────────────────────────────
const LA_CARDS = [
  { src: "/Images/Live%20Activity%20Cards/BOARDING.png",            alt: "Boarding now"       },
  { src: "/Images/Live%20Activity%20Cards/GATE_CHANGED.png",        alt: "Gate changed"       },
  { src: "/Images/Live%20Activity%20Cards/IN_AIR.png",              alt: "In air"             },
  { src: "/Images/Live%20Activity%20Cards/CONNECTION_AT_RISK.png",  alt: "Connection at risk" },
  { src: "/Images/Live%20Activity%20Cards/ARRIVED_FINAL.png",       alt: "Arrived"            },
  { src: "/Images/Live%20Activity%20Cards/CANCELLED.png",           alt: "Cancelled"          },
];

function LiveActivities() {
  const headerRef  = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([]);
  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.currentTarget.classList.add('la-card-pressing');
  }
  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    e.currentTarget.classList.remove('la-card-pressing');
  }
  function handleCardClick(e: React.MouseEvent<HTMLDivElement>) {
    const card = e.currentTarget;
    if (card.classList.contains('la-card-active')) return;
    card.classList.add('la-card-active');
    setTimeout(() => card.classList.remove('la-card-active'), 380);
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
          will-change: transform;
        }
        .la-card:nth-child(1) { animation: laFloatA 6.0s ease-in-out 0.0s infinite; }
        .la-card:nth-child(2) { animation: laFloatB 7.2s ease-in-out 0.4s infinite; }
        .la-card:nth-child(3) { animation: laFloatC 5.8s ease-in-out 1.1s infinite; }
        .la-card:nth-child(4) { animation: laFloatB 6.6s ease-in-out 0.7s infinite; }
        .la-card:nth-child(5) { animation: laFloatA 7.4s ease-in-out 1.4s infinite; }
        .la-card:nth-child(6) { animation: laFloatC 6.2s ease-in-out 0.2s infinite; }
        .la-card:hover {
          animation-play-state: paused;
        }
        .la-card-inner {
          width: 100%;
          transition: transform 0.4s cubic-bezier(0.34, 1.28, 0.64, 1);
        }
        .la-card:hover .la-card-inner {
          transform: scale(1.04);
        }
        .la-card img {
          width: 100%;
          height: auto;
          aspect-ratio: 752 / 352;
          display: block;
          object-fit: cover;
          filter: drop-shadow(0 8px 24px rgba(0,0,0,0.28));
          transition: filter 0.4s ease;
        }
        .la-card:hover img {
          filter: drop-shadow(0 20px 44px rgba(0,0,0,0.36)) drop-shadow(0 4px 12px rgba(0,0,0,0.18));
        }
        /* ── Press reaction ── */
        .la-card-inner {
          position: relative;
        }
        .la-pulse-ring {
          position: absolute;
          inset: 1px;
          border-radius: 44px;
          border: 1px solid rgba(255,255,255,0.55);
          pointer-events: none;
          opacity: 0;
          z-index: 1;
        }
        @keyframes laPulseRing {
          0%   { opacity: 0.55; }
          100% { opacity: 0; }
        }
        .la-card.la-card-pressing .la-card-inner {
          transform: scale(0.972);
          transition: transform 90ms ease-out;
        }
        .la-card.la-card-active .la-pulse-ring {
          animation: laPulseRing 380ms ease-out forwards;
        }
        @media (max-width: 767px) {
          .la-section { padding: 64px 20px !important; }
          .la-container { gap: 40px !important; }
          .la-title { font-size: 32px !important; letter-spacing: -0.64px !important; }
          .la-desc { font-size: 15px !important; width: 100% !important; max-width: 100% !important; }
          .la-cards-grid { grid-template-columns: 1fr; gap: 20px; }
          /* Disable float animation on mobile — saves battery, avoids jitter */
          .la-card { animation: none !important; }
        }
      `}</style>
      <section id="live-activities" className="la-section">
          {/* Blue glow — soft vertical oval centered on the text */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: '-184px',
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
              <p className="la-desc" style={{fontFamily: 'Inter', fontWeight: 400, fontSize: '15px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.4, width: '366px', maxWidth: '100%', textAlign: 'center', margin: 0}}>
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
                onClick={handleCardClick}
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
              >
                <div className="la-card-inner">
                  <img src={card.src} alt={card.alt} />
                  <div className="la-pulse-ring" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}

// ── Passport ──────────────────────────────────────────────────────────────────
const imgPassportBg  = "/Images/asset-26946291-f6a0-4ff9-8a55-76558e481309.png";
const imgPassportBg1 = "/Images/asset-d14c4d0c-e01a-4598-bc67-f72d46c26cb2.png";
const imgPassportBg2 = "/Images/asset-b9e0cf1d-7066-4fc7-9f3a-ef9412beea85.png";
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
      <p style={{fontFamily: 'Inter', fontWeight: 400, fontSize: '16px', color: 'rgba(255,255,255,0.72)', lineHeight: '24px', textAlign: 'center', width: '100%', margin: 0}}>
        {stat.label}
      </p>
      {/* Shimmer sweep — staggered per card via animationDelay */}
      <div className="passport-shimmer" style={{ animationDelay: `${delay * 0.8}ms` }} />
    </div>
  );
}

function Passport() {
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
        }
        @media (max-width: 1023px) {
          .passport-grid { padding: 0 80px; }
        }
        /* Glass card base */
        .passport-stat-card {
          position: relative;
          overflow: hidden;
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
          .passport-grid-row { flex-direction: column !important; gap: 24px !important; }
          .passport-stat-card {
            flex: none !important;
            width: 100% !important;
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
              <p style={{fontFamily:'Inter',fontWeight:400,fontSize:'15px',color:'rgba(255,255,255,0.72)',lineHeight:1.4,width:'566px',maxWidth:'100%',textAlign:'center',margin:0}}>
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

// ── FAQ ───────────────────────────────────────────────────────────────────────
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

function FAQ() {
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

// ── Final CTA asset URLs ──────────────────────────────────────────────────────
const imgCtaIcon = "/Images/asset-ad8c634f-6331-482a-bd5a-7bbe7a2b8fc4.svg";

// ── Final CTA ─────────────────────────────────────────────────────────────────
function FinalCTA() {
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
        @media (max-width: 1023px) {
          .cta-section { padding: 80px 80px; }
        }
        @media (max-width: 767px) {
          .cta-section { padding: 64px 20px; }
          .cta-content { max-width: 100%; }
          .cta-title { font-size: 32px !important; letter-spacing: -0.64px !important; }
          .cta-btn { width: 100% !important; }
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
              padding: "0 24px",
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

// ── Footer ────────────────────────────────────────────────────────────────────
// ── Footer asset URLs (node 7300-49765) ──────────────────────────────────────
const imgFooterLogo    = "/Images/asset-3446d39b-7772-4f4f-8ec6-c08df549325c.svg";
const imgFiFooter      = "/Images/asset-63c22fa0-1773-4419-952c-5ed5bb51d114.svg";

const FOOTER_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Support",  href: "#faq" },
  { label: "Privacy",  href: "#" },
  { label: "Terms",    href: "#" },
];

function Footer() {
  return (
    <>
      <style>{`
        .footer-root {
          background: linear-gradient(to bottom, #1c1917, #3f3731);
          width: 100%;
          padding: 12px 120px 16px;
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
            <img src={imgFooterLogo} alt="Flight Passport" style={{ width: 32, height: 32, flexShrink: 0, display: "block" }} />
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
          © 2026 Flight Passport. All rights reserved.
        </span>
      </footer>
    </>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Page() {
  useReveal();
  return (
    <>
      <Nav />
      <main>
        <FigmaHeroSection />
        <Intelligence />
        <HowItWorks />
        <MiddleSection />
        <LowerSection />
        <BottomSection />
        <LiveActivities />
        <Passport />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
