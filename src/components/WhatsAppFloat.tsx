"use client";

import { useEffect, useState } from "react";

import { whatsappLink } from "@/lib/whatsapp";

import { WhatsAppIcon } from "./WhatsAppIcon";

/**
 * Botão flutuante do WhatsApp. Aparece depois que o visitante começa a rolar,
 * para não cobrir os botões da primeira dobra no celular.
 */
export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar com a Contécnica no WhatsApp (abre em nova aba)"
      tabIndex={visible ? undefined : -1}
      aria-hidden={visible ? undefined : true}
      className={`group fixed right-4 bottom-4 z-40 flex items-center gap-2 rounded-full bg-whatsapp p-3.5 text-white shadow-[0_12px_30px_-10px_rgb(0_0_0/0.45)] transition-[transform,opacity,background-color] duration-500 hover:bg-[#178a45] sm:right-6 sm:bottom-6 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <WhatsAppIcon className="size-7" />
      <span className="hidden pr-1.5 font-display text-sm font-bold lg:inline">WhatsApp</span>
    </a>
  );
}
