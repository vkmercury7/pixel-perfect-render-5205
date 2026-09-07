import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import {
  Menu,
  User,
  Globe,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  HandCoins,
  Search,
  BarChart3,
  Wallet,
  ShieldCheck,
  Sparkles,
  Headset,
} from "lucide-react";

import heroBanner from "@/assets/hero-banner.webp.asset.json";
import promoBanner from "@/assets/promo-banner.jpg";
import serasaLogo from "@/assets/serasa-logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "THE HILLS: negocie dívidas e organize sua vida financeira" },
      {
        name: "description",
        content:
          "Negocie dívidas, consulte sua situação financeira e organize seu planejamento com as soluções THE HILLS.",
      },
      {
        property: "og:title",
        content: "THE HILLS: negocie dívidas e organize sua vida financeira",
      },
      {
        property: "og:description",
        content:
          "Encontre oportunidades para organizar suas pendências financeiras e recuperar o controle das suas finanças.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const solutions = [
  {
    icon: HandCoins,
    title: "Negocie suas dívidas",
    description:
      "Organize suas pendências financeiras através das soluções disponíveis na plataforma THE HILLS.",
    cta: "Consultar dívida",
  },
  {
    icon: Search,
    title: "Consultar CPF",
    description:
      "Acompanhe informações importantes relacionadas à sua situação financeira.",
    cta: "Consultar",
  },
  {
    icon: BarChart3,
    title: "Score Financeiro",
    description:
      "Entenda melhor sua saúde financeira e acompanhe sua evolução.",
    cta: "Ver detalhes",
  },
  {
    icon: Wallet,
    title: "Planejamento Financeiro",
    description: "Organize receitas, despesas e metas financeiras.",
    cta: "Planejar",
  },
  {
    icon: ShieldCheck,
    title: "Proteção Financeira",
    description: "Conheça ferramentas para maior segurança financeira.",
    cta: "Conhecer",
  },
  {
    icon: Sparkles,
    title: "Soluções Premium",
    description: "Serviços exclusivos para quem deseja avançar ainda mais.",
    cta: "Ver opções",
  },
];

function Index() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const goTo = (next: number) => {
    const clamped = Math.max(0, Math.min(solutions.length - 1, next));
    setIndex(clamped);
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[clamped] as HTMLElement | undefined;
    if (card) {
      track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const first = track.children[0] as HTMLElement | undefined;
    const second = track.children[1] as HTMLElement | undefined;
    if (!first) return;
    const step = second ? second.offsetLeft - first.offsetLeft : first.offsetWidth;
    setIndex(Math.round(track.scrollLeft / step));
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Top bar */}
      <div className="hidden border-b border-border bg-background sm:block">
        <div className="mx-auto flex max-w-5xl items-stretch text-sm text-muted-foreground">
          <a href="#" className="flex-1 border-r border-border px-4 py-3 text-center hover:text-primary">
            Para empresas
          </a>
          <a href="#" className="flex-1 border-r border-border px-4 py-3 text-center hover:text-primary">
            Para grandes empresas
          </a>
          <span className="flex w-14 items-center justify-center">
            <Globe className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-primary text-primary-foreground">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <button className="flex items-center gap-2 text-base font-medium" aria-label="Abrir menu">
            <Menu className="h-5 w-5" aria-hidden="true" />
            Menu
          </button>
          <img
            src={serasaLogo}
            alt="Serasa"
            className="h-7 w-auto"
          />
          <button className="flex items-center gap-2 text-base font-medium" aria-label="Entrar">
            <User className="h-5 w-5" aria-hidden="true" />
            Entrar
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-16 pt-4">
        {/* Hero */}
        <section>
          <img
            src={heroBanner.url}
            alt="Pessoa com celular e cupons de desconto THE HILLS"
            width={860}
            height={760}
            className="w-full rounded-2xl object-cover"
          />
          <div className="-mt-3 rounded-2xl bg-muted p-5">
            <h1 className="text-[26px] font-bold leading-tight text-navy">
              Serasa: Negocie dívidas e organize sua vida financeira
            </h1>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Encontre oportunidades para organizar suas pendências financeiras, melhorar seu
              planejamento e recuperar o controle das suas finanças.
            </p>
            <button className="mt-5 w-full rounded-lg bg-primary px-6 py-4 text-base font-bold text-primary-foreground transition-colors hover:bg-primary/90">
              Consultar agora
            </button>
          </div>
        </section>

        {/* Soluções */}
        <section className="mt-12">
          <h2 className="text-[28px] font-bold leading-tight text-navy">
            A sua conta Serasa tem todas as soluções
          </h2>

          <div
            ref={trackRef}
            onScroll={handleScroll}
            className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {solutions.map((item) => (
              <article
                key={item.title}
                className="flex min-h-[340px] w-[280px] shrink-0 snap-start flex-col rounded-xl border border-border bg-card p-5"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-soft-pink text-primary">
                  <item.icon className="h-7 w-7" aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-xl font-bold text-navy">{item.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                <a
                  href="#"
                  className="mt-auto inline-flex items-center gap-1 pt-6 text-base font-semibold text-primary"
                >
                  {item.cta}
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-4">
            <button
              onClick={() => goTo(index - 1)}
              disabled={index === 0}
              aria-label="Anterior"
              className="flex h-12 w-12 items-center justify-center rounded-lg border border-border text-navy transition-opacity disabled:opacity-40"
            >
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <span className="text-sm text-muted-foreground">
              {index + 1}/{solutions.length}
            </span>
            <button
              onClick={() => goTo(index + 1)}
              disabled={index === solutions.length - 1}
              aria-label="Próximo"
              className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-navy text-navy transition-opacity disabled:opacity-40"
            >
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </section>

        {/* Oferta especial */}
        <section className="mt-12 rounded-2xl bg-soft-pink p-5">
          <span className="inline-block rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
            Oferta especial Serasa
          </span>
          <h2 className="mt-5 text-[26px] font-bold leading-tight text-navy">
            Renegocie suas dívidas com condições especiais
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Descubra oportunidades para organizar sua vida financeira e recuperar seu equilíbrio
            financeiro.
          </p>

          <img
            src={promoBanner}
            alt="Campanha promocional de renegociação THE HILLS"
            width={1000}
            height={560}
            loading="lazy"
            className="mt-6 w-full rounded-xl object-cover"
          />

          <div className="mt-6 rounded-xl bg-card p-5">
            <p className="text-base text-navy">
              Milhares de oportunidades disponíveis para você.
            </p>
            <button className="mt-5 w-full rounded-lg bg-primary px-6 py-4 text-base font-bold text-primary-foreground transition-colors hover:bg-primary/90">
              Negociar agora
            </button>
            <a
              href="#"
              className="mt-4 flex items-center justify-center gap-1 text-base font-semibold text-primary"
            >
              Saiba mais
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>

      {/* Botão flutuante */}
      <button
        aria-label="Atendimento THE HILLS"
        className="fixed bottom-5 left-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/40 transition-transform hover:scale-105"
      >
        <Headset className="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  );
}
