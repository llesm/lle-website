import { Cursor, Footer, Nav, Noise } from "./components/Chrome";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Studio from "./components/Studio";
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
        <Services />
        <About />
        <Studio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
