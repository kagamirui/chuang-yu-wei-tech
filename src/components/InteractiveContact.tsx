/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  Sparkles, 
  Calendar, 
  DollarSign, 
  FileText, 
  Send, 
  CheckCircle2, 
  Copy, 
  HelpCircle,
  Briefcase,
  PhoneCall,
  Mail,
  User,
  Building,
  ArrowRight
} from 'lucide-react';
import { ProjectConfig } from '../types';

// Defined list of options matching the company registration capabilities
const SERVICE_OPTIONS = [
  { id: 'ai', label: '人工智能软件开发', desc: '智能Agent、大模型微调、自动化算法' },
  { id: 'consult', label: '信息技术咨询 & 技术服务', desc: 'IT战略规划、架构评估、技术路线咨询' },
  { id: 'network', label: '网络技术 & 数据服务', desc: '高性能Web系统、数据存储处理、信息安全' },
  { id: 'outsource', label: '软件外包 & 云平台外包', desc: '全栈软件外包、基于云的长期代运营' },
  { id: 'creative', label: '数字内容与品牌设计', desc: '广告设计制作、数字内容包装、视觉资产' },
  { id: 'game', label: '动漫游戏开发', desc: '数字文化创意软件、互动游艺动漫开发' },
];

const TIMELINE_OPTIONS = [
  { id: 'fast', label: '敏捷交付 (1 - 3周)', desc: '聚焦核心MVP，迅速占领市场' },
  { id: 'standard', label: '标准研创 (1 - 3个月)', desc: '深度架构开发，完备系统上线' },
  { id: 'longterm', label: '长期联合创研支持', desc: '敏捷外包、按季/月度滚动迭代' },
];

const BUDGET_OPTIONS = [
  { id: 'tier1', label: '高效务实级 (1万 - 3万)', desc: '最优化资源，低门槛高产出' },
  { id: 'tier2', label: '企业标准级 (3万 - 10万)', desc: '定制化高质开发，满足业务规模' },
  { id: 'tier3', label: '深度自研级 (10万以上)', desc: '全模块打通，定制核心技术资产' },
  { id: 'tier4', label: '按需外包/咨询年签', desc: '极具性价比的长期驻场/云端外包' },
];

