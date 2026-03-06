import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, ChevronRight, Check, Users, Brain, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const steps = [
  {
    id: 'profile_type',
    title: 'Qual o seu perfil?',
    subtitle: 'Personalize sua experiência na plataforma.',
    options: [
      { id: 'entrepreneur', label: 'Empreendedor', icon: Zap, desc: 'Busco criar e escalar negócios.' },
      { id: 'investor', label: 'Investidor', icon: TrendingUp, desc: 'Busco oportunidades de alto impacto.' },
      { id: 'collaborator', label: 'Colaborador', icon: Users, desc: 'Busco orquestrar projetos inovadores.' },
    ]
  },
  {
    id: 'interests',
    title: 'Áreas de Interesse',
    subtitle: 'Selecione as tecnologias que você domina ou estuda.',
    options: [
      { id: 'ai', label: 'Inteligência Artificial', icon: Brain, desc: 'LLMs, Visão Computacional, Agentes.' },
      { id: 'fintech', label: 'Fintech', icon: TrendingUp, desc: 'Pagamentos, Blockchain, DeFi.' },
      { id: 'saas', label: 'SaaS', icon: Zap, desc: 'Software as a Service, B2B.' },
    ]
  }
];

export const Onboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const { completeOnboarding } = useAuth();
  const navigate = useNavigate();

  const handleSelect = (optionId: string) => {
    setSelections(prev => ({ ...prev, [steps[currentStep].id]: optionId }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      completeOnboarding();
      navigate('/home');
    }
  };

  const step = steps[currentStep];

  return (
    <div className="min-h-screen bg-unihia-dark flex flex-col p-6 pt-20">
      <div className="max-w-md mx-auto w-full space-y-12">
        {/* Progress Bar */}
        <div className="flex gap-2">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 flex-1 rounded-full transition-all duration-500 ${i <= currentStep ? 'bg-unihia-accent' : 'bg-white/5'}`} 
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-10"
          >
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-white tracking-tighter leading-none">{step.title}</h1>
              <p className="text-zinc-500 text-sm font-medium">{step.subtitle}</p>
            </div>

            <div className="space-y-4">
              {step.options.map((option) => (
                <button 
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  className={`w-full p-6 rounded-[2rem] border text-left transition-all duration-300 flex items-center gap-6 group ${selections[step.id] === option.id ? 'bg-unihia-accent/10 border-unihia-accent' : 'bg-white/[0.02] border-white/[0.05] hover:bg-white/[0.04]'}`}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${selections[step.id] === option.id ? 'bg-unihia-accent text-black' : 'bg-white/[0.03] text-zinc-600 group-hover:text-zinc-400'}`}>
                    <option.icon size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-bold text-lg tracking-tight ${selections[step.id] === option.id ? 'text-unihia-accent' : 'text-white'}`}>{option.label}</h3>
                    <p className="text-zinc-500 text-xs font-medium leading-relaxed">{option.desc}</p>
                  </div>
                  {selections[step.id] === option.id && (
                    <div className="w-6 h-6 bg-unihia-accent rounded-full flex items-center justify-center text-black">
                      <Check size={14} strokeWidth={3} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="pt-10">
          <button 
            onClick={handleNext}
            disabled={!selections[step.id]}
            className="w-full bg-unihia-accent text-black font-black py-5 rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-all disabled:opacity-30 shadow-xl shadow-unihia-accent/10 uppercase tracking-widest text-[11px]"
          >
            <span>{currentStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}</span>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
