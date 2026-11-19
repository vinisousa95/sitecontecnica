# Site Contécnica — Construções e Reformas

Site institucional da **CONTÉCNICA — Construções e Reformas** (*Trabalhando para o seu conforto*), desenvolvido em **Next.js (App Router) + React + TypeScript + Tailwind CSS**, pronto para publicação na **Vercel**.

- Página única com as seções: Início, Sobre, Serviços, Portfólio, Antes e depois, Processo, Chamada comercial, Perguntas frequentes e Contato.
- Fotos reais da empresa otimizadas automaticamente com `next/image` (AVIF/WebP, tamanhos responsivos e *blur* durante o carregamento).
- Portfólio com filtros, lightbox (teclado, toque e botão de fechar) e comparadores de antes/depois (mouse, toque e teclado).
- Formulário de orçamento que valida os campos e monta uma mensagem formatada para o WhatsApp. **Nenhum dado é armazenado ou enviado a servidores**: a mensagem só é enviada quando o próprio visitante confirma no WhatsApp.
- SEO: metadados, Open Graph, `sitemap.xml`, `robots.txt`, `manifest` e dados estruturados Schema.org apenas com informações reais (nome, slogan, telefone, e-mail, logotipo).
- Sem banco de dados e sem serviços pagos.

---

## Requisitos

- **Node.js 20.9 ou superior** (recomendado: 22 LTS)
- npm (vem com o Node.js)

## Instalação e execução local

```bash
npm install
```

```bash
npm run dev
```

Acesse http://localhost:3000.

### Scripts

| Comando             | O que faz                                            |
| ------------------- | ---------------------------------------------------- |
| `npm run dev`       | Servidor de desenvolvimento                          |
| `npm run build`     | Build de produção (o mesmo que a Vercel executa)     |
| `npm start`         | Sobe o build de produção localmente                  |
| `npm run lint`      | Verificação de código com ESLint                     |
| `npm run typecheck` | Verificação de tipos do TypeScript                   |

---

## Estrutura do projeto

```
public/images/            Fotos e logotipos originais da empresa
src/
├── app/
│   ├── layout.tsx         Layout raiz: fontes, metadados (SEO), cabeçalho e rodapé
│   ├── page.tsx           Página inicial (ordem das seções)
│   ├── globals.css        Cores, tipografia e estilos globais (Tailwind)
│   ├── sitemap.ts         /sitemap.xml
│   ├── robots.ts          /robots.txt
│   ├── manifest.ts        /manifest.webmanifest
│   ├── icon.png           Favicon (recorte do símbolo do logotipo)
│   └── opengraph-image.jpg  Imagem de compartilhamento (WhatsApp, redes sociais)
├── content/               ← TEXTOS E DADOS EDITÁVEIS
│   ├── site.ts            Telefone, WhatsApp, e-mail, slogan, menu, SEO
│   ├── home.ts            Textos do topo, Sobre, Chamada comercial e Contato
│   ├── services.ts        Lista de serviços
│   ├── projects.ts        Portfólio (fotos, títulos, categorias)
│   ├── comparisons.ts     Pares de antes e depois
│   ├── process.ts         Etapas do processo
│   └── faq.ts             Perguntas frequentes
├── components/            Componentes visuais (seções, galeria, formulário…)
└── lib/                   Funções auxiliares (links de WhatsApp, animações)
```

---

## Manutenção do conteúdo

Todas as informações comerciais ficam centralizadas em `src/content/`. Os componentes apenas exibem esses dados — **não é preciso mexer no layout para atualizar textos**.

### Telefone, WhatsApp e e-mail
Edite `src/content/site.ts`:

```ts
phoneDisplay: "(11) 98475-2466",     // como aparece no site
whatsappNumber: "5511984752466",     // 55 + DDD + número, só dígitos
phoneE164: "+5511984752466",         // usado no link tel: e no Schema.org
email: "contecnica@contecnica.net",
```

As mensagens pré-preenchidas dos botões de WhatsApp ficam no mesmo arquivo (`whatsappMessages`).

### Textos institucionais
`src/content/home.ts` (topo, Sobre, Chamada comercial e Contato).

