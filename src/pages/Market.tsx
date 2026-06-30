import { ShoppingBag, TrendingUp, Star } from 'lucide-react';

const items = [
  { id: 1, name: 'Template SaaS Dashboard', author: 'Pedro Lima', price: '$49', rating: 4.9, sales: 234, cat: 'Template' },
  { id: 2, name: 'Plano de Negócio IA', author: 'Ana Costa', price: '$29', rating: 4.7, sales: 156, cat: 'Documento' },
  { id: 3, name: 'API de Análise de Sentimentos', author: 'Carlos Dev', price: '$19/mês', rating: 4.8, sales: 89, cat: 'API' },
  { id: 4, name: 'Consultoria de Produto 1h', author: 'Sofia Alves', price: '$120', rating: 5.0, sales: 45, cat: 'Serviço' },
  { id: 5, name: 'Kit UI Glassmorphism', author: 'Lara UX', price: '$39', rating: 4.6, sales: 312, cat: 'Design' },
  { id: 6, name: 'Curso: Lançar Startup em 30 dias', author: 'Miguel S.', price: '$89', rating: 4.9, sales: 567, cat: 'Curso' },
];

export const Market = () => (
  <div className="px-4 py-4 max-w-lg mx-auto space-y-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <ShoppingBag size={20} className="text-u-accent" />
        <h2 className="text-white font-black text-xl">Marketplace</h2>
      </div>
      <button className="flex items-center gap-1.5 text-xs text-u-accent font-bold bg-u-accent/10 border border-u-accent/20 px-3 py-1.5 rounded-xl">
        <TrendingUp size={12} /> Vender
      </button>
    </div>

    <div className="space-y-3">
      {items.map(item => (
        <div key={item.id} className="bg-u-card border border-u-border rounded-2xl p-4 flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold text-u-accent bg-u-accent/10 px-2 py-0.5 rounded-full">{item.cat}</span>
            </div>
            <p className="text-white font-bold text-sm leading-tight truncate">{item.name}</p>
            <p className="text-u-muted text-xs mt-0.5">{item.author}</p>
            <div className="flex items-center gap-2 mt-1.5">
              <div className="flex items-center gap-0.5 text-yellow-400">
                <Star size={11} className="fill-current" />
                <span className="text-xs font-semibold text-white">{item.rating}</span>
              </div>
              <span className="text-u-muted text-xs">{item.sales} vendas</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            <p className="text-u-accent font-black text-base">{item.price}</p>
            <button className="bg-u-accent text-black font-black text-[10px] px-3 py-1.5 rounded-lg uppercase tracking-wider active:scale-95 transition-transform">
              Comprar
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);
