import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Zap, Loader2, Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      login(email);
      navigate('/home');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-unihia-dark flex flex-col items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-12"
      >
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-unihia-accent rounded-[2rem] mx-auto flex items-center justify-center accent-glow">
            <Zap className="text-black w-10 h-10 fill-current" />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-white tracking-tighter">Bem-vindo de volta</h1>
            <p className="text-zinc-500 text-sm font-medium">Acesse sua orquestração de negócios.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-unihia-accent transition-colors" size={18} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail"
                className="w-full bg-white/[0.02] border border-white/[0.05] rounded-2xl py-4 pl-12 pr-4 text-white text-sm focus:border-unihia-accent outline-none transition-all font-medium placeholder:text-zinc-700"
              />
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-unihia-accent transition-colors" size={18} />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                className="w-full bg-white/[0.02] border border-white/[0.05] rounded-2xl py-4 pl-12 pr-4 text-white text-sm focus:border-unihia-accent outline-none transition-all font-medium placeholder:text-zinc-700"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-unihia-accent text-black font-black py-5 rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-all disabled:opacity-50 shadow-xl shadow-unihia-accent/10 uppercase tracking-widest text-[11px]"
          >
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Entrar'}
          </button>
        </form>

        <p className="text-center text-zinc-500 text-xs font-medium">
          Não tem uma conta? <Link to="/register" className="text-unihia-accent hover:underline">Registre-se agora</Link>
        </p>
      </motion.div>
    </div>
  );
};
