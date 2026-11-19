"use client";

import { ArrowUpRight, Mail, Menu, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { company, navigation } from "@/content/site";
import { mailtoLink, whatsappLink } from "@/lib/whatsapp";

import { Logo } from "./Logo";
import { WhatsAppIcon } from "./WhatsAppIcon";

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
        scrolled || open
          ? "border-line shadow-[0_10px_30px_-24px_rgb(0_0_0/0.5)]"
          : "border-transparent"
      }`}
    >
      <div
        className={`container-site flex items-center justify-between gap-6 transition-[height] duration-500 ease-out-soft ${
          scrolled ? "h-16" : "h-20"
        }`}
      >
        <a href="#inicio" className="shrink-0" onClick={() => close()}>
          <Logo
            preload
            className={`w-auto transition-[height] duration-500 ease-out-soft ${scrolled ? "h-10" : "h-12 sm:h-14"}`}
          />
        </a>

        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-1 xl:gap-2">
            {navigation.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative rounded-full px-3 py-2 text-[0.9rem] font-medium transition-colors duration-300 after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-brand after:transition-transform after:duration-500 hover:text-ink hover:after:scale-x-100 ${
                      isActive ? "text-ink after:scale-x-100" : "text-muted"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary hidden min-h-11 px-5 py-2.5 text-sm sm:inline-flex"
          >
            Solicitar orçamento
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
        <nav aria-label="Navegação principal (móvel)" className="container-site flex min-h-full flex-col py-8">
          <ul className="divide-y divide-line border-y border-line">
            {navigation.map((item, i) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => close()}
                  className="flex items-baseline gap-4 py-4 font-display text-2xl font-semibold tracking-tight text-ink"
                >
                  <span className="w-6 text-xs font-bold text-muted tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-auto space-y-4 pt-10">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary w-full"
            >
              <WhatsAppIcon className="size-5" />
              Solicitar orçamento
            </a>
            <a href={mailtoLink} className="flex items-center justify-center gap-2 py-2 text-sm text-muted">
              <Mail className="size-4" aria-hidden="true" />
              {company.email}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
