import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";

import { hero } from "@/content/home";
import { revealDelay } from "@/lib/reveal";
import { whatsappLink } from "@/lib/whatsapp";

import salaEstarFinal from "../../../public/images/sala-estar-final.webp";
import banheiroEspelhoFinal from "../../../public/images/banheiro-espelho-final.webp";

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative overflow-hidden bg-white pt-20 lg:pt-32">
      {/* Linhas arquitetônicas de fundo */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
        <div className="container-site relative h-full">
          <span className="absolute inset-y-0 left-[calc(50%-0.5px)] w-px bg-line/70" />
        </div>
      </div>

      <div className="container-site relative grid items-center gap-12 pt-10 pb-16 sm:pt-14 lg:min-h-[calc(100svh-8rem)] lg:grid-cols-12 lg:gap-8 lg:py-16">
        <div className="lg:col-span-6 lg:pr-8 xl:pr-14">
          <p className="eyebrow text-muted" data-reveal>
            {hero.eyebrow}
          </p>
          <h1
            id="hero-title"
            className="mt-7 text-[2.6rem] leading-[1.02] font-extrabold text-ink sm:text-6xl lg:text-[3.3rem] xl:text-[3.95rem]"
            data-reveal
            style={revealDelay(80)}
          >
            <span className="block sm:whitespace-nowrap">{hero.title[0]}</span>
            <span className="block text-ink/45">{hero.title[1]}</span>
          </h1>
          <p
            className="mt-7 max-w-xl text-lg leading-relaxed text-muted sm:text-xl"
            data-reveal
            style={revealDelay(160)}
          >
            {hero.subtitle}
          </p>
          <div
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            data-reveal
            style={revealDelay(240)}
          >
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              {hero.primaryCta}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
            <a href="#projetos" className="btn btn-outline text-ink">
              {hero.secondaryCta}
              <ArrowDown className="size-4" aria-hidden="true" />
            </a>
          </div>

          <ul className="mt-14 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6 text-sm text-muted" aria-label="Áreas de atuação">
            {hero.highlights.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-brand" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative lg:col-span-6">
          <figure className="relative ml-auto aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] bg-paper sm:aspect-[5/4] lg:aspect-[4/5] lg:max-h-[calc(100svh-12rem)] lg:w-auto">
            <Image
              src={salaEstarFinal}
              alt="Sala de estar finalizada pela Contécnica, com sofá claro, painel vazado iluminado e mesa de centro em madeira"
              fill
              preload
              placeholder="blur"
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover object-[50%_60%]"
            />
            <figcaption className="absolute right-4 bottom-4 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-ink backdrop-blur">
              Sala de estar · ambiente finalizado
            </figcaption>
          </figure>

          {/* Imagem secundária sobreposta (somente telas grandes) */}
          <div className="absolute -bottom-6 -left-10 hidden w-[30%] overflow-hidden rounded-2xl border-[6px] border-white shadow-[0_30px_60px_-30px_rgb(0_0_0/0.45)] xl:block">
            <Image
              src={banheiroEspelhoFinal}
              alt="Banheiro finalizado com bancada clara e espelho amplo"
              sizes="220px"
              placeholder="blur"
              className="aspect-[4/5] h-auto w-full object-cover"
            />
          </div>
          <span aria-hidden="true" className="absolute -top-4 -right-4 hidden size-24 border-t-2 border-r-2 border-brand lg:block" />
        </div>
      </div>
    </section>
  );
}
