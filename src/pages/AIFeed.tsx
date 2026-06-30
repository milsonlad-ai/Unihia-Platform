import { useState, useRef, useEffect } from 'react';
import { Brain, Send, Loader2 } from 'lucide-react';
import axios from 'axios';

interface Msg { role: 'user' | 'assistant'; content: string; }

export const AIFeed = () => {
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: 'assistant', content: 'Olá! Sou a Trinity IA integrada na Unihia Platform. Posso ajudar com ideias, projetos, código, estratégias de negócio e muito mais. O que precisas?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Msg = { role: 'user', content: input };
    setMsgs(p => [...p, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: 'És a Trinity IA da Unihia Platform. Ajudas utilizadores a transformar ideias em projetos executáveis. Respondes em português, de forma direta, inteligente e prática.' },
          ...msgs.map(m => ({ role: m.role, content: m.content })),
          { role: 'user', content: input }
        ]
      }, { headers: { Authorization: `Bearer ${import.meta.env.VITE_GROQ_KEY}`, 'Content-Type': 'application/json' } });
      setMsgs(p => [...p, { role: 'assistant', content: res.data.choices[0].message.content }]);
    } catch {
      setMsgs(p => [...p, { role: 'assistant', content: 'Erro ao conectar com a IA. Verifica a tua ligação.' }]);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)]">
      <div className="px-4 py-3 border-b border-u-border flex items-center gap-2">
        <div className="w-8 h-8 bg-u-accent rounded-xl flex items-center justify-center">
          <Brain size={16} className="text-black" />
        </div>
        <div>
          <p className="text-white font-bold text-sm">Trinity IA</p>
          <p className="text-green-400 text-xs">● Online</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
              m.role === 'user' ? 'bg-u-accent text-black font-medium rounded-br-sm' : 'bg-u-card border border-u-border text-u-text rounded-bl-sm'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-u-card border border-u-border rounded-2xl rounded-bl-sm px-4 py-3">
              <Loader2 size={16} className="text-u-accent animate-spin" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="px-4 py-3 border-t border-u-border flex items-center gap-2">
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Pergunta à Trinity IA..."
          className="flex-1 bg-u-card border border-u-border rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-u-accent transition-colors placeholder:text-u-muted" />
        <button onClick={send} disabled={loading || !input.trim()}
          className="w-11 h-11 bg-u-accent rounded-xl flex items-center justify-center flex-shrink-0 disabled:opacity-40 active:scale-95 transition-transform">
          <Send size={18} className="text-black" />
        </button>
      </div>
    </div>
  );
};
