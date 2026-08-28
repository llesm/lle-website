import { Cursor, Footer, Nav, Noise } from "./components/Chrome";
import Hero from "./components/Hero";
import About from "./components/About";
import { ServicesSection, WorkSection } from "./components/Services";
import { Faq, Process, StatsBand } from "./components/Studio";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import { useLogoTheme } from "./lib/theme";

export default function App() {
  useLogoTheme();

  return (
    <div className="min-h-screen bg-ink font-body text-paper antialiased">
      <Noise />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <ServicesSection />
        <Process />
        <StatsBand />
        <WorkSection />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
