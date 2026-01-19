import React, { useState, useEffect } from 'react';
import { 
  motion, 
  useScroll, 
  useSpring, 
  useMotionTemplate, 
  useMotionValue,
  AnimatePresence
} from 'framer-motion';

import { 
  Code, Layout, Smartphone, Server, Globe, Mail, 
  Github, Linkedin, Instagram, ExternalLink, 
  Menu, X, Send, Zap, ArrowRight, CheckCircle2, 
  HelpCircle, ChevronDown, ChevronUp, Star, Rocket,
  FileText, Shield, RefreshCw, CreditCard
} from 'lucide-react';

// ==================================================================================
// --- COMPONENTES DE UI AVANÇADOS (HIGH-END) ---
// ==================================================================================

// 1. Efeito de Spotlight (Luz segue o mouse nos cards)
const SpotlightCard = ({ children, className = "", spotlightColor = "rgba(6, 182, 212, 0.15)" }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`group relative border border-white/10 bg-gray-900/50 overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              ${spotlightColor},
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

// 2. Botão "Shiny" (Brilho metálico passando)
const ShinyButton = ({ children, onClick, className = "", icon: Icon }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 font-bold text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] ${className}`}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children} {Icon && <Icon size={18} />}
      </span>
      {/* Efeito de brilho passando */}
      <motion.div
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
      />
    </motion.button>
  );
};

// 3. Texto Gradiente Animado
const GradientText = ({ text, className = "" }) => {
  return (
    <span className={`bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x ${className}`}>
      {text}
    </span>
  );
};

// 4. Item de FAQ (Acordeão)
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full py-4 flex justify-between items-center text-left hover:text-cyan-400 transition-colors"
      >
        <span className="font-medium text-lg text-slate-200">{question}</span>
        {isOpen ? <ChevronUp size={20} className="text-cyan-400" /> : <ChevronDown size={20} className="text-slate-500" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-slate-400 text-sm leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Componente para Check/Cross na tabela
const StatusIcon = ({ status }) => (
  status ? <CheckCircle2 size={18} className="text-green-400 mx-auto" /> : <X size={18} className="text-slate-600 mx-auto" />
);

// 5. Modal de Políticas 
const PolicyModal = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative bg-[#0A0A10] border border-white/10 w-full max-w-2xl max-h-[80vh] rounded-2xl shadow-2xl flex flex-col z-[101]"
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#0A0A10] rounded-t-2xl sticky top-0 z-10">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto custom-scrollbar text-slate-300 text-sm leading-relaxed space-y-4">
          {content}
        </div>
      </motion.div>
    </div>
  );
};

// ==================================================================================
// --- ÁREA DE DADOS ---
// ==================================================================================

const services = [
  {
    title: "UI/UX & Frontend",
    description: "Interfaces imersivas que contam histórias. Foco obsessivo em micro-interações e performance.",
    icon: <Layout className="w-6 h-6 text-cyan-400" />
  },
  {
    title: "Sistemas Fullstack",
    description: "Arquiteturas escaláveis com Node.js e React. Segurança e robustez para grandes volumes.",
    icon: <Server className="w-6 h-6 text-purple-400" />
  },
  {
    title: "Mobile Nativo",
    description: "Apps iOS e Android com performance nativa e animações fluidas a 60fps.",
    icon: <Smartphone className="w-6 h-6 text-pink-400" />
  },
  {
    title: "Consultoria Tech",
    description: "Consultoria estratégica para transformar ideias complexas em produtos digitais viáveis.",
    icon: <Code className="w-6 h-6 text-emerald-400" />
  }
];

const projects = [
  {
    id: 1,
    title: "Pet Green Veterinária",
    category: "Landing Page",
    description: "Página moderna focada em conversão para clínica veterinária. Navegação fluida, mobile-first e otimizada para agendamentos rápidos via WhatsApp.",
    tech: ["React", "Framer Motion", "UX Design"],
    color: "from-green-600 to-emerald-900",
    link: "https://pet-green.netlify.app/",
    image: "/petgreen.png" 
  },
  {
    id: 2,
    title: "Dr. Pedro Elino",
    category: "Saúde & Odontologia",
    description: "Landing Page premium de alta performance para cirurgião-dentista. Foco em SEO local, autoridade profissional e captação inteligente de pacientes.",
    tech: ["Next.js", "SEO", "TypeScript"],
    color: "from-blue-600 to-slate-900",
    link: "https://dr-pedro-elino.netlify.app/",
    image: "/drpedro.png" 
  },
  {
    id: 3,
    title: "Tatuagem La Famille",
    category: "SPA & Automação",
    description: "Conceito Dark & Gold de alta performance. Resolve gargalos de atendimento com triagem automática e geração de links inteligentes para WhatsApp.",
    tech: ["React", "SPA", "WhatsApp API"],
    color: "from-yellow-600 to-amber-900", 
    link: "https://la-famille-tattoo.netlify.app/",
    image: "/tattoo.png" 
  }
];

