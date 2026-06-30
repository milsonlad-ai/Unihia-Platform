import { useAuth } from '../context/AuthContext';
import { Zap, Star, TrendingUp, Code2, Lightbulb, Users } from 'lucide-react';

export const Profile = () => {
  const { user, logout } = useAuth();
  const name = user?.user_metadata?.name || user?.email?.split('@')[0] || 'Utilizador';
  const initial = name[0].toUpperCase();

  const stats = [
    { icon: Lightbulb, label: 'Ideias', value: '12' },
    { icon: Code2, label: 'Projetos', value: '4' },
    { icon: Users, label: 'Seguidores', value: '89' },
    { icon: TrendingUp, label: 'Impacto', value: '2.4k' },
  ];

  return (
    <div className="px-4 py-4 max-w-lg mx-auto space-y-4">
      <div className="bg-u-card border border-u-border rounded-2xl p-5 text-center space-y-3">
        <div className="w-20 h-20 rounded-2xl bg-u-accent mx-auto flex items-center justify-center">
          <span className="text-black font-black text-3xl">{initial}</span>
        </div>
        <div>
          <h2 className="text-white font-black text-xl">{name}</h2>
          <p className="text-u-muted text-sm">{user?.email}</p>
        </div>
        <div className="flex items-center justify-center gap-1.5 bg-u-accent/10 border border-u-accent/20 rounded-xl px-3 py-1.5 w-fit mx-auto">
          <Star size={12} className="text-u-accent fill-u-accent" />
          <span className="text-u-accent text-xs font-bold">Builder · Nível 2</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {stats.map(({ icon: Icon, label, value }) => (
          <div key={label} className="bg-u-card border border-u-border rounded-2xl p-3 text-center">
            <Icon size={16} className="text-u-accent mx-auto mb-1" />
            <p className="text-white font-black text-lg leading-none">{value}</p>
            <p className="text-u-muted text-[10px] mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <div className="bg-u-card border border-u-border rounded-2xl p-4 space-y-2">
        <h3 className="text-white font-bold text-sm">Conta</h3>
        {[
          { label: 'Editar Perfil', action: () => {} },
          { label: 'Notificações', action: () => {} },
          { label: 'Privacidade', action: () => {} },
          { label: 'Segurança', action: () => {} },
        ].map(({ label, action }) => (
          <button key={label} onClick={action} className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-u-border/50 text-u-text text-sm transition-colors flex items-center justify-between">
            {label}
            <span className="text-u-muted">›</span>
          </button>
        ))}
      </div>

      <button onClick={logout} className="w-full py-3.5 rounded-xl border border-red-500/30 text-red-400 text-sm font-bold hover:bg-red-500/10 transition-colors active:scale-95">
        Terminar Sessão
      </button>

      <div className="flex items-center justify-center gap-1.5 py-2">
        <Zap size={12} className="text-u-accent fill-u-accent" />
        <span className="text-u-muted text-xs">Unihia Platform v2.0</span>
      </div>
    </div>
  );
};
