import { cacheLife } from "next/cache";
import { ArrowUp, Mail } from "lucide-react";

import { company, navigation } from "@/content/site";
import { mailtoLink, whatsappLink } from "@/lib/whatsapp";

import { Logo } from "./Logo";
import { WhatsAppIcon } from "./WhatsAppIcon";

/** Ano atual, recalculado automaticamente (cache de um dia). */
async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  return (
    <footer className="border-t border-line bg-white pb-24 sm:pb-10">
      <div className="container-site grid gap-12 pt-16 pb-10 md:grid-cols-12 md:pt-20">
        <div className="md:col-span-5">
          <Logo className="h-14 w-auto" />
          <p className="mt-6 max-w-xs font-display text-lg font-semibold tracking-tight text-ink">
            {company.slogan}.
          </p>
        </div>

        <nav aria-label="Rodapé" className="md:col-span-3">
          <h2 className="text-xs font-bold tracking-[0.18em] text-muted uppercase">Navegação</h2>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-1">
            {navigation.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="text-sm text-ink/80 transition-colors hover:text-ink">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h2 className="text-xs font-bold tracking-[0.18em] text-muted uppercase">Contato</h2>
          <ul className="mt-5 space-y-4">
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 text-ink"
              >
                <span className="flex size-10 items-center justify-center rounded-full border border-line transition-colors group-hover:border-whatsapp group-hover:text-whatsapp">
                  <WhatsAppIcon className="size-4" />
                </span>
                <span>
                  <span className="block text-xs text-muted">WhatsApp</span>
                  <span className="font-semibold">{company.phoneDisplay}</span>
                </span>
              </a>
            </li>
            <li>
              <a href={mailtoLink} className="group inline-flex items-center gap-3 text-ink">
                <span className="flex size-10 items-center justify-center rounded-full border border-line transition-colors group-hover:border-ink">
                  <Mail className="size-4" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xs text-muted">E-mail</span>
                  <span className="font-semibold break-all">{company.email}</span>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-site">
        <div className="flex flex-col-reverse gap-4 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear /> {company.legalDisplayName} — {company.segment}. Todos os direitos reservados.
          </p>
          <a href="#inicio" className="inline-flex items-center gap-2 font-semibold text-ink hover:text-brand-strong">
            Voltar ao topo
            <ArrowUp className="size-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
