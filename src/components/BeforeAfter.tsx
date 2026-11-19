"use client";

import Image from "next/image";
import { ChevronsLeftRight } from "lucide-react";
import { useCallback, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";

import type { Comparison } from "@/content/comparisons";

type Props = { comparison: Comparison };

const clamp = (v: number) => Math.min(100, Math.max(0, v));

/**
 * Comparador de imagens "antes e depois".
 * - Mouse e toque: arraste em qualquer ponto da imagem (rolagem vertical preservada no celular).
 * - Teclado: setas, Page Up/Down, Home e End no controle deslizante.
 */
export function BeforeAfter({ comparison }: Props) {
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { before, after } = comparison;

  const updateFromClientX = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    setPosition(clamp(((clientX - rect.left) / rect.width) * 100));
  }, []);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    updateFromClientX(e.clientX);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging) updateFromClientX(e.clientX);
  };

  const stopDragging = () => setDragging(false);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 5;
    const map: Record<string, number> = {
      ArrowLeft: position - step,
      ArrowDown: position - step,
      ArrowRight: position + step,
      ArrowUp: position + step,
      PageDown: position - 20,
      PageUp: position + 20,
      Home: 0,
      End: 100,
    };
    if (e.key in map) {
      e.preventDefault();
      setPosition(clamp(map[e.key]));
    }
  };

  const rounded = Math.round(position);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden rounded-[1.5rem] bg-line select-none touch-pan-y ${
        dragging ? "cursor-grabbing" : "cursor-ew-resize"
      }`}
      style={{ aspectRatio: `${after.image.width} / ${after.image.height}` }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      onLostPointerCapture={stopDragging}
    >
      {/* Depois (base) */}
      <Image
        src={after.image}
        alt={after.alt}
        fill
        placeholder="blur"
        draggable={false}
        sizes="(min-width: 1280px) 1200px, 100vw"
        className="pointer-events-none object-cover"
      />

      {/* Antes (recortado pela posição do controle) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={before.image}
          alt={before.alt}
          fill
          placeholder="blur"
          draggable={false}
          sizes="(min-width: 1280px) 1200px, 100vw"
          className="object-cover"
        />
      </div>

      {/* Rótulos */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-4 left-4 rounded-full bg-ink/80 px-3.5 py-1.5 text-[0.7rem] font-bold tracking-[0.2em] text-white backdrop-blur transition-opacity duration-300 sm:top-5 sm:left-5"
        style={{ opacity: position < 14 ? 0 : 1 }}
      >
        ANTES
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-4 right-4 rounded-full bg-brand px-3.5 py-1.5 text-[0.7rem] font-bold tracking-[0.2em] text-ink transition-opacity duration-300 sm:top-5 sm:right-5"
        style={{ opacity: position > 86 ? 0 : 1 }}
      >
        DEPOIS
      </span>

      {/* Linha divisória + controle */}
      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgb(0_0_0/0.08)]"
        style={{ left: `${position}%` }}
      >
        <div
          role="slider"
          tabIndex={0}
          aria-label={`Comparar antes e depois: ${comparison.title}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={rounded}
          aria-valuetext={`${rounded}% da imagem de antes visível`}
          aria-orientation="horizontal"
          onKeyDown={onKeyDown}
          className="pointer-events-auto absolute top-1/2 left-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-[0_10px_30px_-8px_rgb(0_0_0/0.45)] transition-transform duration-300 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:size-14"
        >
          <ChevronsLeftRight className="size-5" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
