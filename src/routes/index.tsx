import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { openChat } from "@/lib/chat-open";
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
  Quote,
} from "lucide-react";

import { SiteFooter } from "@/components/SiteFooter";
import { NegotiationChat } from "@/components/NegotiationChat";
import vslVideo from "@/assets/vsl-0909.mp4.asset.json";
import promoOfferAsset from "@/assets/promo-oferta.png";
import serasaLogo from "@/assets/serasa-logo.png";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";
import avatar4 from "@/assets/avatar-4.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Serasa : Negocie dívidas" },
      {
        name: "description",
        content:
          "Negocie dívidas, consulte sua situação financeira e organize seu planejamento com as soluções Serasa.",
      },
      {
        property: "og:title",
        content: "Serasa : Negocie dívidas",
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
      "No Serasa Limpa Nome, você quita dívidas com descontos exclusivos e parcelamento facilitado. Tudo 100% online.",
    cta: "Consultar dívida",
  },
  {
    icon: Search,
    title: "Consulte seu Score",
    description:
      "Acompanhe seu Serasa Score e entenda como melhorar suas chances de aprovação para financiamentos, cartões e empréstimos. ",
    cta: "Consultar",
  },
  {
    icon: BarChart3,
    title: "Solicite crédito",
    description:
      "Simule as melhores opções de empréstimo e solicite cartão de crédito com as melhores condições no Serasa Crédito.",
    cta: "Ver detalhes",
  },
  {
    icon: Wallet,
    title: "Monitore seu CPF",
    description: "Fique no controle dos seus dados, receba alertas sobre CPF e CNPJ e aumente sua proteção contra fraudes com o Serasa Premium. ",
    cta: "Planejar",
  },
  {
    icon: ShieldCheck,
    title: "Proteja o que importa",
    description: "Encontre a proteção ideal com os seguros oferecidos por empresas parceiras, diretamente na Serasa.",
    cta: "Conhecer",
  },
  {
    icon: Sparkles,
    title: "Organize suas contas",
    description: "Centralize e pague boletos, receba alertas de vencimento e organize sua vida financeira com o Minhas Contas da Serasa. ",
    cta: "Ver opções",
  },
];

const testimonials = [
  {
    name: "Renata Carvalho",
    photo: avatar1,
    text: "Consegui visualizar melhor minhas pendências e entender quais eram os próximos passos para organizar minha vida financeira.",
  },
  {
    name: "Mariana Alves",
    photo: avatar2,
    text: "A plataforma é simples de usar e consegui encontrar as informações que precisava sem complicação.",
  },
  {
    name: "Carlos Henrique",
    photo: avatar3,
    text: "Gostei principalmente da facilidade para visualizar as informações e acompanhar tudo pelo celular.",
  },
  {
    name: "Juliana Martins",
    photo: avatar4,
    text: "O processo é bem direto e a organização das informações tornou tudo muito mais fácil de entender.",
  },
];

function Index() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const [feedbackIndex, setFeedbackIndex] = useState(0);

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

  const goToFeedback = (next: number) => {
    const clamped = Math.max(0, Math.min(testimonials.length - 1, next));
    setFeedbackIndex(clamped);
    const track = feedbackRef.current;
    if (!track) return;
    const card = track.children[clamped] as HTMLElement | undefined;
    if (card) {
      track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
    }
  };

  const handleFeedbackScroll = () => {
    const track = feedbackRef.current;
    if (!track) return;
    const first = track.children[0] as HTMLElement | undefined;
    const second = track.children[1] as HTMLElement | undefined;
    if (!first) return;
    const step = second ? second.offsetLeft - first.offsetLeft : first.offsetWidth;
    setFeedbackIndex(Math.round(track.scrollLeft / step));
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
          <VslPlayer />

          <div className="-mt-3 rounded-2xl bg-muted p-5">
            <h1 className="text-[26px] font-bold leading-tight text-navy">
              Serasa: Renegocie suas dívidas com até 97% de{" "}
              <br />
              DESCONTO
            </h1>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Encontre oportunidades para organizar suas pendências financeiras, melhorar seu
              planejamento e recuperar o controle das suas finanças.
            </p>
            <button
              type="button"
              onClick={openChat}
              className="mt-5 block w-full rounded-lg bg-primary px-6 py-4 text-center text-base font-bold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Consultar agora
            </button>

          </div>
        </section>

        {/* Soluções */}
        <section className="mt-12">
          <h2 className="text-[28px] leading-tight text-navy">
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
            src={promoOfferAsset}
            alt="Campanha promocional Serasa e Mercado Pago: cupons em dobro"
            width={472}
            height={266}
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

        {/* Depoimentos */}
        <section className="mt-12">
          <h2 className="text-[28px] font-bold leading-tight text-navy">
            Histórias reais: quem confia na Serasa para organizar as finanças
          </h2>
          <p className="mt-2 text-sm text-muted-foreground"></p>

          <div
            ref={feedbackRef}
            onScroll={handleFeedbackScroll}
            className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {testimonials.map((item) => (
              <article
                key={item.name}
                className="flex min-h-[260px] w-[280px] shrink-0 snap-start flex-col rounded-2xl border border-border bg-card p-6"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={item.photo}
                      alt={item.name}
                      width={512}
                      height={512}
                      loading="lazy"
                      className="h-16 w-16 rounded-full object-cover"
                    />
                    <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Quote className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  </div>
                  <span className="text-lg font-bold text-navy">{item.name}</span>
                </div>
                <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                  {item.text}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-4">
            <button
              onClick={() => goToFeedback(feedbackIndex - 1)}
              disabled={feedbackIndex === 0}
              aria-label="Depoimento anterior"
              className="flex h-12 w-12 items-center justify-center rounded-lg border border-border text-navy transition-opacity disabled:opacity-40"
            >
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <span className="text-sm text-muted-foreground">
              {feedbackIndex + 1}/{testimonials.length}
            </span>
            <button
              onClick={() => goToFeedback(feedbackIndex + 1)}
              disabled={feedbackIndex === testimonials.length - 1}
              aria-label="Próximo depoimento"
              className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-navy text-navy transition-opacity disabled:opacity-40"
            >
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </section>
      </main>

      <SiteFooter />


      {/* Botão flutuante */}
      <button
        aria-label="Atendimento THE HILLS"
        className="fixed bottom-5 left-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/40 transition-transform hover:scale-105"
      >
        <Headset className="h-6 w-6" aria-hidden="true" />
      </button>

      <NegotiationChat />
    </div>
  );
}
