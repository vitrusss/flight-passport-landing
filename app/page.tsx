'use client';

import { useReveal } from './lib/hooks/useReveal';
import Nav from './components/sections/Nav';
import HeroSection from './components/sections/HeroSection';
import Intelligence from './components/sections/Intelligence';
import HowItWorksScroll from './components/HowItWorksScroll';
import LiveActivities from './components/sections/LiveActivities';
import Passport from './components/sections/Passport';
import FAQ from './components/sections/FAQ';
import FinalCTA from './components/sections/FinalCTA';
import Footer from './components/sections/Footer';

export default function Page() {
  useReveal();
  return (
    <>
      <Nav />
      <div style={{ height: "calc(48px + env(safe-area-inset-top, 0px))", flexShrink: 0 }} aria-hidden="true" />
      <main>
        <HeroSection />
        <Intelligence />
        <HowItWorksScroll />
        <LiveActivities />
        <Passport />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
