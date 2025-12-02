/**
 * ARQUIVO PRINCIPAL DO PORTFÓLIO
 * Local: src/App.jsx
 * * Este é o coração do seu site. Aqui você edita textos, links, imagens e a estrutura.
 */

import React, { useState, useEffect, useRef } from 'react';

// --- IMPORTAÇÃO DE ÍCONES ---
import { 
  Code, 
  Layout, 
  Smartphone, 
  Server, 
  Globe, 
  Mail, 
  Github, 
  Linkedin, 
  Instagram,
  ChevronDown, 
  ExternalLink, 
  Menu, 
  X,
  Send,
  Zap
} from 'lucide-react';

/**
 * --- COMPONENTE DE ANIMAÇÃO (REVEAL) ---
 */
const Reveal = ({ children, className = "", delay = 0, direction = "up" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  const getTransform = () => {
    if (isVisible) return "translate-x-0 translate-y-0 opacity-100";
    if (direction === "up") return "translate-y-12 opacity-0";
    if (direction === "left") return "-translate-x-12 opacity-0";
    if (direction === "right") return "translate-x-12 opacity-0";
    return "opacity-0";
  };

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] transform ${getTransform()} ${className}`}
    >
      {children}
    </div>
  );
};

// ==================================================================================
// --- ÁREA DE DADOS (EDITE AQUI PARA MUDAR O CONTEÚDO DO SITE) ---
// ==================================================================================

// 1. SEÇÃO DE SERVIÇOS
const services = [
  {
    title: "Landing Pages de Alta Conversão",
    description: "Páginas otimizadas para performance e SEO, desenhadas para converter visitantes em clientes.",
    icon: <Layout className="w-6 h-6 text-cyan-400" />
  },
  {
    title: "Aplicações Web Fullstack",
    description: "Sistemas complexos e dashboards interativos usando React, Node.js e bancos de dados modernos.",
    icon: <Code className="w-6 h-6 text-purple-400" />
  },
  {
    title: "Desenvolvimento Mobile",
    description: "Aplicativos nativos ou híbridos que oferecem experiência de usuário fluida em iOS e Android.",
    icon: <Smartphone className="w-6 h-6 text-pink-400" />
  },
  {
    title: "APIs & Integrações",
    description: "Backends robustos, RESTful ou GraphQL, integrando serviços de pagamento, IA e automação.",
    icon: <Server className="w-6 h-6 text-emerald-400" />
  }
];

// 2. SEÇÃO DE PROJETOS (ATUALIZADO COM GYM, DRINKIX E POUPANÇAPRO)
const projects = [
  {
    id: 1,
    title: "GYM - Treino & Evolução",
    category: "Web App / Sistema",
    description: "Aplicação para registrar e acompanhar treinos. Permite cadastrar exercícios, cargas e repetições, visualizar evolução via gráficos e definir metas.",
    tech: ["React", "Node.js", "Chart.js", "PostgreSQL"],
    // Gradiente verde para remeter a saúde/energia
    color: "from-emerald-900 via-green-600 to-lime-400"
  },
  {
    id: 2,
    title: "Drinkix - Delivery",
    category: "Mobile App",
    description: "Facilita o acesso a delivery de bebidas em regiões carentes. Conecta consumidores e fornecedores com geolocalização e agendamento.",
    tech: ["React Native", "Google Maps", "Firebase", "Stripe"],
    // Gradiente âmbar/laranja para remeter a bebidas/lazer
    color: "from-orange-900 via-amber-600 to-yellow-400"
  },
  {
    id: 3,
    title: "PoupançaPro",
    category: "Finanças Pessoais",
    description: "Gerenciamento financeiro intuitivo. Auxilia na visualização de fluxo de caixa, investimentos e tomada de decisões estratégicas.",
    tech: ["React Native", "TypeScript", "SQLite", "Victory"],
    // Gradiente azul para remeter a confiança/finanças
    color: "from-blue-900 via-indigo-600 to-cyan-400"
  }
];

// 3. SEÇÃO DE HABILIDADES (Tech Stack)
const skills = [
  "JavaScript (ES6+)", "TypeScript", "React.js", "Next.js", 
  "Node.js", "Tailwind CSS", "PostgreSQL", "MongoDB", 
  "Docker", "AWS", "Git", "Figma"
];

// ==================================================================================
// --- COMPONENTE PRINCIPAL (O SITE COMEÇA AQUI) ---
// ==================================================================================
export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#05050A] text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      
      {/* --- ESTILOS DE ANIMAÇÃO PERSONALIZADOS (Correção para garantir movimento) --- */}
      <style>{`
        @keyframes blob-float {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes custom-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-blob {
          animation: blob-float 10s infinite ease-in-out;
        }
        .animate-blob-delayed {
          animation: blob-float 12s infinite ease-in-out;
          animation-delay: 2s; /* Atrasa um pouco para não ficarem sincronizados */
        }
        .animate-pulse-slow {
          animation: custom-pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>

      {/* --- FUNDO ANIMADO --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Grade com pulsação suave */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] animate-pulse-slow"></div>
        {/* Bolas de luz flutuantes (Blobs) */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] animate-blob"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px] animate-blob-delayed"></div>
      </div>

      {/* --- HEADER --- */}
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-[#05050A]/70 backdrop-blur-xl border-b border-white/5 py-4' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div 
            className="text-2xl font-bold font-mono tracking-tighter flex items-center gap-2 cursor-pointer group" 
            onClick={() => scrollToSection('home')}
          >
            <span className="text-cyan-400 group-hover:scale-110 transition-transform">&lt;</span>
            UiCode
            <span className="text-purple-400">.dev</span>
            <span className="text-cyan-400 group-hover:scale-110 transition-transform">/&gt;</span>
          </div>

          <nav className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5 backdrop-blur-md">
            {['Início', 'Serviços', 'Projetos', 'Habilidades'].map((item, idx) => {
               const id = item === 'Início' ? 'home' : item === 'Serviços' ? 'services' : item === 'Projetos' ? 'projects' : 'skills';
               return (
                <button 
                  key={idx}
                  onClick={() => scrollToSection(id)}
                  className="px-5 py-2 rounded-full text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all uppercase tracking-wide"
                >
                  {item}
                </button>
               )
            })}
          </nav>

          <button 
            onClick={() => scrollToSection('contact')}
            className="hidden md:flex items-center gap-2 px-6 py-2.5 rounded-full bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500 hover:text-white transition-all duration-300 font-bold text-sm shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)]"
          >
            Fale Comigo <Zap size={16} fill="currentColor" />
          </button>

          <button 
            className="md:hidden p-2 rounded-full active:bg-white/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-[#05050A]/95 backdrop-blur-2xl border-b border-white/10 py-6 px-6 flex flex-col gap-2 shadow-2xl animate-in slide-in-from-top-2 z-50">
            {['Início', 'Serviços', 'Projetos', 'Habilidades', 'Contato'].map((item, idx) => {
               const id = item === 'Início' ? 'home' : item === 'Serviços' ? 'services' : item === 'Projetos' ? 'projects' : 'skills';
               return (
                <button 
                  key={item}
                  style={{ animationDelay: `${idx * 50}ms` }}
                  onClick={() => scrollToSection(id)}
                  className="w-full text-left p-4 rounded-2xl bg-white/5 hover:bg-white/10 active:scale-[0.98] transition-all text-lg font-medium border border-white/5 animate-in slide-in-from-left-4 duration-500 fill-mode-backwards"
                >
                  {item}
                </button>
              )
            })}
          </div>
        )}
      </header>

      {/* --- SEÇÃO HERO --- */}
      <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 min-h-screen flex flex-col justify-center items-center overflow-hidden">
        <div className="container mx-auto text-center max-w-5xl z-10">
          
          <Reveal direction="up" delay={0}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-cyan-300 text-xs font-bold tracking-widest uppercase mb-8 hover:bg-white/10 transition-colors cursor-default shadow-[0_0_20px_rgba(0,0,0,0.5)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              Disponível para novos projetos
            </div>
          </Reveal>
          
          <Reveal direction="up" delay={100}>
            <h1 className="text-5xl md:text-8xl font-bold mb-8 leading-tight tracking-tight">
              Transformando ideias em <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-x bg-[length:200%_auto]">
                experiências digitais.
              </span>
            </h1>
          </Reveal>
          
          <Reveal direction="up" delay={200}>
            <p className="text-lg md:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Eu sou o desenvolvedor por trás do <strong>UiCode.dev</strong>. Especialista em criar aplicações web fullstack, interfaces modernas e soluções escaláveis para o seu negócio.
            </p>
          </Reveal>
          
          <Reveal direction="up" delay={300}>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full md:w-auto">
              <button 
                onClick={() => scrollToSection('projects')}
                className="w-full md:w-auto px-8 py-4 rounded-2xl bg-white text-black font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] duration-300"
              >
                Ver Portfolio
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="w-full md:w-auto px-8 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-white font-bold text-lg hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center gap-2 duration-300"
              >
                <Mail className="w-5 h-5" /> Contrate-me
              </button>
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-600">
          <ChevronDown size={32} />
        </div>
      </section>

      {/* --- SEÇÃO DE SERVIÇOS --- */}
      <section id="services" className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="mb-16 text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-500">
                O que eu faço
              </h2>
              <div className="w-20 h-1 bg-cyan-500 mx-auto rounded-full"></div>
              <p className="mt-4 text-slate-400 text-lg">Soluções completas de ponta a ponta</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Reveal key={index} delay={index * 100}>
                <div 
                  className="group relative bg-[#0A0A10] p-8 rounded-3xl border border-white/5 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(6,182,212,0.2)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none"></div>
                  <div className="mb-6 w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-300 group-hover:border-cyan-500/50">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-100">{service.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- SEÇÃO DE PROJETOS --- */}
      <section id="projects" className="py-24 bg-gradient-to-b from-transparent to-[#0A0A10]/50 relative z-10">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-500 mb-2">
                  Projetos Recentes
                </h2>
                <p className="text-slate-400">Uma seleção dos meus melhores trabalhos.</p>
              </div>
              <button className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 group">
                Ver GitHub <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Reveal key={project.id} delay={index * 150}>
                <div className="group rounded-[2rem] p-2 bg-gradient-to-b from-white/10 to-transparent border border-white/5 hover:border-cyan-500/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                  <div className="h-full bg-[#05050A] rounded-[1.7rem] overflow-hidden relative flex flex-col">
                    <div className={`h-56 bg-gradient-to-br ${project.color} relative overflow-hidden group-hover:scale-105 transition-transform duration-700`}>
                      <div className="absolute inset-0 bg-[#05050A]/20 backdrop-blur-[2px] group-hover:backdrop-blur-none transition-all duration-500"></div>
                      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30"></div>
                      <div className="absolute bottom-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs font-bold text-white border border-white/20">
                          {project.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-8 flex-1 flex flex-col relative bg-[#05050A]">
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                      <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map((tech) => (
                          <span key={tech} className="text-xs text-slate-300 bg-slate-800 px-2 py-1 rounded border border-slate-700 hover:border-cyan-500/30 hover:text-cyan-400 transition-colors">
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      <div className="mt-auto flex gap-3">
                        <button className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-sm hover:bg-cyan-500 hover:border-cyan-500 hover:text-black transition-all flex items-center justify-center gap-2 group-hover/btn:scale-105 active:scale-95">
                          <Globe size={16} /> Live Demo
                        </button>
                        <button className="flex-1 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium text-sm hover:bg-slate-700 transition-all flex items-center justify-center gap-2 active:scale-95">
                          <Code size={16} /> Code
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- SEÇÃO DE HABILIDADES --- */}
      <section id="skills" className="py-24 relative z-10">
        <div className="container mx-auto px-6">
           <Reveal>
             <div className="relative rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-2xl p-8 md:p-16 overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 blur-[80px] rounded-full -mr-16 -mt-16 pointer-events-none animate-pulse"></div>
               
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                 <div>
                   <h2 className="text-3xl md:text-4xl font-bold mb-6">Stack Tecnológico</h2>
                   <p className="text-slate-400 mb-8 leading-relaxed">
                     Minha caixa de ferramentas inclui as tecnologias mais modernas do mercado. 
                     Foco em criar aplicações escaláveis, performáticas e com excelente experiência de desenvolvedor.
                   </p>
                   
                   <div className="flex flex-wrap gap-3">
                      {skills.map((skill, idx) => (
                        <div key={skill} style={{animationDelay: `${idx * 50}ms`}} className="flex items-center gap-2 px-4 py-2 bg-black/40 rounded-lg border border-white/10 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-400 transition-all cursor-default shadow-inner hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/10">
                          {skill.includes('React') || skill.includes('Next') ? <Zap size={14} className="text-yellow-400" /> : <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>}
                          <span className="font-medium text-sm">{skill}</span>
                        </div>
                      ))}
                   </div>

                   <div className="mt-12 grid grid-cols-3 gap-6">
                      <div className="text-center p-4 bg-black/40 rounded-xl border border-white/10 hover:border-white/30 transition-colors">
                        <div className="text-3xl font-bold text-white mb-1">3+</div>
                        <div className="text-xs text-slate-400 uppercase tracking-wider">Anos Exp.</div>
                      </div>
                      <div className="text-center p-4 bg-black/40 rounded-xl border border-white/10 hover:border-cyan-500/30 transition-colors">
                        <div className="text-3xl font-bold text-cyan-400 mb-1">20+</div>
                        <div className="text-xs text-slate-400 uppercase tracking-wider">Projetos</div>
                      </div>
                      <div className="text-center p-4 bg-black/40 rounded-xl border border-white/10 hover:border-purple-500/30 transition-colors">
                        <div className="text-3xl font-bold text-purple-400 mb-1">100%</div>
                        <div className="text-xs text-slate-400 uppercase tracking-wider">Satisfação</div>
                      </div>
                   </div>
                 </div>

                 <div className="relative group perspective-1000">
                   <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur-2xl opacity-20 transform rotate-3 group-hover:opacity-30 transition-opacity"></div>
                   <div className="relative bg-[#0A0A10] border border-white/10 rounded-2xl p-8 font-mono text-sm overflow-hidden shadow-2xl transform transition-transform duration-500 group-hover:rotate-y-2 group-hover:rotate-x-2">
                      <div className="flex gap-2 mb-4">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="space-y-2 text-slate-300">
                        <p className="text-slate-500"># UiCode.config.js</p>
                        <p><span className="text-purple-400">const</span> <span className="text-yellow-200">developer</span> = {'{'}</p>
                        <p className="pl-4"><span className="text-cyan-400">name:</span> <span className="text-green-400">'UiCode.dev'</span>,</p>
                        <p className="pl-4"><span className="text-cyan-400">role:</span> <span className="text-green-400">'Fullstack Engineer'</span>,</p>
                        <p className="pl-4"><span className="text-cyan-400">passion:</span> <span className="text-green-400">['UI/UX', 'Performance', 'Clean Code']</span>,</p>
                        <p className="pl-4"><span className="text-cyan-400">hireable:</span> <span className="text-orange-400">true</span>,</p>
                        <p className="pl-4"><span className="text-cyan-400">startProject:</span> <span className="text-purple-400">async function</span>() {'{'}</p>
                        <p className="pl-8"><span className="text-purple-400">return</span> <span className="text-green-400">'Let\'s build something amazing!'</span>;</p>
                        <p className="pl-4">{'}'}</p>
                        <p>{'};'}</p>
                        <p className="animate-pulse text-cyan-400">_</p>
                      </div>
                   </div>
                 </div>
               </div>
             </div>
           </Reveal>
        </div>
      </section>

      {/* --- SEÇÃO DE CONTATO --- */}
      <section id="contact" className="py-24 relative z-10">
        <div className="container mx-auto px-6 max-w-4xl">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Vamos Trabalhar Juntos?</h2>
              <p className="text-slate-400 text-lg">
                Tem uma ideia, um projeto ou apenas quer dar um "Oi"? 
                <br />Preencha o formulário abaixo e entrarei em contato em breve.
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <form 
              action="https://formsubmit.co/uicode.dev2026@gmail.com" 
              method="POST"
              className="bg-[#0A0A10] p-8 md:p-10 rounded-[2rem] border border-white/10 shadow-2xl space-y-6 relative overflow-hidden group"
            >
              <input type="hidden" name="_subject" value="Novo contato do Portfólio!" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_next" value="http://localhost:5173" /> 

              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 group-hover:h-1.5 transition-all duration-300"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Seu Nome</label>
                  <input 
                    type="text" 
                    name="name" 
                    required
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-white placeholder-slate-600" 
                    placeholder="Seu Nome" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Seu Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    required
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-white placeholder-slate-600" 
                    placeholder="seu@email.com" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">WhatsApp / Telefone</label>
                <input 
                  type="tel" 
                  name="phone" 
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-white placeholder-slate-600" 
                  placeholder="(00) 00000-0000" 
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Mensagem</label>
                <textarea 
                  rows={4} 
                  name="message" 
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-white placeholder-slate-600 resize-none" 
                  placeholder="Escreva sua mensagem aqui..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-cyan-400 transition-all transform active:scale-[0.98] flex justify-center items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]"
              >
                <Send size={20} /> Enviar Agora
              </button>
            </form>
          </Reveal>

          <Reveal delay={400}>
            <div className="mt-16 flex flex-col items-center gap-6">
               <div className="flex gap-6">
                  <a href="https://instagram.com/uicode.dev" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all hover:scale-110 hover:rotate-6">
                    <Instagram size={24} />
                  </a>
                  <a href="#" className="p-3 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all hover:scale-110 hover:-rotate-6">
                    <Github size={24} />
                  </a>
                  <a href="#" className="p-3 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all hover:scale-110 hover:rotate-6">
                    <Linkedin size={24} />
                  </a>
               </div>
               <div className="text-slate-500 font-mono text-sm tracking-widest">
                  @UICODE.DEV
               </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-8 border-t border-white/5 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 text-center text-slate-500 text-sm">
          <p className="mb-2">
            &copy; {new Date().getFullYear()} UiCode.dev. Todos os direitos reservados.
          </p>
          <p>
            Desenvolvido por <span className="text-cyan-400 font-bold hover:text-cyan-300 transition-colors cursor-pointer">UiCode.dev</span>
          </p>
        </div>
      </footer>
    </div>
  );
}