import { Outlet } from 'react-router-dom';

export const GameLayout = () => {
  return (
    <div className="relative h-[100dvh] w-screen bg-cyber-dark overflow-hidden flex flex-col">
      <Outlet />
    </div>
  );
};