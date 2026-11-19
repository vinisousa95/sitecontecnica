import type { LucideIcon } from "lucide-react";
import { Bath, Building2, House, LayoutGrid, PencilRuler, Store } from "lucide-react";

/**
 * Lista de serviços exibida no site.
 *
 * ATENÇÃO: estas categorias são SUGESTÕES COMERCIAIS e devem ser confirmadas
 * pela Contécnica antes da publicação definitiva. Para alterar, editar ou
 * remover um serviço, basta modificar este array. O campo `title` também é
 * usado como opção do campo "Tipo de reforma" no formulário de contato.
 */
export type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    title: "Reformas residenciais",
    description:
      "Renovação de casas com foco em funcionalidade, conforto e na valorização do imóvel.",
    icon: House,
  },
  {
    title: "Reformas de apartamentos",
    description:
      "Intervenções planejadas para a rotina de condomínios, do ambiente pontual à reforma completa.",
    icon: Building2,
  },
  {
    title: "Reformas comerciais",
    description:
      "Adequação de lojas, escritórios e salas para receber bem clientes e equipes.",
    icon: Store,
  },
  {
    title: "Banheiros e cozinhas",
    description:
      "Ambientes técnicos que pedem atenção a instalações, revestimentos e acabamento.",
    icon: Bath,
  },
  {
    title: "Acabamentos, pisos e revestimentos",
    description:
      "Assentamento e finalização cuidadosa, com atenção a alinhamentos e paginação.",
    icon: LayoutGrid,
  },
  {
    title: "Adequação e modernização de ambientes",
    description:
      "Atualização de espaços existentes para novos usos, layouts e necessidades.",
    icon: PencilRuler,
  },
];
