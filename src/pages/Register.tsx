import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [done, setDone] = useState(false);
  const { register } = useAuth();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pass.length < 6) { setErr('Senha mínima: 6 caracteres'); return; }
    setLoading(true); setErr('');
    const error = await register(email, pass, name);
    if (error) { setErr(error); setLoading(false); return; }
    setDone(true);
  };

  if (done) return (
    <div className="min-h-screen bg-u-dark flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-2xl mx-auto flex items-center justify-center mb-4">
        <Zap size={28} className="text-green-400" />
      </div>
      <h2 className="text-2xl font-black text-white">Conta criada!</h2>
      <p className="text-u-muted text-sm mt-2 mb-6">Confirme o seu email para ativar a conta.</p>
      <Link to="/login" className="bg-u-accent text-black font-black py-3 px-8 rounded-xl text-sm uppercase tracking-widest">Ir para Login</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-u-dark flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-u-accent rounded-2xl mx-auto flex items-center justify-center mb-4">
            <Zap size={28} className="text-black fill-black" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tighter">Criar Conta</h1>
          <p className="text-u-muted text-sm mt-1">Junte-se ao ecossistema Unihia</p>
        </div>
        <form onSubmit={submit} className="space-y-3">
          <input type="text" placeholder="Nome completo" value={name} onChange={e => setName(e.target.value)}
            className="w-full bg-u-card border border-u-border rounded-xl py-3.5 px-4 text-white text-sm outline-none focus:border-u-accent transition-colors placeholder:text-u-muted" />
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
            className="w-full bg-u-card border border-u-border rounded-xl py-3.5 px-4 text-white text-sm outline-none focus:border-u-accent transition-colors placeholder:text-u-muted" />
          <div className="relative">
            <input type={show ? 'text' : 'password'} placeholder="Senha (mín. 6 caracteres)" value={pass} onChange={e => setPass(e.target.value)}
              className="w-full bg-u-card border border-u-border rounded-xl py-3.5 px-4 pr-11 text-white text-sm outline-none focus:border-u-accent transition-colors placeholder:text-u-muted" />
            <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-u-muted">
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {err && <p className="text-red-400 text-xs text-center">{err}</p>}
          <button type="submit" disabled={loading}
            className="w-full bg-u-accent text-black font-black py-3.5 rounded-xl text-sm uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50">
            {loading ? <Loader2 size={18} className="animate-spin" /> : 'Criar Conta'}
          </button>
        </form>
        <p className="text-center text-u-muted text-sm">
          Já tem conta? <Link to="/login" className="text-u-accent font-semibold">Entrar</Link>
        </p>
      </div>
    </div>
  );
};
