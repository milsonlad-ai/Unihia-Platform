import { Menu, Bell, MessageSquare, Zap } from 'lucide-react';

export const Header = () => (
  <header className="fixed top-0 left-0 right-0 z-50 h-16 glass border-b border-u-border flex items-center justify-between px-5">
    <div className="flex items-center gap-4">
      <button className="text-u-text active:scale-90 transition-transform">
        <Menu size={24} />
      </button>
      <div className="flex items-center gap-2">
        <Zap size={20} className="text-u-accent fill-u-accent" />
        <span className="text-white font-black tracking-[0.2em] text-lg uppercase">UNIHIA</span>
      </div>
    </div>
    <div className="flex items-center gap-5">
      <button className="relative text-u-muted hover:text-u-accent transition-colors">
        <Bell size={22} />
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-u-accent rounded-full border-2 border-u-dark" />
      </button>
      <button className="text-u-muted hover:text-u-accent transition-colors">
        <MessageSquare size={22} />
      </button>
    </div>
  </header>
);
