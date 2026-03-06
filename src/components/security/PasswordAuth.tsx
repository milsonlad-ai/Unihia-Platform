import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, EyeOff, Lock, ArrowRight } from 'lucide-react';

interface PasswordAuthProps {
  onComplete: (password: string) => void;
  error?: boolean;
}

export const PasswordAuth: React.FC<PasswordAuthProps> = ({ onComplete, error }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password) onComplete(password);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      <div className="relative">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600">
          <Lock size={18} />
        </div>
        <input 
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Sua palavra-passe"
          className={`w-full bg-white/[0.02] border ${error ? 'border-red-500/50' : 'border-white/10'} rounded-2xl py-5 pl-14 pr-14 text-white placeholder:text-zinc-700 outline-none focus:border-unihia-accent/50 transition-all font-medium`}
          autoFocus
        />
        <button 
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white transition-colors"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      <button 
        type="submit"
        disabled={!password}
        className="w-full bg-unihia-accent text-black font-black py-5 rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl shadow-unihia-accent/10 uppercase tracking-widest text-[11px] disabled:opacity-30"
      >
        <span>Desbloquear</span>
        <ArrowRight size={16} />
      </button>
    </form>
  );
};
