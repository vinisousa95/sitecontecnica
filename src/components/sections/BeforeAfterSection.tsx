import { MoveHorizontal } from "lucide-react";

import { comparisons } from "@/content/comparisons";
import { revealDelay } from "@/lib/reveal";

import { BeforeAfter } from "../BeforeAfter";
import { SectionHeading } from "../SectionHeading";

export function BeforeAfterSection() {
  return (
    <section id="antes-e-depois" aria-labelledby="antes-depois-title" className="bg-white py-24 sm:py-32">
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            index="04"
            eyebrow="Antes e depois"
            title="A transformação, lado a lado."
            id="antes-depois-title"
            className="lg:col-span-7"
          />
          <div className="lg:col-span-5 lg:pb-2" data-reveal style={revealDelay(100)}>
            <p className="text-lg leading-relaxed text-muted">
              Compare o mesmo ambiente antes e depois da reforma. Arraste o controle — ou use as setas do teclado —
              para revelar a mudança.
            </p>
          </div>
        </div>

        <div className="mt-16 space-y-16 sm:space-y-24">
          {comparisons.map((comparison, i) => (
            <figure key={comparison.slug} data-reveal style={revealDelay(i * 60)}>
              <BeforeAfter comparison={comparison} />
              <figcaption className="mt-5 flex flex-col gap-2 border-b border-line pb-5 sm:flex-row sm:items-baseline sm:justify-between">
                <span className="flex items-baseline gap-4">
                  <span className="font-display text-sm font-bold text-ink/30 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-xl font-bold text-ink">{comparison.title}</span>
                  <span className="hidden text-muted sm:inline">{comparison.description}</span>
                </span>
                <span className="inline-flex items-center gap-2 text-sm text-muted">
                  <MoveHorizontal className="size-4" aria-hidden="true" />
                  Arraste para comparar
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
