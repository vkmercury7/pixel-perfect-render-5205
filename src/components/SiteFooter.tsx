import {
  Instagram,
  Youtube,
  Facebook,
  Linkedin,
  Twitter,
  Music2,
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
      "Falar com a Serasa",
      "Atualizar meus dados",
      "Soluções para empresas",
      "Soluções para grandes empresas",
      "Como tratamos seus dados",
    ],
  },
  {
    title: "Todos os sites",
    links: [
      "Serasa Crédito",
      "Serasa Premium",
      "Serasa Score",
      "Serasa Negocia",
      "Serasa Cadastro Positivo",
      "Serasa Calculadoras",
      "Serasa Renda Extra",
      "Serasa Ensina",
      "Serasa Você Consulta",
      "Serasa Minhas Contas",
      "Serasa Seguros",
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
      "Seja parceiro Serasa",
      "Seja parceiro Serasa Crédito",
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

        {/* Mobile: tudo aberto, coluna única */}
        <div className="lg:hidden">
          {columns.map((col) => (
            <div key={col.title} className="mb-10">
              <h3 className="mb-5 text-xl font-bold text-navy">{col.title}</h3>
              <ul>
                {col.links.map((link) => (
                  <li key={link} className="mb-4">
                    <a href="#" className="text-base font-normal text-navy">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
