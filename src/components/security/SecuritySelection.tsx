import React from 'react';
import { motion } from 'motion/react';
import { AuthMethod } from '../../types';
import { Fingerprint, Scan, Grid3X3, Lock, ChevronRight } from 'lucide-react';

interface SecuritySelectionProps {
  activeMethods: AuthMethod[];
  onSelect: (method: AuthMethod) => void;
  preferredMethod?: AuthMethod;
}

export const SecuritySelection: React.FC<SecuritySelectionProps> = ({ activeMethods, onSelect, preferredMethod }) => {
  const methodInfo = {
    password: { label: 'Palavra-passe', icon: Lock, desc: 'Método clássico' },
    fingerprint: { label: 'Impressão Digital', icon: Fingerprint, desc: 'Acesso biométrico rápido' },
    pattern: { label: 'Padrão de Desenho', icon: Grid3X3, desc: 'Grade de 9 pontos' },
    face: { label: 'Reconhecimento Facial', icon: Scan, desc: 'Análise biométrica facial' },
  };

  return (
    <div className="w-full space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white tracking-tight">Acesso Seguro</h2>
        <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-black">Escolha o método de desbloqueio</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {activeMethods.map((method) => {
          const info = methodInfo[method];
          const isPreferred = method === preferredMethod;
          
          return (
            <motion.button
              key={method}
              whileHover={{ x: 4 }}
              onClick={() => onSelect(method)}
              className={`p-5 bg-white/[0.02] border ${isPreferred ? 'border-unihia-accent/30' : 'border-white/[0.06]'} rounded-3xl text-left hover:bg-white/[0.05] transition-all group flex items-center justify-between`}
            >
              <div className="flex items-center gap-5">
                <div className={`p-3 rounded-2xl ${isPreferred ? 'bg-unihia-accent/10 text-unihia-accent' : 'bg-white/5 text-zinc-500'} group-hover:text-unihia-accent transition-colors`}>
                  <info.icon size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white group-hover:text-unihia-accent transition-colors tracking-tight">{info.label}</h3>
                    {isPreferred && <span className="text-[8px] bg-unihia-accent/20 text-unihia-accent px-1.5 py-0.5 rounded uppercase font-black">Preferido</span>}
                  </div>
                  <p className="text-[10px] text-zinc-500 font-medium">{info.desc}</p>
                </div>
              </div>
              <ChevronRight className="text-zinc-800 group-hover:text-unihia-accent transition-colors" size={18} />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
