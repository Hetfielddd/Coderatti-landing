"use client";

import { useState } from "react";
import ContactSection from "@/components/ContactSection";
import PortfolioSection from "@/components/PortfolioSection";
import PriceListSection from "@/components/PriceListSection";
import HeroSection from "@/components/HeroSection";
import ContactModal from "@/components/ContactModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <HeroSection onOpenModal={() => setIsModalOpen(true)} />
      <PortfolioSection />
      <PriceListSection />
      <ContactSection />
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
