import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { callToAction } from "@/content/home";
import { company } from "@/content/site";
import { revealDelay } from "@/lib/reveal";
import { whatsappLink } from "@/lib/whatsapp";

import acabamentoPiso from "../../../public/images/acabamento-piso.webp";

export function CallToAction() {
  return (
    <section aria-labelledby="cta-title" className="relative isolate overflow-hidden bg-ink text-white">
      <div aria-hidden="true" className="arch-grid absolute inset-0 -z-10" />
      <div className="absolute inset-y-0 right-0 -z-10 hidden w-[46%] lg:block">
        <Image
          src={acabamentoPiso}
          alt=""
          fill
          placeholder="blur"
          sizes="46vw"
          className="object-cover opacity-75"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-ink via-ink/25 to-transparent" />
      </div>

      <div className="container-site py-24 sm:py-32 lg:py-40">
        <div className="max-w-3xl lg:max-w-[52%]">
          <span aria-hidden="true" className="block h-0.5 w-16 bg-brand" data-reveal />
          <h2
            id="cta-title"
            className="mt-8 text-[2.2rem] leading-[1.06] font-bold sm:text-5xl lg:text-[3.5rem]"
            data-reveal
            style={revealDelay(80)}
          >
            {callToAction.title}
          </h2>
          <p className="mt-6 max-w-xl text-lg text-white/70 sm:text-xl" data-reveal style={revealDelay(160)}>
            {callToAction.subtitle}
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center" data-reveal style={revealDelay(240)}>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              {callToAction.button}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
            <p className="text-sm text-white/60">
              ou ligue: <a href={`tel:${company.phoneE164}`} className="font-semibold text-white underline-offset-4 hover:underline">{company.phoneDisplay}</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
