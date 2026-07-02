import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

const Home = () => <div style={{padding:20, color:'#f97316'}}><h1>UNIHIA HOME</h1><p>Sistema Operacional.</p></div>;
const Login = () => <div style={{padding:20, color:'#f97316'}}><h1>TELA DE LOGIN</h1><p>Por favor, use o computador ou limpe o cache.</p></div>;

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
