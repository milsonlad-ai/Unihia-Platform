import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { BottomNav } from './BottomNav';
import { FloatingBtn } from './FloatingBtn';

export const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-u-dark text-u-text">
      <Header />
      <main className="flex-1 overflow-y-auto pb-32 pt-20"><Outlet />
      </main>
      <BottomNav />
      <FloatingBtn />
    </div>
  );
};
