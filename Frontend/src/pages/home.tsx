import Navbar from "../components/layout/Navbar";
import Hero from "../components/landing/Hero";
import FeaturePreview from "../components/landing/FeaturePreview";
import CultureSpotlight from "../components/landing/CultureSpotlight";
import CTA from "../components/landing/CTA";
import { Footer } from "../components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturePreview />
      <CultureSpotlight />
      <CTA />
      <Footer />
    </>
  );
}