/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUpRight, 
  Cpu, 
  Layers, 
  Database, 
  Cloud, 
  Compass, 
  Flame, 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  Clock,
  ExternalLink,
  ChevronRight,
  Shield,
  Zap,
  DollarSign,
  Briefcase,
  X,
  Sparkles,
  Award
} from 'lucide-react';
import { ServiceItem, SolutionItem, AdvantageItem } from './types';
import InteractiveHeroCanvas from './components/InteractiveHeroCanvas';
import InteractiveContact from './components/InteractiveContact';

// Services static content with detailed expansion blueprints
const CORE_SERVICES: ServiceItem[] = [
  {
    id: 'ai-dev',
    title: '人工智能软件开发',
    badge: 'Core 核心',
    description: 'AI基础软件开发、AI应用软件开发、算法软件开发，为业务场景提供智能化支持。',
    details: [
      '智能Agent (智能体) 定制研发与工作流打通',
      '大语言模型 (LLM) 微调、检索增强生成 (RAG) 检索系统定制',
      '计算机视觉与多模态数据深度挖掘算法开发',
      '业务自动化决策流与智能推荐逻辑集成',
      'AI应用服务端架构搭建与性能调优'
    ],
    icon: 'Cpu'
  },
  {
    id: 'tech-consult',
    title: '信息技术咨询与技术服务',
    badge: 'Consult 咨询',
    description: '提供技术开发、技术咨询、技术交流、技术转让、技术推广等服务。',
    details: [
      '企业数字化转型 (Digitalization) 全套战略规划咨询',
      '技术架构可行性评测与云原生重构路线制定',
      '技术知识产权与核心软件资产转让、技术推广支持',
      '研发团队敏捷化流程搭建、DevOps CI/CD 全流程赋能',
      '企业级技术栈选型与降低落地成本专家指导'
    ],
    icon: 'Compass'
  },
  {
    id: 'network-data',
    title: '网络技术与数据服务',
    badge: 'Infrastructure 底座',
    description: '互联网数据服务、数据处理与存储支持、网络技术服务、网络与信息安全软件开发。',
    details: [
      '高并发、高可用 Web 全栈系统研发与分布式部署',
      '数据流式处理、云端数据清洗、高稳定性数据仓库建设',
      '多层级网络与核心信息安全软件定制，防灾容灾演练',
      '大数据管道与自动化统计监控看板集成',
      'API 安全网关搭建与业务数据存储调优'
    ],
    icon: 'Database'
  },
  {
    id: 'cloud-outsource',
    title: '软件外包与云平台服务',
    badge: 'Agile 敏捷',
    description: '软件外包服务、基于云平台的业务外包服务，帮助企业降低技术落地成本。',
    details: [
      '全生命周期定制化软件外包 (Software Outsourcing)',
      '全托管式云原生业务外包 (SaaS/IaaS/PaaS 运维)',
      '弹性多租户业务系统全权代运营与全天候监控保障',
      '按需匹配的异地敏捷联合开发小组技术驻场',
      '遗留系统业务平滑迁移上云与数据无缝集成'
    ],
    icon: 'Cloud'
  },
  {
    id: 'digital-brand',
    title: '数字内容与品牌设计',
    badge: 'Creative 创意',
    description: '数字内容制作、广告设计、广告制作、广告代理、专业设计服务。',
    details: [
      '高端企业数字化产品 UI/UX 体验深度定义与设计',
      '广告传播主视觉、品牌视觉识别系统 (VI) 精英级创设',
      '多端高精度数字内容资产 (含三维包装、精益排版) 制作',
      '数字化广告精准制作、代理分发与多平台触达策略',
      '创意互动式网页、交互艺术媒体视觉研发与落地'
    ],
    icon: 'Layers'
  },
  {
    id: 'game-culture',
    title: '动漫游戏与数字文化创意',
    badge: 'Interactivity 交互',
    description: '动漫游戏开发、数字文化创意软件开发、玩具、动漫及游艺用品相关服务。',
    details: [
      '互动网页游戏开发、微信小程序交互创意产品设计',
      '数字文创应用底层软件框架与虚实交互系统开发',
      '动漫IP内容场景搭建、数字化文创娱乐周边产品研发',
      '游艺设备核心嵌入式交互控制逻辑研发',
      '基于Canvas/WebGL的趣味营销小游戏高水准订制'
    ],
    icon: 'Flame'
  }
];