const skills = [
  "React.js", "Next.js", "TypeScript", "Node.js", 
  "Tailwind", "Framer Motion", "Docker", "AWS", 
  "PostgreSQL", "React Native", "Figma", "Git"
];

// --- DADOS DA PÁGINA DE PREÇOS (COM STRIPE) ---
const pricingPlans = [
  {
    name: "Básico",
    price: "R$ 79,90",
    period: "/ mês",
    description: "Para quem quer estar na internet sem complicação",
    features: [
      "Site profissional pronto",
      "Site sempre no ar (hospedagem inclusa)",
      "Site seguro (cadeado no navegador)",
      "Botão do WhatsApp",
      "Endereço padrão do sistema",
      "Suporte por e-mail"
    ],
    highlight: false,
    color: "border-white/10 hover:border-white/20",
    buttonVariant: "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white",
    paymentLink: "https://buy.stripe.com/test_4gMbITaqedjYd0R5jU9k401" 
  },
  {
    name: "Premium",
    price: "R$ 129,90",
    period: "/ mês",
    description: "A escolha inteligente. Domine seu mercado com todas as ferramentas de conversão.",
    features: [
      "Tudo do Pro",
      "Endereço próprio (.com.br)",
      "Visual exclusivo e personalizado",
      "Foco total em alta conversão",
      "Relatórios detalhados de performance",
      "Suporte VIP direto no WhatsApp",
      "Prioridade máxima em atualizações"
    ],
    highlight: true,
    badge: "MAIOR RETORNO",
    color: "border-purple-500/80 shadow-[0_0_40px_rgba(168,85,247,0.4)] bg-gradient-to-b from-purple-900/20 to-transparent scale-105 z-10",
    buttonVariant: "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg shadow-purple-500/40 animate-pulse-slow hover:shadow-purple-500/60 hover:scale-105",
    paymentLink: "https://buy.stripe.com/test_eVq5kv7e2bbQ5ypfYy9k400" 
  },
  {
    name: "Pro",
    price: "R$ 99,90",
    period: "/ mês",
    description: "Uma boa opção para começar a gerar contatos.",
    features: [
      "Tudo do Básico",
      "Site otimizado (SEO Google)",
      "Botões WhatsApp c/ mensagens prontas",
      "Mudanças ilimitadas no conteúdo",
      "Relatório simples de visitas",
      "Suporte rápido por chat"
    ],
    highlight: false,
    color: "border-blue-500/20 hover:border-blue-500/40",
    buttonVariant: "bg-blue-900/30 text-blue-200 border border-blue-500/30 hover:bg-blue-900/50",
    paymentLink: "https://buy.stripe.com/test_eVq3cn8i66VA5yp4fQ9k402" 
  }
];

const comparisonData = [
  { feature: "Site profissional", basic: true, pro: true, premium: true },
  { feature: "Hospedagem inclusa", basic: true, pro: true, premium: true },
  { feature: "Site seguro", basic: true, pro: true, premium: true },
  { feature: "Botão WhatsApp", basic: true, pro: true, premium: true },
  { feature: "Otimização Google", basic: false, pro: true, premium: true },
  { feature: "Mudanças no site", basic: false, pro: true, premium: true },
  { feature: "Relatórios", basic: false, pro: true, premium: true },
  { feature: "Endereço próprio", basic: false, pro: false, premium: true },
  { feature: "Suporte WhatsApp", basic: false, pro: false, premium: true },
];

