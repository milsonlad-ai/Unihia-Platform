import { Compass, Zap } from 'lucide-react';

const items = [
  { id: 1, title: 'App de meditação minimalista', cat: 'Design', color: 'from-purple-900 to-u-dark' },
  { id: 2, title: 'Startup de energia solar comunitária', cat: 'Sustentabilidade', color: 'from-green-900 to-u-dark' },
  { id: 3, title: 'Plataforma de mentoria P2P', cat: 'Educação', color: 'from-blue-900 to-u-dark' },
  { id: 4, title: 'Marketplace de arte digital', cat: 'Arte', color: 'from-pink-900 to-u-dark' },
  { id: 5, title: 'IA que escreve código por voz', cat: 'Tech', color: 'from-orange-900 to-u-dark' },
  { id: 6, title: 'Rede social para investidores anjo', cat: 'Finanças', color: 'from-yellow-900 to-u-dark' },
];

export const Inspiration = () => (
  <div className="px-4 py-4 max-w-lg mx-auto space-y-4">
    <div className="flex items-center gap-2">
      <Compass size={20} className="text-u-accent" />
      <h2 className="text-white font-black text-xl">Inspiração</h2>
    </div>
    <div className="grid grid-cols-2 gap-3">
      {items.map(item => (
        <div key={item.id} className={`relative bg-gradient-to-br ${item.color} border border-u-border rounded-2xl p-4 h-36 flex flex-col justify-between overflow-hidden`}>
          <span className="text-[10px] font-bold text-u-accent bg-u-accent/10 px-2 py-0.5 rounded-full w-fit">{item.cat}</span>
          <div>
            <p className="text-white font-bold text-sm leading-tight">{item.title}</p>
            <button className="mt-2 flex items-center gap-1 text-[10px] text-u-accent font-bold">
              <Zap size={10} className="fill-current" /> Expandir com IA
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);
