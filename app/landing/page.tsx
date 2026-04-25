import Link from "next/link";
import Image from "next/image";
import {
  Store,
  MessageSquare,
  BarChart3,
  FileSpreadsheet,
  Zap,
  Shield,
  CheckCircle2,
  ArrowRight,
  Star,
  TrendingUp,
  Smartphone,
} from "lucide-react";

export const metadata = {
  title: "Meu Negócio Simples — Controle financeiro por mensagem",
  description:
    "Registre entradas e saídas do seu negócio como se estivesse mandando uma mensagem no WhatsApp. Para MEIs e pequenos empreendedores.",
};

const features = [
  {
    icon: MessageSquare,
    title: "Registro por Linguagem Natural",
    description:
      'Digite como você fala: "Recebi 150 reais de cliente hoje em dinheiro" e pronto. O sistema entende, categoriza e registra automaticamente.',
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    icon: BarChart3,
    title: "Dashboard Resumido",
    description:
      "Saldos diários, semanais e mensais em um painel limpo. Tenha a fotografia do seu negócio em segundos.",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    icon: Zap,
    title: "Categorização Automática",
    description:
      "Vendas, Serviços, Alimentação, Contas, Impostos — o app reconhece a categoria pelo que você digitou, sem configuração.",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
  },
  {
    icon: FileSpreadsheet,
    title: "Exportação em Excel",
    description:
      "Baixe suas movimentações em .xlsx organizados por mês e ano. Perfeito para contabilidade e declarações.",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
  },
  {
    icon: Smartphone,
    title: "Mobile-First",
    description:
      "Interface projetada para celular. Use onde estiver, na loja, no delivery ou em casa.",
    color: "text-pink-400",
    bg: "bg-pink-400/10",
  },
  {
    icon: Shield,
    title: "Seguro com Supabase",
    description:
      "Autenticação segura, dados criptografados no banco PostgreSQL. Suas finanças protegidas.",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
];

const freeFeatures = [
  "Até 30 registros por mês",
  "Dashboard com saldo mensal",
  "Categorização automática",
  "Histórico dos últimos 30 dias",
  "Acesso pelo celular",
];

const freeLimitations = [
  "Sem exportação para Excel",
  "Sem histórico completo",
  "Sem relatórios avançados",
];

const premiumFeatures = [
  "Registros ilimitados",
  "Dashboard completo (diário, semanal, mensal)",
  "Categorização automática avançada",
  "Histórico completo",
  "Exportação ilimitada em Excel",
  "Relatórios por categoria e período",
  "Suporte prioritário",
  "Novidades em primeira mão",
];

const testimonials = [
  {
    name: "Ana Souza",
    role: "Doceira — MEI",
    text: "Antes eu anotava tudo num caderninho e sempre perdia conta. Agora mando uma mensagem e já fica salvo. Simples demais!",
    stars: 5,
  },
  {
    name: "Carlos Mendes",
    role: "Eletricista Autônomo",
    text: "Fácil de usar e funciona pelo celular. Exatamente o que eu precisava para organizar meu caixa sem complicação.",
    stars: 5,
  },
  {
    name: "Juliana Reis",
    role: "Salão de Beleza — MEI",
    text: "A exportação pro Excel é perfeita. Mando para a minha contadora todo mês sem precisar de nada mais.",
    stars: 5,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0f0a] text-white overflow-x-hidden">
      {/* ── NAV ───────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 backdrop-blur-xl bg-[#0a0f0a]/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500">
              <Store className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-base tracking-tight">
              Meu Negócio Simples
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="text-sm text-white/60 hover:text-white transition-colors px-3 py-1.5"
            >
              Entrar
            </Link>
            <Link
              href="/auth/cadastro"
              className="text-sm font-semibold bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-2 rounded-full transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-400/30"
            >
              Começar grátis
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto relative">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left — Copy */}
            <div className="flex-1 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                <TrendingUp className="h-3 w-3" />
                Para MEIs e pequenos empreendedores
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6">
                Controle financeiro{" "}
                <span className="text-emerald-400">simples</span>
                <br />
                como mandar uma{" "}
                <span className="relative inline-block">
                  mensagem
                  <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-emerald-300 rounded-full" />
                </span>
              </h1>

              <p className="text-lg text-white/50 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                Esqueça planilhas. Esqueça formulários. Basta digitar como você
                fala — o app entende, categoriza e registra no seu caixa{" "}
                <strong className="text-white/80">automaticamente</strong>.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link
                  href="/auth/cadastro"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-7 py-3.5 rounded-full transition-all duration-200 shadow-xl shadow-emerald-500/25 hover:shadow-emerald-400/35 hover:-translate-y-0.5 text-base"
                >
                  Começar grátis agora
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/auth/login"
                  className="inline-flex items-center justify-center gap-2 border border-white/10 bg-white/5 hover:bg-white/10 text-white font-medium px-7 py-3.5 rounded-full transition-all duration-200 text-base"
                >
                  Já tenho conta
                </Link>
              </div>

              {/* Social proof mini */}
              <div className="mt-8 flex items-center gap-3 justify-center lg:justify-start">
                <div className="flex -space-x-2">
                  {["A", "C", "J", "M"].map((l, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full border-2 border-[#0a0f0a] bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center justify-center"
                    >
                      {l}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-white/50">
                  Mais de{" "}
                  <span className="text-white font-semibold">200 MEIs</span>{" "}
                  já usam
                </p>
              </div>
            </div>

            {/* Right — Mockup */}
            <div className="flex-1 flex justify-center lg:justify-end">
              <div className="relative w-[340px] sm:w-[400px]">
                <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full scale-75" />
                <Image
                  src="/mockup.png"
                  alt="Meu Negócio Simples — interface de chat financeiro"
                  width={400}
                  height={500}
                  className="relative w-full drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-emerald-400 text-sm font-semibold uppercase tracking-widest mb-2">
              Como funciona
            </p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Em 3 passos simples
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Digite o que aconteceu",
                desc: '"Recebi 200 reais de um cliente por pix" ou "Paguei 45 de conta de luz"',
              },
              {
                step: "02",
                title: "O app entende e registra",
                desc: "Interpretamos valor, categoria, forma de pagamento e tipo (entrada/saída) automaticamente.",
              },
              {
                step: "03",
                title: "Acompanhe seu caixa",
                desc: "Veja saldos, relatórios e exporte para Excel quando precisar passar para a contabilidade.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="relative border border-white/5 bg-white/[0.02] rounded-2xl p-7 hover:border-emerald-500/20 hover:bg-white/[0.04] transition-all duration-300"
              >
                <div className="text-6xl font-black text-emerald-500/10 absolute top-5 right-6 select-none">
                  {s.step}
                </div>
                <div className="text-2xl font-black text-emerald-400 mb-3">
                  {s.step}
                </div>
                <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-emerald-400 text-sm font-semibold uppercase tracking-widest mb-2">
              Funcionalidades
            </p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Tudo que seu negócio precisa
            </h2>
            <p className="text-white/40 mt-3 max-w-xl mx-auto">
              Sem burocracia, sem curva de aprendizado. Feito para quem quer
              focar no negócio.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="border border-white/5 bg-white/[0.02] rounded-2xl p-6 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300 group"
              >
                <div
                  className={`w-11 h-11 rounded-xl ${f.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}
                >
                  <f.icon className={`h-5 w-5 ${f.color}`} />
                </div>
                <h3 className="font-bold text-base mb-2">{f.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ───────────────────────────────────────── */}
      <section id="precos" className="py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-emerald-400 text-sm font-semibold uppercase tracking-widest mb-2">
              Planos
            </p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Preço justo para quem trabalha duro
            </h2>
            <p className="text-white/40 mt-3 max-w-lg mx-auto">
              Comece grátis e faça upgrade quando precisar de mais.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* FREE */}
            <div className="border border-white/8 bg-white/[0.02] rounded-2xl p-8 flex flex-col">
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1">
                  Plano
                </p>
                <h3 className="text-2xl font-black">Gratuito</h3>
                <div className="mt-3">
                  <span className="text-4xl font-black">R$ 0</span>
                  <span className="text-white/40 ml-1">/mês</span>
                </div>
                <p className="text-sm text-white/40 mt-2">
                  Para quem está começando
                </p>
              </div>

              <ul className="space-y-3 mb-6 flex-1">
                {freeFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80">{f}</span>
                  </li>
                ))}
                {freeLimitations.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-sm opacity-40"
                  >
                    <div className="h-4 w-4 mt-0.5 flex-shrink-0 flex items-center justify-center">
                      <div className="h-px w-3 bg-white/60" />
                    </div>
                    <span className="line-through">{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/auth/cadastro"
                className="w-full text-center border border-white/15 hover:border-white/25 bg-white/5 hover:bg-white/10 text-white font-semibold py-3 rounded-xl transition-all duration-200 text-sm"
              >
                Criar conta grátis
              </Link>
            </div>

            {/* PREMIUM */}
            <div className="relative border border-emerald-500/40 bg-gradient-to-b from-emerald-500/10 to-emerald-500/5 rounded-2xl p-8 flex flex-col shadow-2xl shadow-emerald-500/10">
              {/* Badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="bg-emerald-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-emerald-500/40">
                  ✨ Mais popular
                </span>
              </div>

              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-400/70 mb-1">
                  Plano
                </p>
                <h3 className="text-2xl font-black">Premium</h3>
                <div className="mt-3 flex items-end gap-1">
                  <span className="text-4xl font-black text-emerald-400">
                    R$ 19
                  </span>
                  <span className="text-2xl font-black text-emerald-400">
                    ,99
                  </span>
                  <span className="text-white/40 ml-1 mb-1">/mês</span>
                </div>
                <p className="text-sm text-white/40 mt-2">
                  Acesso completo e ilimitado
                </p>
              </div>

              <ul className="space-y-3 mb-6 flex-1">
                {premiumFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-white/90">{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/auth/cadastro"
                className="w-full text-center bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3 rounded-xl transition-all duration-200 text-sm shadow-lg shadow-emerald-500/30 hover:shadow-emerald-400/40"
              >
                Assinar Premium
              </Link>
            </div>
          </div>

          <p className="text-center text-white/25 text-xs mt-6">
            Cancele quando quiser. Sem fidelidade, sem letras miúdas.
          </p>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-emerald-400 text-sm font-semibold uppercase tracking-widest mb-2">
              Depoimentos
            </p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Quem usa, aprova
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="border border-white/5 bg-white/[0.02] rounded-2xl p-6 hover:border-emerald-500/20 transition-all duration-300"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-sm text-white/70 leading-relaxed mb-5">
                  "{t.text}"
                </p>
                <div>
                  <p className="font-bold text-sm">{t.name}</p>
                  <p className="text-white/40 text-xs">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <Zap className="h-3 w-3" />
            Comece em menos de 1 minuto
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-5 leading-tight">
            Chega de planilha.
            <br />
            <span className="text-emerald-400">Simplifique seu caixa hoje.</span>
          </h2>
          <p className="text-white/45 text-lg mb-8 max-w-xl mx-auto">
            Crie sua conta grátis em segundos e comece a registrar suas
            movimentações do jeito mais fácil que existe.
          </p>
          <Link
            href="/auth/cadastro"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-9 py-4 rounded-full transition-all duration-200 shadow-2xl shadow-emerald-500/30 hover:shadow-emerald-400/40 hover:-translate-y-0.5 text-lg"
          >
            Criar minha conta grátis
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────── */}
      <footer className="border-t border-white/5 py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500">
              <Store className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="font-bold text-sm">Meu Negócio Simples</span>
          </div>
          <p className="text-white/30 text-xs text-center">
            Feito com 💚 para quem quer focar em crescer, não em planilhas.
          </p>
          <div className="flex gap-4 text-xs text-white/30">
            <Link href="/auth/login" className="hover:text-white/60 transition-colors">
              Entrar
            </Link>
            <Link href="/auth/cadastro" className="hover:text-white/60 transition-colors">
              Cadastro
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
