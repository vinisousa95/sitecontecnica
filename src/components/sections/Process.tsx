import Image from "next/image";

import { processNote, processSteps } from "@/content/process";
import { revealDelay } from "@/lib/reveal";

import { SectionHeading } from "../SectionHeading";

import reformaEtapas from "../../../public/images/reforma-etapas-montagem.webp";

export function Process() {
  return (
    <section id="processo" aria-labelledby="processo-title" className="bg-paper py-24 sm:py-32">
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <SectionHeading
              index="05"
              eyebrow="Nosso processo"
              title="Um caminho claro, do primeiro contato à entrega."
              id="processo-title"
            />
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted" data-reveal style={revealDelay(100)}>
              Uma reforma bem-sucedida depende de conversa, planejamento e acompanhamento. Veja como o atendimento
              costuma ser conduzido.
            </p>
          </div>
          <figure className="lg:col-span-5" data-reveal style={revealDelay(150)}>
            <div className="relative aspect-[5/4] overflow-hidden rounded-[1.5rem] bg-line">
              <Image
                src={reformaEtapas}
                alt="Montagem com registros de obra: instalação de forro de gesso em andamento e ambiente social finalizado"
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="object-cover object-top"
              />
            </div>
            <figcaption className="mt-3 text-xs text-muted">Registros de obra: execução e finalização.</figcaption>
          </figure>
        </div>

        <ol className="relative mt-20 grid gap-0 lg:mt-24 lg:grid-cols-5 lg:gap-8">
          {/* Linha da timeline: vertical no celular, horizontal no desktop */}
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-[1.375rem] w-px bg-ink/15 lg:top-[1.375rem] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto" />
          {processSteps.map((step, i) => (
            <li
              key={step.title}
              className="relative grid grid-cols-[2.75rem_1fr] gap-5 pb-10 last:pb-0 lg:block lg:pb-0"
              data-reveal
              style={revealDelay(i * 90)}
            >
              <span className="relative z-10 flex size-11 items-center justify-center rounded-full border border-ink/15 bg-paper font-display text-sm font-bold text-ink tabular-nums transition-colors">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="pt-2 lg:pt-8">
                <h3 className="text-lg font-bold text-ink">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-14 border-t border-ink/10 pt-6 text-sm text-muted">{processNote}</p>
      </div>
    </section>
  );
}
