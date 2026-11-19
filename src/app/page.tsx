import { About } from "@/components/sections/About";
import { BeforeAfterSection } from "@/components/sections/BeforeAfterSection";
import { CallToAction } from "@/components/sections/CallToAction";
import { Contact } from "@/components/sections/Contact";
import { FaqSection } from "@/components/sections/FaqSection";
import { Hero } from "@/components/sections/Hero";
import { Portfolio } from "@/components/sections/Portfolio";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <BeforeAfterSection />
      <Process />
      <CallToAction />
      <FaqSection />
      <Contact />
    </>
  );
}
