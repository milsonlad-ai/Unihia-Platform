import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://' + window.location.hostname + ':3000');

export const AIFeed = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'Trinity Conectada. O que vamos evoluir hoje?' }]);

  useEffect(() => {
    socket.on('resposta', (res) => {
      const texto = res.agents.resposta_ia || "Processado.";
      setMessages(prev => [...prev, { role: 'assistant', content: texto }]);
    });
    return () => { socket.off('resposta'); };
  }, []);

  const enviar = () => {
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    socket.emit('prompt', input);
    setInput('');
  };

  return (
    <div className="space-y-4">
      <div className="h-[60vh] overflow-y-auto space-y-3 p-2">
        {messages.map((m, i) => (
          <div key={i} className={`p-3 rounded-2xl max-w-[80%] ${m.role === 'user' ? 'bg-[#f97316] text-black ml-auto' : 'bg-[#111] border border-[#1f1f1f] text-white'}`}>
            {m.content}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input value={input} onChange={e => setInput(e.target.value)} className="flex-1 bg-[#111] border border-[#1f1f1f] p-3 rounded-xl outline-none" placeholder="Comando para Trinity..." />
        <button onClick={enviar} className="bg-[#f97316] text-black font-bold p-3 rounded-xl">ENVIAR</button>
      </div>
    </div>
  );
};
