import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, ChevronRight } from 'lucide-react';

interface AITriadOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onAction: () => void;
  isProcessing: boolean;
}

export const AITriadOverlay: React.FC<AITriadOverlayProps> = ({ isOpen, onClose, onAction, isProcessing }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/95 backdrop-blur-3xl z-50 flex items-center justify-center p-6"
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="w-full max-w-md space-y-12"
        >
          <div className="text-center space-y-8">
            <div className={`w-28 h-28 bg-unihia-accent rounded-[2.5rem] mx-auto flex items-center justify-center accent-glow border-[10px] border-white/5 ${isProcessing ? 'animate-pulse scale-110' : 'animate-float'}`}>
              <Zap className={`text-black w-12 h-12 fill-current ${isProcessing ? 'animate-spin-slow' : ''}`} />
            </div>
            <div className="space-y-3">
              <h2 className="text-5xl font-bold text-white tracking-tighter leading-none">
                {isProcessing ? 'Orquestrando...' : 'Tríade de IA'}
              </h2>
              <p className="text-zinc-500 text-sm font-medium">
                {isProcessing ? 'Sincronizando modelos de alta fidelidade.' : 'Sinergia entre modelos para orquestração absoluta.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {[
              { id: 'visual', title: 'Inteligência Visual', desc: 'Análise de mídia, detecção de objetos e estilos.', color: 'from-blue-500/10' },
              { id: 'creative', title: 'Inteligência Criativa', desc: 'Geração de ideias, nomes e estratégias de marketing.', color: 'from-unihia-accent/10' },
              { id: 'logical', title: 'Inteligência Lógica', desc: 'Geração de código, planos técnicos e estruturas de negócio.', color: 'from-emerald-500/10' },
            ].map((item) => (
              <button 
                key={item.id} 
                onClick={onAction}
                disabled={isProcessing}
                className={`p-7 bg-white/[0.02] border border-white/[0.06] rounded-[2rem] text-left hover:bg-white/[0.05] transition-all group relative overflow-hidden ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${item.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10 flex items-center justify-between">
                  <div className="space-y-1.5">
                    <h3 className="font-bold text-xl text-white group-hover:text-unihia-accent transition-colors tracking-tight">{item.title}</h3>
                    <p className="text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors font-medium">{item.desc}</p>
                  </div>
                  {isProcessing ? (
                    <div className="w-5 h-5 border-2 border-unihia-accent border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <ChevronRight className="text-zinc-800 group-hover:text-unihia-accent transition-colors" size={20} />
                  )}
                </div>
              </button>
            ))}
          </div>

          <button 
            onClick={onClose}
            disabled={isProcessing}
            className="w-full py-4 text-zinc-600 hover:text-white transition-colors text-[10px] font-black uppercase tracking-[0.3em] disabled:opacity-30"
          >
            Encerrar Sessão
          </button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);
