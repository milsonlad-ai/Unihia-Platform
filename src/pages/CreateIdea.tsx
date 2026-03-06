import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Brain, Zap, ChevronRight, Loader2, TrendingUp, Globe, Cpu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CreateIdea: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      navigate('/idea/new-idea-123');
    }, 3000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 pt-24 pb-32 space-y-10"
    >
      <div className="flex items-end justify-between">
        <div className="space-y-1.5">
          <h2 className="text-4xl font-serif italic font-bold text-white leading-none tracking-tight">Criar Ideia</h2>
          <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-black">Orquestração de Conceitos</p>
        </div>
        <div className="p-2.5 bg-unihia-accent/10 rounded-2xl border border-unihia-accent/20">
          <Sparkles className="text-unihia-accent" size={18} />
        </div>
      </div>

      <div className="space-y-8">
        <div className="flex items-center gap-4">
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className={`flex-1 h-1.5 rounded-full transition-all duration-500 ${step >= i ? 'bg-unihia-accent' : 'bg-white/5'}`} 
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white tracking-tight">Qual o setor de atuação?</h3>
                <p className="text-zinc-500 text-xs leading-relaxed font-medium">Defina o ecossistema que sua ideia irá orquestrar.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: 'tech', label: 'Tecnologia', icon: Cpu },
                  { id: 'fin', label: 'Finanças', icon: TrendingUp },
                  { id: 'log', label: 'Logística', icon: Globe },
                  { id: 'edu', label: 'Educação', icon: Brain },
                ].map((sector) => (
                  <button 
                    key={sector.id}
                    onClick={() => setStep(2)}
                    className="glass-card p-6 flex flex-col items-center gap-4 group hover:border-unihia-accent/50 transition-colors"
                  >
                    <sector.icon className="text-zinc-700 group-hover:text-unihia-accent transition-colors" size={32} />
                    <span className="text-[10px] uppercase tracking-widest font-black text-zinc-500 group-hover:text-white">{sector.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white tracking-tight">Qual o problema central?</h3>
                <p className="text-zinc-500 text-xs leading-relaxed font-medium">Descreva a dor que você deseja resolver com IA.</p>
              </div>
              <textarea 
                placeholder="Ex: A latência em pagamentos transfronteiriços..."
                className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-white text-sm focus:border-unihia-accent outline-none transition-all min-h-[160px] resize-none font-medium placeholder:text-zinc-700"
              />
              <button 
                onClick={() => setStep(3)}
                className="w-full bg-unihia-accent text-black font-black py-5 rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-all uppercase tracking-widest text-[11px]"
              >
                <span>Próximo Passo</span>
                <ChevronRight size={16} />
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white tracking-tight">Tudo pronto para orquestrar?</h3>
                <p className="text-zinc-500 text-xs leading-relaxed font-medium">A Tríade de IA irá processar sua ideia e gerar um roadmap completo.</p>
              </div>
              
              <div className="bg-unihia-accent/5 border border-unihia-accent/10 p-6 rounded-3xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-unihia-accent/10 rounded-xl flex items-center justify-center border border-unihia-accent/20">
                    <Brain className="text-unihia-accent" size={20} />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-white font-bold text-sm tracking-tight">IA Generativa Ativa</p>
                    <p className="text-zinc-500 text-[9px] uppercase tracking-widest font-black">Pronta para Processar</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full bg-unihia-accent text-black font-black py-6 rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-all disabled:opacity-50 shadow-xl shadow-unihia-accent/10 uppercase tracking-widest text-[11px]"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Orquestrando Conceito...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    <span>Gerar Ideia Disruptiva</span>
                  </>
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
