"use client";

import Image from "next/image";
import { Expand } from "lucide-react";
import { useMemo, useState } from "react";

import { projectCategories, projects, statusLabel, type ProjectCategory } from "@/content/projects";

import { Lightbox } from "./Lightbox";

type Filter = "todos" | ProjectCategory;

const filters: { id: Filter; label: string }[] = [
  { id: "todos", label: "Todos" },
  ...projectCategories.filter((c) => projects.some((p) => p.category === c.id)),
];

export function Gallery() {
  const [filter, setFilter] = useState<Filter>("todos");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visible = useMemo(
    () => (filter === "todos" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  const countFor = (id: Filter) =>
    id === "todos" ? projects.length : projects.filter((p) => p.category === id).length;

  const activeLabel = filters.find((f) => f.id === filter)?.label ?? "";

  return (
    <>
      <div
        role="group"
        aria-label="Filtrar projetos por categoria"
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {filters.map((f) => {
          const selected = f.id === filter;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={selected}
              onClick={() => setFilter(f.id)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors duration-300 ${
                selected
                  ? "border-brand bg-brand text-ink"
                  : "border-white/20 text-white/80 hover:border-white/60 hover:text-white"
              }`}
            >
              {f.label}
              <span className={`text-xs tabular-nums ${selected ? "text-ink/60" : "text-white/40"}`}>
                {countFor(f.id)}
              </span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {`Exibindo ${visible.length} ${visible.length === 1 ? "projeto" : "projetos"} em ${activeLabel}.`}
      </p>

      <ul className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3 lg:gap-6">
        {visible.map((project, i) => (
          <li key={project.slug} className="mb-5 break-inside-avoid lg:mb-6">
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              className="group block w-full text-left"
              aria-label={`Ampliar foto: ${project.title}`}
            >
              <span className="relative block overflow-hidden rounded-2xl bg-ink-soft">
                <Image
                  src={project.image}
                  alt={project.alt}
                  placeholder="blur"
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw"
                  className="h-auto w-full transition-transform duration-[1.2s] ease-out-soft group-hover:scale-[1.035]"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
                />
                <span
                  aria-hidden="true"
                  className="absolute top-4 right-4 flex size-10 scale-90 items-center justify-center rounded-full bg-white text-ink opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
                >
                  <Expand className="size-4" />
                </span>
              </span>
              <span className="mt-4 flex items-start justify-between gap-4">
                <span className="font-display text-base font-semibold text-white">{project.title}</span>
                <span
                  className={`mt-0.5 shrink-0 text-[0.7rem] font-bold tracking-[0.14em] uppercase ${
                    project.status === "em-execucao" ? "text-brand" : "text-white/50"
                  }`}
                >
                  {statusLabel[project.status]}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Lightbox
        items={visible}
        index={openIndex}
        onChange={setOpenIndex}
        onClose={() => setOpenIndex(null)}
      />
    </>
  );
}
