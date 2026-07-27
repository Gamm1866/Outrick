import Navbar from '@/components/Navbar';
import HeroVeil from '@/components/HeroVeil';
import Hero from '@/components/Hero';
import PainPoints from '@/components/PainPoints';
import Features from '@/components/Features';
import Philosophy from '@/components/Philosophy';
import Process from '@/components/Process';
import SocialProof from '@/components/SocialProof';
import ScoreForm from '@/components/ScoreForm';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import PhoneButton from '@/components/PhoneButton';

export default function Home() {
  return (
    <main id="main-content" className="relative min-h-screen bg-[#030209] selection:bg-plasma-purple/30 selection:text-ghost-white flex flex-col pt-0">
      <HeroVeil />
      <Navbar />
      <Hero />
      <PainPoints />
      <Features />
      <div className="section-divider" />
      <Philosophy />
      <div className="section-divider" />
      <Process />
      <div className="section-divider" />
      <SocialProof />
      <div className="section-divider" />
      <ScoreForm />
      <Footer />
      <PhoneButton />
      <WhatsAppButton />
    </main>
  );
}
