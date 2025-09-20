import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Music from "@/components/Music";
import Concert from "@/components/Concert__";
import PhotoCarousel from "@/components/PhotoCarousel";
import Social from "@/components/Social";
import Fanpage from "@/components/Fanpage";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Music />
      <Concert />
      <PhotoCarousel />
      <Social />
      <Fanpage />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
