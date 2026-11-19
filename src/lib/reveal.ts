import type { CSSProperties } from "react";

/** Atraso da animação de entrada (ver `[data-reveal]` em globals.css). */
export function revealDelay(ms: number): CSSProperties {
  return { "--reveal-delay": `${ms}ms` } as CSSProperties;
}
