import React, { useRef, useEffect, useState } from 'react';
import { 
  Heart, 
  Lightbulb, 
  Bot, 
  Share2, 
  MessageSquare, 
  MoreHorizontal,
  ChevronRight,
  Loader2,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { InspirationItem } from '../types';

interface InspirationCardProps {
  item: InspirationItem;
  onLike: (id: string) => void;
  onSave: (id: string) => void;
  onTransform: (id: string) => void;
  onExpandAI: (item: InspirationItem) => void;
  isLiked: boolean;
  isSaved: boolean;
}

export const InspirationCard: React.FC<InspirationCardProps> = ({ 
  item, 
  onLike, 
  onSave, 
  onTransform, 
  onExpandAI,
  isLiked,
  isSaved
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (item.type !== 'video' || !videoRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {});
          setIsPlaying(true);
        } else {
          videoRef.current?.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, [item.type]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card overflow-hidden group mb-6"
    >
      {/* Media Section */}
      <div className="relative aspect-[4/5] bg-zinc-900 overflow-hidden">
        {item.type === 'video' ? (
          <video
            ref={videoRef}
            src={item.mediaUrl}
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={item.mediaUrl}
            alt={item.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1.5 bg-black/60 backdrop-blur-md text-[9px] uppercase tracking-widest text-unihia-accent font-black rounded-full border border-unihia-accent/30">
            {item.category}
          </span>
        </div>

        {/* Overlay Info (Bottom) */}
        <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10 overflow-hidden">
              <img src={item.author.avatar} alt={item.author.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">{item.author.name}</p>
              <p className="text-[8px] text-zinc-400 uppercase tracking-widest font-black">{item.author.level}</p>
            </div>
          </div>
          <h3 className="text-xl font-bold text-white mb-2 leading-tight tracking-tight">{item.title}</h3>
          <p className="text-zinc-300 text-xs line-clamp-2 font-medium leading-relaxed">{item.description}</p>
        </div>
      </div>

      {/* Interaction Bar */}
      <div className="p-5 flex items-center justify-between border-t border-white/[0.04]">
        <div className="flex items-center gap-5">
          <button 
            onClick={() => onLike(item.id)}
            className={`flex flex-col items-center gap-1 transition-all ${isLiked ? 'text-red-500' : 'text-zinc-500 hover:text-white'}`}
          >
            <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
            <span className="text-[8px] font-black">{item.interactions.likes + (isLiked ? 1 : 0)}</span>
          </button>
          
          <button 
            onClick={() => onSave(item.id)}
            className={`flex flex-col items-center gap-1 transition-all ${isSaved ? 'text-unihia-accent' : 'text-zinc-500 hover:text-white'}`}
          >
            <Lightbulb size={20} fill={isSaved ? "currentColor" : "none"} />
            <span className="text-[8px] font-black">Transformar</span>
          </button>

          <button className="flex flex-col items-center gap-1 text-zinc-500 hover:text-white transition-all">
            <MessageSquare size={20} />
            <span className="text-[8px] font-black">{item.interactions.comments}</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => onExpandAI(item)}
            className="flex items-center gap-2 px-4 py-2 bg-unihia-accent/10 border border-unihia-accent/20 rounded-xl text-unihia-accent hover:bg-unihia-accent hover:text-black transition-all group/ai"
          >
            <Bot size={16} className="group-hover/ai:animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest">Expandir</span>
          </button>
          
          <button className="p-2 text-zinc-500 hover:text-white transition-all">
            <Share2 size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
