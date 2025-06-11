import { CallToAction } from '@/components/features/landing/call-to-action/CallToAction';
import { Features } from '@/components/features/landing/features/Features';
import { Hero } from '@/components/features/landing/hero/Hero';
import { LiveData } from '@/components/features/landing/live-data/LiveData';
import { Trust } from '@/components/features/landing/trust/Trust';
import { Footer } from '@/components/layout/footer/Footer';
import { Header } from '@/components/layout/header/Header';

const Home = () => {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Features />
      <LiveData />
      <Trust />
      <CallToAction />
      <Footer />
    </main>
  );
};

export default Home;
