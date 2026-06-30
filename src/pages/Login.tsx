import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const { login } = useAuth();
  const nav = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setErr('');
    const error = await login(email, pass);
    if (error) { setErr(error); setLoading(false); return; }
    nav('/');
  };

  return (
    <div className="min-h-screen bg-u-dark flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-u-accent rounded-2xl mx-auto flex items-center justify-center mb-4">
            <Zap size={28} className="text-black fill-black" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tighter">Unihia</h1>
          <p className="text-u-muted text-sm mt-1">Plataforma de Execução Inteligente</p>
        </div>
        <form onSubmit={submit} className="space-y-3">
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
            className="w-full bg-u-card border border-u-border rounded-xl py-3.5 px-4 text-white text-sm outline-none focus:border-u-accent transition-colors placeholder:text-u-muted" />
          <div className="relative">
            <input type={show ? 'text' : 'password'} placeholder="Senha" value={pass} onChange={e => setPass(e.target.value)}
              className="w-full bg-u-card border border-u-border rounded-xl py-3.5 px-4 pr-11 text-white text-sm outline-none focus:border-u-accent transition-colors placeholder:text-u-muted" />
            <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-u-muted">
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {err && <p className="text-red-400 text-xs text-center">{err}</p>}
          <button type="submit" disabled={loading}
            className="w-full bg-u-accent text-black font-black py-3.5 rounded-xl text-sm uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50">
            {loading ? <Loader2 size={18} className="animate-spin" /> : 'Entrar'}
          </button>
        </form>
        <p className="text-center text-u-muted text-sm">
          Sem conta? <Link to="/register" className="text-u-accent font-semibold">Registar</Link>
        </p>
      </div>
    </div>
  );
};
