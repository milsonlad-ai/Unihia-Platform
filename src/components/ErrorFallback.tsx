import React from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, Home, RefreshCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  error?: Error;
  resetErrorBoundary?: () => void;
}

export const ErrorFallback: React.FC<Props> = ({ error, resetErrorBoundary }) => {
  return (
    <div className="min-h-screen bg-unihia-dark flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-10 max-w-md w-full text-center space-y-8 border-red-500/20"
      >
        <div className="w-20 h-20 bg-red-500/10 rounded-[2rem] flex items-center justify-center mx-auto border border-red-500/20">
          <AlertTriangle className="text-red-500" size={40} />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white tracking-tight">Algo deu errado</h2>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Ocorreu um erro inesperado na orquestração. Nossa equipe técnica já foi notificada.
          </p>
          {error && (
            <pre className="mt-4 p-4 bg-black/40 rounded-xl text-[10px] text-red-400 font-mono overflow-auto max-h-32 text-left">
              {error.message}
            </pre>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4">
          {resetErrorBoundary && (
            <button 
              onClick={resetErrorBoundary}
              className="w-full bg-unihia-accent text-black font-black py-5 rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-all uppercase tracking-widest text-[11px]"
            >
              <RefreshCcw size={18} />
              Tentar Novamente
            </button>
          )}
          <Link to="/home">
            <button className="w-full bg-white/[0.02] border border-white/[0.05] text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-all uppercase tracking-widest text-[11px] hover:bg-white/[0.05]">
              <Home size={18} />
              Voltar ao Início
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
