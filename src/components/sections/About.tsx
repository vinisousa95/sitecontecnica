import Image from "next/image";
import { ClipboardList, Handshake, Ruler } from "lucide-react";

import { about } from "@/content/home";
import { revealDelay } from "@/lib/reveal";

import { SectionHeading } from "../SectionHeading";

import cozinhaIntegradaFinal from "../../../public/images/cozinha-integrada-final.webp";
import instalacaoGesso from "../../../public/images/instalacao-gesso.webp";

const valueIcons = [ClipboardList, Handshake, Ruler];

export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="bg-paper py-24 sm:py-32">
      <div className="container-site grid gap-16 lg:grid-cols-12 lg:gap-12">
        {/* Composição de imagens */}
        <div className="relative lg:col-span-6 lg:pr-6" data-reveal>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-line">
            <Image
              src={cozinhaIntegradaFinal}
              alt="Cozinha integrada à sala com ilha, banquetas e painel ripado em madeira, finalizada pela Contécnica"
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <figure className="relative -mt-16 ml-auto w-[52%] sm:-mt-24 sm:w-[44%] lg:-mr-2">
            <div className="overflow-hidden rounded-2xl border-[6px] border-paper">
              <Image
                src={instalacaoGesso}
                alt="Instalação de forro de gesso durante a execução de uma obra"
                placeholder="blur"
                sizes="(min-width: 1024px) 20vw, 50vw"
                className="aspect-square h-auto w-full object-cover"
              />
            </div>
            <figcaption className="mt-3 text-right text-xs text-muted">Do canteiro de obras ao acabamento final.</figcaption>
          </figure>
        </div>

        {/* Texto */}
        <div className="lg:col-span-6 lg:pt-6 lg:pl-6">
          <SectionHeading index="01" eyebrow={about.eyebrow} title={about.title} id="sobre-title" />
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted" data-reveal style={revealDelay(100)}>
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <ul className="mt-12 border-t border-line">
            {about.values.map((value, i) => {
              const Icon = valueIcons[i % valueIcons.length];
              return (
                <li
                  key={value.title}
                  className="grid grid-cols-[auto_1fr] gap-5 border-b border-line py-6"
                  data-reveal
                  style={revealDelay(120 + i * 80)}
                >
                  <span className="flex size-11 items-center justify-center rounded-full bg-white text-ink ring-1 ring-line">
                    <Icon className="size-5" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-ink">{value.title}</h3>
                    <p className="mt-1 text-muted">{value.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
