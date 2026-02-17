import { Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { Header } from './Header';
import { useStore } from '../../context/useStore';
import Store from '../pages/Store/Store';

export const MainLayout = () => {

  const { isOpen } = useStore();
  
  return (
    <div className="flex flex-col h-[100dvh] bg-background text-body overflow-hidden font-sans ">
      <Header />
      <main className="flex-1 overflow-y-auto relative no-scrollbar relative">
        {isOpen ? <Store /> : null}
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};