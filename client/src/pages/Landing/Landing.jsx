import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/sections/Hero";
import Features from "../../components/sections/Features";
import HowItWorks from "../../components/sections/HowItWorks";
import FeaturedProjects from "../../components/sections/FeaturedProjects";
import Roadmap from "../../components/sections/Roadmap";
import FAQ from "../../components/sections/FAQ";
import CTA from "../../components/sections/CTA";
import Footer from "../../components/layout/Footer";
function Landing() {
  return (
    <>
  <Navbar />
  <Hero />
  <Features />
  <HowItWorks />
  <FeaturedProjects />
  <Roadmap />
  <FAQ />
  <CTA />
  <Footer />
</>
  );
}

export default Landing;