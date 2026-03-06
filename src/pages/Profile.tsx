import React from 'react';
import { motion } from 'motion/react';
import { Users, ChevronRight, Settings, Bookmark, Bell, Star, Zap, Brain } from 'lucide-react';
import { useGamification } from '../GamificationContext';
import { GamificationWidget } from '../components/GamificationWidget';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export const Profile: React.FC = () => {
  const { awardPoints, unlockBadge } = useGamification();
  const { user, logout } = useAuth();
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-6 pt-24 pb-32 space-y-8"
    >
      <div className="flex justify-end gap-3">
        <Link to="/notifications" className="p-3 bg-white/5 rounded-2xl border border-white/10 text-zinc-500 hover:text-unihia-accent transition-colors">
          <Bell size={20} />
        </Link>
        <Link to="/saved" className="p-3 bg-white/5 rounded-2xl border border-white/10 text-zinc-500 hover:text-unihia-accent transition-colors">
          <Bookmark size={20} />
        </Link>
        <Link to="/settings" className="p-3 bg-white/5 rounded-2xl border border-white/10 text-zinc-500 hover:text-unihia-accent transition-colors">
          <Settings size={20} />
        </Link>
      </div>

      <div className="text-center space-y-4 mb-8">
        <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-unihia-accent to-orange-600 mx-auto p-1">
          <div className="w-full h-full rounded-[1.8rem] bg-black flex items-center justify-center overflow-hidden">
            <Users size={40} className="text-unihia-accent" />
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">{user?.name || 'Orquestrador'}</h2>
          <p className="text-zinc-500 text-xs uppercase tracking-widest font-black">Estrategista de Produto</p>
        </div>
      </div>

      <GamificationWidget />

      {/* Execution Metrics */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: 'Ideias Criadas', value: '24', icon: Brain, color: 'text-unihia-accent' },
          { label: 'Projetos Ativos', value: '08', icon: Zap, color: 'text-emerald-400' },
          { label: 'Colaborações', value: '12', icon: Users, color: 'text-blue-400' },
          { label: 'Reputação', value: '980', icon: Star, color: 'text-indigo-400' },
        ].map((stat) => (
          <div key={stat.label} className="glass-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <stat.icon size={16} className={stat.color} />
              <span className="text-xl font-mono font-bold text-white">{stat.value}</span>
            </div>
            <p className="text-[8px] text-zinc-600 uppercase font-black tracking-widest">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 space-y-4">
        <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 font-black">Simulador de Conquistas</h3>
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => awardPoints(10, 'Ação de teste')}
            className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-[10px] font-bold text-emerald-400 hover:bg-emerald-500/20 transition-colors"
          >
            Testar +10 XP
          </button>
          <button 
            onClick={() => unlockBadge('first_idea')}
            className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-[10px] font-bold text-indigo-400 hover:bg-indigo-500/20 transition-colors"
          >
            Testar Distintivo
          </button>
        </div>
      </div>

      <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 space-y-4">
        <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 font-black">Configurações da Conta</h3>
        <div className="space-y-2">
          <Link to="/settings" className="w-full p-4 bg-white/[0.03] rounded-2xl text-left text-sm font-medium hover:bg-white/[0.05] transition-colors flex items-center justify-between">
            <span>Privacidade e Segurança</span>
            <ChevronRight size={16} className="text-zinc-700" />
          </Link>
          <Link to="/settings" className="w-full p-4 bg-white/[0.03] rounded-2xl text-left text-sm font-medium hover:bg-white/[0.05] transition-colors flex items-center justify-between">
            <span>Notificações</span>
            <ChevronRight size={16} className="text-zinc-700" />
          </Link>
          <button 
            onClick={logout}
            className="w-full p-4 bg-red-500/10 rounded-2xl text-left text-sm font-bold text-red-400 hover:bg-red-500/20 transition-colors flex items-center justify-between"
          >
            <span>Sair da Conta</span>
            <ChevronRight size={16} className="text-red-900" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