export default function InteractiveContact() {
  const [config, setConfig] = useState<ProjectConfig>({
    selectedServices: ['ai'],
    timeline: 'standard',
    budgetRange: 'tier2',
    companyName: '',
    contactPerson: '',
    contactInfo: '',
    needsDescription: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [submissionTicket, setSubmissionTicket] = useState('');
  const [activeTab, setActiveTab] = useState<'form' | 'proposals'>('form');

  // Multi-select handler
  const handleServiceToggle = (id: string) => {
    setConfig(prev => {
      const exists = prev.selectedServices.includes(id);
      let nextServices = [...prev.selectedServices];
      if (exists) {
        // Keep at least one selected
        if (nextServices.length > 1) {
          nextServices = nextServices.filter(s => s !== id);
        }
      } else {
        nextServices.push(id);
      }
      return { ...prev, selectedServices: nextServices };
    });
  };

  // Real-time tailored roadmap proposal generator
  const generatedProposal = useMemo(() => {
    const { selectedServices, timeline, budgetRange, companyName, contactPerson } = config;

    // Build milestones
    let milestoneWeeks = [2, 4, 8, 12];
    if (timeline === 'fast') milestoneWeeks = [1, 2, 3, 4];
    if (timeline === 'longterm') milestoneWeeks = [4, 8, 12, 16];

    const servicesStr = selectedServices.map(s => {
      const found = SERVICE_OPTIONS.find(opt => opt.id === s);
      return found ? `「${found.label}」` : '';
    }).join(', ');

    // Architectural analysis
    let techStack = 'Next.js / React (TypeScript) + Node.js (Express) / Serverless';
    if (selectedServices.includes('ai')) {
      techStack = 'Gemini Pro / Claude API SDK + Python FastStream / Express Server + LangChain + VectorDB';
    } else if (selectedServices.includes('game')) {
      techStack = 'Pixi.js / Three.js Canvas API + React UI Shell + Vite Ecosystem';
    }

    // Cost performance advice
    let suggestionText = '';
    if (budgetRange === 'tier1') {
      suggestionText = '建议采取MVP模式，首期重点开发核心智能化逻辑或核心网页，将数字内容资源集中在主要触点上。';
    } else if (budgetRange === 'tier2') {
      suggestionText = '具备充足的深度开发空间。建议实施模块化微服务解耦，配置健全的数据持久化/安全防护措施，并在两阶段内进行灰度发布测试。';
    } else {
      suggestionText = '适合进行端到端全链路定制。建议创与惟科技团队为您配备专属敏捷项目组，提供包括AI模型优化、定制系统开发及持续云业务托管在内的一站式全栈服务。';
    }

    return {
      title: `${companyName || '您的企业'} 数字化升级专案初始方案建议书`,
      date: new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }),
      version: 'v1.0 (实时规划草案)',
      architect: 'Pan Wei (创与惟 - 数字化架构委员会)',
      objectives: `整合 ${servicesStr} 核心能力，打造安全、稳定、极具商业转化能力的数字化基础设施。`,
      phases: [
        { name: 'Phase 1: 需求锚定与原型咨询', duration: `${milestoneWeeks[0]}周`, deliverable: '交互原型、信息技术咨询书、技术栈选型报告' },
        { name: 'Phase 2: 核心系统/AI/数字内容创制', duration: `${milestoneWeeks[1]}周`, deliverable: '前后端功能对齐、首版UI视觉、AI底层链条部署' },
        { name: 'Phase 3: 联调与测试验收', duration: `${milestoneWeeks[2]}周`, deliverable: '压力测试、网络信息安全规则验证、业务全链路打通' },
        { name: 'Phase 4: 交付与长期云托管保障', duration: `${milestoneWeeks[3]}周`, deliverable: '系统正式部署、数据仓库初始化、云业务平稳外包接管' }
      ],
      technology: techStack,
      costStrategy: suggestionText,
      contact: contactPerson || '负责人'
    };
  }, [config]);

  const handleCopy = () => {
    const text = `
=== ${generatedProposal.title} ===
生成日期: ${generatedProposal.date} | 版本: ${generatedProposal.version}
首席规划师: ${generatedProposal.architect}

【项目总览】
${generatedProposal.objectives}

【核心实施里程碑】
${generatedProposal.phases.map((p, i) => `${i + 1}. ${p.name} (时长: ${p.duration})
   交付件: ${p.deliverable}`).join('\n')}

【技术选型支撑】
${generatedProposal.technology}

【精益成本策略】
${generatedProposal.costStrategy}

--- 广州市创与惟信息科技有限公司 联合规划设计团队 ---
地址: 广州市从化区江埔街河东南路426号315铺
    `;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!config.contactInfo) {
      alert('请填写有效的联系方式 (微信/手机/邮箱)，以便我们为您发出正式方案！');
      return;
    }

    // Simulate high-fidelity system ticket assignment
    const randomID = `CYW-REQ-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmissionTicket(randomID);
    setSubmitted(true);
  };

  return (
    <div className="w-full relative py-8 px-4 sm:px-6 lg:px-8" id="interactive-pricing-builder">
      {/* Dynamic background decoration */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full glow-blur" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full glow-blur" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-4">
            <Sparkles className="h-3 w-3" />
            <span>智能专案配置器</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-sans font-semibold tracking-tight text-white mb-4">
            让您的数字化项目，从一个清晰方案开始
          </h2>
          <p className="max-w-2xl mx-auto text-sm text-neutral-400 leading-relaxed">
            选择您的具体业务诉求与目标，创与惟系统将为您生成专属的数字化落地方案蓝图。您可以一键导出方案，或直接提交获得潘惟核心设计团队的深度对谈。
          </p>
        </div>

        {/* Tab Selector (for responsive friendliness on smaller viewports) */}
        <div className="flex md:hidden justify-center mb-6">
          <div className="inline-flex p-1 rounded-lg bg-neutral-900 border border-neutral-800">
            <button
              onClick={() => setActiveTab('form')}
              className={`px-4 py-2 text-xs font-medium rounded-md transition-colors ${activeTab === 'form' ? 'bg-blue-600 text-white' : 'text-neutral-400'}`}
            >
              配置需求
            </button>
            <button
              onClick={() => setActiveTab('proposals')}
              className={`px-4 py-2 text-xs font-medium rounded-md transition-colors ${activeTab === 'proposals' ? 'bg-blue-600 text-white' : 'text-neutral-400'}`}
            >
              实时方案预览
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel: Configurator Form */}
          <div className={`lg:col-span-7 space-y-6 ${activeTab === 'form' ? 'block' : 'hidden md:block'}`}>
            <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/5 space-y-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-[4px] h-full bg-blue-600" />
              
              {/* Part 1: Service Capabilities */}
              <div>
                <label className="text-sm font-medium text-neutral-200 flex items-center gap-2 mb-3">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-mono font-bold">1</span>
                  选择需要的数字技术与创意服务 (多选)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SERVICE_OPTIONS.map((opt) => {
                    const isSelected = config.selectedServices.includes(opt.id);
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleServiceToggle(opt.id)}
                        className={`text-left p-4 rounded-xl border transition-all relative ${
                          isSelected 
                            ? 'bg-blue-950/20 border-blue-500/40 shadow-[0_0_15px_-3px_rgba(59,130,246,0.2)]' 
                            : 'bg-white/[0.01] border-white/5 hover:border-white/10'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-xs font-medium text-white block">{opt.label}</span>
                          <span className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                            isSelected ? 'bg-blue-600 border-blue-500 text-white' : 'border-neutral-700'
                          }`}>
                            {isSelected && <Check className="h-2.5 w-2.5 stroke-[4]" />}
                          </span>
                        </div>
                        <span className="text-[10.5px] text-neutral-400 block mt-1 leading-normal">{opt.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Part 2: Timeline & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-neutral-200 flex items-center gap-2 mb-3">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-mono font-bold">2</span>
                    预期的项目开发周期
                  </label>
                  <div className="space-y-2">
                    {TIMELINE_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setConfig(prev => ({ ...prev, timeline: opt.id }))}
                        className={`w-full text-left p-3 rounded-lg border text-xs flex items-center justify-between transition-colors ${
                          config.timeline === opt.id 
                            ? 'bg-blue-950/10 border-blue-500/30 text-white' 
                            : 'bg-white/[0.01] border-white/5 text-neutral-300 hover:border-white/10'
                        }`}
                      >
                        <div>
                          <span className="font-medium block">{opt.label}</span>
                          <span className="text-[10px] text-neutral-400 block mt-0.5">{opt.desc}</span>
                        </div>
                        <div className={`h-3 w-3 rounded-full border-2 ${config.timeline === opt.id ? 'bg-blue-600 border-blue-400' : 'border-neutral-700'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-neutral-200 flex items-center gap-2 mb-3">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-mono font-bold">3</span>
                    项目资源配置及预算区间
                  </label>
                  <div className="space-y-2">
                    {BUDGET_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setConfig(prev => ({ ...prev, budgetRange: opt.id }))}
                        className={`w-full text-left p-3 rounded-lg border text-xs flex items-center justify-between transition-colors ${
                          config.budgetRange === opt.id 
                            ? 'bg-blue-950/10 border-blue-500/30 text-white' 
                            : 'bg-white/[0.01] border-white/5 text-neutral-300 hover:border-white/10'
                        }`}
                      >
                        <div>
                          <span className="font-medium block">{opt.label}</span>
                          <span className="text-[10px] text-neutral-400 block mt-0.5">{opt.desc}</span>
                        </div>
                        <div className={`h-3 w-3 rounded-full border-2 ${config.budgetRange === opt.id ? 'bg-blue-600 border-blue-400' : 'border-neutral-700'}`} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Part 3: Client Details */}
              <div className="space-y-4">
                <label className="text-sm font-medium text-neutral-200 flex items-center gap-2">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-mono font-bold">4</span>
                  填写联系人与企业基本信息
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                    <input
                      type="text"
                      placeholder="公司或组织名称"
                      value={config.companyName}
                      onChange={e => setConfig(prev => ({ ...prev, companyName: e.target.value }))}
                      className="w-full text-xs text-white pl-10 pr-4 py-3 bg-white/[0.01] border border-white/5 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white/[0.02] transition-colors"
                    />
                  </div>

                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                    <input
                      type="text"
                      placeholder="您的姓名 (如潘总、陈工)"
                      value={config.contactPerson}
                      onChange={e => setConfig(prev => ({ ...prev, contactPerson: e.target.value }))}
                      className="w-full text-xs text-white pl-10 pr-4 py-3 bg-white/[0.01] border border-white/5 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white/[0.02] transition-colors"
                    />
                  </div>
                </div>

                <div className="relative">
                  <PhoneCall className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                  <input
                    type="text"
                    required
                    placeholder="联系方式: 手机号 / 微信 / 邮箱 (必填 *)"
                    value={config.contactInfo}
                    onChange={e => setConfig(prev => ({ ...prev, contactInfo: e.target.value }))}
                    className="w-full text-xs text-white pl-10 pr-4 py-3 bg-white/[0.01] border border-white/5 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white/[0.02] transition-colors"
                  />
                </div>

                <div className="relative">
                  <textarea
                    rows={3}
                    placeholder="简述您的主要数字化诉求、目前的业务痛点、或想要攻关的技术难点 (如希望利用人工智能自动分析客服记录)"
                    value={config.needsDescription}
                    onChange={e => setConfig(prev => ({ ...prev, needsDescription: e.target.value }))}
                    className="w-full text-xs text-white p-4 bg-white/[0.01] border border-white/5 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white/[0.02] transition-colors resize-none leading-relaxed"
                  />
                </div>
              </div>

              {/* Submit panel */}
              <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-neutral-400">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>我们将严格保护您的项目信息不被公开或泄露。</span>
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-blue-500/20"
                >
                  <span>立即递交咨询意向</span>
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </form>
          </div>

          {/* Right panel: Live Roadmap Proposal Preview */}
          <div className={`lg:col-span-5 ${activeTab === 'proposals' ? 'block' : 'hidden md:block'}`}>
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="proposal-draft"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/5 space-y-6 shadow-2xl relative bg-radial from-blue-950/5 via-neutral-950 to-neutral-950"
                >
                  {/* Digital Roadmap Header */}
                  <div className="border-b border-white/5 pb-4 flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <FileText className="h-4 w-4 text-blue-400" />
                        <span className="text-[10px] font-mono tracking-widest text-blue-400 uppercase">Interactive Draft</span>
                      </div>
                      <h3 className="text-base font-semibold text-white tracking-tight">{generatedProposal.title}</h3>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopy}
                      title="复制完整文本"
                      className="p-2 rounded bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.05] transition-colors text-neutral-400 hover:text-white"
                    >
                      {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>

                  {/* Document Metadata block */}
                  <div className="grid grid-cols-2 gap-4 p-3 bg-white/[0.01] border border-white/5 rounded-lg text-[10.5px] font-mono">
                    <div>
                      <span className="text-neutral-500 block">生成日期</span>
                      <span className="text-neutral-300">{generatedProposal.date}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block">技术架构委员会</span>
                      <span className="text-neutral-300">{generatedProposal.architect}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block">项目状态</span>
                      <span className="text-amber-400">规划草拟中</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block">文档版本</span>
                      <span className="text-blue-400">{generatedProposal.version}</span>
                    </div>
                  </div>

                  {/* Objective */}
                  <div className="space-y-2">
                    <span className="text-xs font-medium text-neutral-300 block">核心改造宗旨</span>
                    <p className="text-xs text-neutral-400 leading-relaxed bg-white/[0.01] p-3 rounded border border-white/5">
                      {generatedProposal.objectives}
                    </p>
                  </div>

                  {/* Milestones timeline */}
                  <div className="space-y-3">
                    <span className="text-xs font-medium text-neutral-300 block">精益敏捷实施里程碑</span>
                    <div className="relative pl-4 border-l border-neutral-800 space-y-4">
                      {generatedProposal.phases.map((phase, idx) => (
                        <div key={idx} className="relative text-xs">
                          <div className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-blue-500 border border-neutral-950" />
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-semibold text-white">{phase.name}</span>
                            <span className="font-mono text-[10px] text-blue-400 bg-blue-950/20 px-1.5 py-0.5 rounded border border-blue-900/30">{phase.duration}</span>
                          </div>
                          <p className="text-neutral-400 text-[10.5px] mt-0.5">{phase.deliverable}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Architectural support & costs strategy */}
                  <div className="grid grid-cols-1 gap-4 pt-2 border-t border-white/5">
                    <div className="space-y-1">
                      <span className="text-[11px] text-neutral-400 block font-semibold">推荐技术基栈 (CYW Certified)</span>
                      <span className="text-xs font-mono text-neutral-300 block bg-neutral-900 p-2 rounded border border-white/5">
                        {generatedProposal.technology}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[11px] text-neutral-400 block font-semibold">企业降本增效建议</span>
                      <p className="text-xs text-neutral-400 leading-relaxed bg-neutral-900/40 p-3 rounded border border-white/5">
                        {generatedProposal.costStrategy}
                      </p>
                    </div>
                  </div>

                  <div className="text-[10px] font-mono text-neutral-500 text-center border-t border-white/5 pt-3">
                    设计单位: 广州市创与唯信息科技有限公司
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="proposal-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, type: 'spring' }}
                  className="glass-panel p-8 rounded-2xl border border-emerald-500/20 bg-gradient-to-b from-emerald-950/10 via-neutral-950 to-neutral-950 text-center space-y-6 shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-emerald-500" />
                  
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-white">递交成功！创与唯设计团队已接单</h3>
                    <p className="text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed">
                      尊贵的 {config.companyName || config.contactPerson || '企业代表'}，感谢您向广州市创与唯科技提报数字化需求。我们的法定代表人潘惟及其专家团队将开启1对1评议。
                    </p>
                  </div>

                  {/* Assign high-fidelity request ticket details */}
                  <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl space-y-3 text-xs max-w-sm mx-auto">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="text-neutral-500">专属企划工单</span>
                      <span className="font-mono font-bold text-blue-400 tracking-wider">{submissionTicket}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="text-neutral-500">跟进时限</span>
                      <span className="text-emerald-400">4小时内 (专家电话回访)</span>
                    </div>
                    <div className="text-left text-[11px] text-neutral-400 pt-1 leading-relaxed">
                      潘惟团队正在依据您的工单匹配最优技术骨干。我们将在 2026-07-01 (今日) 内通过 <strong>{config.contactInfo}</strong> 与您建立专线对齐。
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                  >
                    <span>重新配置或修改需求</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
}