// Solutions static content with detailed architectural components
const SOLUTIONS: SolutionItem[] = [
  {
    id: 'startup-pkg',
    title: '初创企业数字化零到一搭建',
    subtitle: 'Brand & Base System Launch',
    target: '适合新成立公司、寻求首轮融资的创业项目、初创出海品牌',
    description: '适用于新公司官网、品牌视觉、基础系统、推广素材搭建。帮助年轻创业团队以最快速度、最克制成本建立极具专业说服力的全套线上入口。',
    features: [
      '国际化高档留白响应式官网 & H5 适配端',
      '全套轻量级品牌 VI 视觉与数字化名片',
      '基础核心业务系统搭建 (如简洁订货流或AI初步接口)',
      '云平台快速部署，48小时内零服务器维护费上线'
    ],
    icon: 'Zap'
  },
  {
    id: 'enterprise-ai',
    title: '企业 AI 工具与业务系统开发',
    subtitle: 'Intelligent Enterprise Workflow',
    target: '适合业务遭遇效能瓶颈、累积大量非结构化数据的转型企业',
    description: '适用于内部管理、智能客服、数据处理、自动化工具、AI 应用场景。将大模型与实际业务进行逻辑嵌合，切实达成数据降本、效能增量。',
    features: [
      '智能 AI 客服 Agent + 历史数据流关联调配',
      '企业数据自动清洗、多维分析看板与数据仓库建设',
      '基于内部知识库的智能搜索推荐与公文自动生成',
      '私有化部署防护墙，防数据泄露的安全审计系统'
    ],
    icon: 'Cpu'
  },
  {
    id: 'brand-ad',
    title: '品牌内容与多触点广告传播',
    subtitle: 'Digital Content & Engagement',
    target: '适合追求品牌调性提升、线上流量转化及数字内容升级的成熟企业',
    description: '适用于广告设计、短视频内容、数字内容制作、品牌推广。以独到的新锐审美打通技术与美学的界限，建立品牌高级感的护城河。',
    features: [
      '前沿 3D/Canvas 互动营销体验设计与执行',
      '全媒体创意广告高质制作与代理运营推广',
      '精细化文案内容、自媒体排版与轻量动漫制作',
      '数字内容包装升级，深度赋能终端营销表现'
    ],
    icon: 'Layers'
  },
  {
    id: 'tech-outsource',
    title: '技术外包与长期工程支持',
    subtitle: 'Agile Engineer Core Support',
    target: '适合无专职研发团队、或需要极速拓展技术边界的项目型组织',
    description: '适用于没有技术团队或需要外部开发支持的企业。提供敏捷、灵活、代码严谨度极高的开发资源支持，将技术落地做实、做精。',
    features: [
      '按需随时调遣的远程专家小组/敏捷开发专线',
      '全天候基于云平台的运维服务与日常系统升级维护',
      '极高代码质量，附带全栈技术转让咨询说明书',
      '敏捷外包响应，按两周 Sprint 精准交付核算'
    ],
    icon: 'Cloud'
  }
];

