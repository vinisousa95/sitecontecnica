"use client";

import { AlertCircle, ArrowUpRight, ExternalLink } from "lucide-react";
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";

import { services } from "@/content/services";
import { whatsappLink } from "@/lib/whatsapp";

import { WhatsAppIcon } from "./WhatsAppIcon";

type Fields = {
  nome: string;
  telefone: string;
  local: string;
  tipo: string;
  descricao: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

const initial: Fields = { nome: "", telefone: "", local: "", tipo: "", descricao: "" };

const reformTypes = [...services.map((s) => s.title), "Outro tipo de reforma"];

/** Formata o telefone brasileiro enquanto o usuário digita: (11) 98765-4321 */
function formatPhone(value: string) {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.nome.trim().length < 2) e.nome = "Informe seu nome.";
  const digits = f.telefone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 11) e.telefone = "Informe um telefone com DDD, por exemplo (11) 98765-4321.";
  if (f.local.trim().length < 2) e.local = "Informe a cidade ou o bairro da obra.";
  if (!f.tipo) e.tipo = "Selecione o tipo de reforma.";
  if (f.descricao.trim().length < 10) e.descricao = "Descreva brevemente o que você precisa (mínimo de 10 caracteres).";
  return e;
}

function buildMessage(f: Fields) {
  return [
    "Olá, Contécnica! Gostaria de solicitar um orçamento.",
    "",
    `*Nome:* ${f.nome.trim()}`,
    `*Telefone:* ${f.telefone.trim()}`,
    `*Cidade/bairro da obra:* ${f.local.trim()}`,
    `*Tipo de reforma:* ${f.tipo}`,
    "",
    "*Descrição da necessidade:*",
    f.descricao.trim(),
    "",
    "(Mensagem enviada a partir do site)",
  ].join("\n");
}

const order: (keyof Fields)[] = ["nome", "telefone", "local", "tipo", "descricao"];

export function QuoteForm() {
  const [fields, setFields] = useState<Fields>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [link, setLink] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const name = e.target.name as keyof Fields;
    const value = name === "telefone" ? formatPhone(e.target.value) : e.target.value;
    const next = { ...fields, [name]: value };
    setFields(next);
    setLink(null);
    if (touched[name]) setErrors((prev) => ({ ...prev, [name]: validate(next)[name] }));
  };

  const onBlur = (name: keyof Fields) => {
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validate(fields)[name] }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(fields);
    setErrors(found);
    setTouched({ nome: true, telefone: true, local: true, tipo: true, descricao: true });

    const firstInvalid = order.find((k) => found[k]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      setLink(null);
      return;
    }

    const url = whatsappLink(buildMessage(fields));
    setLink(url);
    // Abertura disparada diretamente pelo clique do usuário no botão de envio.
    // Com "noopener" o navegador não informa se a aba abriu; por isso um link alternativo é exibido.
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const fieldClass = (name: keyof Fields) =>
    `mt-2 block w-full rounded-xl border bg-white px-4 py-3.5 text-base text-ink placeholder:text-ink/35 transition-colors outline-none focus:border-ink focus:ring-4 focus:ring-brand/25 ${
      errors[name] ? "border-red-600" : "border-line hover:border-ink/40"
    }`;

  const errorText = (name: keyof Fields) =>
    errors[name] ? (
      <p id={`${name}-erro`} className="mt-2 flex items-start gap-1.5 text-sm text-red-700">
        <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        {errors[name]}
      </p>
    ) : null;

  const describedBy = (name: keyof Fields) => (errors[name] ? `${name}-erro` : undefined);

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} className="grid gap-6 sm:grid-cols-2" aria-describedby="form-ajuda">
      <p id="form-ajuda" className="text-sm text-muted sm:col-span-2">
        Todos os campos são obrigatórios.
      </p>

      <div className="sm:col-span-2">
        <label htmlFor="nome" className="text-sm font-semibold text-ink">
          Nome
        </label>
        <input
          id="nome"
          name="nome"
          type="text"
          autoComplete="name"
          required
          value={fields.nome}
          onChange={onChange}
          onBlur={() => onBlur("nome")}
          aria-invalid={!!errors.nome}
          aria-describedby={describedBy("nome")}
          className={fieldClass("nome")}
          placeholder="Seu nome"
        />
        {errorText("nome")}
      </div>

      <div>
        <label htmlFor="telefone" className="text-sm font-semibold text-ink">
          Telefone
        </label>
        <input
          id="telefone"
          name="telefone"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          required
          value={fields.telefone}
          onChange={onChange}
          onBlur={() => onBlur("telefone")}
          aria-invalid={!!errors.telefone}
          aria-describedby={describedBy("telefone")}
          className={fieldClass("telefone")}
          placeholder="(11) 98765-4321"
        />
        {errorText("telefone")}
      </div>

      <div>
        <label htmlFor="local" className="text-sm font-semibold text-ink">
          Cidade ou bairro da obra
        </label>
        <input
          id="local"
          name="local"
          type="text"
          autoComplete="address-level2"
          required
          value={fields.local}
          onChange={onChange}
          onBlur={() => onBlur("local")}
          aria-invalid={!!errors.local}
          aria-describedby={describedBy("local")}
          className={fieldClass("local")}
          placeholder="Ex.: Moema, São Paulo"
        />
        {errorText("local")}
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="tipo" className="text-sm font-semibold text-ink">
          Tipo de reforma
        </label>
        <select
          id="tipo"
          name="tipo"
          required
          value={fields.tipo}
          onChange={onChange}
          onBlur={() => onBlur("tipo")}
          aria-invalid={!!errors.tipo}
          aria-describedby={describedBy("tipo")}
          className={`${fieldClass("tipo")} appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='%23171717'%20stroke-width='2'%3E%3Cpath%20d='m6%209%206%206%206-6'/%3E%3C/svg%3E")] bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-11 ${
            fields.tipo ? "" : "text-ink/40"
          }`}
        >
          <option value="" disabled>
            Selecione uma opção
          </option>
          {reformTypes.map((t) => (
            <option key={t} value={t} className="text-ink">
              {t}
            </option>
          ))}
        </select>
        {errorText("tipo")}
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="descricao" className="text-sm font-semibold text-ink">
          Descrição da necessidade
        </label>
        <textarea
          id="descricao"
          name="descricao"
          rows={5}
          required
          value={fields.descricao}
          onChange={onChange}
          onBlur={() => onBlur("descricao")}
          aria-invalid={!!errors.descricao}
          aria-describedby={describedBy("descricao")}
          className={`${fieldClass("descricao")} resize-y`}
          placeholder="Conte quais ambientes deseja reformar e o que gostaria de mudar."
          maxLength={1500}
        />
        {errorText("descricao")}
      </div>

      <div className="sm:col-span-2">
        <button type="submit" className="btn btn-primary w-full sm:w-auto">
          <WhatsAppIcon className="size-5" />
          Continuar no WhatsApp
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </button>

        <div aria-live="polite" className="mt-4">
          {link && (
            <p className="rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink">
              Sua mensagem foi preparada. <strong>Para concluir, revise e confirme o envio no WhatsApp.</strong> Se a
              conversa não abriu automaticamente,{" "}
              <a href={link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-bold underline decoration-brand decoration-2 underline-offset-4">
                clique aqui para abrir o WhatsApp
                <ExternalLink className="size-3.5" aria-hidden="true" />
              </a>
              .
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
