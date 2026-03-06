import React from 'react';
import { motion } from 'motion/react';
import { FlaskConical, Cpu, Brain, Sparkles, ChevronRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Tools: React.FC = () => {
  const tools = [
    { name: 'Gemini Vision', desc: 'Análise multimodal de ativos', icon: Sparkles, status: 'Online', color: 'text-blue-400', path: '/ai/analyze-market' },
    { name: 'Neural Predictor', desc: 'Previsão de tendências globais', icon: Brain, status: 'Online', color: 'text-emerald-400', path: '/ai/analyze-market' },
    { name: 'Auto-Executor', desc: 'Automação de fluxos de trabalho', icon: Cpu, status: 'Beta', color: 'text-unihia-accent', path: '/ai/generate-code' },
    { name: 'Market Analyzer', desc: 'Análise profunda de concorrência', icon: Zap, status: 'Online', color: 'text-orange-400', path: '/ai/analyze-market' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-6 pt-24 pb-32 space-y-12"
    >
      <div className="text-center space-y-4">
        <h2 className="text-5xl font-bold text-white tracking-tighter leading-none">Ferramentas</h2>
        <p className="text-zinc-500 text-sm max-w-[260px] mx-auto leading-relaxed">Orquestração de inteligência aplicada para resultados exponenciais.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {tools.map((tool) => (
          <Link key={tool.name} to={tool.path}>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="glass-card p-7 flex items-center gap-7 group relative overflow-hidden cursor-pointer mb-4"
            >
              <div className="w-16 h-16 bg-white/[0.02] rounded-2xl flex items-center justify-center border border-white/[0.05] group-hover:border-unihia-accent/30 transition-all duration-500">
                <tool.icon className={`${tool.color} group-hover:scale-110 transition-transform duration-500`} size={32} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <h3 className="text-white font-bold text-lg tracking-tight">{tool.name}</h3>
                  <span className={`text-[7px] uppercase tracking-[0.2em] px-2 py-0.5 rounded-full font-black ${tool.status === 'Online' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-unihia-accent/10 text-unihia-accent border border-unihia-accent/20'}`}>
                    {tool.status}
                  </span>
                </div>
                <p className="text-zinc-500 text-xs leading-relaxed font-medium">{tool.desc}</p>
              </div>
              <ChevronRight className="text-zinc-800 group-hover:text-unihia-accent transition-colors" size={20} />
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};
