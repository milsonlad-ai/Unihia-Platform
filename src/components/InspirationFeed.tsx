import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  Search, 
  Filter, 
  Loader2, 
  Brain,
  Zap,
  ChevronRight,
  Bot
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { InspirationItem, InspirationCategory, UserBehavior } from '../types';
import { InspirationCard } from './InspirationCard';
import { GoogleGenAI } from "@google/genai";
import { Toast, ToastType } from './Toast';
import { useGamification } from '../GamificationContext';

const CATEGORIES: InspirationCategory[] = [
  'tecnologia', 'inteligência artificial', 'design', 'startups', 'inovação', 'educação', 'marketing', 'engenharia', 'empreendedorismo'
];

const generateMockItems = (count: number, startIndex: number): InspirationItem[] => {
  const categories: InspirationCategory[] = CATEGORIES;
  const types: InspirationItem['type'][] = ['image', 'video', 'project', 'startup', 'prototype', 'concept', 'demo'];
  const authors = [
    { name: 'Orquestrador #42', avatar: 'https://picsum.photos/seed/user1/100/100', level: 'Nível 4 • Estrategista' },
    { name: 'Visionário Alpha', avatar: 'https://picsum.photos/seed/user2/100/100', level: 'Nível 7 • Inovador' },
    { name: 'Arquiteto Digital', avatar: 'https://picsum.photos/seed/user3/100/100', level: 'Nível 3 • Criador' },
    { name: 'Mestre da IA', avatar: 'https://picsum.photos/seed/user4/100/100', level: 'Nível 9 • Orquestrador' },
  ];

  const titles = [
    'Plataforma de IA para Logística Reversa',
    'Novo Conceito de Interface para Realidade Aumentada',
    'Startup de Educação Personalizada com LLMs',
    'Protótipo de Drone para Entrega em Áreas Remotas',
    'Ecosistema de Marketing Baseado em Blockchain',
    'Design System para Aplicações Espaciais',
    'Inovação em Armazenamento de Energia Térmica',
    'Plataforma de Colaboração para Criadores de Conteúdo',
    'Sistema de Irrigação Inteligente com IoT',
    'Marketplace de Créditos de Carbono Tokenizados',
  ];

  return Array.from({ length: count }, (_, i) => {
    const id = `insp-${startIndex + i}`;
    const type = types[Math.floor(Math.random() * types.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const author = authors[Math.floor(Math.random() * authors.length)];
    const title = titles[Math.floor(Math.random() * titles.length)];
    const isTrending = Math.random() > 0.8;
    
    // Using picsum for images and a sample video for videos
    const mediaUrl = type === 'video' 
      ? 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-futuristic-city-34513-large.mp4'
      : `https://picsum.photos/seed/${id}/800/1000`;

    return {
      id,
      type,
      mediaUrl,
      title,
      description: 'Uma visão inovadora que combina tecnologia de ponta com necessidades reais do mercado global. Este projeto visa transformar a maneira como interagimos com o ambiente digital.',
      author,
      category,
      createdAt: new Date(Date.now() - Math.random() * 1000000000).toISOString(),
      interactions: {
        likes: Math.floor(Math.random() * 500),
        saves: Math.floor(Math.random() * 200),
        comments: Math.floor(Math.random() * 50),
      },
      tags: [category, 'inovação', 'futuro'],
      isTrending,
    };
  });
};

export const InspirationFeed: React.FC = () => {
  const [items, setItems] = useState<InspirationItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState<InspirationCategory | 'all'>('all');
  const [userBehavior, setUserBehavior] = useState<UserBehavior>({
    likedIds: [],
    savedIds: [],
    viewTimes: {},
    visitedCategories: [],
    createdProjectIds: [],
  });
  const [aiAnalysis, setAiAnalysis] = useState<{ item: InspirationItem; analysis: string } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType; isVisible: boolean }>({
    message: '',
    type: 'info',
    isVisible: false
  });
  const { awardPoints, unlockBadge } = useGamification();

  const loaderRef = useRef<HTMLDivElement>(null);

  const showToast = (message: string, type: ToastType = 'info') => {
    setToast({ message, type, isVisible: true });
  };

  const loadMore = useCallback(() => {
    if (loading) return;
    setLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
      const newItems = generateMockItems(10, items.length);
      setItems(prev => [...prev, ...newItems]);
      setLoading(false);
    }, 1000);
  }, [items.length, loading]);

  useEffect(() => {
    loadMore();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [loadMore]);

  const handleLike = (id: string, isLiked: boolean) => {
    setUserBehavior(prev => ({
      ...prev,
      likedIds: prev.likedIds.includes(id) 
        ? prev.likedIds.filter(i => i !== id) 
        : [...prev.likedIds, id]
    }));
    if (!isLiked) {
      awardPoints(5, 'Curtiu uma inspiração');
    }
    showToast(isLiked ? 'Inspiração removida dos curtidos' : 'Inspiração curtida!', 'success');
  };

  const handleSave = (id: string, isSaved: boolean) => {
    setUserBehavior(prev => ({
      ...prev,
      savedIds: prev.savedIds.includes(id) 
        ? prev.savedIds.filter(i => i !== id) 
        : [...prev.savedIds, id]
    }));
    if (!isSaved) {
      awardPoints(10, 'Salvou uma inspiração');
    }
    showToast(isSaved ? 'Inspiração removida da biblioteca' : 'Inspiração salva na biblioteca!', 'success');
  };

  const handleExpandAI = async (item: InspirationItem, mode: 'expand' | 'execute' = 'expand') => {
    setIsAnalyzing(true);
    setAiAnalysis(null);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const prompt = mode === 'execute' 
        ? `Você é o Orquestrador Central da Unihia. Transforme esta inspiração em um PROJETO EXECUTÁVEL: "${item.title}".
           Descrição: "${item.description}".
           Categoria: "${item.category}".
           
           Gere um Roadmap Estratégico detalhado contendo:
           1. PLANO ESTRATÉGICO: Visão de curto e longo prazo.
           2. ROADMAP: Fases de desenvolvimento (Mês 1 a 6).
           3. FERRAMENTAS NECESSÁRIAS: Stack tecnológica e recursos.
           4. CRONOGRAMA: Marcos principais.
           5. ESTIMATIVA FINANCEIRA: Investimento inicial e projeção.
           6. COLABORADORES SUGERIDOS: Perfis necessários (ex: Designer UI/UX, Dev Fullstack).
           
           Responda em formato Markdown profissional e motivador.`
        : `Analise esta inspiração criativa: "${item.title}". 
           Descrição: "${item.description}". 
           Categoria: "${item.category}".
           
           Crie um plano de expansão estratégica que inclua:
           1. Modelo de Negócio sugerido.
           2. Principais desafios tecnológicos.
           3. Sugestão de MVP (Produto Mínimo Viável).
           4. Potencial de escala global.
           
           Responda em formato Markdown curto e direto.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });
      
      setAiAnalysis({ item, analysis: response.text || 'Não foi possível gerar a análise.' });
      awardPoints(50, mode === 'execute' ? 'Orquestrou roadmap executável' : 'Expandiu visão com Trinity AI');
    } catch (error) {
      console.error("Erro na expansão IA:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const filteredItems = activeCategory === 'all' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  // Simple personalization: find most frequent category in behavior
  const getMostFrequentCategory = () => {
    if (userBehavior.visitedCategories.length === 0) return null;
    const counts: Record<string, number> = {};
    userBehavior.visitedCategories.forEach(cat => counts[cat] = (counts[cat] || 0) + 1);
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  };

  const favoriteCategory = getMostFrequentCategory();

  return (
    <div className="p-6 pt-24 pb-32 space-y-8">
      {/* Header Section */}
      <div className="flex items-end justify-between">
        <div className="space-y-1.5">
          <h2 className="text-4xl font-serif italic font-bold text-white leading-none">Inspiração</h2>
          <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-bold">Feed Infinito de Ideias</p>
        </div>
        <div className="p-2.5 bg-unihia-accent/10 rounded-2xl border border-unihia-accent/20">
          <Sparkles className="text-unihia-accent" size={18} />
        </div>
      </div>

      {/* Categories Filter */}
      <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide -mx-6 px-6">
        <button 
          onClick={() => setActiveCategory('all')}
          className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${activeCategory === 'all' ? 'bg-unihia-accent text-black border-unihia-accent' : 'bg-white/5 text-zinc-500 border-white/10 hover:border-white/20'}`}
        >
          Tudo
        </button>
        {CATEGORIES.map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${activeCategory === cat ? 'bg-unihia-accent text-black border-unihia-accent' : 'bg-white/5 text-zinc-500 border-white/10 hover:border-white/20'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Trending Section */}
      {activeCategory === 'all' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="text-emerald-500" size={16} />
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Tendências Globais</h3>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-6 px-6">
            {items.filter(i => i.isTrending).slice(0, 5).map(item => (
              <motion.div 
                key={`trend-${item.id}`}
                whileHover={{ scale: 1.02 }}
                className="min-w-[280px] aspect-video rounded-3xl overflow-hidden relative border border-white/10 group cursor-pointer"
                onClick={() => handleExpandAI(item)}
              >
                <img src={item.mediaUrl} alt={item.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-5 flex flex-col justify-end">
                  <p className="text-[8px] text-unihia-accent font-black uppercase tracking-widest mb-1">{item.category}</p>
                  <h4 className="text-sm font-bold text-white line-clamp-1">{item.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Feed Grid */}
      <div className="space-y-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="relative">
            {item.category === favoriteCategory && (
              <div className="absolute -top-2 -right-2 z-20 bg-unihia-accent text-black text-[7px] font-black px-2 py-1 rounded-full shadow-lg flex items-center gap-1 animate-bounce">
                <Zap size={8} fill="currentColor" /> RECOMENDADO
              </div>
            )}
            <InspirationCard 
              item={item}
              onLike={(id) => {
                const isLiked = userBehavior.likedIds.includes(id);
                handleLike(id, isLiked);
                setUserBehavior(prev => ({
                  ...prev,
                  visitedCategories: [...prev.visitedCategories, item.category]
                }));
              }}
              onSave={(id) => {
                const isSaved = userBehavior.savedIds.includes(id);
                handleSave(id, isSaved);
              }}
              onTransform={() => {}}
              onExpandAI={handleExpandAI}
              isLiked={userBehavior.likedIds.includes(item.id)}
              isSaved={userBehavior.savedIds.includes(item.id)}
            />
          </div>
        ))}
      </div>

      {/* Loading Indicator */}
      <div ref={loaderRef} className="py-10 flex justify-center">
        {loading && (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 text-unihia-accent animate-spin" />
            <p className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.3em]">Carregando mais inspirações...</p>
          </div>
        )}
      </div>

      {/* AI Analysis Modal */}
      <AnimatePresence>
        {isAnalyzing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-3xl z-[60] flex items-center justify-center p-6"
          >
            <div className="text-center space-y-8">
              <div className="w-24 h-24 bg-unihia-accent rounded-[2rem] mx-auto flex items-center justify-center accent-glow animate-pulse">
                <Bot className="text-black w-10 h-10 animate-spin-slow" />
              </div>
              <div className="space-y-3">
                <h3 className="text-3xl font-bold text-white tracking-tighter">Orquestrando Expansão</h3>
                <p className="text-zinc-500 text-xs font-medium max-w-[240px] mx-auto">A Tríade de IA está processando esta ideia para gerar um roadmap estratégico.</p>
              </div>
            </div>
          </motion.div>
        )}

        {aiAnalysis && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-3xl z-[60] flex items-center justify-center p-6 overflow-y-auto"
          >
            <div className="w-full max-w-md bg-zinc-900/50 border border-white/10 rounded-[3rem] p-8 my-10 space-y-8 relative">
              <button 
                onClick={() => setAiAnalysis(null)}
                className="absolute top-6 right-6 p-2 text-zinc-500 hover:text-white transition-colors"
              >
                <ChevronRight className="rotate-90" size={24} />
              </button>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-unihia-accent/10 rounded-2xl flex items-center justify-center border border-unihia-accent/20">
                  <Brain className="text-unihia-accent" size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">Relatório de Expansão</h3>
                  <p className="text-zinc-500 text-[9px] uppercase tracking-widest font-black">Trinity AI Analysis</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 bg-white/[0.02] rounded-3xl border border-white/[0.05] prose prose-invert prose-sm max-w-none">
                  <div className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap font-medium">
                    {aiAnalysis.analysis}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => {
                      showToast('Projeto criado com sucesso no Laboratório!', 'success');
                      awardPoints(150, 'Criou um novo projeto');
                      unlockBadge('project_completed');
                      setAiAnalysis(null);
                    }}
                    className="bg-unihia-accent text-black font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest active:scale-95 transition-all"
                  >
                    Criar Projeto
                  </button>
                  <button 
                    onClick={() => {
                      showToast('Ideia salva na sua biblioteca privada.', 'success');
                      awardPoints(20, 'Arquivou uma ideia na Lab');
                      setAiAnalysis(null);
                    }}
                    className="bg-white/5 text-white font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest border border-white/10 active:scale-95 transition-all"
                  >
                    Salvar na Lab
                  </button>
                  <button 
                    onClick={() => {
                      showToast('Pitch enviado para a rede de investidores Unihia.', 'success');
                      awardPoints(300, 'Enviou pitch para investidores');
                      unlockBadge('first_investment');
                      setAiAnalysis(null);
                    }}
                    className="col-span-2 bg-emerald-500/10 text-emerald-500 font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest border border-emerald-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <TrendingUp size={14} /> Enviar para Investidores
                  </button>
                  <button 
                    onClick={() => {
                      showToast('Iniciando processo de incubação para Startup.', 'info');
                      awardPoints(500, 'Transformou ideia em Startup');
                      unlockBadge('team_founder');
                      setAiAnalysis(null);
                    }}
                    className="col-span-2 bg-blue-500/10 text-blue-500 font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest border border-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <Zap size={14} /> Transformar em Startup
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Toast 
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
      />
    </div>
  );
};
