import React from 'react';
import { motion } from 'motion/react';
import { Brain, Sparkles, Cpu, TrendingUp, ChevronRight, Zap } from 'lucide-react';

export const AIFeed: React.FC = () => {
  const actions = [
    { id: 'create-idea', title: 'Criar Ideia', desc: 'Gere conceitos disruptivos baseados em tendências globais.', icon: Sparkles, color: 'text-unihia-accent' },
    { id: 'build-startup', title: 'Construir Startup', desc: 'Orquestre o MVP e a estrutura inicial do seu negócio.', icon: Zap, color: 'text-emerald-400' },
    { id: 'generate-code', title: 'Gerar Código', desc: 'Produza ativos técnicos de alta fidelidade instantaneamente.', icon: Cpu, color: 'text-blue-400' },
    { id: 'analyze-market', title: 'Analisar Mercado', desc: 'Obtenha insights profundos e predições de cenários.', icon: TrendingUp, color: 'text-indigo-400' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-6 pt-24 pb-32 space-y-10"
    >
      <div className="flex items-end justify-between">
        <div className="space-y-1.5">
          <h2 className="text-4xl font-serif italic font-bold text-white leading-none tracking-tight">AI Feed</h2>
          <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-black">Orquestração de Inteligência</p>
        </div>
        <div className="p-2.5 bg-unihia-accent/10 rounded-2xl border border-unihia-accent/20">
          <Brain className="text-unihia-accent" size={18} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {actions.map((action) => (
          <motion.div 
            key={action.id} 
            whileHover={{ scale: 1.02 }}
            className="glass-card p-7 flex items-center gap-7 group relative overflow-hidden cursor-pointer"
          >
            <div className="w-16 h-16 bg-white/[0.02] rounded-2xl flex items-center justify-center border border-white/[0.05] group-hover:border-unihia-accent/30 transition-all duration-500">
              <action.icon className={`${action.color} group-hover:scale-110 transition-transform duration-500`} size={32} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2.5 mb-1.5">
                <h3 className="text-white font-bold text-lg tracking-tight">{action.title}</h3>
                <span className="text-[7px] uppercase tracking-[0.2em] px-2 py-0.5 rounded-full font-black bg-unihia-accent/10 text-unihia-accent border border-unihia-accent/20">
                  IA Ativa
                </span>
              </div>
              <p className="text-zinc-500 text-xs leading-relaxed font-medium">{action.desc}</p>
            </div>
            <ChevronRight className="text-zinc-800 group-hover:text-unihia-accent transition-colors" size={20} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
