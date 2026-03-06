import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, TrendingUp, Brain, Loader2, ChevronRight } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useGamification } from '../GamificationContext';
import { Link } from 'react-router-dom';

export const Projects: React.FC = () => {
  const [idea, setIdea] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { awardPoints, unlockBadge } = useGamification();

  const trends = [
    { id: 'ia-logistica', title: "IA Generativa em Logística", growth: "+145%", sentiment: "Alto" },
    { id: 'saas-sustentabilidade', title: "SaaS de Sustentabilidade", growth: "+82%", sentiment: "Estável" },
    { id: 'edtech-microlearning', title: "EdTechs de Micro-learning", growth: "+210%", sentiment: "Explosivo" },
  ];

  const analyzeIdea = async () => {
    if (!idea) return;
    setIsAnalyzing(true);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analise a seguinte ideia de negócio para o mercado brasileiro: "${idea}". 
        Forneça um JSON com os campos: 
        potential (string curta), 
        demand (string curta), 
        competition (string curta), 
        score (número de 0 a 100).`,
        config: { responseMimeType: "application/json" }
      });
      
      const result = JSON.parse(response.text || '{}');
      setAnalysis(result);
      awardPoints(30, 'Validou uma nova ideia');
      unlockBadge('first_idea');
    } catch (error) {
      console.error("Erro na análise:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 pt-24 pb-32 space-y-10"
    >
      <div className="flex items-end justify-between">
        <div className="space-y-1.5">
          <h2 className="text-4xl font-serif italic font-bold text-white leading-none tracking-tight">Projetos</h2>
          <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-black">Análise de Tendências & Ativos</p>
        </div>
        <div className="p-2.5 bg-white/5 rounded-2xl border border-white/10">
          <ShoppingBag className="text-unihia-accent" size={18} />
        </div>
      </div>

      <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-3xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-black">
            <TrendingUp size={20} />
          </div>
          <div>
            <h3 className="text-white font-bold text-sm">Receber Investimento</h3>
            <p className="text-zinc-500 text-[10px]">Simular rodada de captação</p>
          </div>
          <button 
            onClick={() => {
              awardPoints(200, 'Recebeu investimento anjo');
              unlockBadge('first_investment');
            }}
            className="ml-auto px-4 py-2 bg-emerald-500 text-black text-[10px] font-black uppercase rounded-xl active:scale-95 transition-all"
          >
            Captar
          </button>
        </div>
      </div>

      {/* Tendências Emergentes */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[10px] uppercase tracking-widest text-unihia-accent font-black">Tendências Emergentes</h3>
          <TrendingUp className="w-4 h-4 text-unihia-accent" />
        </div>
        <div className="grid grid-cols-1 gap-4">
          {trends.map((trend, i) => (
            <Link key={trend.id} to={`/idea/${trend.id}`}>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-5 flex items-center justify-between group hover:border-unihia-accent/50 transition-colors"
              >
                <div>
                  <p className="text-white font-bold text-sm tracking-tight">{trend.title}</p>
                  <p className="text-zinc-500 text-[9px] uppercase tracking-wider font-black">Sentimento: {trend.sentiment}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-emerald-400 font-mono text-xs font-black">{trend.growth}</p>
                    <div className="w-16 h-1 bg-white/5 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-emerald-400 w-3/4" />
                    </div>
                  </div>
                  <ChevronRight className="text-zinc-800 group-hover:text-unihia-accent transition-colors" size={16} />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Validador de Ideias */}
      <section className="bg-unihia-accent/5 border border-unihia-accent/10 p-7 rounded-[2.5rem] space-y-7 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-unihia-accent/5 blur-3xl -mr-16 -mt-16" />
        
        <div className="space-y-2 relative z-10">
          <h3 className="text-xl font-bold text-white tracking-tight">Validador de Potencial</h3>
          <p className="text-zinc-500 text-xs leading-relaxed font-medium">Descreva sua ideia para receber uma avaliação instantânea da Tríade de IA.</p>
        </div>
        
        <textarea 
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Ex: Uma plataforma de IA para otimizar o consumo de energia em condomínios..."
          className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-white text-sm focus:border-unihia-accent outline-none transition-all min-h-[120px] resize-none font-medium placeholder:text-zinc-700"
        />

        <button 
          onClick={analyzeIdea}
          disabled={isAnalyzing || !idea}
          className="w-full bg-unihia-accent text-black font-black py-5 rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-all disabled:opacity-50 shadow-xl shadow-unihia-accent/10 uppercase tracking-widest text-[11px]"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Orquestrando Análise...</span>
            </>
          ) : (
            <>
              <Brain className="w-5 h-5" />
              <span>Avaliar Potencial</span>
            </>
          )}
        </button>

        <AnimatePresence>
          {analysis && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-7 border-t border-white/[0.06] space-y-6 relative z-10"
            >
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 text-[9px] uppercase tracking-widest font-black">Score de Viabilidade</span>
                <span className="text-unihia-accent font-mono text-2xl font-black">{analysis.score}/100</span>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white/[0.02] p-4 rounded-2xl border border-white/[0.04]">
                  <p className="text-unihia-accent text-[8px] uppercase font-black tracking-widest mb-2">Potencial de Mercado</p>
                  <p className="text-zinc-300 text-xs leading-relaxed font-medium">{analysis.potential}</p>
                </div>
                <div className="bg-white/[0.02] p-4 rounded-2xl border border-white/[0.04]">
                  <p className="text-unihia-accent text-[8px] uppercase font-black tracking-widest mb-2">Demanda Estimada</p>
                  <p className="text-zinc-300 text-xs leading-relaxed font-medium">{analysis.demand}</p>
                </div>
                <div className="bg-white/[0.02] p-4 rounded-2xl border border-white/[0.04]">
                  <p className="text-unihia-accent text-[8px] uppercase font-black tracking-widest mb-2">Cenário Competitivo</p>
                  <p className="text-zinc-300 text-xs leading-relaxed font-medium">{analysis.competition}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </motion.div>
  );
};
