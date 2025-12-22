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
  Menu, X, Send, Zap, ArrowRight, CheckCircle2
} from 'lucide-react';

// ==================================================================================
// --- COMPONENTES DE UI AVANÇADOS (HIGH-END) ---
// ==================================================================================

// 1. Efeito de Spotlight (Luz segue o mouse nos cards)
const SpotlightCard = ({ children, className = "" }) => {
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
              rgba(6, 182, 212, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div>{children}</div>
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

// --- PROJETOS  ---
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

// ==================================================================================
// --- COMPONENTE PRINCIPAL ---
// ==================================================================================
export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#020204] text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      
      {/* --- BARRA DE PROGRESSO DE SCROLL SUPERIOR --- */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 origin-left z-[60]" style={{ scaleX }} />

      {/* --- AMBIENTE VISUAL (NOISE + AURORA) --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Noise Overlay (Textura de filme) */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }}></div>
        
        {/* Aurora Background (Gradientes móveis) */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-900/10 rounded-full blur-[120px] animate-pulse-slow delay-1000"></div>
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[30%] h-[30%] bg-blue-900/10 rounded-full blur-[100px]"></div>
        
        {/* Grid Tecnológico */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]"></div>
      </div>

      {/* --- HEADER FLUTUANTE --- */}
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
            {['Serviços', 'Projetos', 'Habilidades'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item === 'Projetos' ? 'projects' : item === 'Serviços' ? 'services' : 'skills')}
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
              {['Início', 'Serviços', 'Projetos', 'Habilidades', 'Contato'].map((item, i) => (
                <motion.button
                  key={item}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => scrollToSection(item === 'Projetos' ? 'projects' : item === 'Início' ? 'home' : item === 'Serviços' ? 'services' : item === 'Habilidades' ? 'skills' : 'contact')}
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
              Code <br />
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

          {/* Abstract Hero Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Círculos Orbitais */}
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
              {/* Cartão Central Flutuante */}
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
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
        >
          <span className="text-[10px] uppercase tracking-[0.2em]">Role</span>
          <div className="w-px h-12 bg-gradient-to-b from-white to-transparent"></div>
        </motion.div>
      </section>

      {/* --- SERVICES (GLASS CARDS) --- */}
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

      {/* --- PROJECTS (VISUAL IMPACT) --- */}
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
                {/* Visual do Projeto */}
                <div className="w-full lg:w-3/5 group relative">
                  <div className={`absolute -inset-4 bg-gradient-to-r ${project.color} opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500 rounded-[3rem]`}></div>
                  <div className="relative aspect-video bg-[#0a0a0a] rounded-3xl border border-white/10 overflow-hidden shadow-2xl group-hover:-translate-y-2 transition-transform duration-500">
                    
                    {/* LÓGICA DE EXIBIÇÃO DE IMAGEM */}
                    {/* Se tiver imagem, mostra ela. Se não, mostra o card decorativo padrão */}
                    {project.image ? (
                      <div className="relative w-full h-full">
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover object-top opacity-90 group-hover:scale-105 transition-all duration-700" 
                        />
                        {/* Overlay Gradiente para texto ficar legível se tiver */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                      </div>
                    ) : (
                      /* Interface Simulada (Fallback se não tiver imagem) */
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent p-8 flex flex-col">
                        <div className="flex gap-2 mb-4">
                          <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                        </div>
                        <div className="flex-1 bg-white/5 rounded-xl border border-white/5 w-full flex items-center justify-center flex-col gap-4">
                          <span className="font-mono text-sm text-white/30">Sem_Imagem.jpg</span>
                          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 border border-white/10 text-xs font-mono text-cyan-400">
                            <CheckCircle2 size={12} /> Em Breve
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                </div>

                {/* Informações do Projeto */}
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

      {/* --- SKILLS (GRID INFINITO) --- */}
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
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} UiCode.dev</p>
          <p className="flex items-center gap-2">
            Desenvolvido pro <span className="text-red-500"></span> UiCode.dev
          </p>
        </div>
      </footer>
    </div>
  );
}