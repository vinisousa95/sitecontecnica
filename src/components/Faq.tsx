"use client";

import { Plus } from "lucide-react";
import { useId, useState } from "react";

type Item = { question: string; answer: string };

/** Acordeão acessível (botões com aria-expanded + regiões rotuladas). */
export function Faq({ items }: { items: readonly Item[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <ul className="border-t border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        const buttonId = `${baseId}-q${i}`;
        const panelId = `${baseId}-a${i}`;
        return (
          <li key={item.question} className="border-b border-line">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left font-display text-lg font-semibold text-ink sm:text-xl"
              >
                {item.question}
                <span
                  className={`flex size-10 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                    isOpen ? "rotate-45 border-brand bg-brand" : "border-line group-hover:border-ink"
                  }`}
                  aria-hidden="true"
                >
                  <Plus className="size-4" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid transition-[grid-template-rows] duration-500 ease-out-soft ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
              inert={!isOpen}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pr-14 pb-7 leading-relaxed text-muted">{item.answer}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
