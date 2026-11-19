import { ArrowUpRight, Mail, ShieldCheck } from "lucide-react";

import { contact } from "@/content/home";
import { company } from "@/content/site";
import { revealDelay } from "@/lib/reveal";
import { mailtoLink, whatsappLink } from "@/lib/whatsapp";

import { QuoteForm } from "../QuoteForm";
import { SectionHeading } from "../SectionHeading";
import { WhatsAppIcon } from "../WhatsAppIcon";

export function Contact() {
  return (
    <section id="contato" aria-labelledby="contato-title" className="bg-paper py-24 sm:py-32">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHeading index="07" eyebrow={contact.eyebrow} title={contact.title} id="contato-title" />
          <p className="mt-8 max-w-md text-lg leading-relaxed text-muted" data-reveal style={revealDelay(100)}>
            {contact.text}
          </p>

          <ul className="mt-10 space-y-3" data-reveal style={revealDelay(160)}>
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-5 transition-colors hover:border-ink"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-whatsapp text-white">
                  <WhatsAppIcon className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-bold tracking-[0.14em] text-muted uppercase">WhatsApp</span>
                  <span className="mt-0.5 block font-display text-lg font-bold text-ink">{company.phoneDisplay}</span>
                </span>
                <ArrowUpRight className="size-5 text-ink/40 transition-colors group-hover:text-ink" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a
                href={mailtoLink}
                className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-5 transition-colors hover:border-ink"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-ink text-white">
                  <Mail className="size-5" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-bold tracking-[0.14em] text-muted uppercase">E-mail</span>
                  <span className="mt-0.5 block font-display text-base font-bold break-all text-ink sm:text-lg">{company.email}</span>
                </span>
                <ArrowUpRight className="size-5 text-ink/40 transition-colors group-hover:text-ink" aria-hidden="true" />
              </a>
            </li>
          </ul>

          <p className="mt-8 flex max-w-md items-start gap-3 text-sm leading-relaxed text-muted">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-ink" aria-hidden="true" />
            {contact.privacyNote}
          </p>
        </div>

        <div className="lg:col-span-7" data-reveal style={revealDelay(120)}>
          <div className="rounded-[1.75rem] border border-line bg-white p-6 shadow-[0_40px_80px_-60px_rgb(0_0_0/0.35)] sm:p-10">
            <h3 className="font-display text-2xl font-bold text-ink">Solicitar orçamento</h3>
            <p className="mt-2 text-muted">Leva menos de um minuto.</p>
            <div className="mt-8">
              <QuoteForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
