import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, User, Info, Accessibility } from "lucide-react";

export const Route = createFileRoute("/consultar-cpf/resultado")({
  head: () => ({
    meta: [
      { title: "Dívidas do CPF | THE HILLS" },
      {
        name: "description",
        content:
          "Resultado demonstrativo da consulta THE HILLS com valores fictícios.",
      },
      { property: "og:title", content: "Dívidas do CPF | THE HILLS" },
      {
        property: "og:description",
        content:
          "Resultado demonstrativo da consulta THE HILLS com valores fictícios.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Resultado,
});

function Resultado() {
  return (
    <div className="min-h-[100dvh] bg-background font-sans">
      {/* Cabeçalho */}
      <header className="flex items-center justify-between px-5 pt-6">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <User className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="text-[15px] text-navy">Olá</span>
        </div>
        <span className="text-[12px] font-extrabold tracking-[0.18em] text-navy/60">
          THE HILLS
        </span>
      </header>

      {/* Aviso de demonstração */}
      <div className="px-5 pt-4">
        <span className="inline-block rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-accent-foreground">
          Demonstração
        </span>
        <p className="mt-1.5 text-[12px] text-muted-foreground">
          Os valores e informações exibidos nesta tela são fictícios.
        </p>
      </div>

      {/* Área de resultado */}
      <section className="flex flex-col items-center px-6 pt-10 text-center">
        <AlertTriangle
          className="h-9 w-9 text-primary"
          aria-hidden="true"
          fill="currentColor"
          stroke="none"
        />
        <p className="mt-3 text-[12px] text-muted-foreground">
          Consulta demonstrativa
        </p>
        <h1 className="mt-2 text-[22px] font-medium leading-snug text-navy">
          Dívidas do CPF: <br />
          <span className="font-bold">Encontramos 1 pendência simulada</span>
        </h1>
        <Link
          to="/renegociacao-demo"
          className="mt-5 rounded-full bg-primary px-6 py-2.5 text-[12px] font-bold uppercase tracking-wide text-primary-foreground"
        >
          Ver mais
        </Link>
        <div className="mt-6 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          <span className="h-1.5 w-1.5 rounded-full bg-border" />
        </div>
      </section>

      {/* Espaço amplo */}
      <div className="h-24" />

      {/* Negocie sua pendência */}
      <section className="px-5 pb-32">
        <div className="flex items-center gap-1.5">
          <h2 className="text-[17px] font-bold text-navy">
            Negocie sua pendência
          </h2>
          <Info className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
        </div>
        <p className="mt-1 text-[13px] text-muted-foreground">
          Veja abaixo os detalhes desta simulação.
        </p>

        <article className="mt-4 rounded-2xl border border-border bg-card p-5">
          <span className="inline-block rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-foreground">
            Demonstração
          </span>

          <p className="mt-4 text-[11px] uppercase tracking-wide text-muted-foreground">
            Tipo de pendência
          </p>
          <p className="text-[17px] font-bold text-navy">Imposto de Renda</p>

          <p className="mt-3 text-[13px] text-muted-foreground">
            Data: 07/09/2026
          </p>

          <p className="mt-4 text-[13px] text-muted-foreground">Valor</p>
          <p className="text-[32px] font-bold leading-tight text-navy">
            R$ 49,00
          </p>

          <p className="mt-3 text-[12px] font-bold uppercase tracking-wide text-primary">
            Pendência simulada
          </p>
          <p className="mt-3 text-[12px] leading-relaxed text-muted-foreground">
            Exemplo fictício utilizado apenas para demonstrar o funcionamento da
            plataforma.
          </p>
        </article>

        <Link
          to="/renegociacao-demo"
          className="mt-5 flex h-14 w-full items-center justify-center rounded-lg bg-primary text-[16px] font-bold uppercase tracking-wide text-primary-foreground"
        >
          Renegociar dívida
        </Link>
      </section>

      <Link
        to="/consultar-cpf"
        aria-label="Acessibilidade"
        className="fixed bottom-5 left-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/40"
      >
        <Accessibility className="h-6 w-6" aria-hidden="true" />
      </Link>
    </div>
  );
}
