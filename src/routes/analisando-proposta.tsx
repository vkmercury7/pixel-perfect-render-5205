import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/analisando-proposta")({
  head: () => ({
    meta: [
      { title: "Analisando suas informações | Serasa" },
      {
        name: "description",
        content:
          "Estamos preparando as informações da sua possível negociação.",
      },
      {
        property: "og:title",
        content: "Analisando suas informações | Serasa",
      },
      {
        property: "og:description",
        content:
          "Estamos preparando as informações da sua possível negociação.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AnalisandoProposta,
});

function AnalisandoProposta() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate({ to: "/consultar-cpf/resultado", replace: true });
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-8 text-center font-sans">
      <div className="h-14 w-14 animate-spin rounded-full border-4 border-muted border-t-primary" />
      <p className="mt-6 text-[16px] font-medium text-navy">
        Analisando suas informações...
      </p>
      <p className="mt-2 text-[13px] text-muted-foreground">
        Estamos preparando as informações da sua possível negociação.
      </p>
      <p className="mt-1 text-[13px] text-muted-foreground">
        Isso levará apenas alguns segundos.
      </p>
    </div>
  );
}
