import { NavLink } from 'react-router-dom';
import { Target, Compass, Brain, ShoppingBag, Sparkles, User } from 'lucide-react';

const tabs = [
  { to: '/', icon: Target, label: 'Home' },
  { to: '/inspiration', icon: Compass, label: 'Inspiration' },
  { to: '/ai', icon: Brain, label: 'AI Feed' },
  { to: '/market', icon: ShoppingBag, label: 'Market' },
];

export const BottomNav = () => (
  <nav className="fixed bottom-0 left-0 right-0 z-50 h-20 glass border-t border-u-border flex items-center justify-around px-2 pb-2">
    {tabs.map(({ to, icon: Icon, label }) => (
      <NavLink key={to} to={to} className={({ isActive }) => 
        `flex flex-col items-center gap-1 transition-all ${isActive ? 'text-u-accent scale-110' : 'text-u-muted'}`
      }>
        <Icon size={22} strokeWidth={isActive ? 2.5 : 1.5} />
        <span className="text-[9px] font-bold uppercase tracking-widest">{label}</span>
      </NavLink>
    ))}
    <button className="flex flex-col items-center gap-1 text-u-muted active:text-u-accent">
      <div className="w-6 h-6 rounded border-2 border-current flex items-center justify-center">
        <Sparkles size={14} />
      </div>
      <span className="text-[9px] font-bold uppercase tracking-widest">Special</span>
    </button>
    <NavLink to="/profile" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-u-accent' : 'text-u-muted'}`}>
      <div className="w-7 h-7 rounded-full border-2 border-current overflow-hidden bg-u-card">
        <User size={20} className="m-auto mt-0.5" />
      </div>
      <span className="text-[9px] font-bold uppercase tracking-widest">Perfil</span>
    </NavLink>
  </nav>
);