export default function App() {
  const [activeService, setActiveService] = useState<ServiceItem | null>(null);
  const [activeSolution, setActiveSolution] = useState<string>('startup-pkg');
  const [simulationMode, setSimulationMode] = useState<'ai' | 'creative' | 'pulse'>('ai');
  const [beijingTime, setBeijingTime] = useState<string>('');
  const [scrolled, setScrolled] = useState(false);

  // Monitor scroll for nav dynamic behavior
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update Guangzhou/Beijing Time Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time in Beijing zone (UTC+8)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Shanghai',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setBeijingTime(now.toLocaleTimeString('zh-CN', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Icon mapping helper for Lucide icons
  const renderIcon = (iconName: string, className = "h-5 w-5") => {
    switch (iconName) {
      case 'Cpu': return <Cpu className={className} />;
      case 'Compass': return <Compass className={className} />;
      case 'Database': return <Database className={className} />;
      case 'Cloud': return <Cloud className={className} />;
      case 'Layers': return <Layers className={className} />;
      case 'Flame': return <Flame className={className} />;
      case 'Zap': return <Zap className={className} />;
      default: return <Cpu className={className} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#FFFFFF] bg-grid-pattern relative overflow-x-hidden selection:bg-blue-600 selection:text-white" id="home">
      
      {/* Professional Polish Design Theme Ambient Glow Spotlights */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-slate-800/20 blur-[100px] rounded-full pointer-events-none z-0" />

      {/* Floating Header Navigation */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3' : 'bg-transparent py-5 border-b border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo area */}
            <a href="#home" onClick={(e) => handleSmoothScroll(e, 'home')} className="flex items-center gap-2 group">
              <div className="relative h-7 w-7 rounded bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/10 group-hover:scale-105 transition-transform">
                <span className="text-white font-sans font-black text-xs">C</span>
                <div className="absolute inset-0 bg-white/20 rounded opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-white tracking-wider font-sans leading-none">创与惟科技</span>
                <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest mt-0.5 leading-none">CYW Tech</span>
              </div>
            </a>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-8 text-[11.5px] font-medium text-neutral-400">
              <a href="#home" onClick={(e) => handleSmoothScroll(e, 'home')} className="hover:text-white transition-colors">首页</a>
              <a href="#services" onClick={(e) => handleSmoothScroll(e, 'services')} className="hover:text-white transition-colors">服务能力</a>
              <a href="#solutions" onClick={(e) => handleSmoothScroll(e, 'solutions')} className="hover:text-white transition-colors">解决方案</a>
              <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className="hover:text-white transition-colors">关于我们</a>
              <a href="#advantages" onClick={(e) => handleSmoothScroll(e, 'advantages')} className="hover:text-white transition-colors">团队优势</a>
              <a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')} className="hover:text-white transition-colors">联系我们</a>
            </div>

            {/* CTA Button */}
            <div className="flex items-center gap-4">
              {/* Beijing Time Badge (Guangzhou Location Context) */}
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.02] border border-white/5 font-mono text-[10px] text-neutral-400">
                <Clock className="h-3 w-3 text-blue-400" />
                <span>广州 (CST): </span>
                <span className="text-white tabular-nums">{beijingTime || '21:45:50'}</span>
              </div>

              <a 
                href="#contact" 
                onClick={(e) => handleSmoothScroll(e, 'contact')}
                className="px-4 py-2 rounded-lg bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                联系我们 / 获取方案
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-left relative z-10">
              {/* Accent micro-badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span>广州市创与惟信息科技有限公司 • CYW Tech</span>
              </div>

              <h1 className="text-[1.75rem] min-[360px]:text-[2rem] sm:text-5xl lg:text-6xl font-sans font-semibold text-white tracking-normal leading-[1.1] text-gradient">
                以技术、内容与策略，<br />
                <span className="text-gradient-blue">驱动企业数字化增长</span>
              </h1>

              <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-xl">
                创与惟科技专注于人工智能软件开发、信息技术咨询、数字内容制作、广告设计与网络技术服务，为企业提供从技术到品牌的综合数字化解决方案。我们用技术支撑业务落地，用创意实现心智溢价。
              </p>

              {/* Simulation Mode Selector in Hero (Highly Elegant micro-interaction) */}
              <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl max-w-md">
                <span className="text-[10px] font-mono text-neutral-500 block mb-2 uppercase tracking-wider">切换 AI 仿真视觉模式:</span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'ai', label: '神经网络 (AI)' },
                    { id: 'creative', label: '创意漂浮' },
                    { id: 'pulse', label: '系统脉冲' }
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setSimulationMode(mode.id as any)}
                      className={`px-2 py-1.5 rounded text-[10.5px] font-mono transition-all border ${
                        simulationMode === mode.id 
                          ? 'bg-blue-600/15 border-blue-500/30 text-blue-300' 
                          : 'bg-transparent border-transparent text-neutral-500 hover:text-neutral-300'
                      }`}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a 
                  href="#contact" 
                  onClick={(e) => handleSmoothScroll(e, 'contact')}
                  className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20 cursor-pointer"
                >
                  <span>获取定制数字化方案</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
                
                <a 
                  href="#services" 
                  onClick={(e) => handleSmoothScroll(e, 'services')}
                  className="px-6 py-3 rounded-lg bg-white/[0.03] border border-white/5 hover:border-white/10 hover:bg-white/[0.05] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>了解服务能力</span>
                  <ChevronRight className="h-4 w-4 text-neutral-400" />
                </a>
              </div>
            </div>

            {/* Right Interactive Visual Graphic */}
            <div className="lg:col-span-5 relative">
              <InteractiveHeroCanvas simulationMode={simulationMode} />
            </div>

          </div>
        </div>
      </section>

      {/* Services Capabilities Module */}
      <section className="py-20 border-t border-white/5 relative bg-dot-pattern" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-mono tracking-widest text-blue-500 uppercase">Capabilities</span>
            <h2 className="text-3xl sm:text-4xl font-sans font-semibold tracking-tight text-white mt-2 mb-4">
              我们提供的核心服务
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed">
              严格遵循法律核准经营范围，创与惟科技为各类成长型企业与成熟项目配备高品质的AI软件、IT咨询、网络与品牌创意的全生命周期落地方案。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_SERVICES.map((srv) => (
              <div 
                key={srv.id} 
                className="glass-panel glass-panel-hover p-6 sm:p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden group border border-white/5"
                id={`srv-card-${srv.id}`}
              >
                <div className="space-y-4">
                  {/* Card header */}
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                      {renderIcon(srv.icon, "h-5 w-5")}
                    </div>
                    {srv.badge && (
                      <span className="px-2 py-0.5 rounded bg-white/[0.02] border border-white/5 text-[9.5px] font-mono text-neutral-400">
                        {srv.badge}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-base font-semibold text-white tracking-tight">{srv.title}</h3>
                    <p className="text-xs text-neutral-400 leading-relaxed h-[52px] overflow-hidden line-clamp-3">
                      {srv.description}
                    </p>
                  </div>
                </div>

                {/* Footer learn more action */}
                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] text-neutral-500 font-mono">Verified Security</span>
                  <button
                    onClick={() => setActiveService(srv)}
                    className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    <span>部署蓝图</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Solutions Module (Tabbed Blueprint View) */}
      <section className="py-20 border-t border-white/5 bg-radial from-neutral-950/40 via-neutral-950 to-neutral-950" id="solutions">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-mono tracking-widest text-blue-500 uppercase">Solutions</span>
            <h2 className="text-3xl sm:text-4xl font-sans font-semibold tracking-tight text-white mt-2 mb-4">
              面向不同阶段企业的数字化解决方案
            </h2>
            <p className="text-sm text-neutral-400">
              打破传统软件外包盲目交付的壁垒，我们针对初创及成长企业提供高透明度、精细配置的技术方案。
            </p>
          </div>

          {/* Solution Selector tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-4xl mx-auto">
            {SOLUTIONS.map((sol) => (
              <button
                key={sol.id}
                onClick={() => setActiveSolution(sol.id)}
                className={`px-4 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeSolution === sol.id 
                    ? 'bg-white text-black font-semibold shadow-xl shadow-white/5' 
                    : 'bg-white/[0.01] border border-white/5 hover:border-white/10 text-neutral-400 hover:text-white'
                }`}
              >
                {sol.title}
              </button>
            ))}
          </div>

          {/* Active Solution blueprint layout */}
          <AnimatePresence mode="wait">
            {SOLUTIONS.map((sol) => {
              if (sol.id !== activeSolution) return null;
              return (
                <motion.div
                  key={sol.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="glass-panel p-6 sm:p-8 lg:p-10 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Solution Intro block */}
                    <div className="lg:col-span-5 space-y-6">
                      <div className="inline-flex p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                        {renderIcon(sol.id === 'startup-pkg' ? 'Zap' : sol.id === 'enterprise-ai' ? 'Cpu' : sol.id === 'brand-ad' ? 'Layers' : 'Cloud', "h-6 w-6")}
                      </div>

                      <div className="space-y-2">
                        <span className="text-[10px] font-mono text-neutral-500 block uppercase tracking-wider">{sol.subtitle}</span>
                        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">{sol.title}</h3>
                        <p className="text-xs font-semibold text-blue-400 bg-blue-950/15 border border-blue-900/30 rounded-md px-3 py-1.5 inline-block">
                          {sol.target}
                        </p>
                      </div>

                      <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                        {sol.description}
                      </p>

                      <div className="pt-4">
                        <a 
                          href="#contact" 
                          onClick={(e) => handleSmoothScroll(e, 'contact')}
                          className="text-xs text-white font-semibold flex items-center gap-1 hover:text-blue-400 transition-colors"
                        >
                          <span>索取此方案案例与服务报价</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>

                    {/* Solution Features checklist */}
                    <div className="lg:col-span-7 bg-black/40 border border-white/5 rounded-xl p-6 sm:p-8 space-y-6">
                      <h4 className="text-xs font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        模块交付体系 (Standard Module Specs)
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {sol.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-3 bg-white/[0.01] border border-white/5 rounded-lg p-4">
                            <CheckCircle2 className="h-4.5 w-4.5 text-blue-400 mt-0.5 shrink-0" />
                            <div className="space-y-0.5">
                              <span className="text-xs font-medium text-white block">{feat}</span>
                              <span className="text-[10px] text-neutral-500 block">符合国家信息安全标准规范</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Architecture pipeline illustration */}
                      <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg space-y-2">
                        <span className="text-[10px] font-mono text-neutral-500 block uppercase">精益交付工作流程:</span>
                        <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 overflow-x-auto gap-2 py-1">
                          <span className="bg-blue-950/20 px-2 py-1 rounded border border-blue-900/40 text-blue-300">1. 业务咨询与技术选型</span>
                          <ChevronRight className="h-3 w-3 shrink-0 text-neutral-700" />
                          <span className="bg-neutral-900 px-2 py-1 rounded border border-white/5">2. 敏捷开发/灰度测试</span>
                          <ChevronRight className="h-3 w-3 shrink-0 text-neutral-700" />
                          <span className="bg-neutral-900 px-2 py-1 rounded border border-white/5">3. 信息安全审计/正式上线</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

        </div>
      </section>

      {/* About Us Module */}
      <section className="py-20 border-t border-white/5 relative overflow-hidden" id="about">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/5 rounded-full glow-blur" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Block: Narrative Copy */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[10px] font-mono tracking-widest text-blue-500 uppercase">About Us</span>
              <h2 className="text-3xl sm:text-4xl font-sans font-semibold tracking-tight text-white leading-tight">
                年轻、敏捷、面向未来的<br />数字科技服务团队
              </h2>
              
              <div className="space-y-4 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                <p>
                  广州市创与惟信息科技有限公司成立于2024年，位于广州市从化区。我们关注人工智能、互联网数据服务、软件开发、数字内容与品牌传播等方向，致力于为企业客户提供务实、高效、可落地的数字化服务。
                </p>
                <p>
                  我们深信，真正有价值的技术不只是炫技，而是帮助业务降低成本、提升效率、增强品牌表达。作为一个紧跟前沿技术趋势的新生代科技力量，我们摒弃层层外包的传统壁垒，由资深架构师直连项目需求，杜绝信息衰减。
                </p>
              </div>

              {/* Dynamic GZ local anchorage detail card */}
              <div className="p-4 bg-white/[0.01] border border-white/5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded bg-neutral-900 border border-white/5 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">根植广州，服务全国</span>
                    <span className="text-[10.5px] text-neutral-500 block">注册地: 广州市从化区江埔街河东南路426号315铺</span>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-[10.5px] text-neutral-400 block font-mono">法定代表人 (Founder)</span>
                  <span className="text-xs font-bold text-white block">潘惟 / Pan Wei</span>
                </div>
              </div>
            </div>

            {/* Right Block: Team Metrics / Core Identity cards */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
              
              {/* Card 1 */}
              <div className="glass-panel p-6 rounded-xl border border-white/5 space-y-3 bg-gradient-to-b from-blue-950/5 to-neutral-950">
                <Shield className="h-5 w-5 text-blue-400" />
                <h4 className="text-xs font-bold text-white">合规诚信体系</h4>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  企业经营完全遵循国家各项软件及广告等业务许可，数据合规、技术方案阳光透明。
                </p>
              </div>

              {/* Card 2 */}
              <div className="glass-panel p-6 rounded-xl border border-white/5 space-y-3 bg-gradient-to-b from-emerald-950/5 to-neutral-950">
                <Zap className="h-5 w-5 text-emerald-400" />
                <h4 className="text-xs font-bold text-white">敏捷技术直达</h4>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  剔除一切销售水分与冗长中间汇报，实现“需求提报直接对接核心研发团队”。
                </p>
              </div>

              {/* Card 3 */}
              <div className="glass-panel p-6 rounded-xl border border-white/5 space-y-3 bg-gradient-to-b from-amber-950/5 to-neutral-950">
                <DollarSign className="h-5 w-5 text-amber-400" />
                <h4 className="text-xs font-bold text-white">精益降本设计</h4>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  重点关注客户的ROI收益，拒绝过度设计，用高可复用的微服务组件缩短生产工期。
                </p>
              </div>

              {/* Card 4 */}
              <div className="glass-panel p-6 rounded-xl border border-white/5 space-y-3 bg-gradient-to-b from-indigo-950/5 to-neutral-950">
                <Briefcase className="h-5 w-5 text-indigo-400" />
                <h4 className="text-xs font-bold text-white">全流程项目托管</h4>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  从技术开发、广告制作到长期云外包接管，形成一站式数字化闭环服务。
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Core Advantages Module */}
      <section className="py-20 border-t border-white/5 bg-radial from-neutral-950/20 via-neutral-950 to-neutral-950" id="advantages">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-mono tracking-widest text-blue-500 uppercase">Advantages</span>
            <h2 className="text-3xl sm:text-4xl font-sans font-semibold tracking-tight text-white mt-2 mb-4">
              为什么选择创与惟科技
            </h2>
            <p className="text-sm text-neutral-400">
              我们不是单纯的代码搬运工，而是帮助业务降低成本、提升效率、增强品牌表达的数字伙伴。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: '技术与新锐创意完美嵌合',
                description: '绝不写没有审美体验的代码。我们让复杂的技术算法与品牌广告美学融会贯通，搭建好看、好用且安全的数字化入口。',
                metric: 'Aesthetic + Code',
                metricLabel: '美学与算力融合'
              },
              {
                title: '从战略咨询到落地运维的一体化服务',
                description: '从前期的技术路线咨询评估，到中期的系统研创与数字内容设计，再到后期的云平台托管，提供无断点的一站式流程支持。',
                metric: 'End-to-End',
                metricLabel: '全周期服务链路'
              },
              {
                title: '高度切合中小企业和创业团队',
                description: '我们深知初创公司的每一笔预算都弥足珍贵。不做技术绑架与过度冗余设计，用轻灵、敏捷、可扩展的模式开启数字化一小步。',
                metric: 'Agile Scale',
                metricLabel: '精益化迭代规模'
              },
              {
                title: '聚焦于实际成本与确切业务转化',
                description: '始终以您的业务效率与确切转化作为终极考核指标。所有技术路线设计均服务于“帮业务降低成本、提升效率”。',
                metric: 'ROI-Driven',
                metricLabel: '效能优先投资'
              },
              {
                title: '高度弹性的外包与数字内容代理',
                description: '可提供周、月、季度等高度灵活的软件外包、广告制作及云平台运营托管协议。支持按项目阶段自由调配工程负载。',
                metric: 'Flexible Load',
                metricLabel: '灵活弹性技术负载'
              },
              {
                title: '严苛的信息与系统安全保障',
                description: '专职安全软件团队支持网络安全机制验证。从网络协议、数据加密到多租户隔离，全面守护您和最终用户的资产。',
                metric: 'Enterprise Class',
                metricLabel: '网络安全规则保障'
              }
            ].map((adv, idx) => (
              <div 
                key={idx}
                className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/5 flex flex-col justify-between hover:border-blue-500/20 transition-colors"
              >
                <div className="space-y-4">
                  <span className="text-[10px] font-mono font-bold text-blue-400 tracking-wider block uppercase">{adv.metric}</span>
                  <h3 className="text-base font-semibold text-white tracking-tight">{adv.title}</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {adv.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5">
                  <span className="text-[10.5px] text-neutral-500 block">{adv.metricLabel}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Interactive Contact & Estimator Section */}
      <section className="py-20 border-t border-white/5 bg-[#030302]" id="contact">
        <InteractiveContact />

        {/* Corporate Base Info footer layout for credibility */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/5 grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-neutral-500 block uppercase tracking-wider">Corporate entity</span>
              <span className="text-sm font-semibold text-white block">广州市创与惟信息科技有限公司</span>
              <p className="text-xs text-neutral-400 leading-relaxed">
                正式注册并受法律保护的信息技术企业。专注于高质软件研发、广告设计制作、云外包及IT信息咨询。
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono text-neutral-500 block uppercase tracking-wider">Registered location</span>
              <span className="text-sm font-semibold text-white block">广州市从化区</span>
              <p className="text-xs text-neutral-400 leading-relaxed">
                广州市从化区江埔街河东南路426号315铺（一址多照）
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono text-neutral-500 block uppercase tracking-wider">Direct Connect channels</span>
              <div className="space-y-1 text-xs text-neutral-300">
                <p className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-blue-400" />
                  <span>咨询热线: 暂用在线配置器配置 (12小时内接洽)</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-blue-400" />
                  <span>企业邮箱: silongcen@gmail.com (潘惟直达)</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Award className="h-3.5 w-3.5 text-blue-400" />
                  <span>法定代表人: 潘惟 (潘总)</span>
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer Block */}
      <footer className="py-12 border-t border-white/5 bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Branding Column */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center">
                  <span className="text-white font-black text-[10px]">C</span>
                </div>
                <span className="text-sm font-bold text-white">创与惟科技 / CYW Tech</span>
              </div>
              
              <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
                「用技术连接商业，用创意表达价值。」<br />
                我们以务实合规、极速响应、高审美表现，陪伴各阶段创新者稳健前行。
              </p>

              <div className="pt-2">
                <span className="text-[10px] font-mono text-neutral-500 uppercase block">Enterprise ID (统一社会信用代码)</span>
                <span className="text-xs font-mono text-neutral-300">请参阅中国工商行政管理局注册底档 (2024年成立)</span>
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono text-neutral-400 uppercase tracking-wider">快速导航</h4>
              <ul className="space-y-2 text-xs text-neutral-400">
                <li><a href="#home" onClick={(e) => handleSmoothScroll(e, 'home')} className="hover:text-white transition-colors">回到首屏</a></li>
                <li><a href="#services" onClick={(e) => handleSmoothScroll(e, 'services')} className="hover:text-white transition-colors">核心服务能力</a></li>
                <li><a href="#solutions" onClick={(e) => handleSmoothScroll(e, 'solutions')} className="hover:text-white transition-colors">行业数字化方案</a></li>
                <li><a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className="hover:text-white transition-colors">关于创与惟</a></li>
              </ul>
            </div>

            {/* Compliance details Column */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono text-neutral-400 uppercase tracking-wider">业务及合规方向</h4>
              <ul className="space-y-1.5 text-[11px] text-neutral-500">
                <li>• 人工智能软件基础/应用算法开发</li>
                <li>• 信息系统集成与互联网数据服务</li>
                <li>• 数字创意内容制作与多端广告设计</li>
                <li>• 动漫及数字化游艺创意系统定制</li>
              </ul>
            </div>

          </div>

          <div className="pt-12 mt-12 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
            <p>© 2024-2026 广州市创与惟信息科技有限公司. 版权所有. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span className="hover:text-white transition-colors cursor-pointer">服务条款 (Terms)</span>
              <span className="hover:text-white transition-colors cursor-pointer">隐私保护条例 (Privacy)</span>
              <span className="text-neutral-600">|</span>
              <span className="text-neutral-500">潘惟 团队技术设计支撑</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Service Blueprints Expandable Drawer (Micromodal) */}
      <AnimatePresence>
        {activeService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop blurring blur overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveService(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            />

            {/* Dialog Panel content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, type: 'spring' }}
              className="relative w-full max-w-lg glass-panel rounded-2xl border border-white/10 p-6 sm:p-8 shadow-2xl bg-neutral-950 z-10 overflow-hidden"
            >
              {/* Border accents */}
              <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500" />
              
              {/* Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                    {renderIcon(activeService.icon, "h-5 w-5")}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-neutral-500 tracking-wider uppercase">Capability Deep-Dive</span>
                    <h3 className="text-base font-bold text-white tracking-tight">{activeService.title}</h3>
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={() => setActiveService(null)}
                  className="p-1.5 rounded-lg bg-white/[0.02] border border-white/5 text-neutral-400 hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Body explanation details checklist */}
              <div className="py-6 space-y-4">
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {activeService.description}
                </p>

                <div className="space-y-3">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">CYW 实施交付细则:</span>
                  <div className="space-y-2">
                    {activeService.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2.5 text-xs text-neutral-200">
                        <CheckCircle2 className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
                        <span className="leading-relaxed">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer action buttons */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-4">
                <span className="text-[10px] font-mono text-neutral-500">100% 敏捷透明交付</span>
                <button
                  type="button"
                  onClick={() => {
                    setActiveService(null);
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>立即以此方向订制方案</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
