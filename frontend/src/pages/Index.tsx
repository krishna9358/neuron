import { AppLayout } from "@/components/AppLayout";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import DemoVideo from "@/components/DemoVideo";
import FeatureGrid from "@/components/FeatureGrid";
import Stats from "@/components/Stats";
import PrivacySection from "@/components/PrivacySection";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <AppLayout>
      <Header />
      <main className="flex flex-col w-full">
        <div className="border-b border-border/40 w-full">
          <Hero />
        </div>
        <div className="border-b border-border/40 w-full">
          <DemoVideo />
        </div>
        <div className="border-b border-border/40 w-full">
          <FeatureGrid />
        </div>
        <div className="border-b border-border/40 w-full">
          <Stats />
        </div>
        <div className="border-b border-border/40 w-full">
          <PrivacySection />
        </div>
        <div className="w-full">
          <FAQ />
        </div>
      </main>
      <div className="border-t border-border/40 w-full">
        <Footer />
      </div>
    </AppLayout>
  );
};

export default Index;
