import React, { useState } from 'react';
import { 
  Radar, 
  FlaskConical, 
  Users, 
  ShoppingBag, 
  Zap, 
  Search, 
  Bell, 
  Menu,
  TrendingUp,
  MessageSquare,
  Share2,
  Bookmark,
  ChevronRight,
  Sparkles,
  Brain,
  Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
type Tab = 'radar' | 'lab' | 'comunidade' | 'mercado';

// --- Components ---

const Header = () => (
  <header className="fixed top-0 left-0 right-0 h-16 glass-header z-40 flex items-center justify-center px-6">
    <div className="w-full max-w-md flex items-center justify-between">
      <div className="flex items-center gap-3 group cursor-pointer">
        <div className="w-9 h-9 bg-unihia-accent rounded-xl flex items-center justify-center accent-glow transition-transform group-hover:scale-105">
          <Zap className="text-black w-5 h-5 fill-current" />
        </div>
        <span className="text-white font-bold tracking-tighter text-xl group-hover:text-unihia-accent transition-colors">UNIHIA</span>
      </div>
      <div className="flex items-center gap-1">
        <button className="p-2.5 text-zinc-500 hover:text-unihia-accent transition-all hover:bg-white/5 rounded-full">
          <Search size={18} />
        </button>
        <button className="p-2.5 text-zinc-500 hover:text-unihia-accent transition-all hover:bg-white/5 rounded-full relative">
          <Bell size={18} />
          <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-unihia-accent rounded-full border border-black" />
        </button>
        <button className="p-2.5 text-zinc-500 hover:text-unihia-accent transition-all hover:bg-white/5 rounded-full">
          <Menu size={18} />
        </button>
      </div>
    </div>
  </header>
);

const RadarScreen = () => {
  const opportunities = [
    { id: 1, title: 'Expansão de Mercado: Angola', category: 'Negócios', match: '98%', time: '2h atrás', trend: '+12%', color: 'bg-blue-500' },
    { id: 2, title: 'Novo Algoritmo de IA Preditiva', category: 'Tecnologia', match: '92%', time: '5h atrás', trend: '+8%', color: 'bg-unihia-accent' },
    { id: 3, title: 'Parceria Estratégica: Fintech BR', category: 'Finanças', match: '85%', time: '1d atrás', trend: '+5%', color: 'bg-emerald-500' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 pt-24 pb-32 space-y-10"
    >
      <div className="flex items-end justify-between">
        <div className="space-y-1.5">
          <h2 className="text-4xl font-serif italic font-bold text-white leading-none">Radar</h2>
          <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-bold">Oportunidades em Tempo Real</p>
        </div>
        <div className="p-2.5 bg-unihia-accent/10 rounded-2xl border border-unihia-accent/20">
          <TrendingUp className="text-unihia-accent" size={18} />
        </div>
      </div>
      
      <div className="space-y-6">
        {opportunities.map((opp) => (
          <motion.div 
            key={opp.id} 
            whileHover={{ y: -4 }}
            className="glass-card p-6 group cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-unihia-accent/20 group-hover:bg-unihia-accent transition-colors" />
            
            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 bg-white/[0.03] text-[9px] uppercase tracking-widest text-zinc-400 font-bold rounded-lg border border-white/[0.05]">
                  {opp.category}
                </span>
                <span className="text-[10px] text-emerald-400 font-mono font-bold flex items-center gap-1">
                  <TrendingUp size={10} /> {opp.trend}
                </span>
              </div>
              <span className="text-[10px] text-zinc-600 font-medium">{opp.time}</span>
            </div>
            
            <h3 className="text-xl font-medium text-white mb-6 group-hover:text-unihia-accent transition-colors leading-tight tracking-tight">
              {opp.title}
            </h3>
            
            <div className="flex items-center justify-between pt-5 border-t border-white/[0.04]">
              <div className="flex items-center gap-4">
                <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: opp.match }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className={`h-full ${opp.color} opacity-80`} 
                  />
                </div>
                <span className="text-[10px] font-mono font-bold text-zinc-400 group-hover:text-unihia-accent transition-colors">{opp.match} Match</span>
              </div>
              <button className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-white transition-colors">
                Analisar <ChevronRight size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const LabScreen = () => {
  const tools = [
    { name: 'Gemini Vision', desc: 'Análise multimodal de ativos', icon: Sparkles, status: 'Online', color: 'text-blue-400' },
    { name: 'Neural Predictor', desc: 'Previsão de tendências globais', icon: Brain, status: 'Online', color: 'text-emerald-400' },
    { name: 'Auto-Executor', desc: 'Automação de fluxos de trabalho', icon: Cpu, status: 'Beta', color: 'text-unihia-accent' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-6 pt-24 pb-32 space-y-12"
    >
      <div className="text-center space-y-4">
        <h2 className="text-5xl font-bold text-white tracking-tighter leading-none">Laboratório</h2>
        <p className="text-zinc-500 text-sm max-w-[260px] mx-auto leading-relaxed">Orquestração de inteligência aplicada para resultados exponenciais.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {tools.map((tool) => (
          <motion.div 
            key={tool.name} 
            whileHover={{ scale: 1.02 }}
            className="glass-card p-7 flex items-center gap-7 group relative overflow-hidden"
          >
            <div className="w-16 h-16 bg-white/[0.02] rounded-2xl flex items-center justify-center border border-white/[0.05] group-hover:border-unihia-accent/30 transition-all duration-500">
              <tool.icon className={`${tool.color} group-hover:scale-110 transition-transform duration-500`} size={32} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2.5 mb-1.5">
                <h3 className="text-white font-bold text-lg tracking-tight">{tool.name}</h3>
                <span className={`text-[7px] uppercase tracking-[0.2em] px-2 py-0.5 rounded-full font-black ${tool.status === 'Online' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-unihia-accent/10 text-unihia-accent border border-unihia-accent/20'}`}>
                  {tool.status}
                </span>
              </div>
              <p className="text-zinc-500 text-xs leading-relaxed font-medium">{tool.desc}</p>
            </div>
            <ChevronRight className="text-zinc-800 group-hover:text-unihia-accent transition-colors" size={20} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const CommunityScreen = () => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    className="p-6 pt-24 pb-32 space-y-10"
  >
    <div className="flex items-end justify-between">
      <div className="space-y-1.5">
        <h2 className="text-4xl font-serif italic font-bold text-white leading-none">Social</h2>
        <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-bold">Insights da Rede Unihia</p>
      </div>
      <div className="p-2.5 bg-white/5 rounded-2xl border border-white/10">
        <Users className="text-unihia-accent" size={18} />
      </div>
    </div>
    
    {[1, 2].map((i) => (
      <div key={i} className="glass-card p-6 space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-unihia-accent to-orange-900 p-[1px]">
            <div className="w-full h-full rounded-2xl bg-black flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                <Users size={20} className="text-zinc-700" />
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm font-bold text-white tracking-tight">Orquestrador #{i}42</p>
            <p className="text-[9px] text-zinc-500 uppercase tracking-widest font-black">Nível 4 • Estrategista</p>
          </div>
          <div className="ml-auto">
            <button className="p-2 text-zinc-700 hover:text-unihia-accent transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
        <p className="text-zinc-300 text-sm leading-relaxed font-medium">
          Acabei de implementar o novo fluxo do Laboratório para análise de mercado imobiliário em Luanda. Os resultados são impressionantes. Alguém mais testando?
        </p>
        <div className="flex items-center gap-8 pt-5 border-t border-white/[0.04]">
          <button className="flex items-center gap-2 text-zinc-500 hover:text-unihia-accent transition-all group">
            <MessageSquare size={16} className="group-hover:scale-110 transition-transform" /> 
            <span className="text-[10px] font-black">12</span>
          </button>
          <button className="flex items-center gap-2 text-zinc-500 hover:text-unihia-accent transition-all group">
            <Share2 size={16} className="group-hover:scale-110 transition-transform" /> 
            <span className="text-[10px] font-black uppercase tracking-widest">Partilhar</span>
          </button>
          <button className="ml-auto text-zinc-500 hover:text-unihia-accent transition-all group">
            <Bookmark size={16} className="group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    ))}
  </motion.div>
);

const MarketScreen = () => (
  <motion.div 
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-6 pt-24 pb-32 space-y-10"
  >
    <div className="flex items-end justify-between">
      <div className="space-y-1.5">
        <h2 className="text-4xl font-serif italic font-bold text-white leading-none">Mercado</h2>
        <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-bold">Ativos Digitais & Serviços</p>
      </div>
      <div className="p-2.5 bg-white/5 rounded-2xl border border-white/10">
        <ShoppingBag className="text-unihia-accent" size={18} />
      </div>
    </div>

    <div className="grid grid-cols-2 gap-5">
      {[
        { name: 'Dataset Financeiro', price: '2.5k UNH', category: 'Dados' },
        { name: 'Licença Pro Lab', price: '500 UNH', category: 'Ferramenta' },
        { name: 'Mentoria IA', price: '1.2k UNH', category: 'Serviço' },
        { name: 'API Premium', price: '3k UNH', category: 'Acesso' },
      ].map((item) => (
        <motion.div 
          key={item.name} 
          whileHover={{ scale: 1.03 }}
          className="glass-card p-5 space-y-5 flex flex-col group cursor-pointer"
        >
          <div className="aspect-square bg-white/[0.02] border border-white/[0.05] rounded-2xl flex items-center justify-center group-hover:bg-white/[0.05] transition-all duration-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-unihia-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <ShoppingBag className="text-zinc-800 group-hover:text-unihia-accent/20 transition-colors duration-500" size={48} />
          </div>
          <div className="space-y-1.5 flex-1">
            <span className="text-[8px] uppercase tracking-[0.2em] text-zinc-500 font-black">{item.category}</span>
            <h3 className="text-xs font-bold text-white leading-tight tracking-tight group-hover:text-unihia-accent transition-colors">{item.name}</h3>
          </div>
          <div className="pt-4 border-t border-white/[0.04] flex items-center justify-between">
            <p className="text-unihia-accent font-mono text-[11px] font-black">{item.price}</p>
            <button className="px-3.5 py-2 bg-unihia-accent text-black rounded-lg text-[9px] font-black uppercase tracking-widest active:scale-90 transition-all shadow-lg shadow-unihia-accent/10">
              Obter
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

const AITriadOverlay = ({ isOpen, onClose, onAction, isProcessing }: { isOpen: boolean, onClose: () => void, onAction: () => void, isProcessing: boolean }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/95 backdrop-blur-3xl z-50 flex items-center justify-center p-6"
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="w-full max-w-md space-y-12"
        >
          <div className="text-center space-y-8">
            <div className={`w-28 h-28 bg-unihia-accent rounded-[2.5rem] mx-auto flex items-center justify-center accent-glow border-[10px] border-white/5 ${isProcessing ? 'animate-pulse scale-110' : 'animate-float'}`}>
              <Zap className={`text-black w-12 h-12 fill-current ${isProcessing ? 'animate-spin-slow' : ''}`} />
            </div>
            <div className="space-y-3">
              <h2 className="text-5xl font-bold text-white tracking-tighter leading-none">
                {isProcessing ? 'Orquestrando...' : 'Tríade de IA'}
              </h2>
              <p className="text-zinc-500 text-sm font-medium">
                {isProcessing ? 'Sincronizando modelos de alta fidelidade.' : 'Sinergia entre modelos para orquestração absoluta.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {[
              { id: 'strategic', title: 'Visão Estratégica', desc: 'Análise de cenários e predição de tendências.', color: 'from-blue-500/10' },
              { id: 'assets', title: 'Geração de Ativos', desc: 'Produção de código e mídia de alta fidelidade.', color: 'from-unihia-accent/10' },
              { id: 'execution', title: 'Execução Autônoma', desc: 'Delegação para agentes e fluxos inteligentes.', color: 'from-emerald-500/10' },
            ].map((item) => (
              <button 
                key={item.id} 
                onClick={onAction}
                disabled={isProcessing}
                className={`p-7 bg-white/[0.02] border border-white/[0.06] rounded-[2rem] text-left hover:bg-white/[0.05] transition-all group relative overflow-hidden ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${item.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10 flex items-center justify-between">
                  <div className="space-y-1.5">
                    <h3 className="font-bold text-xl text-white group-hover:text-unihia-accent transition-colors tracking-tight">{item.title}</h3>
                    <p className="text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors font-medium">{item.desc}</p>
                  </div>
                  {isProcessing ? (
                    <div className="w-5 h-5 border-2 border-unihia-accent border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <ChevronRight className="text-zinc-800 group-hover:text-unihia-accent transition-colors" size={20} />
                  )}
                </div>
              </button>
            ))}
          </div>

          <button 
            onClick={onClose}
            disabled={isProcessing}
            className="w-full py-4 text-zinc-600 hover:text-white transition-colors text-[10px] font-black uppercase tracking-[0.3em] disabled:opacity-30"
          >
            Encerrar Sessão
          </button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// --- Main App ---

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('radar');
  const [isTriadOpen, setIsTriadOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAIAction = () => {
    setIsProcessing(true);
    setIsTriadOpen(false);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
    }, 3000);
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'radar': return <RadarScreen />;
      case 'lab': return <LabScreen />;
      case 'comunidade': return <CommunityScreen />;
      case 'mercado': return <MarketScreen />;
      default: return <RadarScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-unihia-dark text-white font-sans selection:bg-unihia-accent selection:text-black">
      {/* Desktop Surround (Recipe 3/8) */}
      <div className="fixed inset-0 hidden lg:flex items-center justify-center pointer-events-none z-0">
        <div className="w-[1200px] h-[800px] bg-white/[0.01] border border-white/[0.03] rounded-[4rem] blur-3xl" />
      </div>

      <Header />
      
      <main className="max-w-md mx-auto min-h-screen relative z-10">
        {renderScreen()}
      </main>

      {/* Bottom Navigation (WhatsApp Style) */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 glass-nav z-40 flex items-center justify-center px-2">
        <div className="w-full max-w-md flex items-center justify-around">
          <button 
            onClick={() => setActiveTab('radar')}
            className={`flex flex-col items-center gap-1.5 transition-all duration-500 ${activeTab === 'radar' ? 'text-unihia-accent' : 'text-zinc-600'}`}
          >
            <Radar size={20} className={activeTab === 'radar' ? 'accent-glow' : ''} />
            <span className="text-[8px] font-black uppercase tracking-[0.2em]">Radar</span>
          </button>

          <button 
            onClick={() => setActiveTab('lab')}
            className={`flex flex-col items-center gap-1.5 transition-all duration-500 ${activeTab === 'lab' ? 'text-unihia-accent' : 'text-zinc-600'}`}
          >
            <FlaskConical size={20} className={activeTab === 'lab' ? 'accent-glow' : ''} />
            <span className="text-[8px] font-black uppercase tracking-[0.2em]">Lab</span>
          </button>

          {/* Central Action Button (Botão de Raio) */}
          <div className="relative -top-8">
            <button 
              onClick={() => setIsTriadOpen(true)}
              className={`w-16 h-16 bg-unihia-accent rounded-[1.5rem] flex items-center justify-center accent-glow active:scale-90 transition-all duration-500 border-[6px] border-black group ${isProcessing ? 'animate-pulse scale-110' : ''}`}
            >
              <Zap className={`text-black w-8 h-8 fill-current group-hover:scale-110 transition-transform ${isProcessing ? 'animate-spin-slow' : ''}`} />
              {isProcessing && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full border-2 border-black animate-bounce" />
              )}
            </button>
          </div>

          <button 
            onClick={() => setActiveTab('comunidade')}
            className={`flex flex-col items-center gap-1.5 transition-all duration-500 ${activeTab === 'comunidade' ? 'text-unihia-accent' : 'text-zinc-600'}`}
          >
            <Users size={20} className={activeTab === 'comunidade' ? 'accent-glow' : ''} />
            <span className="text-[8px] font-black uppercase tracking-[0.2em]">Social</span>
          </button>

          <button 
            onClick={() => setActiveTab('mercado')}
            className={`flex flex-col items-center gap-1.5 transition-all duration-500 ${activeTab === 'mercado' ? 'text-unihia-accent' : 'text-zinc-600'}`}
          >
            <ShoppingBag size={20} className={activeTab === 'mercado' ? 'accent-glow' : ''} />
            <span className="text-[8px] font-black uppercase tracking-[0.2em]">Mercado</span>
          </button>
        </div>
      </nav>

      {/* AI Triad Modal */}
      <AITriadOverlay 
        isOpen={isTriadOpen} 
        onClose={() => setIsTriadOpen(false)} 
        onAction={handleAIAction}
        isProcessing={isProcessing}
      />
    </div>
  );
}

export default App;
