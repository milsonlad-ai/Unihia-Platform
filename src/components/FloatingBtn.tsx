import { useState, useRef, useEffect } from 'react';
import { Zap } from 'lucide-react';

const snap = (x: number, y: number) => ({
  x: x < window.innerWidth / 2 ? 15 : window.innerWidth - 75,
  y: Math.max(100, Math.min(y, window.innerHeight - 200)),
});

export const FloatingBtn = () => {
  const [pos, setPos] = useState(() => ({
    x: window.innerWidth - 75,
    y: window.innerHeight - 180,
  }));
  const draggingRef = useRef(false);
  const dragTimeoutRef = useRef<number | null>(null);
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: TouchEvent) => {
      if (!draggingRef.current) return;
      e.preventDefault();
      const t = e.touches[0];
      setPos({ x: t.clientX - offset.current.x, y: t.clientY - offset.current.y });
    };
    const onEnd = () => {
      // Cancela drag pendente se o utilizador soltou antes do delay.
      if (dragTimeoutRef.current !== null) {
        window.clearTimeout(dragTimeoutRef.current);
        dragTimeoutRef.current = null;
      }
      if (draggingRef.current) {
        draggingRef.current = false;
        setPos((p) => snap(p.x, p.y));
      }
    };
    const onResize = () => setPos((p) => snap(p.x, p.y));

    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onEnd);
    window.addEventListener('touchcancel', onEnd);
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
    return () => {
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);
      window.removeEventListener('touchcancel', onEnd);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
      if (dragTimeoutRef.current !== null) window.clearTimeout(dragTimeoutRef.current);
    };
  }, []);

  return (
    <button
      onTouchStart={(e) => {
        const t = e.touches[0];
        offset.current = { x: t.clientX - pos.x, y: t.clientY - pos.y };
        dragTimeoutRef.current = window.setTimeout(() => {
          draggingRef.current = true;
          dragTimeoutRef.current = null;
        }, 200);
      }}
      style={{
        left: pos.x,
        top: pos.y,
        transition: draggingRef.current
          ? 'none'
          : 'all 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28)',
      }}
      className="fixed z-[100] w-14 h-14 rounded-full bg-u-accent shadow-[0_0_20px_rgba(249,115,22,0.4)] flex items-center justify-center active:scale-90"
    >
      <Zap size={26} className="text-black fill-black" />
    </button>
  );
};
