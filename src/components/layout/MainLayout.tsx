import { Outlet, useNavigate } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { Header } from './Header';
import Store from '../pages/Store/Store';
import { useStoreUI } from '../../store/useUIStore';
import { useEffect, useState } from 'react';
import { db } from '../../db/db';

export const MainLayout = () => {

  const { isStoreOpen } = useStoreUI();
  const navigate = useNavigate();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const userId = localStorage.getItem('userId');
      const userExists = await db.user.get(userId || '');

      if (!userId || !userExists) {
        navigate('/welcome', { replace: true });
      } else {
        setIsReady(true);
      }
    };

    checkUser();
  }, [navigate]);

  if (!isReady) return <div className="h-screen bg-slate-900" />;
  
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