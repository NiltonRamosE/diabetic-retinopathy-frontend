// src/landing/LandingPage.tsx
import React from 'react';
import { Navbar } from '@/shared/Navbar';
import { Footer } from '@/shared/Footer';
import { HeroSection } from './sections/HeroSection';
import { MessageSection } from './sections/MessageSection';
import { ProposalSection } from './sections/ProposalSection';
import { FAQSection } from './sections/FAQSection';
import { ContactSection } from './sections/ContactSection';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <MessageSection />
        <ProposalSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;