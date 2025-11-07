import Hero from "@/components/Hero";
import GenerationTabs from "@/components/GenerationTabs";
import Header from "@/components/Header";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <GenerationTabs />
    </div>
  );
};

export default Index;
