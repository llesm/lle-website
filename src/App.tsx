import { Cursor, Footer, Nav, Noise } from "./components/Chrome";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Studio from "./components/Studio";
import Contact from "./components/Contact";

export default function App() {
  return (
    <div className="min-h-screen bg-ink font-body text-paper antialiased">
      <Noise />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Services />
        <Studio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
