import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Video, ChevronRight, Search, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Messages: React.FC = () => {
  const conversations = [
    { id: '1', name: 'Unihia Ventures', lastMsg: 'Sua proposta foi aceita.', time: '5m atrás', unread: 2 },
    { id: '2', name: 'João Silva', lastMsg: 'Vamos marcar uma reunião?', time: '1h atrás', unread: 0 },
    { id: '3', name: 'Equipe Alpha', lastMsg: 'O MVP está pronto.', time: '3h atrás', unread: 0 },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-6 pt-24 pb-32 space-y-10"
    >
      <div className="flex items-end justify-between">
        <div className="space-y-1.5">
          <h2 className="text-4xl font-serif italic font-bold text-white leading-none tracking-tight">Mensagens</h2>
          <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-black">Conectando Ideias e Pessoas</p>
        </div>
        <div className="p-2.5 bg-unihia-accent/10 rounded-2xl border border-unihia-accent/20">
          <MessageSquare className="text-unihia-accent" size={18} />
        </div>
      </div>

      <div className="flex items-center gap-4 bg-white/[0.02] border border-white/[0.05] rounded-2xl p-4">
        <Search size={18} className="text-zinc-600" />
        <input 
          type="text" 
          placeholder="Buscar conversas..." 
          className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-zinc-700 font-medium"
        />
      </div>

      <div className="space-y-4">
        {conversations.map((conv) => (
          <Link key={conv.id} to={`/messages/${conv.id}`}>
            <motion.div 
              whileHover={{ x: 4 }}
              className="glass-card p-5 flex items-center gap-5 group cursor-pointer mb-4"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-unihia-accent to-orange-600 rounded-2xl p-0.5">
                <div className="w-full h-full bg-black rounded-[1.1rem] flex items-center justify-center overflow-hidden">
                  <Users size={24} className="text-unihia-accent" />
                </div>
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-center">
                  <h3 className="text-white font-bold text-sm tracking-tight">{conv.name}</h3>
                  <span className="text-[9px] text-zinc-600 font-medium">{conv.time}</span>
                </div>
                <p className="text-zinc-500 text-xs leading-relaxed truncate max-w-[180px]">{conv.lastMsg}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                {conv.unread > 0 && (
                  <span className="w-5 h-5 bg-unihia-accent text-black text-[10px] font-black rounded-full flex items-center justify-center">
                    {conv.unread}
                  </span>
                )}
                <ChevronRight className="text-zinc-800 group-hover:text-unihia-accent transition-colors" size={16} />
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      <Link to="/video-call">
        <button className="w-full bg-unihia-accent text-black font-black py-5 rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl shadow-unihia-accent/10 uppercase tracking-widest text-[11px]">
          <Video className="w-5 h-5" />
          <span>Iniciar Videochamada</span>
        </button>
      </Link>
    </motion.div>
  );
};
