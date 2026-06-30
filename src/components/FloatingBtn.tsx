import { useState, useRef, useEffect } from 'react';
import { Zap } from 'lucide-react';

export const FloatingBtn = () => {
  const [pos, setPos] = useState({ x: window.innerWidth - 75, y: window.innerHeight - 180 });
  const [dragging, setDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

  const snap = (x: number, y: number) => ({
    x: x < window.innerWidth / 2 ? 15 : window.innerWidth - 75,
    y: Math.max(100, Math.min(y, window.innerHeight - 200))
  });

  useEffect(() => {
    const onMove = (e: TouchEvent) => {
      if (!dragging) return;
      e.preventDefault();
      const t = e.touches[0];
      setPos({ x: t.clientX - offset.current.x, y: t.clientY - offset.current.y });
    };
    const onEnd = () => { if (dragging) { setDragging(false); setPos(p => snap(p.x, p.y)); } };
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onEnd);
    return () => { window.removeEventListener('touchmove', onMove); window.removeEventListener('touchend', onEnd); };
  }, [dragging]);

  return (
    <button
      onTouchStart={e => {
        const t = e.touches[0];
        offset.current = { x: t.clientX - pos.x, y: t.clientY - pos.y };
        setTimeout(() => setDragging(true), 200);
      }}
      style={{ left: pos.x, top: pos.y, transition: dragging ? 'none' : 'all 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28)' }}
      className="fixed z-[100] w-14 h-14 rounded-full bg-u-accent shadow-[0_0_20px_rgba(249,115,22,0.4)] flex items-center justify-center active:scale-90"
    >
      <Zap size={26} className="text-black fill-black" />
    </button>
  );
};
