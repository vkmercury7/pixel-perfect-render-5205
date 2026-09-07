import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AlertTriangle, Accessibility } from "lucide-react";
import logoAsset from "@/assets/logo-th.png.asset.json";

export const Route = createFileRoute("/consultar-cpf/")({
  head: () => ({
    meta: [
      { title: "Digite seu CPF | THE HILLS" },
      {
        name: "description",
        content:
          "Informe seu CPF para continuar a demonstração de consulta THE HILLS.",
      },
      { property: "og:title", content: "Digite seu CPF | THE HILLS" },
      {
        property: "og:description",
        content:
          "Informe seu CPF para continuar a demonstração de consulta THE HILLS.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ConsultarCpf,
});

function formatCpf(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  let out = digits;
  if (digits.length > 9) {
    out = `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
  } else if (digits.length > 6) {
    out = `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  } else if (digits.length > 3) {
    out = `${digits.slice(0, 3)}.${digits.slice(3)}`;
  }
  return { digits, out };
}

function ConsultarCpf() {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [digits, setDigits] = useState("");
  const [remember, setRemember] = useState(true);
  const [touched, setTouched] = useState(false);

  const valid = digits.length === 11;
  const showError = touched && !valid;

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background px-[17px] font-sans">
      <div className="pt-14">
        {/* Monograma THE HILLS */}
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-[15px] font-extrabold tracking-tight text-primary-foreground">
          TH
        </span>

        <h1 className="mt-12 text-[23px] font-medium leading-snug text-navy">
          Digite seu CPF
        </h1>

        <div className="relative mt-4">
          <input
            inputMode="numeric"
            autoComplete="off"
            placeholder="000.000.000-00"
            value={value}
            onBlur={() => setTouched(true)}
            onChange={(e) => {
              const { digits: d, out } = formatCpf(e.target.value);
              setDigits(d);
              setValue(out);
              if (d.length === 11) setTouched(false);
            }}
            aria-invalid={showError}
            aria-label="CPF"
            className={`h-14 w-full rounded-lg border bg-background px-4 pr-11 text-[17px] text-navy outline-none transition-colors placeholder:text-muted-foreground focus:border-primary ${
              showError ? "border-destructive" : "border-input"
            }`}
          />
          {showError && (
            <AlertTriangle
              className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-destructive"
              aria-hidden="true"
            />
          )}
        </div>
        {showError && (
          <p className="mt-2 text-[13px] text-destructive">Informe o seu CPF</p>
        )}

        <div className="mt-6 flex items-center justify-between">
          <span className="text-[15px] text-navy">
            Lembrar CPF para o próximo acesso
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={remember}
            aria-label="Lembrar CPF para o próximo acesso"
            onClick={() => setRemember((r) => !r)}
            className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
              remember ? "bg-primary" : "bg-muted-foreground/30"
            }`}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-background shadow transition-all ${
                remember ? "left-6" : "left-1"
              }`}
            />
          </button>
        </div>
      </div>

      <div className="flex-1" />

      <div className="pb-8">
        <p className="text-center text-[15px] text-navy">
          Conheça aqui{" "}
          <a href="#" className="font-semibold text-primary">
            soluções para a sua empresa
          </a>
        </p>
        <p className="mt-3 text-center text-[13px] text-muted-foreground">
          <a href="#" className="underline-offset-2 hover:underline">
            Termos de Uso e Política de Privacidade
          </a>
        </p>

        <button
          type="button"
          disabled={!valid}
          onClick={() => {
            if (!valid) {
              setTouched(true);
              return;
            }
            navigate({ to: "/consultando" });
          }}
          className="mt-5 h-14 w-full rounded-lg text-[17px] font-bold transition-colors disabled:cursor-not-allowed enabled:cursor-pointer enabled:bg-primary enabled:text-primary-foreground disabled:bg-muted disabled:text-muted-foreground"
        >
          Continuar
        </button>
      </div>

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
