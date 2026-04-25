import ImageDisplay from "@/components/ImageDisplay";
import HeroVideoSlider from "@/components/HeroVideoSlider";
import Navbar from "@/components/Navbar";
import QuoteSection from "@/components/QuoteSection";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";
import UniquelyBottled from "@/components/UniquelyBottled";
import ChooseYourWorld from "@/components/ChooseYourWorld";
import HowItWorks from "@/components/HowItWorks";
import PageWrapper from "@/components/PageWrapper";

export default function Home() {
  return (
    <PageWrapper>
      <main className="relative flex min-h-screen flex-col items-center justify-between bg-white">
        <Navbar />
        <HeroVideoSlider />
        <ImageDisplay />
        <HowItWorks />
        <ChooseYourWorld />
        <UniquelyBottled />
        <QuoteSection />
        <FAQSection />
        <Footer />
      </main>
    </PageWrapper>
  );
}
