import { useState, useEffect, useRef } from 'react';
import { io, type Socket } from 'socket.io-client';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const getSocketUrl = (): string => {
  const envUrl = import.meta.env.VITE_SOCKET_URL;
  if (envUrl) return envUrl;
  // Fallback dev: mesmo host, porta 3000 — só faz sentido em HTTP local.
  const proto = window.location.protocol === 'https:' ? 'https:' : 'http:';
  return `${proto}//${window.location.hostname}:3000`;
};

export const AIFeed = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Trinity Conectada. O que vamos evoluir hoje?' },
  ]);
  const [connected, setConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(getSocketUrl(), {
      transports: ['websocket'],
      reconnectionAttempts: 3,
      timeout: 5000,
    });
    socketRef.current = socket;

    socket.on('connect', () => setConnected(true));
    socket.on('disconnect', () => setConnected(false));
    socket.on('connect_error', (err) => {
      console.warn('[AIFeed] socket connect_error:', err.message);
      setConnected(false);
    });
    socket.on('resposta', (res: unknown) => {
      const texto =
        (typeof res === 'object' && res !== null && 'agents' in res
          ? // @ts-expect-error runtime shape from backend
            res.agents?.resposta_ia
          : undefined) ?? 'Processado.';
      setMessages((prev) => [...prev, { role: 'assistant', content: String(texto) }]);
    });

    return () => {
      socket.removeAllListeners();
      socket.disconnect();
      socketRef.current = null;
    };
  }, []);

  const enviar = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, { role: 'user', content: trimmed }]);
    socketRef.current?.emit('prompt', trimmed);
    setInput('');
  };

  return (
    <div className="space-y-4">
      <div className="text-xs text-u-muted">
        Estado: {connected ? '🟢 Trinity online' : '🔴 desligada'}
      </div>
      <div className="h-[60vh] overflow-y-auto space-y-3 p-2">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-3 rounded-2xl max-w-[80%] ${
              m.role === 'user'
                ? 'bg-[#f97316] text-black ml-auto'
                : 'bg-[#111] border border-[#1f1f1f] text-white'
            }`}
          >
            {m.content}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && enviar()}
          className="flex-1 bg-[#111] border border-[#1f1f1f] p-3 rounded-xl outline-none"
          placeholder="Comando para Trinity..."
        />
        <button
          onClick={enviar}
          disabled={!input.trim()}
          className="bg-[#f97316] text-black font-bold p-3 rounded-xl disabled:opacity-40"
        >
          ENVIAR
        </button>
      </div>
    </div>
  );
};
