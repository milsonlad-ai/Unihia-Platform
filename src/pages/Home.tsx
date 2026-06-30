import { useState, useEffect, useRef } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, Zap, TrendingUp } from 'lucide-react';

const CATEGORIES = ['Todos', 'Tech', 'Startups', 'Design', 'IA', 'Finanças'];

const mockPosts = [
  { id: 1, author: 'Ana Costa', role: 'Founder', avatar: 'A', category: 'Startups', title: 'Como validei minha startup em 30 dias', body: 'Descobri que o maior erro dos fundadores é construir antes de validar. Aqui está o método que usei para conseguir 50 clientes pagantes antes de escrever uma linha de código.', likes: 248, comments: 34, time: '2h', tag: 'trending' },
  { id: 2, author: 'Miguel Santos', role: 'Dev Lead', avatar: 'M', category: 'Tech', title: 'Node.js vs Bun em produção', body: 'Depois de migrar 3 APIs críticas para Bun, os resultados foram surpreendentes. Tempo de resposta caiu 40%, uso de memória reduziu à metade. Aqui estão os benchmarks reais.', likes: 189, comments: 22, time: '4h', tag: 'hot' },
  { id: 3, author: 'Lara Ferreira', role: 'UX Designer', avatar: 'L', category: 'Design', title: 'Glassmorphism ainda é relevante?', body: 'Em 2024 vimos o pico do glassmorphism. Em 2025 ele evoluiu. A tendência agora é "Solid Glassmorphism" — profundidade real sem excesso. Exemplos práticos aqui.', likes: 312, comments: 45, time: '6h', tag: 'new' },
  { id: 4, author: 'Carlos Mendes', role: 'AI Engineer', avatar: 'C', category: 'IA', title: 'Groq API: velocidade que muda o jogo', body: 'Testei o Llama 3.3 70B no Groq com latência de 0.3s por token. Para aplicações conversacionais em tempo real, isso é revolucionário. Setup completo com Node.js.', likes: 421, comments: 67, time: '8h', tag: 'trending' },
  { id: 5, author: 'Sofia Alves', role: 'Investor', avatar: 'S', category: 'Finanças', title: 'O que VCs procuram em 2025', body: 'Analisei 200 pitch decks este ano. Os que conseguiram funding tinham 3 coisas em comum: tração real, unit economics claros e founders com obsessão pelo problema.', likes: 534, comments: 89, time: '12h', tag: 'hot' },
  { id: 6, author: 'Pedro Lima', role: 'Builder', avatar: 'P', category: 'Tech', title: 'Construi um SaaS sozinho em 2 semanas', body: 'Usando Supabase + Vite + Tailwind + Groq API, lancei um produto real em 14 dias. MRR atual: $1,200. Aqui está o stack completo e as lições aprendidas.', likes: 678, comments: 112, time: '1d', tag: 'trending' },
];

export const Home = () => {
  const [cat, setCat] = useState('Todos');
  const [posts, setPosts] = useState(mockPosts);
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [saved, setSaved] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  const filtered = cat === 'Todos' ? posts : posts.filter(p => p.category === cat);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !loading) {
        setLoading(true);
        setTimeout(() => {
          setPosts(prev => [...prev, ...mockPosts.map(p => ({
            ...p, id: p.id + prev.length,
            author: p.author + ' Jr.',
            likes: Math.floor(Math.random() * 500),
          }))]);
          setLoading(false);
        }, 1000);
      }
    }, { threshold: 1 });
    if (loaderRef.current) obs.observe(loaderRef.current);
    return () => obs.disconnect();
  }, [loading]);

  const toggleLike = (id: number) => {
    setLiked(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
    setPosts(prev => prev.map(p => p.id === id ? { ...p, likes: liked.has(id) ? p.likes - 1 : p.likes + 1 } : p));
  };

  return (
    <div className="px-4 py-4 space-y-4 max-w-lg mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white font-black text-xl tracking-tight">Feed</h2>
          <p className="text-u-muted text-xs">Ideias que movem o mundo</p>
        </div>
        <div className="flex items-center gap-1.5 bg-u-accent/10 border border-u-accent/20 rounded-xl px-3 py-1.5">
          <TrendingUp size={12} className="text-u-accent" />
          <span className="text-u-accent text-xs font-bold">Em alta</span>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCat(c)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              cat === c ? 'bg-u-accent text-black' : 'bg-u-card border border-u-border text-u-muted hover:text-white'
            }`}>
            {c}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(post => (
          <div key={post.id} className="bg-u-card border border-u-border rounded-2xl p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-u-accent/10 border border-u-accent/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-u-accent font-black text-sm">{post.avatar}</span>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold leading-tight">{post.author}</p>
                  <p className="text-u-muted text-xs">{post.role} · {post.time}</p>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                post.tag === 'trending' ? 'bg-u-accent/10 text-u-accent' :
                post.tag === 'hot' ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'
              }`}>
                {post.tag === 'trending' ? '🔥 trending' : post.tag === 'hot' ? '⚡ hot' : '✨ new'}
              </span>
            </div>

            <div>
              <h3 className="text-white font-bold text-sm leading-snug mb-1">{post.title}</h3>
              <p className="text-u-muted text-xs leading-relaxed line-clamp-3">{post.body}</p>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-u-border">
              <div className="flex items-center gap-3">
                <button onClick={() => toggleLike(post.id)} className={`flex items-center gap-1.5 text-xs transition-colors ${liked.has(post.id) ? 'text-red-400' : 'text-u-muted hover:text-red-400'}`}>
                  <Heart size={15} className={liked.has(post.id) ? 'fill-current' : ''} />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center gap-1.5 text-u-muted hover:text-u-accent text-xs transition-colors">
                  <MessageCircle size={15} />
                  <span>{post.comments}</span>
                </button>
                <button className="flex items-center gap-1.5 text-u-muted hover:text-blue-400 text-xs transition-colors">
                  <Share2 size={15} />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setSaved(p => { const n = new Set(p); n.has(post.id) ? n.delete(post.id) : n.add(post.id); return n; })}
                  className={`transition-colors ${saved.has(post.id) ? 'text-u-accent' : 'text-u-muted hover:text-u-accent'}`}>
                  <Bookmark size={15} className={saved.has(post.id) ? 'fill-current' : ''} />
                </button>
                <button className="flex items-center gap-1 text-[10px] font-bold text-u-accent bg-u-accent/10 border border-u-accent/20 px-2 py-1 rounded-lg hover:bg-u-accent/20 transition-colors">
                  <Zap size={10} className="fill-current" /> IA
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div ref={loaderRef} className="flex justify-center py-4">
        {loading && <div className="w-6 h-6 border-2 border-u-accent border-t-transparent rounded-full animate-spin" />}
      </div>
    </div>
  );
};