### Serviços
`src/content/services.ts`. Cada item tem título, descrição curta e ícone ([Lucide](https://lucide.dev/icons)). O título também aparece como opção em “Tipo de reforma” no formulário.

> ⚠️ As categorias de serviço foram criadas como **sugestões comerciais** e devem ser confirmadas pela Contécnica.

### Portfólio — adicionar uma nova obra
1. Coloque a foto em `public/images/` (de preferência `.webp`, com cerca de 1440–1600 px no maior lado).
2. Em `src/content/projects.ts`, importe a imagem no topo do arquivo:
   ```ts
   import minhaObra from "../../public/images/minha-obra.webp";
   ```
3. Adicione um item ao array `projects`:
   ```ts
   {
     slug: "minha-obra",                 // identificador único (sem espaços/acentos)
     title: "Cozinha planejada",
     category: "ambientes-integrados",   // ambientes-integrados | salas | banheiros | quartos | obras-em-execucao
     status: "concluido",                // concluido | em-execucao
     image: minhaObra,
     alt: "Descrição objetiva do que aparece na foto",
   },
   ```
Largura, altura e o efeito de carregamento são calculados automaticamente. Para criar uma nova categoria, acrescente-a em `projectCategories` no mesmo arquivo. O `slug` já deixa o projeto preparado para futuras páginas individuais (`/projetos/[slug]`).

### Antes e depois
`src/content/comparisons.ts`. Use **somente pares do mesmo ambiente**.

### Perguntas frequentes e processo
`src/content/faq.ts` e `src/content/process.ts`.

### Regras editoriais
Não publique endereço, CNPJ, registro profissional, redes sociais, nomes de clientes, prazos, valores, garantias ou depoimentos que não tenham sido confirmados pela empresa.

---

## Publicação na Vercel

O projeto não precisa de nenhuma configuração especial: a Vercel detecta o Next.js automaticamente (comando de build `next build`, sem variáveis obrigatórias).

### Opção 1 — Deploy automático pelo GitHub (recomendado)
1. Envie o código para um repositório no GitHub (este projeto já está versionado com Git).
2. Acesse https://vercel.com e entre com a sua conta do GitHub (o plano gratuito *Hobby* é suficiente).
3. Clique em **Add New… → Project**, selecione o repositório e clique em **Import**.
4. Mantenha as configurações detectadas (*Framework Preset: Next.js*) e clique em **Deploy**.
5. A partir daí, **cada `git push` na branch principal publica uma nova versão automaticamente**, e cada pull request ganha uma URL de pré-visualização.

### Opção 2 — Vercel CLI
```bash
npm install -g vercel
```

```bash
vercel login
```

```bash
vercel --prod
```

### Variável de ambiente opcional
Depois de ter um domínio próprio, defina em **Project → Settings → Environment Variables**:

| Nome                   | Exemplo                          |
| ---------------------- | -------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | `https://www.seudominio.com.br`  |

Ela é usada no sitemap, robots.txt, Open Graph e Schema.org. Se não for definida, o site usa automaticamente o domínio de produção da Vercel. Faça um novo deploy após alterá-la (**Deployments → … → Redeploy**).

---

## Domínio próprio e DNS

1. Na Vercel, abra o projeto → **Settings → Domains** → **Add** e digite o domínio (ex.: `seudominio.com.br`). Adicione também a versão `www` — a Vercel sugere redirecionar uma para a outra.
2. A Vercel mostrará os registros DNS necessários. Em geral:

   | Tipo    | Nome / Host | Valor                   |
   | ------- | ----------- | ----------------------- |
   | `A`     | `@`         | `76.76.21.21`           |
   | `CNAME` | `www`       | `cname.vercel-dns.com`  |

   > Use sempre os valores exibidos no painel da Vercel no momento da configuração — eles podem ser específicos do seu projeto.

3. Cadastre esses registros no painel onde o domínio está registrado/hospedado (por exemplo, Registro.br, Locaweb, Hostinger, GoDaddy, Cloudflare) e **remova registros `A`/`CNAME` antigos** que apontem `@` ou `www` para outro servidor.
4. Aguarde a propagação (de alguns minutos até 48 horas). A Vercel emite o certificado HTTPS automaticamente.
5. Defina `NEXT_PUBLIC_SITE_URL` com o domínio final e faça um novo deploy.

> ⚠️ **E-mail:** se o domínio também é usado para e-mail (ex.: `contecnica@contecnica.net`), **não altere nem apague os registros `MX`, `TXT` (SPF/DKIM) e similares**. Para publicar o site, altere apenas os registros `A` de `@` e `CNAME` de `www`.

Alternativa: em Registro.br e outros, é possível delegar o domínio para os *nameservers* da Vercel (`ns1.vercel-dns.com` e `ns2.vercel-dns.com`). Nesse caso, recrie na Vercel os registros de e-mail existentes antes de trocar os nameservers.

---

## Tecnologias

- [Next.js 16](https://nextjs.org) (App Router, Turbopack, Cache Components) e React 19
- TypeScript
- Tailwind CSS 4
- [Lucide](https://lucide.dev) para ícones
- Fontes Manrope e Inter via `next/font` (hospedadas junto com o site, sem requisições ao Google no navegador)

As animações usam apenas CSS e `IntersectionObserver` (sem bibliotecas de animação) e são desativadas para quem ativou “reduzir movimento” no sistema.
