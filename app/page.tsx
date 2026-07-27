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

      {/* Act 2: light block, mirrors the reference's cream mid-section */}
      <div id="act-light" className="act-light">
        <Philosophy />
        <Process />
        <SocialProof />
      </div>

      <ScoreForm />
      <Footer />
      <PhoneButton />
      <WhatsAppButton />
    </main>
  );
}
