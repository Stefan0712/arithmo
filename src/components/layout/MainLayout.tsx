import { Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { Header } from './Header';
import Store from '../pages/Store/Store';
import { useStoreUI } from '../../store/useUIStore';

export const MainLayout = () => {

  const { isStoreOpen } = useStoreUI();
  
  return (
    <div className="flex flex-col h-full w-full bg-background text-body overflow-hidden font-sans ">
      <Header />
      <main className="flex-1 overflow-y-auto relative no-scrollbar relative">
        {isStoreOpen ? <Store /> : null}
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};