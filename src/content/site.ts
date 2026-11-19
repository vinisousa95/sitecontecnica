/**
 * Dados institucionais da Contécnica.
 *
 * Este é o ÚNICO lugar onde telefone, e-mail, slogan e links de contato
 * devem ser alterados. Todos os componentes leem estas informações daqui.
 *
 * Importante: não acrescente endereço, CNPJ, registro profissional ou redes
 * sociais sem que a empresa tenha confirmado esses dados.
 */
export const company = {
  name: "Contécnica",
  legalDisplayName: "CONTÉCNICA",
  segment: "Construções e Reformas",
  slogan: "Trabalhando para o seu conforto",
  phoneDisplay: "(11) 98475-2466",
  /** Somente dígitos, com código do país (55) — usado no link do WhatsApp. */
  whatsappNumber: "5511984752466",
  /** Formato internacional, usado no link tel: e no Schema.org. */
  phoneE164: "+5511984752466",
  email: "contecnica@contecnica.net",
} as const;

/** Endereço público do site, usado em SEO (sitemap, Open Graph, Schema.org). */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const seo = {
  title: "Contécnica | Construções e Reformas",
  description:
    "Construções e reformas residenciais e comerciais com atenção aos detalhes, cuidado na execução e acabamento de qualidade. Solicite seu orçamento pelo WhatsApp.",
  keywords: [
    "reformas",
    "construções",
    "reforma de apartamento",
    "reforma de banheiro",
    "reforma de cozinha",
    "acabamentos",
    "Contécnica",
  ],
} as const;

/** Mensagens pré-preenchidas para os botões de WhatsApp. */
export const whatsappMessages = {
  default:
    "Olá, Contécnica! Vim pelo site e gostaria de solicitar um orçamento.",
  service: (service: string) =>
    `Olá, Contécnica! Vim pelo site e gostaria de solicitar um orçamento para: ${service}.`,
} as const;

/** Itens do menu. O `id` precisa corresponder ao id da seção na página. */
export const navigation = [
  { id: "sobre", label: "Sobre" },
  { id: "servicos", label: "Serviços" },
  { id: "projetos", label: "Projetos" },
  { id: "antes-e-depois", label: "Antes e depois" },
  { id: "processo", label: "Processo" },
  { id: "faq", label: "Dúvidas" },
  { id: "contato", label: "Contato" },
] as const;

export type SectionId = (typeof navigation)[number]["id"] | "inicio";
