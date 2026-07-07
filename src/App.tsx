import { useLenis } from "@/hooks/useLenis";
import { Cursor } from "@/components/ui/Cursor";
import { ScrollTracer } from "@/components/ui/ScrollTracer";
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
      <ScrollTracer />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Work />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
