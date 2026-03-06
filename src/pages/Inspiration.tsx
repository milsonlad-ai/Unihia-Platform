import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Search, TrendingUp, ChevronRight, Zap, Globe, Play, Heart, MessageCircle, Share2, Bookmark, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const VideoCard = ({ title, author, trend }: { title: string; author: string; trend: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsPlaying(true);
        } else {
          setIsPlaying(false);
        }
      },
      { threshold: 0.6 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={videoRef} className="relative aspect-[9/16] w-full bg-zinc-900 rounded-[2.5rem] overflow-hidden group mb-8 border border-white/5">
      {/* Simulated Video Content */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
      <div className="absolute inset-0 flex items-center justify-center">
        {!isPlaying ? (
          <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20">
            <Play className="text-white fill-current" size={24} />
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-unihia-accent/5 animate-pulse"
          />
        )}
      </div>

      {/* Overlay Info */}
      <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 bg-unihia-accent text-black text-[9px] font-black uppercase tracking-widest rounded-lg">
            Trending {trend}
          </span>
        </div>
        <h3 className="text-2xl font-bold text-white leading-tight tracking-tight">
          {title}
        </h3>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/10 rounded-full border border-white/20 flex items-center justify-center">
            <Globe size={14} className="text-unihia-accent" />
          </div>
          <span className="text-xs font-bold text-zinc-300">@{author}</span>
        </div>
      </div>

      {/* Side Actions */}
      <div className="absolute right-4 bottom-24 flex flex-col gap-6">
        <button className="flex flex-col items-center gap-1 group">
          <div className="p-3 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 group-hover:bg-unihia-accent group-hover:text-black transition-all">
            <Heart size={20} />
          </div>
          <span className="text-[10px] font-bold">1.2k</span>
        </button>
        <button className="flex flex-col items-center gap-1 group">
          <div className="p-3 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 group-hover:bg-unihia-accent group-hover:text-black transition-all">
            <MessageCircle size={20} />
          </div>
          <span className="text-[10px] font-bold">42</span>
        </button>
        <button className="flex flex-col items-center gap-1 group">
          <div className="p-3 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 group-hover:bg-unihia-accent group-hover:text-black transition-all">
            <Share2 size={20} />
          </div>
        </button>
      </div>
    </div>
  );
};

export const Inspiration: React.FC = () => {
  const [items, setItems] = useState([
    { id: '1', title: 'O Futuro da Logística em Angola', author: 'Unihia AI', trend: '+15%' },
    { id: '2', title: 'Fintechs: O Próximo Unicórnio Africano', author: 'Estrategista', trend: '+8%' },
    { id: '3', title: 'Educação Descentralizada via IA', author: 'Neural Mind', trend: '+22%' },
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const loadMore = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      const newItems = [
        { id: Math.random().toString(), title: 'Agrotech: Revolução Verde', author: 'BioBot', trend: '+12%' },
        { id: Math.random().toString(), title: 'Energia Solar Inteligente', author: 'SunIA', trend: '+18%' },
      ];
      setItems(prev => [...prev, ...newItems]);
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        loadMore();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 pt-24 pb-32 space-y-10"
    >
      <div className="flex items-end justify-between">
        <div className="space-y-1.5">
          <h2 className="text-4xl font-serif italic font-bold text-white leading-none tracking-tight">Inspiração</h2>
          <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-black">Descubra o Próximo Grande Salto</p>
        </div>
        <div className="p-2.5 bg-unihia-accent/10 rounded-2xl border border-unihia-accent/20">
          <Compass className="text-unihia-accent" size={18} />
        </div>
      </div>

      <div className="flex items-center gap-4 bg-white/[0.02] border border-white/[0.05] rounded-2xl p-4">
        <Search size={18} className="text-zinc-600" />
        <input 
          type="text" 
          placeholder="Buscar inspiração..." 
          className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-zinc-700 font-medium"
        />
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <VideoCard key={item.id} {...item} />
        ))}
      </div>

      {loading && (
        <div className="flex justify-center py-8">
          <Loader2 className="text-unihia-accent animate-spin" size={32} />
        </div>
      )}
    </motion.div>
  );
};
