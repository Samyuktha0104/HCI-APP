
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppUsage } from './types';
import HomePage from './components/pages/HomePage';
import ControlsPage from './components/pages/ControlsPage';
import StatsPage from './components/pages/StatsPage';
import SettingsPage from './components/pages/SettingsPage';
import NavBar from './components/NavBar';
import { InstagramIcon } from './components/icons/InstagramIcon';
import { TikTokIcon } from './components/icons/TikTokIcon';
import { YouTubeIcon } from './components/icons/YouTubeIcon';

const initialApps: AppUsage[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    limit: 60, // minutes
    usage: [45, 55, 30, 65, 70, 40, 50], // minutes per day for a week
    icon: <InstagramIcon />,
    color: '#E1306C',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    limit: 45, // minutes
    usage: [55, 60, 40, 50, 45, 70, 65], // minutes
    icon: <TikTokIcon />,
    color: '#000000',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    limit: 90, // minutes
    usage: [70, 80, 95, 100, 60, 75, 85], // minutes
    icon: <YouTubeIcon />,
    color: '#FF0000',
  },
];

interface Settings {
  name: string;
  email: string;
  sound: boolean;
  notifications: boolean;
  appEnabled: boolean;
}

const App: React.FC = () => {
  const [apps, setApps] = useState<AppUsage[]>(initialApps);
  const [isMonochrome, setIsMonochrome] = useState<boolean>(false);
  const [isSlowScroll, setIsSlowScroll] = useState<boolean>(false);
  const [isScreenTimer, setIsScreenTimer] = useState<boolean>(true);
  const [settings, setSettings] = useState<Settings>({
    name: 'Alex Doe',
    email: 'alex.doe@example.com',
    sound: true,
    notifications: true,
    appEnabled: true,
  });

  const handleLimitChange = (id: 'instagram' | 'tiktok' | 'youtube', newLimit: number) => {
    setApps(prevApps =>
      prevApps.map(app =>
        app.id === id ? { ...app, limit: newLimit } : app
      )
    );
  };

  return (
    <div className="min-h-screen font-sans text-slate-800 dark:text-slate-200 flex flex-col">
      <main className="flex-grow pb-20">
        <div className="max-w-md mx-auto p-4">
          <Routes>
            <Route path="/" element={<HomePage apps={apps} onLimitChange={handleLimitChange} />} />
            <Route 
              path="/controls" 
              element={
                <ControlsPage 
                  isMonochrome={isMonochrome} 
                  setIsMonochrome={setIsMonochrome}
                  isSlowScroll={isSlowScroll}
                  setIsSlowScroll={setIsSlowScroll}
                  isScreenTimer={isScreenTimer}
                  setIsScreenTimer={setIsScreenTimer}
                />
              } 
            />
            <Route path="/stats" element={<StatsPage apps={apps} />} />
            <Route path="/settings" element={<SettingsPage settings={settings} setSettings={setSettings} />} />
          </Routes>
        </div>
      </main>
      <NavBar />
    </div>
  );
};

export default App;
