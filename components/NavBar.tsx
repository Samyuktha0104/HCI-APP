
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Page } from '../types';
import { HomeIcon } from './icons/HomeIcon';
import { ControlsIcon } from './icons/ControlsIcon';
import { StatsIcon } from './icons/StatsIcon';
import { SettingsIcon } from './icons/SettingsIcon';

const navItems = [
  { path: Page.Home, icon: HomeIcon, label: 'Home' },
  { path: Page.Controls, icon: ControlsIcon, label: 'Controls' },
  { path: Page.Stats, icon: StatsIcon, label: 'Stats' },
  { path: Page.Settings, icon: SettingsIcon, label: 'Settings' },
];

const NavBar: React.FC = () => {
  const activeLinkClass = 'text-indigo-600 dark:text-indigo-400';
  const inactiveLinkClass = 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200';

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-t border-slate-200 dark:border-slate-700">
      <div className="max-w-md mx-auto flex justify-around items-center h-16">
        {navItems.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) => 
              `flex flex-col items-center justify-center w-20 transition-colors duration-200 ${isActive ? activeLinkClass : inactiveLinkClass}`
            }
          >
            <Icon className="h-6 w-6" />
            <span className="text-xs mt-1">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
