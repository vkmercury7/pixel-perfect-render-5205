import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/consultar-cpf/resultado")({
  head: () => ({
    meta: [
      { title: "Próxima etapa | THE HILLS" },
      {
        name: "description",
        content: "Próxima etapa da demonstração de consulta THE HILLS.",
      },
      { property: "og:title", content: "Próxima etapa | THE HILLS" },
      {
        property: "og:description",
        content: "Próxima etapa da demonstração de consulta THE HILLS.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-6 font-sans">
      <h1 className="text-center text-xl font-semibold text-navy">
        Próxima etapa da demonstração
      </h1>
    </div>
  ),
});
