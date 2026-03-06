import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronLeft, Share2, Bookmark, Zap, TrendingUp, Users } from 'lucide-react';

export const ProjectDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-unihia-dark pb-32"
    >
      {/* Hero / Cover */}
      <div className="h-64 bg-gradient-to-br from-unihia-accent/20 to-orange-900/20 relative">
        <div className="absolute inset-0 bg-black/40" />
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-20 left-6 p-3 bg-black/50 backdrop-blur-xl rounded-2xl border border-white/10 text-white hover:text-unihia-accent transition-colors z-10"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="absolute top-20 right-6 flex gap-2 z-10">
          <button className="p-3 bg-black/50 backdrop-blur-xl rounded-2xl border border-white/10 text-white hover:text-unihia-accent transition-colors">
            <Share2 size={20} />
          </button>
          <button className="p-3 bg-black/50 backdrop-blur-xl rounded-2xl border border-white/10 text-white hover:text-unihia-accent transition-colors">
            <Bookmark size={20} />
          </button>
        </div>
      </div>

      <div className="px-6 -mt-12 relative z-10 space-y-8">
        <div className="glass-card p-8 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-unihia-accent/10 text-[9px] uppercase tracking-widest text-unihia-accent font-black rounded-lg border border-unihia-accent/20">
                Tecnologia
              </span>
              <span className="text-[10px] text-emerald-400 font-mono font-bold flex items-center gap-1">
                <TrendingUp size={10} /> +12% Trend
              </span>
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Projeto Alpha: {id}</h1>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Uma solução disruptiva de orquestração de dados para o setor logístico em mercados emergentes.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 py-6 border-y border-white/[0.04]">
            <div className="text-center space-y-1">
              <p className="text-[8px] text-zinc-600 uppercase font-black tracking-widest">Match</p>
              <p className="text-lg font-mono font-bold text-unihia-accent">98%</p>
            </div>
            <div className="text-center space-y-1">
              <p className="text-[8px] text-zinc-600 uppercase font-black tracking-widest">Equipe</p>
              <p className="text-lg font-mono font-bold text-white">12</p>
            </div>
            <div className="text-center space-y-1">
              <p className="text-[8px] text-zinc-600 uppercase font-black tracking-widest">Fase</p>
              <p className="text-lg font-mono font-bold text-emerald-400">MVP</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 font-black">Visão Geral</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Este projeto utiliza a Tríade de IA da Unihia para processar grandes volumes de dados em tempo real, permitindo uma tomada de decisão 40% mais rápida. Atualmente em fase de testes fechados com parceiros estratégicos em Luanda e São Paulo.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <button className="w-full bg-unihia-accent text-black font-black py-5 rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl shadow-unihia-accent/10 uppercase tracking-widest text-[11px]">
            <Zap className="w-5 h-5" />
            <span>Investir no Projeto</span>
          </button>
          <button className="w-full bg-white/[0.02] border border-white/[0.05] text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-all uppercase tracking-widest text-[11px] hover:bg-white/[0.05]">
            <Users className="w-5 h-5" />
            <span>Candidatar-se à Equipe</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
