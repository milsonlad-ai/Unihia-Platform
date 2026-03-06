import React from 'react';
import { motion } from 'motion/react';
import { Handshake, TrendingUp, ChevronRight, Star, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Investors: React.FC = () => {
  const investors = [
    { id: 1, name: 'Unihia Ventures', focus: 'Deep Tech & AI', ticket: '$500k - $2M', rating: 4.9, verified: true },
    { id: 2, name: 'Angola Angel Network', focus: 'Emerging Markets', ticket: '$50k - $250k', rating: 4.7, verified: true },
    { id: 3, name: 'Global Orquestra Fund', focus: 'SaaS & Fintech', ticket: '$1M - $5M', rating: 4.8, verified: false },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 pt-24 pb-32 space-y-10"
    >
      <div className="flex items-end justify-between">
        <div className="space-y-1.5">
          <h2 className="text-4xl font-serif italic font-bold text-white leading-none tracking-tight">Investidores</h2>
          <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-black">Conectando Capital e Visão</p>
        </div>
        <div className="p-2.5 bg-unihia-accent/10 rounded-2xl border border-unihia-accent/20">
          <Handshake className="text-unihia-accent" size={18} />
        </div>
      </div>

      <div className="space-y-6">
        <p className="text-[10px] text-zinc-600 uppercase tracking-[0.2em] font-black px-2">Projetos em Captação</p>
        {[
          { id: 'p1', title: 'AgroBot Autonomous', ask: '$250k', equity: '10%', match: '98%', trend: '+45%' },
          { id: 'p2', title: 'Neural Fintech BR', ask: '$1.2M', equity: '15%', match: '92%', trend: '+28%' },
        ].map((project) => (
          <motion.div 
            key={project.id}
            whileHover={{ y: -4 }}
            className="glass-card p-6 relative overflow-hidden group cursor-pointer border-l-2 border-emerald-500/30"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-1">
                <span className="text-[8px] text-emerald-400 uppercase tracking-widest font-black">Seeking Investment</span>
                <h3 className="text-xl font-bold text-white group-hover:text-unihia-accent transition-colors tracking-tight">{project.title}</h3>
              </div>
              <div className="text-right">
                <p className="text-[8px] text-zinc-600 uppercase font-black">Ask</p>
                <p className="text-sm font-mono font-bold text-white">{project.ask}</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
              <div className="flex gap-4">
                <div className="space-y-0.5">
                  <p className="text-[7px] text-zinc-600 uppercase font-black">Equity</p>
                  <p className="text-[10px] font-bold text-zinc-400">{project.equity}</p>
                </div>
                <div className="space-y-0.5">
                  <p className="text-[7px] text-zinc-600 uppercase font-black">Match</p>
                  <p className="text-[10px] font-bold text-unihia-accent">{project.match}</p>
                </div>
              </div>
              <button className="text-[9px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors flex items-center gap-2">
                Analisar Métricas <ChevronRight size={12} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="space-y-6">
        <p className="text-[10px] text-zinc-600 uppercase tracking-[0.2em] font-black px-2">Principais Investidores</p>
        {investors.map((inv) => (
          <Link key={inv.id} to={`/profile/${inv.name.toLowerCase().replace(/\s+/g, '-')}`}>
            <motion.div 
              whileHover={{ y: -4 }}
              className="glass-card p-6 group cursor-pointer relative overflow-hidden mb-4"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-unihia-accent/20 group-hover:bg-unihia-accent transition-colors" />
              
              <div className="flex justify-between items-start mb-5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-unihia-accent transition-colors tracking-tight">
                      {inv.name}
                    </h3>
                    {inv.verified && <ShieldCheck size={14} className="text-unihia-accent" />}
                  </div>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-black">{inv.focus}</p>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 bg-white/5 rounded-lg border border-white/10">
                  <Star size={10} className="text-unihia-accent fill-current" />
                  <span className="text-[10px] font-bold text-white">{inv.rating}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-5 border-t border-white/[0.04]">
                <div className="space-y-1">
                  <p className="text-[8px] text-zinc-600 uppercase font-black tracking-widest">Ticket Médio</p>
                  <p className="text-sm font-mono font-bold text-emerald-400">{inv.ticket}</p>
                </div>
                <button className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-white transition-colors">
                  Ver Portfólio <ChevronRight size={14} />
                </button>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};
