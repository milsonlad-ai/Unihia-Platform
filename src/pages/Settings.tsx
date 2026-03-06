import React from 'react';
import { motion } from 'motion/react';
import { Settings as SettingsIcon, Bell, Shield, User, ChevronRight, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Settings: React.FC = () => {
  const { logout } = useAuth();

  const sections = [
    { title: 'Conta', icon: User, items: ['Editar Perfil', 'Alterar Senha', 'Preferências'] },
    { title: 'Notificações', icon: Bell, items: ['Push', 'E-mail', 'Atividade da Rede'] },
    { title: 'Segurança', icon: Shield, items: ['Autenticação em 2 Passos', 'Dispositivos Conectados'] },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-6 pt-24 pb-32 space-y-10"
    >
      <div className="flex items-end justify-between">
        <div className="space-y-1.5">
          <h2 className="text-4xl font-serif italic font-bold text-white leading-none tracking-tight">Definições</h2>
          <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-black">Personalize sua Orquestração</p>
        </div>
        <div className="p-2.5 bg-white/5 rounded-2xl border border-white/10">
          <SettingsIcon className="text-unihia-accent" size={18} />
        </div>
      </div>

      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.title} className="space-y-4">
            <div className="flex items-center gap-3 px-2">
              <section.icon size={16} className="text-unihia-accent" />
              <h3 className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-black">{section.title}</h3>
            </div>
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl overflow-hidden">
              {section.items.map((item, i) => (
                <button 
                  key={item}
                  className={`w-full p-5 text-left text-sm font-medium hover:bg-white/[0.04] transition-colors flex items-center justify-between ${i !== section.items.length - 1 ? 'border-b border-white/[0.03]' : ''}`}
                >
                  <span className="text-zinc-300">{item}</span>
                  <ChevronRight size={16} className="text-zinc-800" />
                </button>
              ))}
            </div>
          </div>
        ))}

        <button 
          onClick={logout}
          className="w-full p-6 bg-red-500/10 border border-red-500/20 rounded-3xl text-red-500 font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-red-500/20 transition-all"
        >
          <LogOut size={16} />
          Sair da Conta
        </button>
      </div>
    </motion.div>
  );
};
