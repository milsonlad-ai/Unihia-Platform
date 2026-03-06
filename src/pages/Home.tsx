import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, ChevronRight, Plus, MessageSquare, Video } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  const opportunities = [
    { id: 1, title: 'Expansão de Mercado: Angola', category: 'Negócios', match: '98%', time: '2h atrás', trend: '+12%', color: 'bg-blue-500' },
    { id: 2, title: 'Novo Algoritmo de IA Preditiva', category: 'Tecnologia', match: '92%', time: '5h atrás', trend: '+8%', color: 'bg-unihia-accent' },
    { id: 3, title: 'Parceria Estratégica: Fintech BR', category: 'Finanças', match: '85%', time: '1d atrás', trend: '+5%', color: 'bg-emerald-500' },
  ];

  const quickActions = [
    { label: 'Novo Projeto', icon: Plus, to: '/create-idea', color: 'bg-unihia-accent text-black' },
    { label: 'Chat Rápido', icon: MessageSquare, to: '/messages', color: 'bg-white/5 text-white' },
    { label: 'Call', icon: Video, to: '/video-call', color: 'bg-white/5 text-white' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 pt-24 pb-32 space-y-10"
    >
      {/* Quick Actions Bar */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {quickActions.map((action) => (
          <Link key={action.label} to={action.to} className="flex-shrink-0">
            <button className={`px-6 py-4 rounded-2xl flex items-center gap-3 font-black uppercase tracking-widest text-[10px] transition-all active:scale-95 border border-white/5 ${action.color}`}>
              <action.icon size={16} />
              {action.label}
            </button>
          </Link>
        ))}
      </div>

      <div className="flex items-end justify-between">
        <div className="space-y-1.5">
          <h2 className="text-4xl font-serif italic font-bold text-white leading-none tracking-tight">Radar</h2>
          <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-black">Oportunidades em Tempo Real</p>
        </div>
        <div className="p-2.5 bg-unihia-accent/10 rounded-2xl border border-unihia-accent/20">
          <TrendingUp className="text-unihia-accent" size={18} />
        </div>
      </div>
      
      <div className="space-y-6">
        {opportunities.map((opp) => (
          <Link key={opp.id} to={`/project/${opp.id}`}>
            <motion.div 
              whileHover={{ y: -4 }}
              className="glass-card p-6 group cursor-pointer relative overflow-hidden mb-6"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-unihia-accent/20 group-hover:bg-unihia-accent transition-colors" />
              
              <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-1 bg-white/[0.03] text-[9px] uppercase tracking-widest text-zinc-400 font-black rounded-lg border border-white/[0.05]">
                    {opp.category}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold flex items-center gap-1">
                    <TrendingUp size={10} /> {opp.trend}
                  </span>
                </div>
                <span className="text-[10px] text-zinc-600 font-medium">{opp.time}</span>
              </div>
              
              <h3 className="text-xl font-medium text-white mb-6 group-hover:text-unihia-accent transition-colors leading-tight tracking-tight">
                {opp.title}
              </h3>
              
              <div className="flex items-center justify-between pt-5 border-t border-white/[0.04]">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: opp.match }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className={`h-full ${opp.color} opacity-80`} 
                    />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-zinc-400 group-hover:text-unihia-accent transition-colors">{opp.match} Match</span>
                </div>
                <button className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-white transition-colors">
                  Analisar <ChevronRight size={14} />
                </button>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};
