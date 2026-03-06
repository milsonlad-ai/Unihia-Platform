import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';

interface PatternAuthProps {
  onComplete: (pattern: string) => void;
  error?: boolean;
}

export const PatternAuth: React.FC<PatternAuthProps> = ({ onComplete, error }) => {
  const [points, setPoints] = useState<number[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const getPointIndex = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return -1;
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const y = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const relativeX = x - rect.left;
    const relativeY = y - rect.top;
    
    const col = Math.floor((relativeX / rect.width) * 3);
    const row = Math.floor((relativeY / rect.height) * 3);
    
    if (col >= 0 && col < 3 && row >= 0 && row < 3) {
      return row * 3 + col;
    }
    return -1;
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    const index = getPointIndex(e);
    if (index !== -1) {
      setPoints([index]);
    }
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const index = getPointIndex(e);
    if (index !== -1 && !points.includes(index)) {
      setPoints(prev => [...prev, index]);
    }
  };

  const handleEnd = () => {
    if (points.length >= 4) {
      onComplete(points.join(','));
    } else if (points.length > 0) {
      // Too short
      onComplete(''); // Trigger error
    }
    setIsDrawing(false);
    setPoints([]);
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      <div 
        ref={containerRef}
        className={`grid grid-cols-3 gap-8 p-8 bg-white/[0.02] border rounded-[2.5rem] touch-none transition-colors ${error ? 'border-red-500/50' : 'border-white/10'}`}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="relative w-12 h-12 flex items-center justify-center">
            <motion.div 
              animate={{ 
                scale: points.includes(i) ? 1.5 : 1,
                backgroundColor: points.includes(i) ? 'var(--unihia-accent)' : 'rgba(255,255,255,0.1)'
              }}
              className="w-3 h-3 rounded-full transition-colors"
            />
            {points.includes(i) && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute inset-0 bg-unihia-accent/20 rounded-full blur-md"
              />
            )}
          </div>
        ))}
      </div>
      <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-black">
        {points.length > 0 ? `Desenhando: ${points.length} pontos` : 'Desenhe seu padrão'}
      </p>
    </div>
  );
};
