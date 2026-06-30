import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Home } from './pages/Home';
import { Inspiration } from './pages/Inspiration';
import { AIFeed } from './pages/AIFeed';
import { Market } from './pages/Market';
import { Profile } from './pages/Profile';function Guard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="min-h-screen bg-u-dark flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-u-accent border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
  return user ? <>{children}</> : <Navigate to="/login" replace />;
}

export default function App() {
  return (<AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Guard><Layout /></Guard>}>
            <Route index element={<Home />} />
            <Route path="inspiration" element={<Inspiration />} />
            <Route path="ai" element={<AIFeed />} />
            <Route path="market" element={<Market />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
