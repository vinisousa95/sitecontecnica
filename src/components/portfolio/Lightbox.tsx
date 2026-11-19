"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef, type KeyboardEvent } from "react";

import { projectCategories, statusLabel, type Project } from "@/content/projects";

type Props = {
  items: Project[];
  index: number | null;
  onChange: (index: number) => void;
  onClose: () => void;
};

const categoryLabel = Object.fromEntries(projectCategories.map((c) => [c.id, c.label]));

export function Lightbox({ items, index, onChange, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchStartX = useRef<number | null>(null);
  const isOpen = index !== null;
  const total = items.length;

  // Abre/fecha o <dialog> nativo (foco preso, Esc e retorno de foco já inclusos).
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  const go = (delta: number) => {
    if (index === null || total === 0) return;
    onChange((index + delta + total) % total);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
  };

  const handleClose = () => {
    document.documentElement.style.overflow = "";
    onClose();
  };

  const current = index !== null ? items[index] : null;

  return (
    <dialog
      ref={dialogRef}
      aria-label="Visualização ampliada do projeto"
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-white backdrop:bg-ink/95 backdrop:backdrop-blur-sm"
      onClose={handleClose}
      onKeyDown={handleKeyDown}
      onClick={(e) => {
        // Clique fora da imagem (no fundo) fecha o lightbox.
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {current && (
        <div
          className="flex h-full flex-col"
          onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const delta = e.changedTouches[0].clientX - touchStartX.current;
            if (Math.abs(delta) > 50) go(delta < 0 ? 1 : -1);
            touchStartX.current = null;
          }}
        >
          <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-8">
            <p className="font-display text-sm font-semibold text-white/70 tabular-nums" aria-live="polite">
              {index! + 1} / {total}
            </p>
            <button
              type="button"
              onClick={onClose}
              autoFocus
              className="inline-flex size-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white hover:text-ink"
              aria-label="Fechar visualização"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          <div
            className="relative min-h-0 flex-1 px-4 sm:px-20"
            onClick={(e) => {
              if (e.target === e.currentTarget) onClose();
            }}
          >
            <div className="pointer-events-none relative size-full">
              <Image
                key={current.slug}
                src={current.image}
                alt={current.alt}
                fill
                placeholder="blur"
                sizes="100vw"
                className="object-contain"
              />
            </div>

            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className="absolute top-1/2 left-2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-ink/40 text-white backdrop-blur transition-colors hover:bg-white hover:text-ink sm:left-5 sm:flex"
                  aria-label="Imagem anterior"
                >
                  <ChevronLeft className="size-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  className="absolute top-1/2 right-2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-ink/40 text-white backdrop-blur transition-colors hover:bg-white hover:text-ink sm:right-5 sm:flex"
                  aria-label="Próxima imagem"
                >
                  <ChevronRight className="size-5" aria-hidden="true" />
                </button>
              </>
            )}
          </div>

          <div className="flex items-end justify-between gap-4 px-4 pt-4 pb-6 sm:px-8 sm:pb-8">
            <div>
              <p className="text-xs font-bold tracking-[0.18em] text-brand uppercase">
                {categoryLabel[current.category]} · {statusLabel[current.status]}
              </p>
              <h3 className="mt-2 font-display text-lg font-semibold text-white sm:text-2xl">{current.title}</h3>
            </div>
            {total > 1 && (
              <div className="flex gap-2 sm:hidden">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className="inline-flex size-11 items-center justify-center rounded-full border border-white/25"
                  aria-label="Imagem anterior"
                >
                  <ChevronLeft className="size-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  className="inline-flex size-11 items-center justify-center rounded-full border border-white/25"
                  aria-label="Próxima imagem"
                >
                  <ChevronRight className="size-5" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}
