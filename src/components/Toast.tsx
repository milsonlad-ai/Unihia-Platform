import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';

export type ToastType = 'success' | 'info' | 'error';

interface ToastProps {
  message: string;
  type?: ToastType;
  isVisible: boolean;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'info', isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const icons = {
    success: <CheckCircle2 className="text-emerald-500" size={18} />,
    info: <Info className="text-unihia-accent" size={18} />,
    error: <AlertCircle className="text-red-500" size={18} />,
  };

  const bgColors = {
    success: 'bg-emerald-500/10 border-emerald-500/20',
    info: 'bg-unihia-accent/10 border-unihia-accent/20',
    error: 'bg-red-500/10 border-red-500/20',
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] px-6 py-4 rounded-2xl border backdrop-blur-xl shadow-2xl flex items-center gap-4 min-w-[300px] ${bgColors[type]}`}
        >
          <div className="flex-shrink-0">{icons[type]}</div>
          <p className="text-xs font-bold text-white flex-grow">{message}</p>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
