import { revealDelay } from "@/lib/reveal";

import { Gallery } from "../portfolio/Gallery";
import { SectionHeading } from "../SectionHeading";

export function Portfolio() {
  return (
    <section id="projetos" aria-labelledby="projetos-title" className="relative overflow-hidden bg-ink py-24 text-white sm:py-32">
      <div aria-hidden="true" className="arch-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_45%)]" />
      <div className="container-site relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            index="03"
            eyebrow="Portfólio"
            title="Projetos que traduzem cuidado em cada etapa."
            id="projetos-title"
            tone="dark"
            className="lg:col-span-7"
          />
          <p className="text-lg leading-relaxed text-white/65 lg:col-span-5 lg:pb-2" data-reveal style={revealDelay(100)}>
            Registros reais de ambientes finalizados e de obras em andamento. Filtre por tipo de ambiente e clique em
            uma foto para ampliá-la.
          </p>
        </div>
        <div className="mt-14">
          <Gallery />
        </div>
      </div>
    </section>
  );
}
