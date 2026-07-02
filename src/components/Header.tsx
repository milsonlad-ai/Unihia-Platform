export const Header = () => (
  <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#1f1f1f] flex items-center justify-between px-5">
    <div className="flex items-center gap-3">
      <div className="text-[#f97316] text-xl">☰</div>
      <span className="text-white font-black tracking-widest text-lg">UNIHIA</span>
    </div>
    <div className="flex items-center gap-4 text-[#525252]">
      <span>🛎️</span>
      <span>💬</span>
    </div>
  </header>
);
