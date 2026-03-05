import React, { useState, useEffect } from 'react';
import { 
  Radar, 
  Lightbulb, 
  Rocket, 
  ShoppingBag, 
  Users, 
  MessageSquare, 
  User as UserIcon, 
  TrendingUp, 
  Search,
  Plus,
  Zap,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  Globe,
  Briefcase
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { User, Project, Opportunity, AppSettings, SavedItem } from './types';

// Mock Accounts
const MOCK_ACCOUNTS: User[] = [
  {
    id: 'user_1',
    name: 'Alex Rivera',
    email: 'alex@unihia.com',
    bio: 'Serial Entrepreneur & AI Architect. Building the future of human-AI collaboration.',
    skills: ['AI', 'Product Design', 'Venture Capital'],
    reputation: 980,
    avatar: 'https://picsum.photos/seed/alex/200/200'
  },
  {
    id: 'user_2',
    name: 'Sarah Chen',
    email: 'sarah@unihia.com',
    bio: 'Venture Partner & Growth Strategist.',
    skills: ['Growth', 'Strategy', 'Finance'],
    reputation: 1250,
    avatar: 'https://picsum.photos/seed/sarah/200/200'
  }
];

const DEFAULT_SETTINGS: AppSettings = {
  language: 'English',
  theme: 'dark',
  accentColor: '#F27D26',
  fontFamily: 'sans',
  feedLayout: 'grid',
  aiInterventionLevel: 50
};

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function App() {
  const [activeTab, setActiveTab] = useState('radar');
  const [accounts, setAccounts] = useState<User[]>(MOCK_ACCOUNTS);
  const [currentAccountIdx, setCurrentAccountIdx] = useState(0);
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const user = accounts[currentAccountIdx];

  const tabs = [
    { id: 'radar', label: 'Radar', icon: Radar },
    { id: 'inspiration', label: 'Inspiration', icon: Sparkles },
    { id: 'creation', label: 'Creation', icon: Lightbulb },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'investors', label: 'Investors', icon: TrendingUp },
    { id: 'chat', label: 'Chat', icon: MessageSquare },
    { id: 'saved', label: 'Saved', icon: ShoppingBag }, // Reusing icon for now
    { id: 'profile', label: 'Profile', icon: UserIcon },
    { id: 'settings', label: 'Settings', icon: Zap }, // Reusing icon for now
  ];

  const switchAccount = () => {
    setCurrentAccountIdx((prev) => (prev + 1) % accounts.length);
  };

  const getThemeClass = () => {
    if (settings.theme === 'gradient') return 'bg-gradient-to-br from-unihia-dark via-[#1a1a1a] to-unihia-accent/10';
    if (settings.theme === 'light') return 'bg-white text-black';
    return 'bg-unihia-dark text-white';
  };

  return (
    <div 
      className={`flex h-screen overflow-hidden transition-colors duration-500 ${getThemeClass()} font-${settings.fontFamily}`}
      style={{ '--unihia-accent': settings.accentColor } as any}
    >
      {/* Sidebar Navigation */}
      <nav className="w-20 md:w-64 border-r border-white/5 flex flex-col items-center md:items-start py-8 px-4 gap-8">
        <div className="flex items-center gap-3 px-2">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-unihia-accent/20 cursor-pointer"
            style={{ backgroundColor: settings.accentColor }}
          >
            <Zap className="text-white fill-current" size={24} />
          </div>
          <span className="hidden md:block font-serif text-2xl font-bold tracking-tight">UNIHIA</span>
        </div>

        <div className="flex-1 w-full flex flex-col gap-2 overflow-y-auto unihia-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group ${
                activeTab === tab.id 
                  ? 'bg-white/10 text-white' 
                  : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon 
                size={22} 
                className={activeTab === tab.id ? '' : 'group-hover:opacity-100'} 
                style={{ color: activeTab === tab.id ? settings.accentColor : undefined }}
              />
              <span className="hidden md:block font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="w-full pt-8 border-t border-white/5 space-y-4">
          <div className="flex items-center gap-3 px-2 cursor-pointer group" onClick={switchAccount}>
            <div className="relative">
              <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border border-white/10" referrerPolicy="no-referrer" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-unihia-dark rounded-full" />
            </div>
            <div className="hidden md:block flex-1">
              <p className="text-sm font-semibold truncate">{user.name}</p>
              <p className="text-xs text-white/40">Switch Account</p>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto unihia-scrollbar">
        <header className="sticky top-0 z-10 bg-inherit/80 backdrop-blur-xl border-bottom border-white/5 px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif font-bold capitalize">{activeTab}</h1>
            <p className="text-sm text-white/40">Welcome back, {user.name.split(' ')[0]}. Language: {settings.language}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input 
                type="text" 
                placeholder="Search everything..." 
                className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 w-64 focus:outline-none focus:border-unihia-accent/50 transition-colors"
              />
            </div>
            <button 
              className="text-white px-4 py-2 rounded-full flex items-center gap-2 font-medium transition-all shadow-lg"
              style={{ backgroundColor: settings.accentColor }}
            >
              <Plus size={18} />
              <span className="hidden sm:inline">New Project</span>
            </button>
          </div>
        </header>

        <div className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'radar' && <RadarFeed user={user} settings={settings} />}
              {activeTab === 'inspiration' && <InspirationFeed settings={settings} onSave={(item) => setSavedItems(prev => [...prev, item])} />}
              {activeTab === 'creation' && <CreationLab />}
              {activeTab === 'marketplace' && <Marketplace />}
              {activeTab === 'community' && <Community />}
              {activeTab === 'investors' && <Investors />}
              {activeTab === 'chat' && <Chat />}
              {activeTab === 'saved' && <SavedLibrary items={savedItems} />}
              {activeTab === 'profile' && <Profile user={user} />}
              {activeTab === 'settings' && <SettingsHub settings={settings} setSettings={setSettings} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

// --- Sub-Components ---

function RadarFeed({ user, settings }: { user: User, settings: AppSettings }) {
  const [opps, setOpps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateOpps = async () => {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: `Generate 4 highly personalized business/investment opportunities for a user with these skills: ${user.skills.join(', ')}. 
          The user prefers ${settings.language} and has an AI intervention level of ${settings.aiInterventionLevel}%.
          Format as JSON array of objects: { id, type, title, description, match_score, action_label }.
          Types: 'investor', 'team', 'market', 'project'.`,
          config: { responseMimeType: "application/json" }
        });
        const data = JSON.parse(response.text || '[]');
        setOpps(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    generateOpps();
  }, [user.id, settings.language]);

  if (loading) return <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
    {[1,2,3,4].map(i => <div key={i} className="h-48 glass-card" />)}
  </div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Sparkles className="text-unihia-accent" size={20} />
          AI-Orchestrated Opportunities
        </h2>
        <span className="text-xs text-white/40 uppercase tracking-widest">Live Pulse • Real-time</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {opps.map((opp) => (
          <motion.div 
            key={opp.id}
            whileHover={{ scale: 1.01 }}
            className="glass-card p-6 flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  opp.type === 'investor' ? 'bg-emerald-500/20 text-emerald-400' :
                  opp.type === 'team' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-unihia-accent/20 text-unihia-accent'
                }`}>
                  {opp.type}
                </span>
                <span className="text-xs font-mono text-white/40">{opp.match_score}% Match</span>
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-unihia-accent transition-colors">{opp.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6">{opp.description}</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex-1 bg-white text-black font-bold py-2 rounded-lg text-sm hover:bg-white/90 transition-all">
                {opp.action_label}
              </button>
              <button className="p-2 border border-white/10 rounded-lg hover:bg-white/5 transition-all">
                <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function InspirationFeed({ settings, onSave }: { settings: AppSettings, onSave: (item: SavedItem) => void }) {
  const [pins, setPins] = useState([
    { id: 1, title: 'Neural Interface Design', img: 'https://picsum.photos/seed/neural/400/600', tags: ['AI', 'UX'], originalTitle: 'Neural Interface Design' },
    { id: 2, title: 'Sustainable Smart Cities', img: 'https://picsum.photos/seed/city/400/400', tags: ['Green', 'IoT'], originalTitle: 'Sustainable Smart Cities' },
    { id: 3, title: 'Quantum Computing SDK', img: 'https://picsum.photos/seed/quantum/400/500', tags: ['Dev', 'Future'], originalTitle: 'Quantum Computing SDK' },
    { id: 4, title: 'Vertical Farming Automation', img: 'https://picsum.photos/seed/farm/400/700', tags: ['Agri', 'Robotics'], originalTitle: 'Vertical Farming Automation' },
    { id: 5, title: 'Decentralized Identity', img: 'https://picsum.photos/seed/id/400/450', tags: ['Web3', 'Security'], originalTitle: 'Decentralized Identity' },
    { id: 6, title: 'Space Tourism Logistics', img: 'https://picsum.photos/seed/space/400/550', tags: ['Space', 'Ops'], originalTitle: 'Space Tourism Logistics' },
  ]);

  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  const translatePin = async (id: number) => {
    const pin = pins.find(p => p.id === id);
    if (!pin) return;
    
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Translate the following title to ${settings.language}: "${pin.originalTitle}"`,
      });
      const translated = response.text?.trim() || pin.title;
      setPins(prev => prev.map(p => p.id === id ? { ...p, title: translated } : p));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = (pin: any) => {
    onSave({
      id: `pin_${pin.id}_${Date.now()}`,
      type: 'pin',
      title: pin.title,
      content: pin,
      category: pin.tags[0],
      savedAt: new Date().toISOString()
    });
    setActiveMenu(null);
  };

  return (
    <div className={`gap-6 space-y-6 ${
      settings.feedLayout === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 
      settings.feedLayout === 'list' ? 'flex flex-col max-w-2xl mx-auto' : 
      'columns-1 sm:columns-2 lg:columns-3'
    }`}>
      {pins.map((pin) => (
        <motion.div 
          key={pin.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative group rounded-2xl overflow-hidden cursor-pointer glass-card"
        >
          <img src={pin.img} alt={pin.title} className="w-full object-cover transition-transform duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
          
          {/* Quick Tools Menu */}
          <div className="absolute top-4 right-4 z-20">
            <button 
              onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === pin.id ? null : pin.id); }}
              className="p-2 bg-black/60 backdrop-blur-md rounded-full text-white hover:bg-unihia-accent transition-colors"
            >
              <Zap size={16} />
            </button>
            
            <AnimatePresence>
              {activeMenu === pin.id && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, x: 10 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: 10 }}
                  className="absolute top-10 right-0 w-48 bg-unihia-card border border-white/10 rounded-xl shadow-2xl p-2 space-y-1"
                >
                  <button onClick={() => translatePin(pin.id)} className="w-full text-left px-3 py-2 text-xs hover:bg-white/5 rounded-lg flex items-center gap-2">
                    <Globe size={14} /> Translate to {settings.language}
                  </button>
                  <button onClick={() => handleSave(pin)} className="w-full text-left px-3 py-2 text-xs hover:bg-white/5 rounded-lg flex items-center gap-2">
                    <ShoppingBag size={14} /> Save to Library
                  </button>
                  <button className="w-full text-left px-3 py-2 text-xs hover:bg-white/5 rounded-lg flex items-center gap-2 text-unihia-accent">
                    <Rocket size={14} /> Execute Project
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
            <h3 className="text-lg font-bold mb-2">{pin.title}</h3>
            <div className="flex gap-2 mb-4">
              {pin.tags.map(t => <span key={t} className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">{t}</span>)}
            </div>
            <button className="w-full bg-unihia-accent text-white font-bold py-2 rounded-lg text-sm flex items-center justify-center gap-2">
              <Rocket size={16} />
              Execute Idea
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function CreationLab() {
  const [prompt, setPrompt] = useState('');
  const [roadmap, setRoadmap] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const generateRoadmap = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Create a professional startup roadmap for this idea: "${prompt}". 
        Return JSON: { title, phases: [{ name, tasks: [string], timeline }] }`,
        config: { responseMimeType: "application/json" }
      });
      setRoadmap(JSON.parse(response.text || '{}'));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-serif font-bold">Idea Laboratory</h2>
        <p className="text-white/40">Transform your spark into a structured execution plan with Orchestrated AI.</p>
      </div>

      <div className="glass-card p-8 space-y-6">
        <textarea 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your vision... (e.g., A marketplace for carbon credits using blockchain)"
          className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-unihia-accent/50 transition-all resize-none"
        />
        <button 
          onClick={generateRoadmap}
          disabled={loading || !prompt}
          className="w-full bg-gradient-to-r from-unihia-accent to-unihia-gold text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 shadow-xl shadow-unihia-accent/20 disabled:opacity-50"
        >
          {loading ? <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/20 border-t-white" /> : <Sparkles size={20} />}
          Generate Strategic Roadmap
        </button>
      </div>

      {roadmap && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-white/10" />
            <h3 className="text-xl font-serif italic text-unihia-gold">{roadmap.title}</h3>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roadmap.phases.map((phase: any, idx: number) => (
              <div key={idx} className="glass-card p-6 border-t-2 border-t-unihia-accent">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-white/40">Phase 0{idx + 1}</span>
                  <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full">{phase.timeline}</span>
                </div>
                <h4 className="font-bold mb-4">{phase.name}</h4>
                <ul className="space-y-2">
                  {phase.tasks.map((task: string, tIdx: number) => (
                    <li key={tIdx} className="text-xs text-white/60 flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full bg-unihia-accent mt-1.5" />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

function Marketplace() {
  const projects = [
    { id: 1, title: 'EcoTrack AI', price: '$45,000', type: 'Startup', metrics: { roi: '24%', impact: 'High' }, img: 'https://picsum.photos/seed/eco/800/400' },
    { id: 2, title: 'DeFi Lending Protocol', price: '$120,000', type: 'Prototype', metrics: { roi: '40%', impact: 'Medium' }, img: 'https://picsum.photos/seed/defi/800/400' },
    { id: 3, title: 'HealthSync Wearable', price: '$250,000', type: 'Business Model', metrics: { roi: '18%', impact: 'Global' }, img: 'https://picsum.photos/seed/health/800/400' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-serif font-bold">Innovation Market</h2>
          <p className="text-white/40">Acquire, license, or invest in verified high-potential assets.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium">Filter</button>
          <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium">Sort</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {projects.map((p) => (
          <div key={p.id} className="glass-card overflow-hidden group">
            <div className="h-48 relative">
              <img src={p.img} alt={p.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-unihia-gold">
                {p.price}
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">{p.type}</span>
                <div className="flex gap-2">
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full">ROI: {p.metrics.roi}</span>
                </div>
              </div>
              <h3 className="text-xl font-bold">{p.title}</h3>
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => <img key={i} src={`https://picsum.photos/seed/${i+10}/50/50`} className="w-6 h-6 rounded-full border border-unihia-dark" referrerPolicy="no-referrer" />)}
                  <div className="w-6 h-6 rounded-full bg-white/10 border border-unihia-dark flex items-center justify-center text-[8px]">+12</div>
                </div>
                <button className="text-unihia-accent text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                  View Details <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Community() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <div className="glass-card p-8">
          <h3 className="text-xl font-bold mb-6">Active Project Rooms</h3>
          <div className="space-y-4">
            {[1,2,3].map(i => (
              <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-unihia-accent/30 transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-unihia-accent to-unihia-gold flex items-center justify-center font-bold">
                    P{i}
                  </div>
                  <div>
                    <h4 className="font-bold">Mars Colony Logistics v{i}.0</h4>
                    <p className="text-xs text-white/40">12 members • 4 tasks pending</p>
                  </div>
                </div>
                <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-xs font-bold transition-all">Join Room</button>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-8">
          <h3 className="text-xl font-bold mb-6">AI-Suggested Collaborators</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1,2,3,4].map(i => (
              <div key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                <img src={`https://picsum.photos/seed/user${i}/100/100`} className="w-12 h-12 rounded-full" referrerPolicy="no-referrer" />
                <div>
                  <h4 className="text-sm font-bold">User Name {i}</h4>
                  <p className="text-[10px] text-white/40">Expert in Blockchain & Rust</p>
                  <div className="mt-2 flex gap-1">
                    <span className="text-[8px] bg-unihia-accent/10 text-unihia-accent px-1.5 py-0.5 rounded">98% Match</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold mb-4">Reputation Leaderboard</h3>
          <div className="space-y-4">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-white/20">0{i}</span>
                  <img src={`https://picsum.photos/seed/top${i}/50/50`} className="w-8 h-8 rounded-full" referrerPolicy="no-referrer" />
                  <span className="text-sm font-medium">Alpha User {i}</span>
                </div>
                <span className="text-xs font-bold text-unihia-gold">{1200 - i * 50} pts</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-unihia-accent/10 border border-unihia-accent/20 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-unihia-accent mb-2">Global Impact</h3>
          <p className="text-xs text-white/60 mb-4">Unihia has facilitated over $2.4M in project funding this month.</p>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-unihia-accent w-3/4" />
          </div>
          <div className="flex justify-between mt-2 text-[10px] font-mono text-white/40">
            <span>$0</span>
            <span>$3.2M Target</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Investors() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 flex flex-col items-center justify-center text-center space-y-2">
          <Globe className="text-unihia-accent" size={32} />
          <h3 className="text-2xl font-bold">$1.2B</h3>
          <p className="text-xs text-white/40 uppercase tracking-widest">Available Liquidity</p>
        </div>
        <div className="glass-card p-6 flex flex-col items-center justify-center text-center space-y-2">
          <Briefcase className="text-emerald-400" size={32} />
          <h3 className="text-2xl font-bold">452</h3>
          <p className="text-xs text-white/40 uppercase tracking-widest">Active Funds</p>
        </div>
        <div className="glass-card p-6 flex flex-col items-center justify-center text-center space-y-2">
          <TrendingUp className="text-blue-400" size={32} />
          <h3 className="text-2xl font-bold">12.4%</h3>
          <p className="text-xs text-white/40 uppercase tracking-widest">Avg. ROI (Q1)</p>
        </div>
      </div>

      <div className="glass-card p-8">
        <h3 className="text-xl font-bold mb-6">Investment Opportunities for You</h3>
        <div className="space-y-6">
          {[1,2].map(i => (
            <div key={i} className="p-6 bg-white/5 rounded-2xl border border-white/5 flex flex-col md:flex-row gap-6">
              <img src={`https://picsum.photos/seed/inv${i}/300/200`} className="w-full md:w-48 h-32 object-cover rounded-xl" referrerPolicy="no-referrer" />
              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-bold">Project Phoenix: Sustainable Energy</h4>
                    <p className="text-sm text-white/60">Seeking $500k for Series A. 15% Equity.</p>
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-[10px] font-bold">HIGH POTENTIAL</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-2 bg-white/5 rounded-lg">
                    <p className="text-[10px] text-white/40 uppercase">Valuation</p>
                    <p className="text-sm font-bold">$3.2M</p>
                  </div>
                  <div className="text-center p-2 bg-white/5 rounded-lg">
                    <p className="text-[10px] text-white/40 uppercase">Raised</p>
                    <p className="text-sm font-bold">$1.1M</p>
                  </div>
                  <div className="text-center p-2 bg-white/5 rounded-lg">
                    <p className="text-[10px] text-white/40 uppercase">Impact</p>
                    <p className="text-sm font-bold">Global</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 bg-unihia-accent text-white font-bold py-2 rounded-lg text-sm">Invest Now</button>
                  <button className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-2 rounded-lg text-sm transition-all">Contact Founder</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Chat() {
  return (
    <div className="h-[calc(100vh-200px)] glass-card flex overflow-hidden">
      <div className="w-80 border-r border-white/5 flex flex-col">
        <div className="p-4 border-b border-white/5">
          <input type="text" placeholder="Search chats..." className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none" />
        </div>
        <div className="flex-1 overflow-y-auto unihia-scrollbar">
          {[1,2,3,4,5].map(i => (
            <div key={i} className={`p-4 flex items-center gap-3 cursor-pointer hover:bg-white/5 transition-all ${i === 1 ? 'bg-white/5' : ''}`}>
              <div className="relative">
                <img src={`https://picsum.photos/seed/chat${i}/50/50`} className="w-10 h-10 rounded-full" referrerPolicy="no-referrer" />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-unihia-dark rounded-full" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-sm font-bold truncate">Project Team Alpha</h4>
                  <span className="text-[10px] text-white/20">12:45</span>
                </div>
                <p className="text-xs text-white/40 truncate">AI: I suggest we focus on the MVP first...</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="https://picsum.photos/seed/chat1/50/50" className="w-10 h-10 rounded-full" referrerPolicy="no-referrer" />
            <div>
              <h4 className="text-sm font-bold">Project Team Alpha</h4>
              <p className="text-[10px] text-emerald-400">AI Orchestrator Active</p>
            </div>
          </div>
          <div className="flex gap-4 text-white/40">
            <button className="hover:text-white transition-colors"><Users size={20} /></button>
            <button className="hover:text-white transition-colors"><Zap size={20} /></button>
          </div>
        </div>
        <div className="flex-1 p-6 overflow-y-auto unihia-scrollbar space-y-6">
          <div className="flex justify-center">
            <span className="text-[10px] bg-white/5 px-3 py-1 rounded-full text-white/40 uppercase tracking-widest">Today</span>
          </div>
          <div className="flex gap-3">
            <img src="https://picsum.photos/seed/user2/50/50" className="w-8 h-8 rounded-full" referrerPolicy="no-referrer" />
            <div className="bg-white/5 rounded-2xl rounded-tl-none p-4 max-w-md">
              <p className="text-sm">Hey team, how's the roadmap looking for the smart city project?</p>
            </div>
          </div>
          <div className="flex gap-3 flex-row-reverse">
            <div className="bg-unihia-accent rounded-2xl rounded-tr-none p-4 max-w-md">
              <p className="text-sm text-white">The AI just finished the Phase 1 analysis. It looks solid!</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-unihia-accent flex items-center justify-center text-white">
              <Zap size={14} fill="currentColor" />
            </div>
            <div className="bg-unihia-accent/10 border border-unihia-accent/20 rounded-2xl rounded-tl-none p-4 max-w-md">
              <p className="text-xs font-bold text-unihia-accent mb-2">AI ORCHESTRATOR SUGGESTION</p>
              <p className="text-sm">Based on current progress, I recommend integrating the 'Neural Interface' pin from Alex's inspiration feed to enhance Phase 2.</p>
              <button className="mt-3 text-[10px] font-bold bg-unihia-accent text-white px-3 py-1 rounded-full">Apply Suggestion</button>
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-white/5">
          <div className="bg-white/5 rounded-xl p-2 flex items-center gap-2">
            <button className="p-2 text-white/40 hover:text-white transition-colors"><Plus size={20} /></button>
            <input type="text" placeholder="Type your message..." className="flex-1 bg-transparent border-none focus:outline-none text-sm" />
            <button className="bg-unihia-accent p-2 rounded-lg text-white"><ArrowUpRight size={20} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Profile({ user }: { user: User }) {
  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="relative">
          <img src={user.avatar} alt={user.name} className="w-40 h-40 rounded-3xl object-cover border-4 border-white/5 shadow-2xl" referrerPolicy="no-referrer" />
          <div className="absolute -bottom-4 -right-4 bg-unihia-accent p-3 rounded-2xl shadow-xl">
            <Zap className="text-white" size={24} fill="currentColor" />
          </div>
        </div>
        <div className="flex-1 text-center md:text-left space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-4xl font-serif font-bold">{user.name}</h2>
              <p className="text-unihia-gold font-mono text-sm">Verified Architect • Top 1% Execution</p>
            </div>
            <div className="flex gap-3 justify-center">
              <button className="bg-white text-black font-bold px-6 py-2 rounded-xl text-sm">Edit Profile</button>
              <button className="bg-white/5 border border-white/10 px-6 py-2 rounded-xl text-sm font-bold">Share</button>
            </div>
          </div>
          <p className="text-white/60 leading-relaxed max-w-2xl">{user.bio}</p>
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {user.skills.map(s => <span key={s} className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs font-medium">{s}</span>)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card p-6 text-center">
          <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Reputation</p>
          <p className="text-2xl font-bold text-unihia-gold">{user.reputation}</p>
        </div>
        <div className="glass-card p-6 text-center">
          <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Projects</p>
          <p className="text-2xl font-bold">24</p>
        </div>
        <div className="glass-card p-6 text-center">
          <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Investments</p>
          <p className="text-2xl font-bold">12</p>
        </div>
        <div className="glass-card p-6 text-center">
          <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Collaborations</p>
          <p className="text-2xl font-bold">156</p>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-bold">Execution History</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1,2,3,4].map(i => (
            <div key={i} className="glass-card p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                <Rocket size={24} className="text-white/40" />
              </div>
              <div>
                <h4 className="font-bold">Project Name {i}</h4>
                <p className="text-xs text-white/40">Successfully exited for $1.2M • 2025</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SavedLibrary({ items }: { items: SavedItem[] }) {
  const [filter, setFilter] = useState('all');

  const filtered = items.filter(i => filter === 'all' || i.type === filter);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-serif font-bold">Personal Library</h2>
          <p className="text-white/40">Your curated collection of inspiration and execution.</p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 unihia-scrollbar">
          {['all', 'pin', 'idea', 'project'].map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-xs font-bold capitalize transition-all whitespace-nowrap ${
                filter === f ? 'bg-unihia-accent text-white' : 'bg-white/5 text-white/40 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {items.length === 0 ? (
        <div className="h-64 glass-card flex flex-col items-center justify-center text-center p-8">
          <ShoppingBag size={48} className="text-white/10 mb-4" />
          <h3 className="text-xl font-bold mb-2">Your library is empty</h3>
          <p className="text-sm text-white/40 max-w-xs">Save pins, ideas, or projects from the feed to see them here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(item => (
            <div key={item.id} className="glass-card p-6 space-y-4 group">
              <div className="flex justify-between items-start">
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full uppercase tracking-widest">{item.type}</span>
                <span className="text-[10px] text-white/20">{new Date(item.savedAt).toLocaleDateString()}</span>
              </div>
              <h4 className="text-lg font-bold group-hover:text-unihia-accent transition-colors">{item.title}</h4>
              <p className="text-xs text-white/40">Category: {item.category}</p>
              <button className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-bold transition-all">View Details</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SettingsHub({ settings, setSettings }: { settings: AppSettings, setSettings: (s: AppSettings) => void }) {
  const languages = ['English', 'Portuguese', 'Spanish', 'French', 'German', 'Japanese', 'Chinese'];
  const themes = ['dark', 'light', 'gradient'];
  const fonts = ['sans', 'serif', 'mono'];
  const layouts = ['grid', 'masonry', 'list'];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-serif font-bold">Advanced Definitions</h2>
        <p className="text-white/40">Customize your Unihia experience to match your workflow and style.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Visual Customization */}
        <div className="glass-card p-8 space-y-8">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Sparkles className="text-unihia-accent" size={20} />
            Visual Interface
          </h3>
          
          <div className="space-y-4">
            <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Theme Mode</label>
            <div className="grid grid-cols-3 gap-2">
              {themes.map(t => (
                <button 
                  key={t}
                  onClick={() => setSettings({ ...settings, theme: t as any })}
                  className={`py-2 rounded-lg text-xs font-bold capitalize border transition-all ${
                    settings.theme === t ? 'bg-unihia-accent border-unihia-accent' : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Accent Color</label>
            <div className="flex gap-3">
              {['#F27D26', '#D4AF37', '#10B981', '#3B82F6', '#8B5CF6'].map(c => (
                <button 
                  key={c}
                  onClick={() => setSettings({ ...settings, accentColor: c })}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    settings.accentColor === c ? 'border-white scale-110' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Typography</label>
            <div className="grid grid-cols-3 gap-2">
              {fonts.map(f => (
                <button 
                  key={f}
                  onClick={() => setSettings({ ...settings, fontFamily: f as any })}
                  className={`py-2 rounded-lg text-xs font-bold capitalize border transition-all font-${f} ${
                    settings.fontFamily === f ? 'bg-unihia-accent border-unihia-accent' : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Functional Settings */}
        <div className="glass-card p-8 space-y-8">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Zap className="text-unihia-accent" size={20} />
            System & IA
          </h3>

          <div className="space-y-4">
            <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Global Language</label>
            <select 
              value={settings.language}
              onChange={(e) => setSettings({ ...settings, language: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-unihia-accent/50"
            >
              {languages.map(l => <option key={l} value={l} className="bg-unihia-dark">{l}</option>)}
            </select>
          </div>

          <div className="space-y-4">
            <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Feed Layout</label>
            <div className="grid grid-cols-3 gap-2">
              {layouts.map(l => (
                <button 
                  key={l}
                  onClick={() => setSettings({ ...settings, feedLayout: l as any })}
                  className={`py-2 rounded-lg text-xs font-bold capitalize border transition-all ${
                    settings.feedLayout === l ? 'bg-unihia-accent border-unihia-accent' : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-white/40 uppercase tracking-widest">AI Intervention Level</label>
              <span className="text-xs font-mono text-unihia-accent">{settings.aiInterventionLevel}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={settings.aiInterventionLevel}
              onChange={(e) => setSettings({ ...settings, aiInterventionLevel: parseInt(e.target.value) })}
              className="w-full accent-unihia-accent"
            />
            <p className="text-[10px] text-white/20">Higher levels allow AI to suggest more proactive collaborations and strategic shifts.</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <button className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-bold hover:bg-white/10 transition-all">Backup Configuration</button>
        <button className="px-8 py-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm font-bold hover:bg-red-500/20 transition-all">Terminate All Sessions</button>
      </div>
    </div>
  );
}


