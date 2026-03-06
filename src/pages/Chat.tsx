import React from 'react';
import { motion } from 'motion/react';
import { Users, ChevronRight, MessageSquare, Share2, Bookmark, Video } from 'lucide-react';
import { useGamification } from '../GamificationContext';
import { Link } from 'react-router-dom';

export const Chat: React.FC = () => {
  const { awardPoints } = useGamification();

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-6 pt-24 pb-32 space-y-10"
    >
      <div className="flex items-end justify-between">
        <div className="space-y-1.5">
          <h2 className="text-4xl font-serif italic font-bold text-white leading-none tracking-tight">Social</h2>
          <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-black">Insights da Rede Unihia</p>
        </div>
        <div className="flex gap-2">
          <Link to="/messages" className="p-2.5 bg-white/5 rounded-2xl border border-white/10 text-zinc-500 hover:text-unihia-accent transition-colors">
            <MessageSquare size={18} />
          </Link>
          <Link to="/video-call" className="p-2.5 bg-white/5 rounded-2xl border border-white/10 text-zinc-500 hover:text-unihia-accent transition-colors">
            <Video size={18} />
          </Link>
        </div>
      </div>
      
      <div className="bg-unihia-accent/5 border border-unihia-accent/20 p-6 rounded-3xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-unihia-accent flex items-center justify-center text-black">
            <Users size={20} />
          </div>
          <div>
            <h3 className="text-white font-bold text-sm">Formar Equipe</h3>
            <p className="text-zinc-500 text-[10px]">Encontre parceiros para seu projeto</p>
          </div>
          <button 
            onClick={() => awardPoints(50, 'Formou uma equipe')}
            className="ml-auto px-4 py-2 bg-unihia-accent text-black text-[10px] font-black uppercase rounded-xl active:scale-95 transition-all"
          >
            Começar
          </button>
        </div>
      </div>
      
      {[1, 2].map((i) => (
        <div key={i} className="glass-card p-6 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-unihia-accent to-orange-900 p-[1px]">
              <div className="w-full h-full rounded-2xl bg-black flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                  <Users size={20} className="text-zinc-700" />
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-white tracking-tight">Orquestrador #{i}42</p>
              <p className="text-[9px] text-zinc-500 uppercase tracking-widest font-black">Nível 4 • Estrategista</p>
            </div>
            <div className="ml-auto">
              <Link to={`/idea/${i}42`}>
                <button className="p-2 text-zinc-700 hover:text-unihia-accent transition-colors">
                  <ChevronRight size={18} />
                </button>
              </Link>
            </div>
          </div>
          <p className="text-zinc-300 text-sm leading-relaxed font-medium">
            Acabei de implementar o novo fluxo do Laboratório para análise de mercado imobiliário em Luanda. Os resultados são impressionantes. Alguém mais testando?
          </p>
          <div className="flex items-center gap-8 pt-5 border-t border-white/[0.04]">
            <button className="flex items-center gap-2 text-zinc-500 hover:text-unihia-accent transition-all group">
              <MessageSquare size={16} className="group-hover:scale-110 transition-transform" /> 
              <span className="text-[10px] font-black">12</span>
            </button>
            <button className="flex items-center gap-2 text-zinc-500 hover:text-unihia-accent transition-all group">
              <Share2 size={16} className="group-hover:scale-110 transition-transform" /> 
              <span className="text-[10px] font-black uppercase tracking-widest">Partilhar</span>
            </button>
            <button className="ml-auto text-zinc-500 hover:text-unihia-accent transition-all group">
              <Bookmark size={16} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      ))}
    </motion.div>
  );
};
