import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Fingerprint, Scan, ShieldCheck, XCircle } from 'lucide-react';

interface BiometricAuthProps {
  type: 'fingerprint' | 'face';
  onComplete: (success: boolean) => void;
  error?: boolean;
}

export const BiometricAuth: React.FC<BiometricAuthProps> = ({ type, onComplete, error }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [status, setStatus] = useState<'idle' | 'scanning' | 'success' | 'error'>('idle');

  const startScan = () => {
    setIsScanning(true);
    setStatus('scanning');
    
    // Simulate biometric scan
    setTimeout(() => {
      const success = Math.random() > 0.1; // 90% success rate for demo
      if (success) {
        setStatus('success');
        setTimeout(() => onComplete(true), 800);
      } else {
        setStatus('error');
        setIsScanning(false);
        setTimeout(() => setStatus('idle'), 2000);
      }
    }, 2000);
  };

  useEffect(() => {
    if (!isScanning && status === 'idle') {
      startScan();
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-12 py-10">
      <div className="relative">
        <motion.div 
          animate={{ 
            scale: isScanning ? [1, 1.1, 1] : 1,
            borderColor: status === 'success' ? '#10b981' : status === 'error' ? '#ef4444' : 'rgba(255,255,255,0.1)'
          }}
          transition={{ repeat: isScanning ? Infinity : 0, duration: 2 }}
          className={`w-40 h-40 rounded-[3rem] border-4 flex items-center justify-center bg-white/[0.02] relative overflow-hidden`}
        >
          <AnimatePresence mode="wait">
            {status === 'scanning' && (
              <motion.div 
                key="scanning"
                initial={{ y: -60 }}
                animate={{ y: 60 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="absolute inset-x-0 h-0.5 bg-unihia-accent shadow-[0_0_15px_rgba(255,99,33,0.8)] z-10"
              />
            )}
            
            {status === 'success' ? (
              <motion.div key="success" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                <ShieldCheck className="text-emerald-500 w-20 h-20" />
              </motion.div>
            ) : status === 'error' ? (
              <motion.div key="error" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                <XCircle className="text-red-500 w-20 h-20" />
              </motion.div>
            ) : (
              <motion.div key="icon" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {type === 'fingerprint' ? (
                  <Fingerprint className="text-unihia-accent w-20 h-20" />
                ) : (
                  <Scan className="text-unihia-accent w-20 h-20" />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        {isScanning && (
          <motion.div 
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -inset-4 bg-unihia-accent/5 rounded-[4rem] blur-2xl -z-10"
          />
        )}
      </div>

      <div className="text-center space-y-2">
        <h3 className="text-white font-bold text-xl tracking-tight">
          {status === 'scanning' ? (type === 'fingerprint' ? 'Lendo Digital...' : 'Analisando Face...') : 
           status === 'success' ? 'Identificado' : 
           status === 'error' ? 'Falha na Identificação' : 
           'Toque para Iniciar'}
        </h3>
        <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-black">
          {status === 'scanning' ? 'Mantenha o sensor pressionado' : 'Segurança Biométrica Unihia'}
        </p>
      </div>

      {status === 'error' && (
        <button 
          onClick={startScan}
          className="text-unihia-accent text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors"
        >
          Tentar Novamente
        </button>
      )}
    </div>
  );
};
