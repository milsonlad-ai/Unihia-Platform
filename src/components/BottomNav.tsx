import { NavLink } from 'react-router-dom';

export const BottomNav = () => (
  <nav className="fixed bottom-0 left-0 right-0 z-50 h-20 bg-[#111]/90 backdrop-blur-md border-t border-[#1f1f1f] flex items-center justify-around pb-2">
    <NavLink to="/" className="flex flex-col items-center gap-1 text-[#525252]">
      <span className="text-xl">🎯</span>
      <span className="text-[9px] font-bold">HOME</span>
    </NavLink>
    <NavLink to="/inspiration" className="flex flex-col items-center gap-1 text-[#525252]">
      <span className="text-xl">🧭</span>
      <span className="text-[9px] font-bold">INSPIRE</span>
    </NavLink>
    <NavLink to="/ai" className="flex flex-col items-center gap-1 text-[#f97316]">
      <span className="text-xl">🧠</span>
      <span className="text-[9px] font-bold">AI FEED</span>
    </NavLink>
    <NavLink to="/market" className="flex flex-col items-center gap-1 text-[#525252]">
      <span className="text-xl">🛍️</span>
      <span className="text-[9px] font-bold">MARKET</span>
    </NavLink>
    <button className="flex flex-col items-center gap-1 text-[#525252]">
      <span className="text-xl">✨</span>
      <span className="text-[9px] font-bold">CREATE</span>
    </button>
    <NavLink to="/profile" className="flex flex-col items-center gap-1 text-[#525252]">
      <div className="w-6 h-6 rounded-full bg-[#f97316] text-black text-[10px] flex items-center justify-center font-bold">L</div>
      <span className="text-[9px] font-bold">PERFIL</span>
    </NavLink>
  </nav>
);
