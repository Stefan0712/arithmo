import { NavLink } from 'react-router-dom';
import { Map, Gamepad2, Trophy, Menu } from 'lucide-react';
import { clsx } from 'clsx';

export const BottomNav = () => {
  const navItems = [
    { label: 'Learning', icon: Map, path: '/saga' },
    { label: 'Arcade', icon: Gamepad2, path: '/arcade' },
    { label: 'Events', icon: Trophy, path: '/events' },
    { label: 'Menu', icon: Menu, path: '/menu' },
  ];

  return (
    <nav className="h-20 border-t border-white/5 flex items-center justify-around px-2 z-50 pb-safe bg-surface">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => clsx(
            "flex flex-col items-center justify-center w-16 h-16 rounded-xl transition-all duration-200 active:scale-95",
            isActive 
              ? "text-cyber-cyan text-nav-active" 
              : "text-slate-500 hover:text-slate-300 text-nav-inactive"
          )}
        >
          <item.icon size={24} className='nav-icon' strokeWidth={2.5} />
          <span className="text-[10px] text-primary font-bold mt-1 tracking-wide">
            {item.label}
          </span>
        </NavLink>
      ))}
    </nav>
  );
};