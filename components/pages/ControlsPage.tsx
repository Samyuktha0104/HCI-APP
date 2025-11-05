
import React from 'react';

interface ControlsPageProps {
  isMonochrome: boolean;
  setIsMonochrome: (value: boolean) => void;
  isSlowScroll: boolean;
  setIsSlowScroll: (value: boolean) => void;
  isScreenTimer: boolean;
  setIsScreenTimer: (value: boolean) => void;
}

const ToggleSwitch: React.FC<{ checked: boolean; onChange: (checked: boolean) => void }> = ({ checked, onChange }) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="sr-only peer" />
      <div className="w-14 h-8 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-slate-300 dark:after:border-slate-600 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-slate-600 peer-checked:bg-indigo-600"></div>
    </label>
  );
};

const ControlItem: React.FC<{title: string, description: string, checked: boolean, onChange: (value: boolean) => void}> = 
  ({title, description, checked, onChange}) => (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md transition-colors duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs">
            {description}
          </p>
        </div>
        <ToggleSwitch checked={checked} onChange={onChange} />
      </div>
      <div className="mt-4 text-center">
          <p className={`text-lg font-semibold transition-colors duration-300 ${checked ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-300'}`}>
              {title} is currently {checked ? 'ON' : 'OFF'}
          </p>
      </div>
    </div>
);


const ControlsPage: React.FC<ControlsPageProps> = ({ isMonochrome, setIsMonochrome, isSlowScroll, setIsSlowScroll, isScreenTimer, setIsScreenTimer }) => {
  return (
    <div>
      <header className="py-4 mb-4">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Device Controls</h1>
        <p className="text-slate-500 dark:text-slate-400">Manage device-level focus settings.</p>
      </header>

      <div className="space-y-6">
        <ControlItem
            title="Monochrome Mode"
            description="Reduces visual stimulation by making your screen black and white."
            checked={isMonochrome}
            onChange={setIsMonochrome}
        />
        <ControlItem
            title="Slow Scroll"
            description="Slows down scrolling on social media apps after your limit is reached."
            checked={isSlowScroll}
            onChange={setIsSlowScroll}
        />
        <ControlItem
            title="Screen Timer"
            description="Displays a persistent timer on screen while using limited apps."
            checked={isScreenTimer}
            onChange={setIsScreenTimer}
        />
      </div>
    </div>
  );
};

export default ControlsPage;
