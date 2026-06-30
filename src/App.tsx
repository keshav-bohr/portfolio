import { useLenis } from "@/hooks/useLenis";
import { Cursor } from "@/components/ui/Cursor";
import { WaveField } from "@/components/ui/WaveField";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Work } from "@/components/sections/Work";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";

export default function App() {
  useLenis();

  return (
    <div className="grain relative">
      <WaveField />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Work />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
