import { useEffect } from "react";
import { Cursor, Footer, Nav, Noise } from "./components/Chrome";
import Hero from "./components/Hero";
import About from "./components/About";
import AboutPage from "./components/AboutPage";
import { ServicesSection, WorkSection } from "./components/Services";
import { Faq, Process, StatsBand } from "./components/Studio";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import { consumePendingSection, useRoute } from "./lib/router";
import { useLogoTheme } from "./lib/theme";

export default function App() {
  useLogoTheme();
  const route = useRoute();

  useEffect(() => {
    document.title =
      route === "about-us"
        ? "About Us — LLE Social Media"
        : "LLE Social Media — Listen | Learn | Engage";
    if (route === "home") consumePendingSection();
  }, [route]);

  return (
    <div className="min-h-screen bg-ink font-body text-paper antialiased">
      <Noise />
      <Cursor />
      <Nav />
      <main>
        {route === "about-us" ? (
          <AboutPage />
        ) : (
          <>
            <Hero />
            <About />
            <ServicesSection />
            <Process />
            <StatsBand />
            <WorkSection />
            <Testimonials />
            <Faq />
            <Contact />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
