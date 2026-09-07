import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/consultando")({
  head: () => ({
    meta: [
      { title: "Consultando informações | THE HILLS" },
      {
        name: "description",
        content: "Aguarde alguns segundos enquanto consultamos as informações do CPF.",
      },
      { property: "og:title", content: "Consultando informações | THE HILLS" },
      {
        property: "og:description",
        content: "Aguarde alguns segundos enquanto consultamos as informações do CPF.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Consultando,
});

function Consultando() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => {
      navigate({ to: "/consultar-cpf/resultado", replace: true });
    }, 3000);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-6 font-sans">
      <div
        role="status"
        aria-live="polite"
        className="h-14 w-14 animate-spin rounded-full border-4 border-muted border-t-primary"
      />
      <p className="mt-6 text-[16px] font-medium text-navy">
        Consultando informações...
      </p>
      <p className="mt-2 text-[13px] text-muted-foreground">
        Aguarde alguns segundos.
      </p>
    </div>
  );
}
