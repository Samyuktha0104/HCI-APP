
import React from 'react';
import { AppUsage } from '../../types';

interface AppCardProps {
  app: AppUsage;
  onLimitChange: (id: AppUsage['id'], newLimit: number) => void;
}

const AppCard: React.FC<AppCardProps> = ({ app, onLimitChange }) => {
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onLimitChange(app.id, parseInt(e.target.value, 10));
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m === 0 ? `${h}h` : `${h}h ${m}m`;
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md mb-6 transition-colors duration-300">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 flex items-center justify-center rounded-full mr-4" style={{ backgroundColor: `${app.color}1A` }}>
          <div className="w-8 h-8" style={{ color: app.color }}>{app.icon}</div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">{app.name}</h3>
          <p className="text-slate-500 dark:text-slate-400">Daily Limit</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{formatTime(app.limit)}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-slate-500">0m</span>
        <input
          type="range"
          min="0"
          max="240"
          step="15"
          value={app.limit}
          onChange={handleSliderChange}
          className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
          style={{
            '--thumb-color': app.color
          } as React.CSSProperties}
        />
        <span className="text-sm text-slate-500">4h</span>
      </div>
        <style>{`
          input[type=range]::-webkit-slider-thumb {
            background-color: var(--thumb-color);
          }
          input[type=range]::-moz-range-thumb {
            background-color: var(--thumb-color);
          }
        `}</style>
    </div>
  );
};


interface HomePageProps {
  apps: AppUsage[];
  onLimitChange: (id: AppUsage['id'], newLimit: number) => void;
}

const HomePage: React.FC<HomePageProps> = ({ apps, onLimitChange }) => {
  return (
    <div>
      <header className="py-4 mb-4">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">FocusGram</h1>
        <p className="text-slate-500 dark:text-slate-400">Set your daily limits and reclaim your focus.</p>
      </header>
      <div>
        {apps.map(app => (
          <AppCard key={app.id} app={app} onLimitChange={onLimitChange} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
