import React from 'react';
import { motion } from 'motion/react';
import { Bell, Zap, TrendingUp, Users, MessageSquare } from 'lucide-react';

export const Notifications: React.FC = () => {
  const notifications = [
    { id: 1, title: 'Novo Match!', desc: 'Seu perfil deu match com o Projeto Alpha.', icon: Zap, color: 'text-unihia-accent', time: '5m atrás' },
    { id: 2, title: 'Mensagem Recebida', desc: 'Unihia Ventures enviou uma proposta.', icon: MessageSquare, color: 'text-blue-400', time: '1h atrás' },
    { id: 3, title: 'Tendência em Alta', desc: 'Logística 4.0 cresceu 15% hoje.', icon: TrendingUp, color: 'text-emerald-400', time: '3h atrás' },
    { id: 4, title: 'Novo Seguidor', desc: 'João Silva agora segue sua jornada.', icon: Users, color: 'text-indigo-400', time: '1d atrás' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-6 pt-24 pb-32 space-y-10"
    >
      <div className="flex items-end justify-between">
        <div className="space-y-1.5">
          <h2 className="text-4xl font-serif italic font-bold text-white leading-none tracking-tight">Notificações</h2>
          <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-black">Fique por dentro da Orquestração</p>
        </div>
        <div className="p-2.5 bg-unihia-accent/10 rounded-2xl border border-unihia-accent/20">
          <Bell className="text-unihia-accent" size={18} />
        </div>
      </div>

      <div className="space-y-4">
        {notifications.map((notif) => (
          <motion.div 
            key={notif.id} 
            whileHover={{ x: 4 }}
            className="glass-card p-5 flex items-start gap-5 group cursor-pointer"
          >
            <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:border-unihia-accent/30 transition-colors">
              <notif.icon className={notif.color} size={20} />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex justify-between items-center">
                <h3 className="text-white font-bold text-sm tracking-tight">{notif.title}</h3>
                <span className="text-[9px] text-zinc-600 font-medium">{notif.time}</span>
              </div>
              <p className="text-zinc-500 text-xs leading-relaxed">{notif.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
