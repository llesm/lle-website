import { useEffect } from "react";
import { Cursor, Footer, Nav, Noise } from "./components/Chrome";
import Hero from "./components/Hero";
import About from "./components/About";
import { ServicesSection, WorkSection } from "./components/Services";
import { Faq, Process, StatsBand } from "./components/Studio";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import AboutPage from "./components/AboutPage";
import AppDevelopmentPage from "./components/AppDevelopmentPage";
import EcommercePage from "./components/EcommercePage";
import ShopifyPage from "./components/ShopifyPage";
import MedicalContentPage from "./components/MedicalContentPage";
import WebsiteDesignPage from "./components/WebsiteDesignPage";
import { consumePendingSection, useRoute } from "./lib/router";
import { useLogoTheme } from "./lib/theme";

/* The single-page home composition. */
function Home() {
  // If the visitor arrived via a cross-route section link (goSection),
  // honour the pending scroll once the home sections are mounted.
  useEffect(() => {
    consumePendingSection();
  }, []);

  return (
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
  );
}

export default function App() {
  useLogoTheme();
  const route = useRoute();

  return (
    <div className="min-h-screen bg-ink font-body text-paper antialiased">
      <Noise />
      <Cursor />
      <Nav />
      <main>
        {route === "about-us" ? (
          <AboutPage />
        ) : route === "medical-content" ? (
          <MedicalContentPage />
        ) : route === "website-designing" ? (
          <WebsiteDesignPage />
        ) : route === "app-development" ? (
          <AppDevelopmentPage />
        ) : route === "ecommerce" ? (
          <EcommercePage />
        ) : route === "shopify" ? (
          <ShopifyPage />
        ) : (
          <Home />
        )}
      </main>
      <Footer />
    </div>
  );
}
