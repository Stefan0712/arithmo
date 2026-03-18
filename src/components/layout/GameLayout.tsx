import { Outlet } from 'react-router-dom';

export const GameLayout = () => {
  return (
    <div className="relative h-full w-full bg-cyber-dark overflow-hidden flex flex-col">
      <Outlet />
    </div>
  );
};