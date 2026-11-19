import type { StaticImageData } from "next/image";

import acabamentoPiso from "../../public/images/acabamento-piso.webp";
import areaSocialFinal from "../../public/images/area-social-final.webp";
import banheiroDepois from "../../public/images/banheiro-depois.webp";
import banheiroEspelhoFinal from "../../public/images/banheiro-espelho-final.webp";
import cozinhaIntegradaFinal from "../../public/images/cozinha-integrada-final.webp";
import instalacaoGesso from "../../public/images/instalacao-gesso.webp";
import obraAreaSocial from "../../public/images/obra-area-social.webp";
import quartoDepois from "../../public/images/quarto-depois.webp";
import salaEmReforma from "../../public/images/sala-em-reforma.webp";
import salaEstarFinal from "../../public/images/sala-estar-final.webp";

/**
 * Portfólio de projetos.
 *
 * Para adicionar uma nova obra:
 *  1. Coloque a foto em `public/images/` (de preferência .webp, até ~1600 px).
 *  2. Importe a imagem acima, como as demais.
 *  3. Adicione um objeto ao array `projects` com um `slug` único.
 *
 * Regras editoriais: não informe endereço, nome de clientes, prazos, valores
 * ou especificações técnicas que não tenham sido confirmados pela empresa,
 * e não apresente obras diferentes como se fossem o mesmo projeto.
 *
 * O `slug` já prepara o projeto para futuras páginas individuais
 * (por exemplo, /projetos/[slug]).
 */
export const projectCategories = [
  { id: "ambientes-integrados", label: "Ambientes Integrados" },
  { id: "salas", label: "Salas" },
  { id: "banheiros", label: "Banheiros" },
  { id: "quartos", label: "Quartos" },
  { id: "obras-em-execucao", label: "Obras em Execução" },
] as const;

export type ProjectCategory = (typeof projectCategories)[number]["id"];

export type ProjectStatus = "concluido" | "em-execucao";

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  status: ProjectStatus;
  image: StaticImageData;
  alt: string;
};

export const statusLabel: Record<ProjectStatus, string> = {
  concluido: "Ambiente finalizado",
  "em-execucao": "Obra em execução",
};

export const projects: Project[] = [
  {
    slug: "sala-de-estar",
    title: "Sala de estar",
    category: "salas",
    status: "concluido",
    image: salaEstarFinal,
    alt: "Sala de estar finalizada com sofá claro, painel vazado iluminado e mesa de centro em madeira",
  },
  {
    slug: "cozinha-integrada",
    title: "Cozinha integrada",
    category: "ambientes-integrados",
    status: "concluido",
    image: cozinhaIntegradaFinal,
    alt: "Cozinha integrada à sala com ilha, banquetas, painel ripado em madeira e iluminação linear no teto",
  },
  {
    slug: "banheiro-com-bancada",
    title: "Banheiro com bancada e espelho",
    category: "banheiros",
    status: "concluido",
    image: banheiroEspelhoFinal,
    alt: "Banheiro finalizado com bancada clara, espelho amplo, banheira e box de vidro",
  },
  {
    slug: "area-social",
    title: "Área social com forro iluminado",
    category: "ambientes-integrados",
    status: "concluido",
    image: areaSocialFinal,
    alt: "Área social com forro de gesso rebaixado e iluminação indireta, piso claro e jardim vertical",
  },
  {
    slug: "banheiro-reformado",
    title: "Banheiro reformado",
    category: "banheiros",
    status: "concluido",
    image: banheiroDepois,
    alt: "Banheiro reformado com revestimento claro, nichos, banheira e box de vidro",
  },
  {
    slug: "quarto-reformado",
    title: "Quarto reformado",
    category: "quartos",
    status: "concluido",
    image: quartoDepois,
    alt: "Quarto reformado com piso de madeira, paredes claras, cama e janelas amplas",
  },
  {
    slug: "acabamento-de-piso",
    title: "Fase de acabamento com piso instalado",
    category: "obras-em-execucao",
    status: "em-execucao",
    image: acabamentoPiso,
    alt: "Ambiente amplo em fase de acabamento, com piso claro de porcelanato já instalado e painel de madeira",
  },
  {
    slug: "sala-em-reforma",
    title: "Sala durante a reforma",
    category: "obras-em-execucao",
    status: "em-execucao",
    image: salaEmReforma,
    alt: "Sala durante a reforma, com piso de madeira, paredes preparadas e profissional trabalhando",
  },
  {
    slug: "intervencoes-area-social",
    title: "Intervenções na área social",
    category: "obras-em-execucao",
    status: "em-execucao",
    image: obraAreaSocial,
    alt: "Área social durante a obra, com paredes abertas, materiais e profissionais em atividade",
  },
  {
    slug: "instalacao-de-gesso",
    title: "Instalação de forro de gesso",
    category: "obras-em-execucao",
    status: "em-execucao",
    image: instalacaoGesso,
    alt: "Instalação de forro de gesso com recortes para iluminação, durante a execução da obra",
  },
];
