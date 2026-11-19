import { company, getSiteUrl, seo } from "@/content/site";

/**
 * Dados estruturados (Schema.org) apenas com informações reais e confirmadas:
 * nome, slogan, telefone, e-mail, logotipo e site. Endereço e área de atuação
 * não foram informados e, por isso, não são declarados.
 */
export function JsonLd() {
  const url = getSiteUrl();
  const data = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${url}/#empresa`,
    name: `${company.legalDisplayName} — ${company.segment}`,
    alternateName: company.name,
    slogan: company.slogan,
    description: seo.description,
    url,
    logo: `${url}/images/logo-original.jpg`,
    image: `${url}/images/sala-estar-final.webp`,
    telephone: company.phoneE164,
    email: company.email,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: company.phoneE164,
      email: company.email,
      contactType: "customer service",
      availableLanguage: "Portuguese",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
