import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate, NavLink } from 'react-router-dom';
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
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useGamification } from '../GamificationContext';
import { AITriadOverlay } from './AITriadOverlay';

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

export const Layout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { awardPoints, unlockBadge } = useGamification();
  const [isTriadOpen, setIsTriadOpen] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);

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

  const handleAIAction = () => {
    setIsProcessing(true);
    setIsTriadOpen(false);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      awardPoints(100, 'Executou orquestração de IA');
      unlockBadge('ai_collaborator');
    }, 3000);
  };

  const navItems = [
    { to: '/home', icon: Radar, label: 'Home' },
    { to: '/explore', icon: Search, label: 'Explore' },
    { to: '/projects', icon: Zap, label: 'Projects' },
    { to: '/investors', icon: Handshake, label: 'Investors' },
    { to: '/chat', icon: MessageSquare, label: 'Chat' },
    { to: '/ai-feed', icon: Brain, label: 'AI Feed' },
    { to: '/profile', icon: Users, label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-unihia-dark text-white font-sans selection:bg-unihia-accent selection:text-black">
      {/* Desktop Surround */}
      <div className="fixed inset-0 hidden lg:flex items-center justify-center pointer-events-none z-0">
        <div className="w-[1200px] h-[800px] bg-white/[0.01] border border-white/[0.03] rounded-[4rem] blur-3xl" />
      </div>

      <Header />
      
      <main className="max-w-md mx-auto min-h-screen relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation - High Density for 7 items */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 glass-nav z-40 flex items-center justify-center px-1">
        <div className="w-full max-w-md flex items-center justify-between px-2">
          {navItems.slice(0, 3).map((item) => (
            <NavLink 
              key={item.to}
              to={item.to}
              className={({ isActive }) => `flex flex-col items-center gap-1 transition-all duration-300 flex-1 ${isActive ? 'text-unihia-accent' : 'text-zinc-600'}`}
            >
              {({ isActive }) => (
                <>
                  <item.icon size={18} className={isActive ? 'accent-glow' : ''} />
                  <span className="text-[7px] font-black uppercase tracking-tight">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}

          {/* Central Action Button */}
          <div className="relative -top-6 px-1">
            <button 
              onClick={() => setIsTriadOpen(true)}
              className={`w-14 h-14 bg-unihia-accent rounded-[1.2rem] flex items-center justify-center accent-glow active:scale-90 transition-all duration-500 border-[4px] border-black group ${isProcessing ? 'animate-pulse scale-110' : ''}`}
            >
              <div className="relative flex items-center justify-center">
                <Zap className={`text-black w-7 h-7 fill-current transition-all duration-500 ${isProcessing ? 'opacity-20 scale-75 blur-[1px]' : 'group-hover:scale-110'}`} />
                {isProcessing && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Loader2 className="text-black w-7 h-7 animate-spin" />
                  </motion.div>
                )}
              </div>
            </button>
          </div>

          {navItems.slice(3).map((item) => (
            <NavLink 
              key={item.to}
              to={item.to}
              className={({ isActive }) => `flex flex-col items-center gap-1 transition-all duration-300 flex-1 ${isActive ? 'text-unihia-accent' : 'text-zinc-600'}`}
            >
              {({ isActive }) => (
                <>
                  <item.icon size={18} className={isActive ? 'accent-glow' : ''} />
                  <span className="text-[7px] font-black uppercase tracking-tight">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      <AITriadOverlay 
        isOpen={isTriadOpen} 
        onClose={() => setIsTriadOpen(false)} 
        onAction={handleAIAction}
        isProcessing={isProcessing}
      />
    </div>
  );
};
