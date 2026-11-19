import { ArrowUpRight } from "lucide-react";

import { services } from "@/content/services";
import { whatsappMessages } from "@/content/site";
import { revealDelay } from "@/lib/reveal";
import { whatsappLink } from "@/lib/whatsapp";

import { SectionHeading } from "../SectionHeading";

export function Services() {
  return (
    <section id="servicos" aria-labelledby="servicos-title" className="bg-white py-24 sm:py-32">
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            index="02"
            eyebrow="Serviços"
            title="Soluções para cada etapa da sua reforma."
            id="servicos-title"
            className="lg:col-span-7"
          />
          <p className="text-lg leading-relaxed text-muted lg:col-span-5 lg:pb-2" data-reveal style={revealDelay(100)}>
            Do ambiente pontual à reforma completa, cada solicitação é avaliada de forma individual. Conheça as
            principais frentes de atuação e fale com a gente sobre o seu projeto.
          </p>
        </div>

        <ul className="mt-16 grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <li
                key={service.title}
                className="group relative flex flex-col border-r border-b border-line p-7 transition-colors duration-500 hover:bg-paper sm:p-9"
                data-reveal
                style={revealDelay((i % 3) * 90)}
              >
                <div className="flex items-start justify-between">
                  <span className="flex size-12 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors duration-500 group-hover:border-brand group-hover:bg-brand">
                    <Icon className="size-5" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span className="font-display text-sm font-bold text-ink/25 tabular-nums" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-10 text-xl font-bold text-ink sm:text-[1.35rem]">{service.title}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-muted">{service.description}</p>
                <a
                  href={whatsappLink(whatsappMessages.service(service.title))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 self-start text-sm font-bold text-ink underline decoration-brand decoration-2 underline-offset-[6px] transition-colors hover:text-brand-strong"
                >
                  Solicitar orçamento
                  <span className="sr-only"> para {service.title.toLowerCase()} (abre o WhatsApp)</span>
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
