import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { BottomNav } from './BottomNav';

export const Layout = () => (
  <div className="flex flex-col min-h-screen bg-[#0a0a0a] text-[#e5e5e5]">
    <Header />
    <main className="flex-1 overflow-y-auto pb-24 pt-20 px-4">
      <Outlet />
    </main>
    <BottomNav />
  </div>
);
