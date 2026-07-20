# Site Contécnica — Construções e Reformas

Site institucional estático (HTML + CSS + JS) com formulário de contato em **PHP**, pronto para publicação em hospedagem compartilhada **Locaweb** (não exige Node.js no servidor).

> **Slogan:** *Trabalhando para o seu conforto.*

---

## 📁 Estrutura de arquivos

```
sitecontecnica/
├── index.html          ← página principal (todas as seções)
├── obrigado.html       ← página de retorno do formulário (sem JavaScript)
├── enviar.php          ← processa e envia o formulário por e-mail (mail())
├── .htaccess           ← compressão, cache e segurança (Apache/Locaweb)
├── robots.txt          ← SEO
├── sitemap.xml         ← SEO
├── css/
│   └── style.css       ← todo o estilo do site
├── js/
│   └── script.js       ← menu, carrossel, galeria (lightbox), formulário
└── assets/
    └── img/
        ├── logo.svg            ← logo (cabeçalho)
        ├── logo-branco.svg     ← logo em branco (rodapé)
        ├── favicon.svg         ← ícone da aba do navegador
        ├── hero.svg            ← imagem do banner principal
        └── portfolio-1..6.svg  ← imagens da galeria de obras
```

---

## 🚀 Como publicar na Locaweb

### Opção A — Painel / Gerenciador de Arquivos

1. Acesse o **Painel Locaweb** → *Hospedagem* → **Gerenciador de Arquivos**.
2. Entre na pasta pública do seu site (geralmente `public_html` ou `www`).
3. Envie **todos os arquivos e pastas** deste projeto para dentro dela,
   mantendo a estrutura (as pastas `css`, `js` e `assets` devem ficar
   junto do `index.html`).
4. Pronto! Acesse seu domínio no navegador.

### Opção B — FTP (FileZilla)

1. Baixe o [FileZilla](https://filezilla-project.org/).
2. Conecte com os dados de FTP da Locaweb:
   - **Host:** `ftp.seudominio.com.br` (ou o endereço informado no painel)
   - **Usuário / Senha:** os do seu FTP
   - **Porta:** 21
3. No lado direito, entre em `public_html` (ou `www`).
4. Arraste todos os arquivos do projeto para o servidor.

> ⚠️ Envie também os arquivos ocultos **`.htaccess`**. No FileZilla, ative
> *Servidor → Forçar exibição de arquivos ocultos*.

---

## ✉️ Formulário de contato

O envio usa a função nativa `mail()` do PHP (suportada pela Locaweb).

**Antes de publicar, abra o arquivo `enviar.php` e confira/ajuste no topo:**

```php
$para      = 'contecnica@contecnica.net';   // e-mail que RECEBE os contatos
$remetente = 'no-reply@contecnica.net';     // remetente do MESMO domínio
```

- O **remetente** (`$remetente`) deve ser um e-mail **do próprio domínio**
  hospedado na Locaweb. Isso evita que a mensagem caia no spam ou seja
  recusada. Se necessário, crie a conta `no-reply@seudominio` no painel.
- Se os e-mails não chegarem, verifique a caixa de **spam** e confirme com
  o suporte Locaweb se o `mail()` está liberado para o seu plano (na maioria
  dos planos já vem habilitado).

O formulário funciona de duas formas automaticamente:
- **Com JavaScript:** envia sem recarregar a página e mostra a mensagem de sucesso.
- **Sem JavaScript:** redireciona para `obrigado.html`.

Há proteção **anti-spam** por *honeypot* (campo invisível `website`).

---

## 🖼️ Trocar as imagens pelas fotos reais das obras

As imagens em `assets/img/` são **ilustrações temporárias** (SVG) e devem ser
substituídas pelas **fotos reais** das obras da Contécnica:

1. Otimize as fotos antes (recomendado **WebP** ou **JPG**, largura ~1200px,
   até ~200 KB cada). Ferramentas: [Squoosh](https://squoosh.app/) ou
   [TinyPNG](https://tinypng.com/).
2. Substitua os arquivos `portfolio-1.svg` … `portfolio-6.svg` e `hero.svg`
   pelas suas fotos. **Duas formas:**
   - **Mais simples:** salve suas fotos com os mesmos nomes, mudando a
     extensão (ex.: `hero.jpg`) e atualize as referências no `index.html`
     (procure por `hero.svg`, `portfolio-1.svg`, etc.).
   - As imagens já usam `loading="lazy"` para carregamento otimizado.
3. **Logo:** se tiver o arquivo oficial da logo em PNG com fundo transparente,
   substitua `logo.svg`/`logo-branco.svg` ou troque a referência no HTML.

---

## 🎨 Identidade visual

| Elemento        | Cor            |
|-----------------|----------------|
| Primária (degradê) | `#F5A623` → `#FFD34D` |
| Secundária (textos) | `#1A1A1A` |
| Fundo claro     | `#FFFFFF` / `#F7F7F7` |

Fontes: **Playfair Display** (títulos/logo, serifada) e **Montserrat**
(textos, sans-serif) — carregadas via Google Fonts.

---

## 🔎 SEO e desempenho

- Meta tags de título e descrição com foco em **reformas em São Paulo**.
- Dados estruturados **schema.org / LocalBusiness** (`GeneralContractor`).
- Open Graph para compartilhamento em redes sociais.
- `robots.txt`, `sitemap.xml` e favicon incluídos.
- Compressão GZIP, cache e cabeçalhos de segurança via `.htaccess`.
- Imagens com *lazy loading*.

> **Ajuste a cidade/bairro:** o site está otimizado para **São Paulo**
> (DDD 11). Se a empresa atende outra região, faça um "localizar e
> substituir" por *São Paulo* no `index.html`, `enviar.php` e `sitemap.xml`,
> e atualize o domínio (`https://www.contecnica.net/`) para o domínio real.

---

## 📞 Dados da empresa (usados no site)

- **Telefone / WhatsApp:** (11) 98475-2466
- **E-mail:** contecnica@contecnica.net
- **Atendimento:** São Paulo e Grande São Paulo

Para atualizar o número de WhatsApp, procure por `5511984752466` no
`index.html` e substitua em todos os links.

---

## ✅ Checklist antes de publicar

- [ ] Ajustar `$para` e `$remetente` em `enviar.php`
- [ ] Confirmar número de WhatsApp e e-mail no `index.html`
- [ ] Substituir imagens de exemplo pelas fotos reais das obras
- [ ] Colocar a logo oficial (se houver PNG transparente)
- [ ] Atualizar links de Instagram/Facebook no rodapé
- [ ] Trocar `https://www.contecnica.net/` pelo domínio real (meta tags/sitemap)
- [ ] Instalar certificado **SSL** e ativar o redirecionamento HTTPS no `.htaccess`
- [ ] Testar o formulário enviando uma mensagem de teste
```
