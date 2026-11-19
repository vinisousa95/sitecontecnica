import Image from "next/image";

import logoHorizontal from "../../public/images/logo-horizontal.jpg";

type LogoProps = {
  className?: string;
  preload?: boolean;
};

/**
 * Logotipo original da Contécnica (arquivo do cliente, sem alterações de
 * proporção ou tipografia). Como o arquivo tem fundo branco, deve ser usado
 * sobre superfícies claras; `mix-blend-multiply` integra o fundo ao off-white.
 */
export function Logo({ className = "h-11 w-auto", preload = false }: LogoProps) {
  return (
    <Image
      src={logoHorizontal}
      alt="Contécnica — Construções e Reformas"
      className={`${className} mix-blend-multiply`}
      sizes="260px"
      preload={preload}
    />
  );
}
