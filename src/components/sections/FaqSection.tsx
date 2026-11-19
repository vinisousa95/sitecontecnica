import { ArrowUpRight } from "lucide-react";

import { faq } from "@/content/faq";
import { revealDelay } from "@/lib/reveal";
import { whatsappLink } from "@/lib/whatsapp";

import { Faq } from "../Faq";
import { SectionHeading } from "../SectionHeading";

export function FaqSection() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-white py-24 sm:py-32">
      <div className="container-site grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading index="06" eyebrow="Perguntas frequentes" title="Dúvidas comuns antes de reformar." id="faq-title" />
          <div className="mt-8" data-reveal style={revealDelay(100)}>
            <p className="max-w-md text-lg leading-relaxed text-muted">
              Não encontrou o que procurava? Fale diretamente com a Contécnica.
            </p>
            <a
              href={whatsappLink("Olá, Contécnica! Vim pelo site e tenho uma dúvida sobre reformas.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 font-bold text-ink underline decoration-brand decoration-2 underline-offset-[6px] hover:text-brand-strong"
            >
              Tirar dúvidas pelo WhatsApp
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="lg:col-span-7" data-reveal style={revealDelay(150)}>
          <Faq items={faq} />
        </div>
      </div>
    </section>
  );
}
