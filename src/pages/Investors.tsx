import React from 'react';
import { motion } from 'motion/react';
import { Handshake, TrendingUp, ChevronRight, Star, ShieldCheck } from 'lucide-react';

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
        {investors.map((inv) => (
          <motion.div 
            key={inv.id} 
            whileHover={{ y: -4 }}
            className="glass-card p-6 group cursor-pointer relative overflow-hidden"
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
        ))}
      </div>
    </motion.div>
  );
};
