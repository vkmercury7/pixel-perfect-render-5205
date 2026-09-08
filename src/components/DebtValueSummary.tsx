import { useEffect, useState } from "react";
import { Wallet } from "lucide-react";

function parseStoredValue(raw: string) {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return null;
  const number = Number(digits) / 100;
  if (!Number.isFinite(number) || number <= 0) return null;
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(number);
}

export function DebtValueSummary() {
  const [value, setValue] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("theHillsDebtValue");
    if (!stored) return;
    const formatted = parseStoredValue(stored);
    if (!formatted) return;
    setValue(formatted);
    setName(sessionStorage.getItem("theHillsLeadName"));
  }, []);

  if (!value) return null;

  return (
    <section className="w-full px-5 pt-2">
      <h2 className="text-[17px] font-bold text-navy">
        Valor informado para negociação
      </h2>
      <p className="mt-1 text-[13px] text-muted-foreground">
        Este foi o valor aproximado informado por você durante o atendimento.
      </p>

      <div className="mt-4 w-full rounded-[18px] border border-border bg-card p-5 shadow-sm">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-primary">
          <Wallet className="h-4 w-4" aria-hidden="true" />
        </span>
        <p className="mt-3 text-[12px] uppercase tracking-wide text-muted-foreground">
          Valor aproximado da dívida
        </p>
        <p className="mt-1 text-[28px] font-extrabold leading-tight text-navy sm:text-[32px]">
          {value}
        </p>
        <p className="mt-2 text-[12px] text-muted-foreground">
          {name
            ? `${name}, este foi o valor informado por você.`
            : "Valor informado por você durante o atendimento."}
        </p>
      </div>
    </section>
  );
}
