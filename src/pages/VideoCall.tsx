import React from 'react';
import { motion } from 'motion/react';
import { Video, Mic, MicOff, VideoOff, PhoneOff, Users, Share2, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const VideoCall: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-unihia-dark z-50 flex flex-col p-6 space-y-8"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-unihia-accent/10 rounded-xl flex items-center justify-center border border-unihia-accent/20">
            <Video className="text-unihia-accent" size={20} />
          </div>
          <div className="space-y-0.5">
            <h2 className="text-white font-bold text-sm tracking-tight">Reunião de Orquestração</h2>
            <p className="text-zinc-500 text-[9px] uppercase tracking-widest font-black">4 Participantes</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-3 bg-white/5 rounded-2xl border border-white/10 text-white hover:text-unihia-accent transition-colors">
            <Share2 size={18} />
          </button>
          <button className="p-3 bg-white/5 rounded-2xl border border-white/10 text-white hover:text-unihia-accent transition-colors">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="glass-card relative overflow-hidden flex items-center justify-center group">
            <div className="absolute inset-0 bg-gradient-to-br from-unihia-accent/10 to-orange-900/10 opacity-40" />
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
              <Users size={32} className="text-zinc-700" />
            </div>
            <div className="absolute bottom-4 left-4 flex items-center gap-2 px-2 py-1 bg-black/50 backdrop-blur-xl rounded-lg border border-white/10">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[9px] text-white font-bold uppercase tracking-widest">Participante {i}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 pb-12">
        <button className="p-5 bg-white/5 rounded-3xl border border-white/10 text-white hover:bg-white/10 transition-colors">
          <Mic size={24} />
        </button>
        <button className="p-5 bg-white/5 rounded-3xl border border-white/10 text-white hover:bg-white/10 transition-colors">
          <Video size={24} />
        </button>
        <button 
          onClick={() => navigate(-1)}
          className="p-5 bg-red-500 rounded-3xl text-black hover:bg-red-600 transition-colors shadow-xl shadow-red-500/20"
        >
          <PhoneOff size={24} />
        </button>
      </div>
    </motion.div>
  );
};
