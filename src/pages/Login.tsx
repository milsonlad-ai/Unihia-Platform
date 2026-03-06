import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Loader2, Mail, Lock, ShieldAlert, Clock, ChevronLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSecurity } from '../context/SecurityContext';
import { AuthMethod } from '../types';
import { PasswordAuth } from '../components/security/PasswordAuth';
import { PatternAuth } from '../components/security/PatternAuth';
import { BiometricAuth } from '../components/security/BiometricAuth';
import { SecuritySelection } from '../components/security/SecuritySelection';

import { validatePassword } from '../utils/security';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'email' | 'auth' | 'selection'>('email');
  const [activeMethod, setActiveMethod] = useState<AuthMethod | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);
  
  const { login } = useAuth();
  const { settings, isLocked, lockUntil, incrementFailedAttempts, resetFailedAttempts, addActivity } = useSecurity();
  const navigate = useNavigate();

  const activeMethods = ([
    settings.passwordEnabled ? 'password' : null,
    settings.fingerprintEnabled ? 'fingerprint' : null,
    settings.patternEnabled ? 'pattern' : null,
    settings.faceEnabled ? 'face' : null,
  ].filter(Boolean) as AuthMethod[]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      if (activeMethods.length === 1) {
        setActiveMethod(activeMethods[0]);
        setStep('auth');
      } else if (activeMethods.length > 1) {
        if (settings.preferredMethod && activeMethods.includes(settings.preferredMethod)) {
          setActiveMethod(settings.preferredMethod);
          setStep('auth');
        } else {
          setStep('selection');
        }
      } else {
        // Fallback to password if none enabled (shouldn't happen with defaults)
        setActiveMethod('password');
        setStep('auth');
      }
    }, 800);
  };

  const handleAuthComplete = (success: boolean | string) => {
    if (success) {
      setIsSubmitting(true);
      setTimeout(() => {
        addActivity({
          device: navigator.userAgent.split(') ')[0].split(' (')[1] || 'Dispositivo Desconhecido',
          location: 'Luanda, Angola (Aproximada)',
          status: 'success'
        });
        login(email);
        resetFailedAttempts();
        navigate('/home');
      }, 1000);
    } else {
      setError(true);
      incrementFailedAttempts();
      addActivity({
        device: navigator.userAgent.split(') ')[0].split(' (')[1] || 'Dispositivo Desconhecido',
        location: 'Luanda, Angola (Aproximada)',
        status: 'failed'
      });
      setTimeout(() => setError(false), 2000);
    }
  };

  const renderAuthMethod = () => {
    switch (activeMethod) {
      case 'password':
        return <PasswordAuth onComplete={(pw) => handleAuthComplete(validatePassword(pw))} error={error} />;
      case 'pattern':
        return <PatternAuth onComplete={(p) => handleAuthComplete(p === '0,1,2,5,8')} error={error} />;
      case 'fingerprint':
      case 'face':
        return <BiometricAuth type={activeMethod} onComplete={handleAuthComplete} error={error} />;
      default:
        return null;
    }
  };

  if (isLocked) {
    return (
      <div className="min-h-screen bg-unihia-dark flex flex-col items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-10 text-center space-y-8 max-w-sm"
        >
          <div className="w-20 h-20 bg-red-500/10 rounded-[2rem] mx-auto flex items-center justify-center border border-red-500/20">
            <ShieldAlert className="text-red-500 w-10 h-10" />
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-white tracking-tight">Acesso Bloqueado</h2>
            <p className="text-zinc-500 text-sm font-medium leading-relaxed">
              Muitas tentativas falhas. Por segurança, sua conta está bloqueada temporariamente.
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 text-unihia-accent font-mono text-xl font-bold">
            <Clock size={20} />
            <span>
              {lockUntil ? Math.max(0, Math.ceil((lockUntil.getTime() - Date.now()) / 1000)) : 0}s
            </span>
          </div>
          <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-black">Tente novamente em breve</p>
        </motion.div>
      </div>
    );
  }

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
            <h1 className="text-4xl font-bold text-white tracking-tighter">Unihia</h1>
            <p className="text-zinc-500 text-sm font-medium">Acesso Seguro à Orquestração</p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 'email' && (
            <motion.form 
              key="email-step"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={handleEmailSubmit} 
              className="space-y-6"
            >
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-unihia-accent transition-colors" size={18} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu e-mail"
                  className="w-full bg-white/[0.02] border border-white/[0.05] rounded-2xl py-5 pl-14 pr-5 text-white text-sm focus:border-unihia-accent outline-none transition-all font-medium placeholder:text-zinc-700"
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting || !email}
                className="w-full bg-unihia-accent text-black font-black py-5 rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-all disabled:opacity-50 shadow-xl shadow-unihia-accent/10 uppercase tracking-widest text-[11px]"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Continuar'}
              </button>
            </motion.form>
          )}

          {step === 'selection' && (
            <motion.div
              key="selection-step"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <SecuritySelection 
                activeMethods={activeMethods} 
                onSelect={(m) => {
                  setActiveMethod(m);
                  setStep('auth');
                }}
                preferredMethod={settings.preferredMethod}
              />
              <button 
                onClick={() => setStep('email')}
                className="w-full mt-8 py-4 text-zinc-600 hover:text-white transition-colors text-[10px] font-black uppercase tracking-[0.3em]"
              >
                Voltar
              </button>
            </motion.div>
          )}

          {step === 'auth' && (
            <motion.div
              key="auth-step"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between px-2">
                <button 
                  onClick={() => activeMethods.length > 1 ? setStep('selection') : setStep('email')}
                  className="text-zinc-500 hover:text-white transition-colors flex items-center gap-2 text-[10px] font-black uppercase tracking-widest"
                >
                  <ChevronLeft size={16} />
                  Voltar
                </button>
                {activeMethods.length > 1 && (
                  <button 
                    onClick={() => setStep('selection')}
                    className="text-unihia-accent hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest"
                  >
                    Outros Métodos
                  </button>
                )}
              </div>
              
              {renderAuthMethod()}
            </motion.div>
          )}
        </AnimatePresence>

        {step === 'email' && (
          <p className="text-center text-zinc-500 text-xs font-medium">
            Não tem uma conta? <Link to="/register" className="text-unihia-accent hover:underline">Registre-se agora</Link>
          </p>
        )}
      </motion.div>
    </div>
  );
};
