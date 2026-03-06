import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, ChevronRight, Zap, TrendingUp, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Marketplace: React.FC = () => {
  const assets = [
    { id: '1', title: 'Startup Idea: Eco-Logistics', price: '$2,500', type: 'Startup Idea', rating: 5.0, desc: 'Full concept + market analysis for drone delivery.' },
    { id: '2', title: 'Prototype: Neural Fintech App', price: '$5,000', type: 'Prototype', rating: 4.9, desc: 'Functional React Native prototype with AI integration.' },
    { id: '3', title: 'Dataset: Varejo Brasil 2025', price: '$800', type: 'Dados', rating: 4.8, desc: 'Consumer behavior data for retail optimization.' },
    { id: '4', title: 'Concept: Smart AgroBot', price: '$1,200', type: 'Conceito', rating: 4.7, desc: 'Detailed design and technical specs for autonomous farming.' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-6 pt-24 pb-32 space-y-10"
    >
      <div className="flex items-end justify-between">
        <div className="space-y-1.5">
          <h2 className="text-4xl font-serif italic font-bold text-white leading-none tracking-tight">Marketplace</h2>
          <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-black">Adquira Ativos de Valor</p>
        </div>
        <div className="p-2.5 bg-unihia-accent/10 rounded-2xl border border-unihia-accent/20">
          <ShoppingBag className="text-unihia-accent" size={18} />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 flex items-center gap-4 bg-white/[0.02] border border-white/[0.05] rounded-2xl p-4">
          <Search size={18} className="text-zinc-600" />
          <input 
            type="text" 
            placeholder="Buscar ativos..." 
            className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-zinc-700 font-medium"
          />
        </div>
        <button className="p-4 bg-white/5 rounded-2xl border border-white/10 text-white hover:text-unihia-accent transition-colors">
          <Filter size={18} />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {assets.map((asset) => (
          <motion.div 
            key={asset.id} 
            whileHover={{ y: -4 }}
            className="glass-card p-6 group cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-unihia-accent/20 group-hover:bg-unihia-accent transition-colors" />
            <div className="flex justify-between items-center mb-5">
              <span className="px-2.5 py-1 bg-white/[0.03] text-[9px] uppercase tracking-widest text-zinc-400 font-black rounded-lg border border-white/[0.05]">
                {asset.type}
              </span>
              <div className="flex items-center gap-1 px-2 py-1 bg-white/5 rounded-lg border border-white/10">
                <TrendingUp size={10} className="text-unihia-accent" />
                <span className="text-[10px] font-bold text-white">{asset.rating}</span>
              </div>
            </div>
            <h3 className="text-xl font-medium text-white mb-6 group-hover:text-unihia-accent transition-colors leading-tight tracking-tight">
              {asset.title}
            </h3>
            <div className="flex items-center justify-between pt-5 border-t border-white/[0.04]">
              <span className="text-lg font-mono font-bold text-emerald-400">{asset.price}</span>
              <button className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-white transition-colors">
                Ver Detalhes <ChevronRight size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
