import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronLeft, Share2, Bookmark, Brain, TrendingUp, Zap } from 'lucide-react';

export const IdeaDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-unihia-dark pb-32"
    >
      <div className="p-6 pt-20 space-y-8">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="p-3 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 text-white hover:text-unihia-accent transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex gap-2">
            <button className="p-3 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 text-white hover:text-unihia-accent transition-colors">
              <Share2 size={20} />
            </button>
            <button className="p-3 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 text-white hover:text-unihia-accent transition-colors">
              <Bookmark size={20} />
            </button>
          </div>
        </div>

        <div className="glass-card p-8 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-unihia-accent/10 rounded-xl flex items-center justify-center border border-unihia-accent/20">
                <Brain className="text-unihia-accent" size={20} />
              </div>
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-black">Insight de IA #{id}</span>
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight leading-tight">
              Otimização de Cadeia de Suprimentos via Agentes Autônomos
            </h1>
          </div>

          <div className="bg-unihia-accent/5 border border-unihia-accent/10 p-6 rounded-3xl space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-zinc-500 text-[9px] uppercase tracking-widest font-black">Score de Viabilidade</span>
              <span className="text-unihia-accent font-mono text-2xl font-black">94/100</span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '94%' }}
                className="h-full bg-unihia-accent"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 font-black">Análise Estratégica</h3>
              <p className="text-zinc-300 text-sm leading-relaxed font-medium">
                Esta ideia foca na redução de latência em processos logísticos através da implementação de agentes de IA que negociam fretes e rotas de forma autônoma, sem intervenção humana direta.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white/[0.02] p-5 rounded-2xl border border-white/[0.04] space-y-2">
                <div className="flex items-center gap-2 text-emerald-400">
                  <TrendingUp size={14} />
                  <span className="text-[10px] uppercase font-black tracking-widest">Potencial de Mercado</span>
                </div>
                <p className="text-zinc-400 text-xs leading-relaxed">Alto crescimento projetado para os próximos 18 meses no setor de logística 4.0.</p>
              </div>
            </div>
          </div>
        </div>

        <button className="w-full bg-unihia-accent text-black font-black py-5 rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl shadow-unihia-accent/10 uppercase tracking-widest text-[11px]">
          <Zap className="w-5 h-5" />
          <span>Transformar em Projeto</span>
        </button>
      </div>
    </motion.div>
  );
};
