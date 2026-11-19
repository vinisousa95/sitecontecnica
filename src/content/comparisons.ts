import type { StaticImageData } from "next/image";

import banheiroAntes from "../../public/images/banheiro-antes.webp";
import banheiroDepois from "../../public/images/banheiro-depois.webp";
import quartoAntes from "../../public/images/quarto-antes.webp";
import quartoDepois from "../../public/images/quarto-depois.webp";

/**
 * Comparativos "antes e depois".
 *
 * Use SOMENTE pares de fotos do MESMO ambiente. Nunca combine fotografias de
 * espaços diferentes como se fossem a mesma reforma.
 */
export type Comparison = {
  slug: string;
  title: string;
  description: string;
  before: { image: StaticImageData; alt: string };
  after: { image: StaticImageData; alt: string };
};

export const comparisons: Comparison[] = [
  {
    slug: "banheiro",
    title: "Banheiro",
    description: "Da demolição ao ambiente pronto para uso.",
    before: {
      image: banheiroAntes,
      alt: "Banheiro antes da reforma, com revestimentos removidos e entulho no chão",
    },
    after: {
      image: banheiroDepois,
      alt: "O mesmo banheiro depois da reforma, com revestimento claro, banheira e box de vidro",
    },
  },
  {
    slug: "quarto",
    title: "Quarto",
    description: "Do ambiente em obra ao espaço finalizado.",
    before: {
      image: quartoAntes,
      alt: "Quarto antes da reforma, com parede aberta, sacos de entulho e materiais de obra",
    },
    after: {
      image: quartoDepois,
      alt: "O mesmo quarto depois da reforma, com paredes acabadas, piso de madeira e mobiliário",
    },
  },
];
