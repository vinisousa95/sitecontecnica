import type { ReactNode } from "react";

type Props = {
  index: string;
  eyebrow: string;
  title: ReactNode;
  id?: string;
  tone?: "light" | "dark";
  className?: string;
};

/** Cabeçalho editorial de seção: numeração + rótulo + título grande. */
export function SectionHeading({ index, eyebrow, title, id, tone = "light", className = "" }: Props) {
  const dark = tone === "dark";
  return (
    <div className={className} data-reveal>
      <p className={`eyebrow ${dark ? "text-white/70" : "text-muted"}`}>
        <span className={dark ? "text-brand" : "text-ink"}>{index}</span>
        <span aria-hidden="true">—</span>
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`mt-6 text-[2.1rem] leading-[1.06] font-bold sm:text-5xl lg:text-[3.6rem] ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
    </div>
  );
}