const faqData = [
  { q: "O que é o endereço próprio?", a: "É o endereço do seu site com o nome do seu negócio, por exemplo: seunegocio.com.br. Isso passa muito mais confiança para seus clientes do que um link genérico." },
  { q: "Posso trocar de plano depois?", a: "Sim! Você pode subir ou descer de plano quando quiser, sem burocracia." },
  { q: "Preciso saber mexer em site?", a: "Não. Nós cuidamos de toda a parte técnica para você focar no seu negócio." },
  { q: "O site funciona no celular?", a: "Sim. Ele é totalmente responsivo e se adapta automaticamente ao celular, tablet e computador." },
  { q: "Tem fidelidade?", a: "Não. Você pode cancelar a assinatura quando quiser, sem multas." },
];

// ==================================================================================
// --- COMPONENTES AUXILIARES ---
// ==================================================================================

// ==================================================================================
// --- COMPONENTE PRINCIPAL ---
// ==================================================================================
export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  // Estado para controlar qual modal de política está aberto
  const [activePolicy, setActivePolicy] = useState(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // --- FUNÇÃO DE ASSINATURA INTELIGENTE (Stripe ou WhatsApp) ---
  const handleSubscribe = (plan) => {
    // 1. Tenta abrir o link do Stripe se existir
    if (plan.paymentLink && plan.paymentLink.startsWith('http')) {
      window.open(plan.paymentLink, '_blank');
      return;
    }

    // 2. Fallback para WhatsApp se não tiver link do Stripe configurado
    // ⚠️ SUBSTITUA PELO SEU NÚMERO REAL
    const phoneNumber = "5511916474626"; 
    
    const message = encodeURIComponent(
      `Olá UiCode! 👋\n\nTenho interesse em contratar o *Plano ${plan.name}* (${plan.price}).\n\nPoderia me explicar os próximos passos?`
    );
    
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  // Conteúdo das Políticas
  const policyContent = {
    terms: (
      <div className="space-y-4">
        <p><strong>1. Aceitação dos termos</strong><br/>Ao acessar ou utilizar a plataforma UiCode.dev, o usuário concorda com estes Termos de Uso. Caso não concorde, não deve utilizar o serviço.</p>
        
        <p><strong>2. Descrição do serviço</strong><br/>O UiCode.dev oferece a criação, hospedagem e manutenção de páginas profissionais (landing pages), conforme o plano contratado. As funcionalidades variam de acordo com o plano escolhido pelo usuário.</p>
        
        <p><strong>3. Cadastro e responsabilidade do usuário</strong><br/>O usuário se compromete a:
        <ul className="list-disc pl-5 mt-1 space-y-1">
          <li>Fornecer informações verdadeiras no cadastro</li>
          <li>Manter seus dados atualizados</li>
          <li>Utilizar o serviço de forma legal</li>
        </ul>
        O usuário é responsável por todo o conteúdo inserido em sua página, incluindo textos, imagens e informações de contato.</p>
        
        <p><strong>4. Planos e pagamentos</strong><br/>O serviço é oferecido por assinatura mensal recorrente. A cobrança é feita automaticamente no método de pagamento cadastrado. Os valores e recursos de cada plano estão disponíveis na página de preços. O não pagamento poderá resultar na suspensão temporária do serviço até a regularização.</p>
        
        <p><strong>5. Cancelamento</strong><br/>O usuário pode cancelar a assinatura a qualquer momento, conforme descrito na Política de Cancelamento.</p>
        
        <p><strong>6. Suspensão e encerramento</strong><br/>O UiCode.dev pode suspender ou encerrar contas que:
        <ul className="list-disc pl-5 mt-1 space-y-1">
          <li>violem estes Termos</li>
          <li>utilizem o serviço para fins ilegais</li>
          <li>causem prejuízo técnico ou legal à plataforma</li>
        </ul>
        </p>
        
        <p><strong>7. Alterações nos termos</strong><br/>Estes Termos podem ser atualizados a qualquer momento. Recomenda-se que o usuário revise periodicamente.</p>
        
        <p><strong>8. Contato</strong><br/>Em caso de dúvidas, o usuário pode entrar em contato pelo e-mail: 📧 uicode.dev2026@gmail.com</p>
      </div>
    ),
    privacy: (
      <div className="space-y-4">
        <p><strong>1. Coleta de dados</strong><br/>Coletamos apenas os dados necessários para o funcionamento do serviço, como: Nome, E-mail, Informações do site e Dados de pagamento (processados por terceiros).</p>
        
        <p><strong>2. Uso das informações</strong><br/>Os dados coletados são utilizados para: Criar e manter a conta do usuário, Processar pagamentos, Oferecer suporte e Melhorar o serviço.</p>
        
        <p><strong>3. Pagamentos</strong><br/>Os pagamentos são processados por plataformas externas seguras (ex: Stripe, Mercado Pago). O UiCode.dev não armazena dados de cartão de crédito.</p>
        
        <p><strong>4. Compartilhamento de dados</strong><br/>Não vendemos, alugamos ou compartilhamos dados pessoais com terceiros, exceto quando necessário para: Processamento de pagamentos e Cumprimento de obrigações legais.</p>
        
        <p><strong>5. Segurança</strong><br/>Adotamos medidas técnicas para proteger os dados dos usuários, incluindo conexões seguras (HTTPS).</p>
        
        <p><strong>6. Direitos do usuário</strong><br/>O usuário pode solicitar: Acesso aos seus dados, Correção e Exclusão. Basta entrar em contato pelo e-mail informado.</p>
        
        <p><strong>7. Alterações nesta política</strong><br/>Esta Política de Privacidade pode ser atualizada periodicamente.</p>
      </div>
    ),
    cancellation: (
      <div className="space-y-4">
        <p><strong>1. Cancelamento da assinatura</strong><br/>O usuário pode cancelar sua assinatura a qualquer momento, diretamente pela plataforma ou entrando em contato com o suporte.</p>
        
        <p><strong>2. Efeitos do cancelamento</strong><br/>O acesso ao serviço permanece ativo até o final do período já pago. Após esse período, o site poderá ser suspenso.</p>
        
        <p><strong>3. Reembolsos</strong><br/>Não realizamos reembolso proporcional de valores já pagos, exceto quando exigido por lei.</p>
        
        <p><strong>4. Inadimplência</strong><br/>Em caso de falha no pagamento: O usuário será notificado e o serviço poderá ser suspenso até a regularização.</p>
        
        <p><strong>5. Exclusão de dados</strong><br/>Após o cancelamento, os dados poderão ser excluídos após um período razoável, salvo obrigações legais.</p>
      </div>
    )
  };

  return (
    <div className="relative min-h-screen bg-[#020204] text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      
      {/* --- BARRA DE PROGRESSO --- */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 origin-left z-[60]" style={{ scaleX }} />

      {/* --- AMBIENTE VISUAL --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }}></div>
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-900/10 rounded-full blur-[120px] animate-pulse-slow delay-1000"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]"></div>
      </div>

      {/* --- HEADER --- */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
      >
        <div className={`
          relative flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500
          ${isScrolled 
            ? 'bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 shadow-2xl w-full max-w-5xl' 
            : 'bg-transparent border border-transparent w-full max-w-7xl'}
        `}>
          <div 
            className="text-xl font-bold font-mono tracking-tighter flex items-center gap-2 cursor-pointer group" 
            onClick={() => scrollToSection('home')}
          >
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </div>
            <span className="text-white group-hover:text-cyan-400 transition-colors">UiCode</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {['Serviços', 'Projetos', 'Planos', 'Contato'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item === 'Planos' ? 'pricing' : item === 'Projetos' ? 'projects' : item === 'Serviços' ? 'services' : 'contact')}
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-500 transition-all group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('contact')}
              className="hidden md:flex bg-white text-black px-5 py-2 rounded-full font-bold text-sm hover:bg-cyan-50 transition-colors shadow-lg shadow-cyan-500/20"
            >
              Fale Comigo
            </motion.button>
            
            <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(true)}>
              <Menu />
            </button>
          </div>
        </div>
      </motion.header>

      {/* --- MENU MOBILE --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#020204]/95 backdrop-blur-xl flex flex-col justify-center items-center"
          >
            <button className="absolute top-8 right-8 text-white/50 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
              <X size={32} />
            </button>
            <div className="flex flex-col gap-8 text-center">
              {['Início', 'Serviços', 'Projetos', 'Planos', 'Contato'].map((item, i) => (
                <motion.button
                  key={item}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => scrollToSection(item === 'Planos' ? 'pricing' : item === 'Projetos' ? 'projects' : item === 'Início' ? 'home' : item === 'Serviços' ? 'services' : 'contact')}
                  className="text-3xl font-bold text-white hover:text-cyan-400 transition-colors"
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HERO SECTION --- */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="container max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-left z-10"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/30 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6"
            >
              <Zap size={12} fill="currentColor" /> Disponível para Projetos
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-bold leading-[0.9] tracking-tighter mb-8">
              Código <br />
              <span className="text-slate-700">Design</span> <br />
              <GradientText text="Surpreenda." />
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 max-w-lg leading-relaxed mb-10 border-l-2 border-white/10 pl-6">
              Desenvolvedor Fullstack focado em criar experiências digitais que não são apenas funcionais, mas <strong className="text-white">memoráveis</strong>. Transformo complexidade em interfaces elegantes.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <ShinyButton onClick={() => scrollToSection('projects')} icon={ArrowRight}>
                Ver Projetos
              </ShinyButton>
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 rounded-xl border border-white/10 hover:bg-white/5 transition-all text-slate-300 font-medium flex items-center gap-2"
              >
                <Github size={18} /> Perfil GitHub
              </button>
            </div>
          </motion.div>

          {/* Visual Abstrato Hero */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-cyan-500/20"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-12 rounded-full border border-dotted border-purple-500/20"
              />
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="relative w-64 h-80 bg-gradient-to-b from-slate-800 to-black rounded-2xl border border-white/10 shadow-2xl flex flex-col items-center justify-center p-6 backdrop-blur-md">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 mb-6 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                    <Code size={40} className="text-white" />
                  </div>
                  <div className="h-2 w-32 bg-white/10 rounded-full mb-3"></div>
                  <div className="h-2 w-24 bg-white/10 rounded-full mb-8"></div>
                  <div className="w-full h-px bg-white/10 mb-6"></div>
                  <div className="flex gap-4 opacity-50">
                    <div className="w-8 h-8 rounded-full bg-white/10"></div>
                    <div className="w-8 h-8 rounded-full bg-white/10"></div>
                    <div className="w-8 h-8 rounded-full bg-white/10"></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
        >
          <span className="text-[10px] uppercase tracking-[0.2em]">Role</span>
          <div className="w-px h-12 bg-gradient-to-b from-white to-transparent"></div>
        </motion.div>
      </section>

      {/* --- SERVICES --- */}
      <section id="services" className="py-32 relative">
        <div className="container px-6 mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Minha Expertise</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <SpotlightCard key={i} className="p-8 rounded-3xl group">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/50">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{service.description}</p>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROJECTS --- */}
      <section id="projects" className="py-32 bg-black/20">
        <div className="container px-6 mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
          >
            <div>
              <h2 className="text-4xl md:text-6xl font-bold mb-4">Trabalhos <br /><span className="text-slate-600">Selecionados</span></h2>
            </div>
            <a href="#" className="flex items-center gap-2 text-cyan-400 hover:text-white transition-colors group">
              Ver Repositório Completo <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          <div className="flex flex-col gap-24">
            {projects.map((project, index) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Visual */}
                <div className="w-full lg:w-3/5 group relative">
                  <div className={`absolute -inset-4 bg-gradient-to-r ${project.color} opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500 rounded-[3rem]`}></div>
                  <div className="relative aspect-video bg-[#0a0a0a] rounded-3xl border border-white/10 overflow-hidden shadow-2xl group-hover:-translate-y-2 transition-transform duration-500">
                    {project.image ? (
                      <div className="relative w-full h-full">
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover object-top opacity-90 group-hover:scale-105 transition-all duration-700" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent p-8 flex flex-col">
                        <div className="flex gap-2 mb-4">
                          <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                        </div>
                        <div className="flex-1 bg-white/5 rounded-xl border border-white/5 w-full flex items-center justify-center flex-col gap-4">
                          <span className="font-mono text-sm text-white/30">Sem_Imagem.jpg</span>
                          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 border border-white/10 text-xs font-mono text-cyan-400">
                            <CheckCircle2 size={12} /> UX Mobile-First
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="w-full lg:w-2/5 space-y-6">
                  <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase">0{project.id} — {project.category}</span>
                  <h3 className="text-4xl font-bold">{project.title}</h3>
                  <p className="text-slate-400 text-lg leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tech.map(t => (
                      <span key={t} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4 pt-4">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-cyan-50 transition-colors flex items-center gap-2">
                      <Globe size={16} /> Demo Online
                    </a>
                    <button className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors font-bold text-sm flex items-center gap-2">
                      <Github size={16} /> Código
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SKILLS --- */}
      <section id="skills" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#020204] via-cyan-900/10 to-[#020204]"></div>
        <div className="container px-6 mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-6">Stack Tecnológico</h2>
            <p className="text-slate-400">Ferramentas modernas para resolver problemas complexos com elegância.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill, i) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -5, borderColor: 'rgba(6,182,212,0.5)' }}
                className="px-6 py-3 bg-[#0a0a0a] border border-white/10 rounded-2xl flex items-center gap-3 shadow-lg cursor-default transition-colors"
              >
                <div className={`w-2 h-2 rounded-full ${skill.includes('React') || skill.includes('Next') ? 'bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]' : 'bg-slate-600'}`}></div>
                <span className="font-medium text-slate-200">{skill}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- NOVA SEÇÃO DE PREÇOS (PRICING) --- */}
      <section id="pricing" className="py-32 relative">
        <div className="container px-6 mx-auto max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Planos e Assinaturas</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Tenha um site profissional que ajuda seus clientes a falarem com você. <br />
              <span className="text-cyan-400 font-bold">💡 Com apenas 1 cliente novo por mês, o site já se paga.</span>
            </p>
          </motion.div>

          {/* Cards de Planos */}
          <div className="grid md:grid-cols-3 gap-8 mb-24 relative z-10">
            {pricingPlans.map((plan, i) => (
              <div key={i} className="relative group">
                {/* Efeito Glow para o card em destaque */}
                {plan.highlight && (
                  <div className="absolute -inset-1 bg-gradient-to-b from-purple-600/30 to-transparent blur-xl rounded-[2rem] opacity-75"></div>
                )}
                
                <SpotlightCard 
                  className={`h-full flex flex-col p-8 rounded-[2rem] bg-[#0A0A10] transition-all duration-300 ${plan.color}`}
                  spotlightColor={plan.highlight ? "rgba(168, 85, 247, 0.2)" : "rgba(6, 182, 212, 0.1)"}
                >
                  {/* Badge REPOSICIONADO: Canto Superior Direito (Estilo Fita/Canto) */}
                  {plan.highlight && (
                    <div className="absolute top-0 right-0 overflow-hidden rounded-tr-[2rem] rounded-bl-2xl">
                      <div className="bg-gradient-to-bl from-purple-600 to-pink-600 text-white text-[10px] font-bold px-6 py-2 shadow-lg tracking-wider flex items-center gap-1">
                        <Star size={10} className="fill-white" /> {plan.badge || "RECOMENDADO"}
                      </div>
                    </div>
                  )}

                  <h3 className="text-xl font-bold text-white mb-2 mt-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-4xl font-bold text-white tracking-tight">{plan.price}</span>
                    <span className="text-slate-500 text-sm">{plan.period}</span>
                  </div>
                  <p className="text-slate-400 text-sm mb-8 h-10">{plan.description}</p>

                  <ul className="space-y-4 mb-8 flex-1">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                        <CheckCircle2 size={16} className={`shrink-0 mt-0.5 ${plan.highlight ? 'text-purple-400' : 'text-cyan-500'}`} />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={() => handleSubscribe(plan)}
                    className={`w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 ${plan.buttonVariant}`}
                  >
                    {plan.paymentLink ? <CreditCard size={16} /> : null}
                    Escolher {plan.name} {plan.highlight && <Rocket size={16} />}
                  </button>
                </SpotlightCard>
              </div>
            ))}
          </div>

          {/* Tabela Comparativa */}
          <div className="mb-24 overflow-x-auto">
            <div className="min-w-[700px] bg-[#0A0A10]/50 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-8 text-center">Comparativo Detalhado</h3>
              <div className="grid grid-cols-4 gap-4 mb-6 pb-4 border-b border-white/10 text-center font-bold text-slate-300">
                <div className="text-left pl-4">Recurso</div>
                <div className="text-slate-400">Básico</div>
                <div className="text-purple-400">Premium ⭐</div>
                <div className="text-blue-400">Pro</div>
              </div>
              
              <div className="space-y-4">
                {comparisonData.map((row, i) => (
                  <div key={i} className="grid grid-cols-4 gap-4 items-center text-center py-3 hover:bg-white/5 rounded-lg transition-colors">
                    <div className="text-left pl-4 font-medium text-slate-300 text-sm">{row.feature}</div>
                    <div><StatusIcon status={row.basic} /></div>
                    <div><StatusIcon status={row.premium} /></div>
                    <div><StatusIcon status={row.pro} /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 mb-4">
                <HelpCircle className="text-cyan-400" />
              </div>
              <h3 className="text-3xl font-bold">Perguntas Frequentes</h3>
            </div>
            
            <div className="space-y-2">
              {faqData.map((item, i) => (
                <FAQItem key={i} question={item.q} answer={item.a} />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* --- CONTATO (FORMULÁRIO PREMIUM) --- */}
      <section id="contact" className="py-32 relative">
        <div className="container px-6 mx-auto max-w-4xl relative z-10">
          <SpotlightCard className="rounded-[3rem] p-10 md:p-16 bg-[#05050A]">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Vamos Construir o Futuro?</h2>
              <p className="text-slate-400 text-lg">
                Seja para um projeto, uma vaga ou apenas um café. <br className="hidden md:block" />
                Estou pronto para o próximo desafio.
              </p>
            </div>

            <form 
              action="https://formsubmit.co/uicode.dev2026@gmail.com" 
              method="POST"
              className="space-y-6 max-w-2xl mx-auto"
            >
              <input type="hidden" name="_subject" value="Novo contato do Portfólio!" />
              <input type="hidden" name="_next" value="http://localhost:5173" /> 
              <input type="hidden" name="_captcha" value="false" />

              <div className="grid md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1 group-focus-within:text-cyan-400 transition-colors">Seu Nome</label>
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-cyan-500 focus:bg-white/10 transition-all"
                    placeholder="João Silva"
                  />
                </div>
                <div className="group">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1 group-focus-within:text-cyan-400 transition-colors">Seu Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-cyan-500 focus:bg-white/10 transition-all"
                    placeholder="joao@exemplo.com"
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1 group-focus-within:text-cyan-400 transition-colors">WhatsApp</label>
                <input 
                  type="tel" 
                  name="phone" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-cyan-500 focus:bg-white/10 transition-all"
                  placeholder="(00) 00000-0000"
                />
              </div>

              <div className="group">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1 group-focus-within:text-cyan-400 transition-colors">Mensagem</label>
                <textarea 
                  rows={4} 
                  name="message" 
                  required 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-cyan-500 focus:bg-white/10 transition-all resize-none"
                  placeholder="Conte-me sobre seu projeto..."
                ></textarea>
              </div>

              <div className="pt-4">
                <ShinyButton className="w-full flex justify-center py-5 rounded-2xl" icon={Send}>
                  Enviar Mensagem
                </ShinyButton>
              </div>
            </form>

            <div className="mt-16 flex justify-center gap-8 border-t border-white/5 pt-8">
              <a href="https://instagram.com/uicode.dev" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white hover:scale-110 transition-all"><Instagram /></a>
              <a href="#" className="text-slate-400 hover:text-white hover:scale-110 transition-all"><Github /></a>
              <a href="#" className="text-slate-400 hover:text-white hover:scale-110 transition-all"><Linkedin /></a>
            </div>
          </SpotlightCard>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 border-t border-white/5 bg-[#020204]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm mb-8">
            <p>&copy; {new Date().getFullYear()} UiCode.dev</p>
            <p className="flex items-center gap-2">
              Desenvolvido por UiCode.dev
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-end gap-6 text-xs text-slate-600">
            <button 
              onClick={() => setActivePolicy('terms')} 
              className="hover:text-cyan-400 transition-colors flex items-center gap-1"
            >
              <FileText size={14} /> Termos de Uso
            </button>
            <button 
              onClick={() => setActivePolicy('privacy')} 
              className="hover:text-cyan-400 transition-colors flex items-center gap-1"
            >
              <Shield size={14} /> Política de Privacidade
            </button>
            <button 
              onClick={() => setActivePolicy('cancellation')} 
              className="hover:text-cyan-400 transition-colors flex items-center gap-1"
            >
              <RefreshCw size={14} /> Política de Cancelamento
            </button>
          </div>
        </div>
      </footer>

      {/* Modal de Políticas */}
      <AnimatePresence>
        {activePolicy && (
          <PolicyModal 
            isOpen={!!activePolicy} 
            onClose={() => setActivePolicy(null)}
            title={activePolicy === 'terms' ? 'Termos de Uso' : activePolicy === 'privacy' ? 'Política de Privacidade' : 'Política de Cancelamento'}
            content={policyContent[activePolicy]}
          />
        )}
      </AnimatePresence>
    </div>
  );
}