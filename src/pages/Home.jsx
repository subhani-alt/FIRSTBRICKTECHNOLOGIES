import ScrollProgress from '../components/ScrollProgress.jsx';
import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import Logos from '../components/Logos.jsx';
import Services from '../components/Services.jsx';
import Process from '../components/Process.jsx';
import Portfolio from '../components/Portfolio.jsx';
import WhyChooseUs from '../components/WhyChooseUs.jsx';
import Technologies from '../components/Technologies.jsx';
import Testimonials from '../components/Testimonials.jsx';
import Pricing from '../components/Pricing.jsx';
import FAQ from '../components/FAQ.jsx';
import Contact from '../components/Contact.jsx';
import Footer from '../components/Footer.jsx';
import CursorGlow from '../components/CursorGlow.jsx';

const Home = () => {
  return (
    <div className="relative min-h-screen bg-background text-white font-sans selection:bg-electricPurple/30 selection:text-white">
      {/* Dynamic Cursor ambient light */}
      <CursorGlow />
      
      {/* Scroll indicator */}
      <ScrollProgress />

      {/* Sticky header navbar */}
      <Navbar />

      {/* Hero presentation page */}
      <Hero />

      {/* Brand logo ticker marquee */}
      <Logos />

      {/* Services card deck */}
      <Services />

      {/* Timeline process flow */}
      <Process />

      {/* Client study projects */}
      <Portfolio />

      {/* Corporate statistics */}
      <WhyChooseUs />

      {/* Tech capability grid */}
      <Technologies />

      {/* Customer review sliders */}
      <Testimonials />

      {/* Tiered pricing plans */}
      <Pricing />

      {/* FAQ accordions */}
      <FAQ />

      {/* Contact submission block */}
      <Contact />

      {/* Quick link Footer */}
      <Footer />
    </div>
  );
};

export default Home;
