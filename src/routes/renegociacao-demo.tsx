import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/renegociacao-demo")({
  head: () => ({
    meta: [
      { title: "Simulação de renegociação | THE HILLS" },
      {
        name: "description",
        content:
          "Tela demonstrativa de renegociação THE HILLS, sem pagamentos reais.",
      },
      {
        property: "og:title",
        content: "Simulação de renegociação | THE HILLS",
      },
      {
        property: "og:description",
        content:
          "Tela demonstrativa de renegociação THE HILLS, sem pagamentos reais.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RenegociacaoDemo,
});

function RenegociacaoDemo() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-6 text-center font-sans">
      <span className="inline-block rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-accent-foreground">
        Demonstração
      </span>
      <h1 className="mt-4 text-[22px] font-bold text-navy">
        Simulação de renegociação
      </h1>
      <p className="mt-2 text-[15px] text-muted-foreground">
        Esta funcionalidade é apenas demonstrativa.
      </p>
      <Link
        to="/consultar-cpf/resultado"
        className="mt-8 rounded-lg border border-border px-5 py-3 text-[15px] font-semibold text-navy"
      >
        Voltar
      </Link>
    </div>
  );
}
