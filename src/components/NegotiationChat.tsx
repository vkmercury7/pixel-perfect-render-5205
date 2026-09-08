import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Headphones } from "lucide-react";
import { Link } from "@tanstack/react-router";

const NEGOTIATION_URL = "/consultar-cpf/resultado";

type ChatMessage = {
  id: number;
  from: "bot" | "user";
  text: string;
};

function formatCpf(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  let out = digits;
  if (digits.length > 3) out = `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length > 6) out = `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  if (digits.length > 9)
    out = `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
  return out;
}

function formatCurrency(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (!digits) return "";
  const number = Number(digits) / 100;
  return number.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
}

export function NegotiationChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [autoOpened, setAutoOpened] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState(1);
  const [inputEnabled, setInputEnabled] = useState(false);
  const [showOffer, setShowOffer] = useState(false);
  const [name, setName] = useState("");
  const [draft, setDraft] = useState("");
  const [started, setStarted] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const idRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const blurTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setAutoOpened((prev) => {
        if (!prev) setIsOpen(true);
        return true;
      });
    }, 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    return () => timersRef.current.forEach(clearTimeout);
  }, []);

  // Acompanha a altura real visível (Visual Viewport) para o modo com teclado.
  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;
    const update = () => {
      document.documentElement.style.setProperty(
        "--visual-viewport-height",
        `${viewport.height}px`,
      );
    };
    update();
    viewport.addEventListener("resize", update);
    viewport.addEventListener("scroll", update);
    return () => {
      viewport.removeEventListener("resize", update);
      viewport.removeEventListener("scroll", update);
    };
  }, [isOpen]);

  const scrollToBottom = () => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  };

  const handleInputFocus = () => {
    if (blurTimerRef.current) clearTimeout(blurTimerRef.current);
    if (window.matchMedia("(max-width: 639px)").matches) setKeyboardOpen(true);
    timersRef.current.push(setTimeout(scrollToBottom, 200));
  };

  const handleInputBlur = () => {
    blurTimerRef.current = setTimeout(() => setKeyboardOpen(false), 150);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping, showOffer, keyboardOpen]);


  const pushBot = (text: string) => {
    idRef.current += 1;
    setMessages((prev) => [...prev, { id: idRef.current, from: "bot", text }]);
  };

  const pushUser = (text: string) => {
    idRef.current += 1;
    setMessages((prev) => [...prev, { id: idRef.current, from: "user", text }]);
  };

  // Sequencia mensagens da assistente com "Digitando..." entre elas.
  const showNextMessage = (texts: string[], onDone?: () => void) => {
    let delay = 0;
    texts.forEach((text) => {
      timersRef.current.push(
        setTimeout(() => setIsTyping(true), delay),
      );
      delay += 700;
      timersRef.current.push(
        setTimeout(() => {
          setIsTyping(false);
          pushBot(text);
        }, delay),
      );
    });
    timersRef.current.push(
      setTimeout(() => {
        onDone?.();
        inputRef.current?.focus();
      }, delay),
    );
  };

  useEffect(() => {
    if (!isOpen || started) return;
    setStarted(true);
    showNextMessage(
      [
        "Olá! 👋 Eu sou a assistente virtual da Serasa.",
        "Vou te fazer algumas perguntas rápidas para entendermos melhor sua situação e apresentar informações sobre uma possível renegociação.",
        "Para começarmos, qual é o seu nome?",
      ],
      () => setInputEnabled(true),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, started]);

  const handleNameSubmit = (value: string) => {
    const clean = value.trim();
    if (!clean) return;
    pushUser(clean);
    const firstName = clean.split(" ")[0] ?? clean;
    setName(firstName);
    setDraft("");
    setInputEnabled(false);
    setStep(2);
    showNextMessage(
      [
        `Muito bem, ${firstName}! 😊`,
        "Agora, por gentileza, informe seu CPF.",
        "Utilizamos essa informação somente para dar continuidade ao atendimento.",
      ],
      () => setInputEnabled(true),
    );
  };

  const handleCpfSubmit = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length !== 11) return;
    pushUser(`***.***.***-${digits.slice(9)}`);
    setDraft("");
    setInputEnabled(false);
    setStep(3);
    showNextMessage(
      [
        `Obrigado, ${name}.`,
        "Agora nos informe aproximadamente qual é o valor total da dívida que você deseja renegociar.",
      ],
      () => setInputEnabled(true),
    );
  };

  const handleDebtSubmit = (value: string) => {
    if (!value.replace(/\D/g, "")) return;
    pushUser(value);
    setDraft("");
    setInputEnabled(false);
    setStep(4);
    showNextMessage(
      [
        `Perfeito, ${name}. Recebi as informações.`,
        "Com base nas condições de negociação que podem estar disponíveis, uma proposta de renegociação pela Serasa pode chegar a até 89% de desconto.",
        "O percentual final depende da análise, condições disponíveis, características da dívida e aprovação da negociação.",
      ],
      () => setShowOffer(true),
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (step === 1) handleNameSubmit(draft);
    else if (step === 2) handleCpfSubmit(draft);
    else if (step === 3) handleDebtSubmit(draft);
  };

  const handleChange = (value: string) => {
    if (step === 2) setDraft(formatCpf(value));
    else if (step === 3) setDraft(formatCurrency(value));
    else setDraft(value);
  };

  const placeholder =
    step === 1 ? "Digite seu nome" : step === 2 ? "000.000.000-00" : "R$ 0,00";
  const buttonLabel = step === 3 ? "CONTINUAR" : "ENVIAR";

  return (
    <>
      {isOpen && keyboardOpen && (
        <div className="fixed inset-0 z-[99990] bg-background/95 sm:hidden" aria-hidden="true" />
      )}

      {isOpen && (
        <div
          className={
            keyboardOpen
              ? "fixed left-3 right-3 top-2 z-[99999] box-border flex flex-col overflow-hidden rounded-[20px] bg-card shadow-2xl sm:left-auto sm:w-[370px]"
              : "fixed bottom-24 right-3 left-3 z-50 box-border flex animate-in fade-in slide-in-from-bottom-4 flex-col overflow-hidden rounded-[20px] bg-card shadow-2xl duration-300 sm:left-auto sm:w-[370px] sm:max-w-[370px]"
          }
          style={
            keyboardOpen
              ? {
                  height: "calc(var(--visual-viewport-height, 100dvh) - 16px)",
                  maxHeight: "calc(var(--visual-viewport-height, 100dvh) - 16px)",
                }
              : { maxHeight: "min(560px, calc(100dvh - 120px))" }
          }
        >

          {/* Header */}
          <div className="flex items-center gap-3 bg-primary px-4 py-3 text-primary-foreground">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-foreground/20">
              <Headphones className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1 leading-tight">
              <p className="text-sm font-bold">Assistente Virtual</p>
              <p className="text-xs opacity-90">Serasa</p>
              <p className="mt-0.5 flex items-center gap-1 text-[11px] opacity-90">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
                Online
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Fechar chat"
              className="shrink-0 rounded-full p-1 transition-colors hover:bg-primary-foreground/20"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* Progresso */}
          <div className="border-b border-border px-4 py-2">
            <div className="flex items-center justify-between text-[11px] text-muted-foreground">
              <span>Etapa {step} de 4</span>
            </div>
            <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>

          {/* Mensagens */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={message.from === "user" ? "flex justify-end" : "flex justify-start"}
              >
                <p
                  className={
                    message.from === "user"
                      ? "max-w-[80%] rounded-[14px] bg-primary px-3.5 py-2.5 text-sm leading-relaxed text-primary-foreground"
                      : "max-w-[85%] rounded-[14px] bg-muted px-3.5 py-2.5 text-sm leading-relaxed text-navy"
                  }
                >
                  {message.text}
                </p>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <span className="flex items-center gap-1 rounded-[14px] bg-muted px-3.5 py-3">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:0ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:300ms]" />
                </span>
              </div>
            )}

            {showOffer && (
              <div className="rounded-2xl border border-border bg-card p-4 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Possibilidade de renegociação
                </p>
                <p className="mt-1 text-xl font-bold text-navy">Até 89% de desconto*</p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  *Percentual sujeito às condições e análise da negociação.
                </p>
                <Link
                  to={NEGOTIATION_URL}
                  className="mt-4 block w-full rounded-lg bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  VER MINHA PROPOSTA
                </Link>
              </div>
            )}
          </div>

          {/* Entrada */}
          {!showOffer && (
            <form onSubmit={handleSubmit} className="border-t border-border p-3">
              {step === 2 && (
                <p className="mb-2 text-[11px] leading-snug text-muted-foreground">
                  Seus dados devem ser utilizados apenas para dar continuidade a este atendimento.
                </p>
              )}
              <div className="flex w-full items-center gap-2.5">
                <input
                  ref={inputRef}
                  value={draft}
                  onChange={(event) => handleChange(event.target.value)}
                  disabled={!inputEnabled}
                  inputMode={step === 1 ? "text" : "numeric"}
                  placeholder={placeholder}
                  aria-label={placeholder}
                  className="box-border w-auto min-w-0 max-w-full flex-1 rounded-lg border border-border bg-background px-3 py-2.5 text-base text-navy outline-none placeholder:text-muted-foreground focus:border-primary disabled:opacity-60 sm:text-sm"
                />
                <button
                  type="submit"
                  disabled={!inputEnabled || !draft.trim()}
                  className="box-border w-auto min-w-[82px] shrink-0 rounded-lg bg-primary px-3 py-2.5 text-xs font-bold text-primary-foreground transition-opacity disabled:opacity-40 sm:min-w-[90px] sm:px-4"
                >
                  {buttonLabel}
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Fechar assistente virtual" : "Abrir assistente virtual"}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/40 transition-transform hover:scale-105"
      >
        {isOpen ? (
          <X className="h-6 w-6" aria-hidden="true" />
        ) : (
          <MessageCircle className="h-6 w-6" aria-hidden="true" />
        )}
      </button>
    </>
  );
}
