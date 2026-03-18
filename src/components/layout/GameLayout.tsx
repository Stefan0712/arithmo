import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../../db/db';

export const GameLayout = () => {

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
    <div className="relative h-full w-full bg-cyber-dark overflow-hidden flex flex-col">
      <Outlet />
    </div>
  );
};