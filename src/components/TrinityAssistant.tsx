import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, MessageSquare, X, Send, Loader2, Sparkles, Maximize2, Minimize2, Paperclip, Mic } from 'lucide-react';
import { useTrinity } from '../context/TrinityContext';

export const TrinityAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState('');
  const { messages, isThinking, sendMessage, preferences } = useTrinity();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isThinking) return;
    
    const text = input;
    setInput('');
    await sendMessage(text);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`bg-unihia-dark border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden mb-4 transition-all duration-500 ${isExpanded ? 'w-[80vw] h-[80vh] max-w-4xl' : 'w-96 h-[500px]'}`}
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-unihia-accent rounded-2xl flex items-center justify-center accent-glow">
                  <Zap className="text-black w-5 h-5 fill-current" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm tracking-tight">Trinity IA</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">Núcleo Ativo</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-2 text-zinc-500 hover:text-white transition-colors"
                >
                  {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-zinc-500 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                  <Sparkles className="text-unihia-accent w-12 h-12" />
                  <div className="space-y-1">
                    <p className="text-white font-bold text-sm">Como posso orquestrar hoje?</p>
                    <p className="text-zinc-500 text-[10px] uppercase font-black tracking-widest">Fusão GPT + Claude + Gemini</p>
                  </div>
                </div>
              )}
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-unihia-accent text-black font-medium' 
                      : 'bg-white/5 text-zinc-300 border border-white/5'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isThinking && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-4 rounded-3xl border border-white/5 flex items-center gap-3">
                    <Loader2 className="w-4 h-4 text-unihia-accent animate-spin" />
                    <span className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">Processando Fusão...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-6 bg-white/[0.02] border-t border-white/5">
              <div className="relative flex items-center gap-3">
                <div className="flex-1 relative">
                  <input 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Sugerir ideias, analisar debates..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-5 pr-12 text-white text-sm outline-none focus:border-unihia-accent transition-all placeholder:text-zinc-700"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <button type="button" className="text-zinc-600 hover:text-white transition-colors">
                      <Paperclip size={18} />
                    </button>
                    <button type="button" className="text-zinc-600 hover:text-white transition-colors">
                      <Mic size={18} />
                    </button>
                  </div>
                </div>
                <button 
                  type="submit"
                  disabled={!input.trim() || isThinking}
                  className="w-12 h-12 bg-unihia-accent rounded-2xl flex items-center justify-center text-black active:scale-95 transition-all disabled:opacity-50 accent-glow"
                >
                  <Send size={20} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-[2rem] flex items-center justify-center shadow-2xl transition-all duration-500 ${isOpen ? 'bg-white text-black rotate-90' : 'bg-unihia-accent text-black accent-glow'}`}
      >
        {isOpen ? <X size={28} /> : <Zap size={28} className="fill-current" />}
      </motion.button>
    </div>
  );
};
