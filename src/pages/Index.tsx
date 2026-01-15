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
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <DemoVideo />
        <FeatureGrid />
        <Stats />
        <PrivacySection />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
