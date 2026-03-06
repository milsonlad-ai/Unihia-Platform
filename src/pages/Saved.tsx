import React from 'react';
import { motion } from 'motion/react';
import { Bookmark, ChevronRight, Zap, TrendingUp, Video, Brain, Lightbulb, Folder } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Saved: React.FC = () => {
  const categories = [
    { id: 'ideas', title: 'Ideias', icon: Lightbulb, count: 12 },
    { id: 'projects', title: 'Projetos', icon: Folder, count: 5 },
    { id: 'videos', title: 'Vídeos', icon: Video, count: 24 },
    { id: 'inspirations', title: 'Inspirações', icon: Brain, count: 18 },
  ];

  const savedItems = [
    { id: '1', title: 'Dataset: Logística Angola', type: 'Ativo', date: '2 dias atrás', category: 'projects' },
    { id: '2', title: 'Ideia: Fintech de Microcrédito', type: 'Insight', date: '5 dias atrás', category: 'ideas' },
    { id: '3', title: 'Projeto: Alpha Neural', type: 'Projeto', date: '1 semana atrás', category: 'projects' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-6 pt-24 pb-32 space-y-10"
    >
      <div className="flex items-end justify-between">
        <div className="space-y-1.5">
          <h2 className="text-4xl font-serif italic font-bold text-white leading-none tracking-tight">Guardados</h2>
          <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-black">Organização Inteligente</p>
        </div>
        <div className="p-2.5 bg-unihia-accent/10 rounded-2xl border border-unihia-accent/20">
          <Bookmark className="text-unihia-accent" size={18} />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 gap-4">
        {categories.map((cat) => (
          <motion.div 
            key={cat.id}
            whileHover={{ y: -2 }}
            className="glass-card p-5 space-y-4 cursor-pointer group"
          >
            <div className="flex justify-between items-start">
              <div className="p-2 bg-white/5 rounded-xl border border-white/10 group-hover:border-unihia-accent/30 transition-colors">
                <cat.icon size={16} className="text-zinc-500 group-hover:text-unihia-accent transition-colors" />
              </div>
              <span className="text-xl font-mono font-bold text-white">{cat.count}</span>
            </div>
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-black group-hover:text-white transition-colors">{cat.title}</p>
          </motion.div>
        ))}
      </div>

      <div className="space-y-6">
        <p className="text-[10px] text-zinc-600 uppercase tracking-[0.2em] font-black px-2">Recentes</p>
        {savedItems.map((item) => (
          <Link key={item.id} to={item.type === 'Projeto' ? `/project/${item.id}` : `/idea/${item.id}`}>
            <motion.div 
              whileHover={{ y: -4 }}
              className="glass-card p-6 group cursor-pointer relative overflow-hidden mb-4"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-unihia-accent/20 group-hover:bg-unihia-accent transition-colors" />
              <div className="flex justify-between items-center mb-4">
                <span className="px-2.5 py-1 bg-white/[0.03] text-[9px] uppercase tracking-widest text-zinc-400 font-black rounded-lg border border-white/[0.05]">
                  {item.type}
                </span>
                <span className="text-[10px] text-zinc-600 font-medium">{item.date}</span>
              </div>
              <h3 className="text-xl font-medium text-white group-hover:text-unihia-accent transition-colors leading-tight tracking-tight">
                {item.title}
              </h3>
              <div className="flex items-center justify-end pt-4">
                <ChevronRight className="text-zinc-800 group-hover:text-unihia-accent transition-colors" size={20} />
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};
