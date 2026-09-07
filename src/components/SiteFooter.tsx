import { useState } from "react";
import {
  Instagram,
  Youtube,
  Facebook,
  Linkedin,
  Twitter,
  Music2,
  Plus,
  Minus,
} from "lucide-react";

const columns = [
  {
    title: "O que você precisa?",
    links: [
      "Consultar meu CPF",
      "Regularizar pendências",
      "Consultar situação financeira",
      "Negociar minhas dívidas",
      "Monitorar meu CPF",
      "Proteção financeira",
      "Falar com a The Hills",
      "Atualizar meus dados",
      "Soluções para empresas",
      "Soluções para grandes empresas",
      "Como tratamos seus dados",
    ],
  },
  {
    title: "Todos os sites",
    links: [
      "The Hills Crédito",
      "The Hills Premium",
      "The Hills Score",
      "The Hills Negocia",
      "The Hills Cadastro Positivo",
      "The Hills Calculadoras",
      "The Hills Renda Extra",
      "The Hills Ensina",
      "The Hills Você Consulta",
      "The Hills Minhas Contas",
      "The Hills Seguros",
      "Carteira de Dados",
    ],
  },
  {
    title: "Atendimento",
    links: [
      "Pontos de Atendimento",
      "Telefones",
      "Central de Ajuda",
      "Denuncie uma fraude digital",
    ],
  },
  {
    title: "Outros Serviços",
    links: [
      "Atualizar meus dados",
      "Como consultar seu CPF",
      "Portal do Crédito Consciente",
      "Proteger meus documentos",
      "Carta comunicado",
      "Empresas que consultam meu CPF",
      "Empresas que consultam meu CNPJ",
      "Consulta CNPJ para Empresas",
      "Termos de uso",
      "Política de Privacidade",
    ],
  },
  {
    title: "Seja parceiro",
    links: [
      "Seja parceiro The Hills",
      "Seja parceiro The Hills Crédito",
      "Programa de parceiros",
    ],
  },
];

const socials = [
  { label: "Instagram", Icon: Instagram },
  { label: "TikTok", Icon: Music2 },
  { label: "YouTube", Icon: Youtube },
  { label: "X", Icon: Twitter },
  { label: "Facebook", Icon: Facebook },
  { label: "LinkedIn", Icon: Linkedin },
];

export function SiteFooter() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <footer className="w-full bg-background">
      <div className="h-[5px] w-full bg-primary" />

      <div className="mx-auto w-full max-w-[1320px] px-5 pt-10 lg:px-8 lg:pt-12">
        {/* Desktop: 5 colunas */}
        <div className="hidden gap-8 lg:grid lg:grid-cols-5">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-5 text-lg font-bold text-navy">{col.title}</h3>
              <ul>
                {col.links.map((link) => (
                  <li key={link} className="mb-3.5">
                    <a
                      href="#"
                      className="text-sm font-normal text-navy transition-colors hover:text-primary"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mobile: accordions */}
        <div className="lg:hidden">
          {columns.map((col) => {
            const isOpen = open === col.title;
            return (
              <div key={col.title} className="border-b border-border">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : col.title)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between py-4 text-left"
                >
                  <span className="text-base font-bold text-navy">{col.title}</span>
                  {isOpen ? (
                    <Minus className="h-5 w-5 text-primary" aria-hidden="true" />
                  ) : (
                    <Plus className="h-5 w-5 text-primary" aria-hidden="true" />
                  )}
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <ul className="overflow-hidden">
                    {col.links.map((link) => (
                      <li key={link} className="pb-3.5">
                        <a href="#" className="text-sm text-navy">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Área inferior */}
        <div className="mt-16 flex flex-col items-center gap-8 pb-12 lg:mt-28 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex items-center gap-6">
            {socials.map(({ label, Icon }) => (
              <a key={label} href="#" aria-label={label} className="text-plum">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>

          {/* Espaço reservado para apps oficiais e selos institucionais */}
          <div className="hidden lg:block lg:h-14 lg:w-64" aria-hidden="true" />
        </div>
      </div>
    </footer>
  );
}
