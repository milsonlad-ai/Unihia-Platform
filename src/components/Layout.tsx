import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, NavLink, Link } from 'react-router-dom';
import { 
  Radar, 
  Search, 
  Zap, 
  Handshake, 
  MessageSquare, 
  Brain, 
  Users,
  Bell, 
  Menu,
  Loader2,
  Compass,
  ShoppingBag,
  Bookmark,
  Settings as SettingsIcon,
  Plus,
  X,
  Video,
  ChevronRight,
  Sparkles,
  LayoutGrid
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useGamification } from '../GamificationContext';
import { AITriadOverlay } from './AITriadOverlay';
import { TrinityAssistant } from './TrinityAssistant';

const Header = ({ onMenuOpen }: { onMenuOpen: () => void }) => (
  <header className="fixed top-0 left-0 right-0 h-16 glass-header z-40 flex items-center justify-center px-6">
    <div className="w-full max-w-md flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuOpen}
          className="p-2.5 text-zinc-500 hover:text-unihia-accent transition-all hover:bg-white/5 rounded-full"
        >
          <Menu size={20} />
        </button>
        <Link to="/home" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 bg-unihia-accent rounded-lg flex items-center justify-center accent-glow transition-transform group-hover:scale-105">
            <Zap className="text-black w-4 h-4 fill-current" />
          </div>
          <span className="text-white font-bold tracking-tighter text-lg group-hover:text-unihia-accent transition-colors">UNIHIA</span>
        </Link>
      </div>
      <div className="flex items-center gap-1">
        <Link to="/notifications" className="p-2.5 text-zinc-500 hover:text-unihia-accent transition-all hover:bg-white/5 rounded-full relative">
          <Bell size={18} />
          <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-unihia-accent rounded-full border border-black" />
        </Link>
        <Link to="/video-call" className="p-2.5 text-zinc-500 hover:text-unihia-accent transition-all hover:bg-white/5 rounded-full">
          <Video size={18} />
        </Link>
      </div>
    </div>
  </header>
);

const SideMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const secondaryNav = [
    { to: '/projects', icon: LayoutGrid, label: 'Projetos' },
    { to: '/investors', icon: Handshake, label: 'Investidores' },
    { to: '/saved', icon: Bookmark, label: 'Guardados' },
    { to: '/notifications', icon: Bell, label: 'Notificações' },
    { to: '/settings', icon: SettingsIcon, label: 'Configurações' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 bottom-0 w-72 bg-unihia-dark border-r border-white/5 z-[70] p-8 flex flex-col"
          >
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-unihia-accent rounded-xl flex items-center justify-center">
                  <Zap className="text-black w-5 h-5 fill-current" />
                </div>
                <span className="text-white font-black tracking-tighter text-xl">UNIHIA</span>
              </div>
              <button onClick={onClose} className="p-2 text-zinc-500 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 space-y-2">
              <p className="text-[10px] text-zinc-600 uppercase tracking-[0.2em] font-black mb-6 px-4">Navegação Secundária</p>
              {secondaryNav.map((item) => (
                <Link 
                  key={item.to}
                  to={item.to}
                  onClick={onClose}
                  className="flex items-center gap-4 p-4 rounded-2xl text-zinc-400 hover:text-unihia-accent hover:bg-white/5 transition-all group"
                >
                  <item.icon size={20} className="group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-bold tracking-tight">{item.label}</span>
                  <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </nav>

            <div className="pt-8 border-t border-white/5">
              <div className="bg-unihia-accent/5 rounded-3xl p-6 border border-unihia-accent/10">
                <p className="text-[9px] text-unihia-accent uppercase tracking-widest font-black mb-2">Status da Orquestração</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-xs text-white font-bold">IA Ativa • 98% Eficiência</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export const Layout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { awardPoints, unlockBadge } = useGamification();
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // Remember last page
  useEffect(() => {
    const lastPath = localStorage.getItem('unihia_last_path');
    if (lastPath && location.pathname === '/') {
      navigate(lastPath, { replace: true });
    }
  }, []);

  useEffect(() => {
    const publicPaths = ['/login', '/register', '/onboarding'];
    if (!publicPaths.includes(location.pathname)) {
      localStorage.setItem('unihia_last_path', location.pathname);
    }
  }, [location.pathname]);

  const mainNavItems = [
    { to: '/home', icon: Radar, label: 'Home' },
    { to: '/inspiration', icon: Compass, label: 'Inspiration' },
    { to: '/ai-feed', icon: Brain, label: 'AI Feed' },
    { to: '/marketplace', icon: ShoppingBag, label: 'Market' },
    { to: '/messages', icon: MessageSquare, label: 'Messages' },
    { to: '/profile', icon: Users, label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-unihia-dark text-white font-sans selection:bg-unihia-accent selection:text-black">
      {/* Desktop Surround */}
      <div className="fixed inset-0 hidden lg:flex items-center justify-center pointer-events-none z-0">
        <div className="w-[1200px] h-[800px] bg-white/[0.01] border border-white/[0.03] rounded-[4rem] blur-3xl" />
      </div>

      <Header onMenuOpen={() => setIsMenuOpen(true)} />
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      
      <main className="max-w-md mx-auto min-h-screen relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Trinity IA Assistant */}
      <TrinityAssistant />

      {/* Floating AI Action Button (FAB) */}
      <div className="fixed bottom-24 right-6 z-50">
        <Link to="/create-idea">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-16 h-16 bg-unihia-accent rounded-3xl flex items-center justify-center accent-glow shadow-2xl shadow-unihia-accent/20 border-4 border-black group"
          >
            <Sparkles className="text-black w-8 h-8 group-hover:rotate-12 transition-transform" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center border-2 border-black">
              <Plus size={14} className="text-black" />
            </div>
          </motion.button>
        </Link>
      </div>

      {/* Bottom Navigation - Main Sections */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 glass-nav z-40 flex items-center justify-center px-1">
        <div className="w-full max-w-md flex items-center justify-between px-4">
          {mainNavItems.map((item) => (
            <NavLink 
              key={item.to}
              to={item.to}
              className={({ isActive }) => `flex flex-col items-center gap-1 transition-all duration-300 flex-1 ${isActive ? 'text-unihia-accent' : 'text-zinc-600'}`}
            >
              {({ isActive }) => (
                <>
                  <item.icon size={20} className={isActive ? 'accent-glow' : ''} />
                  <span className="text-[7px] font-black uppercase tracking-tight">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};
