import { useAuth } from '../context/AuthContext';
export const Profile = () => {
  const { user, logout } = useAuth();
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-white font-bold">Perfil: {user?.email}</h1>
      <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded-xl">Sair</button>
    </div>
  );
};
