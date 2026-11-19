import { company } from "./site";

/**
 * Perguntas frequentes. As respostas são propositalmente prudentes:
 * não prometa prazos, condições ou garantias que não tenham sido confirmados.
 */
export const faq = [
  {
    question: "Como solicitar um orçamento?",
    answer: `Você pode chamar a Contécnica pelo WhatsApp ${company.phoneDisplay}, enviar um e-mail para ${company.email} ou preencher o formulário desta página. Conte o tipo de reforma, a região da obra e o que deseja fazer — isso ajuda a direcionar o primeiro contato.`,
  },
  {
    question: "Quais tipos de reforma podem ser realizados?",
    answer:
      "A Contécnica atua com construções e reformas, incluindo ambientes residenciais, apartamentos e espaços comerciais, além de acabamentos, pisos e revestimentos. Como cada caso é diferente, a viabilidade de cada serviço é confirmada após conhecer o seu projeto.",
  },
  {
    question: "Como funciona a avaliação inicial?",
    answer:
      "No primeiro contato, entendemos a sua necessidade e as características do ambiente. A partir disso, combinamos a melhor forma de avaliar o espaço para que a proposta reflita a realidade da obra.",
  },
  {
    question: "É possível solicitar uma reforma completa?",
    answer:
      "Sim, você pode solicitar a avaliação de uma reforma completa ou de ambientes específicos. O escopo é definido em conjunto, de acordo com as necessidades do imóvel e com a avaliação individual do projeto.",
  },
  {
    question: "Como obter informações sobre prazo e valores?",
    answer:
      "Prazos e valores dependem do tamanho do ambiente, do escopo e dos materiais escolhidos, por isso são informados somente após a avaliação de cada projeto. Entre em contato para iniciar essa conversa.",
  },
] as const;
