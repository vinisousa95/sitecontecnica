"use client";

import Image from "next/image";
import { ArrowRight, ArrowUpRight, Mail, Menu, Phone, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { company, navigation } from "@/content/site";
import { mailtoLink, telLink, whatsappLink } from "@/lib/whatsapp";

import { Logo } from "./Logo";
import { WhatsAppIcon } from "./WhatsAppIcon";

import salaEstarFinal from "../../public/images/sala-estar-final.webp";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Cabeçalho mais compacto e com sombra discreta após começar a rolar.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Destaca no menu a seção visível no momento.
  useEffect(() => {
    const sections = navigation
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const close = useCallback((restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  // Menu móvel: trava a rolagem, fecha com Esc e mantém o foco no painel.
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close(true);
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = [
        toggleRef.current,
        ...panelRef.current.querySelectorAll<HTMLElement>("a, button"),
      ].filter(Boolean) as HTMLElement[];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1024 && close();

    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open, close]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b bg-white transition-[border-color,box-shadow] duration-500 ${
          scrolled || open ? "border-line shadow-[0_10px_30px_-24px_rgb(0_0_0/0.5)]" : "border-transparent"
        }`}
      >
        {/* Faixa superior (desktop): slogan e contatos — recolhe ao rolar */}
        <div
          className={`hidden bg-ink text-white/70 transition-[grid-template-rows] duration-500 ease-out-soft lg:grid ${
            scrolled ? "grid-rows-[0fr]" : "grid-rows-[1fr]"
          }`}
          aria-hidden={scrolled ? true : undefined}
          inert={scrolled}
        >
          <div className="overflow-hidden">
            <div className="container-site flex h-10 items-center justify-between gap-6 text-xs">
              <p className="flex items-center gap-3">
                <span className="h-px w-6 bg-brand" aria-hidden="true" />
                <span className="font-semibold tracking-[0.16em] text-white uppercase">{company.segment}</span>
                <span className="text-white/30" aria-hidden="true">
                  /
                </span>
                <span>{company.slogan}</span>
              </p>
              <ul className="flex items-center gap-6">
                <li>
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 transition-colors hover:text-white"
                  >
                    <WhatsAppIcon className="size-3.5 text-brand" />
                    {company.phoneDisplay}
                  </a>
                </li>
                <li className="h-3 w-px bg-white/20" aria-hidden="true" />
                <li>
                  <a href={mailtoLink} className="inline-flex items-center gap-2 transition-colors hover:text-white">
                    <Mail className="size-3.5 text-brand" aria-hidden="true" />
                    {company.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Barra principal */}
        <div
          className={`container-site flex items-center justify-between gap-4 transition-[height] duration-500 ease-out-soft xl:gap-6 ${
            scrolled ? "h-16 lg:h-[4.25rem]" : "h-20 lg:h-[5.5rem]"
          }`}
        >
          <div className="flex shrink-0 items-center gap-6">
            <a href="#inicio" onClick={() => close()} aria-label="Contécnica — ir para o início">
              <Logo
                preload
                className={`w-auto transition-[height] duration-500 ease-out-soft ${
                  scrolled ? "h-10 lg:h-11" : "h-12 sm:h-14 lg:h-16"
                }`}
              />
            </a>
            <span aria-hidden="true" className="hidden h-10 w-px bg-line xl:block" />
          </div>

          <nav aria-label="Navegação principal" className="hidden flex-1 justify-center lg:flex">
            <ul className="flex items-center gap-0.5 rounded-full border border-line bg-paper p-1.5">
              {navigation.map((item) => {
                const isActive = active === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={isActive ? "true" : undefined}
                      className={`flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium whitespace-nowrap transition-all duration-300 xl:px-4 ${
                        isActive
                          ? "bg-white text-ink shadow-[0_1px_3px_rgb(0_0_0/0.08),0_0_0_1px_var(--color-line)]"
                          : "text-muted hover:bg-white/70 hover:text-ink"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`size-1.5 rounded-full bg-brand transition-all duration-300 ${
                          isActive ? "scale-100 opacity-100" : "-mr-3.5 scale-0 opacity-0"
                        }`}
                      />
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary hidden min-h-11 px-5 py-2.5 text-sm sm:inline-flex"
            >
              <span className="xl:hidden">Orçamento</span>
              <span className="hidden xl:inline">Solicitar orçamento</span>
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
            <button
              ref={toggleRef}
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-paper lg:hidden"
              aria-expanded={open}
              aria-controls="menu-movel"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {/* Menu móvel (fora do <header>, para o posicionamento fixo ser relativo à tela) */}
      <div
        id="menu-movel"
        ref={panelRef}
        hidden={!open}
        className={`fixed inset-x-0 bottom-0 z-50 overflow-y-auto border-t border-line bg-white lg:hidden ${
          scrolled ? "top-16" : "top-20"
        }`}
      >
        <nav aria-label="Navegação principal (móvel)" className="container-site flex min-h-full flex-col py-6">
          <p className="eyebrow text-muted">Menu</p>

          <ul className="mt-5 divide-y divide-line border-y border-line">
            {navigation.map((item, i) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => close()}
                  aria-current={active === item.id ? "true" : undefined}
                  className="group flex items-center gap-4 py-3.5 font-display text-[1.6rem] font-semibold tracking-tight text-ink"
                >
                  <span className="w-6 text-xs font-bold text-muted tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">{item.label}</span>
                  <ArrowRight
                    className={`size-5 transition-colors ${
                      active === item.id ? "text-brand-strong" : "text-ink/25 group-active:text-ink"
                    }`}
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="relative mt-8 overflow-hidden rounded-2xl bg-ink">
            <Image
              src={salaEstarFinal}
              alt=""
              fill
              sizes="100vw"
              placeholder="blur"
              className="object-cover object-[50%_65%] opacity-70"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />
            <div className="relative flex min-h-32 flex-col justify-end p-5">
              <p className="text-[0.65rem] font-bold tracking-[0.18em] text-brand uppercase">{company.segment}</p>
              <p className="mt-1 font-display text-xl font-semibold text-white">{company.slogan}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 pb-2">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full">
              <WhatsAppIcon className="size-5" />
              Solicitar orçamento
            </a>
            <div className="grid grid-cols-2 gap-3">
              <a
                href={telLink}
                className="flex items-center justify-center gap-2 rounded-full border border-line py-3 text-sm font-semibold text-ink"
              >
                <Phone className="size-4" aria-hidden="true" />
                Ligar
              </a>
              <a
                href={mailtoLink}
                className="flex items-center justify-center gap-2 rounded-full border border-line py-3 text-sm font-semibold text-ink"
              >
                <Mail className="size-4" aria-hidden="true" />
                E-mail
              </a>
            </div>
            <p className="pt-2 text-center text-xs text-muted">
              {company.phoneDisplay} · {company.email}
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}
