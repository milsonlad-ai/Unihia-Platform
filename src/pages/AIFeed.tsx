import React from 'react';
import { motion } from 'motion/react';
import { Brain, Sparkles, Cpu, TrendingUp, ChevronRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AIFeed: React.FC = () => {
  const aiConcepts = [
    { id: 'c1', title: 'Eco-Logistics Angola', category: 'Startup Idea', desc: 'Sistema de entrega via drones solares para áreas rurais.', trend: '+24%', type: 'Business' },
    { id: 'c2', title: 'Neural Fintech', category: 'Product Concept', desc: 'Cartão de crédito que ajusta limites via análise de comportamento em tempo real.', trend: '+18%', type: 'Tech' },
    { id: 'c3', title: 'AgroBot 4.0', category: 'Design Inspiration', desc: 'Robôs autônomos para colheita seletiva usando visão computacional.', trend: '+32%', type: 'Design' },
  ];

  const actions = [
    { id: 'create-idea', title: 'Criar Ideia', desc: 'Gere conceitos disruptivos baseados em tendências globais.', icon: Sparkles, color: 'text-unihia-accent', path: '/create-idea' },
    { id: 'build-startup', title: 'Construir Startup', desc: 'Orquestre o MVP e a estrutura inicial do seu negócio.', icon: Zap, color: 'text-emerald-400', path: '/ai/build-startup' },
    { id: 'generate-code', title: 'Gerar Código', desc: 'Produza ativos técnicos de alta fidelidade instantaneamente.', icon: Cpu, color: 'text-blue-400', path: '/ai/generate-code' },
    { id: 'analyze-market', title: 'Analisar Mercado', desc: 'Obtenha insights profundos e predições de cenários.', icon: TrendingUp, color: 'text-indigo-400', path: '/ai/analyze-market' },
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

      {/* AI Generated Concepts Section */}
      <div className="space-y-6">
        <p className="text-[10px] text-zinc-600 uppercase tracking-[0.2em] font-black px-2">Conceitos Gerados por IA</p>
        {aiConcepts.map((concept) => (
          <motion.div 
            key={concept.id}
            whileHover={{ y: -4 }}
            className="glass-card p-6 relative overflow-hidden group cursor-pointer"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-unihia-accent/20 group-hover:bg-unihia-accent transition-colors" />
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-1">
                <span className="text-[8px] text-unihia-accent uppercase tracking-widest font-black">{concept.category}</span>
                <h3 className="text-xl font-bold text-white group-hover:text-unihia-accent transition-colors tracking-tight">{concept.title}</h3>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono font-bold flex items-center gap-1">
                <TrendingUp size={10} /> {concept.trend}
              </span>
            </div>
            <p className="text-zinc-500 text-xs leading-relaxed mb-6">{concept.desc}</p>
            <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
              <button className="text-[9px] font-black uppercase tracking-widest text-unihia-accent hover:text-white transition-colors flex items-center gap-2">
                Converter em Projeto <ChevronRight size={12} />
              </button>
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                  <Cpu size={12} className="text-zinc-600" />
                </div>
                <div className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                  <Sparkles size={12} className="text-zinc-600" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6">
        <p className="text-[10px] text-zinc-600 uppercase tracking-[0.2em] font-black px-2">Ações de Orquestração</p>
        {actions.map((action) => (
          <Link key={action.id} to={action.path}>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="glass-card p-7 flex items-center gap-7 group relative overflow-hidden cursor-pointer mb-4"
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
          </Link>
        ))}
      </div>
    </motion.div>
  );
};
