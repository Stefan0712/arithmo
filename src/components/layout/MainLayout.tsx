import { Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { Header } from './Header';

export const MainLayout = () => {
  return (
    <div className="flex flex-col h-screen bg-background text-white overflow-hidden font-sans">
      <Header />
      <main className="flex-1 overflow-y-auto relative no-scrollbar">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};