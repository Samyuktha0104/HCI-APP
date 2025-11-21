import React, { useState } from "react";
import { AppUsage } from "../../types";

interface AppCardProps {
  app: AppUsage;
  onLimitChange: (id: AppUsage["id"], newLimit: number) => void;
}

const AppCard: React.FC<AppCardProps> = ({ app, onLimitChange }) => {
  const [inputValue, setInputValue] = useState(app.limit); // For manual input

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLimit = parseInt(e.target.value, 10);
    setInputValue(newLimit);
    onLimitChange(app.id, newLimit);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numberValue = parseInt(value, 10);
    if (!isNaN(numberValue) && numberValue >= 0 && numberValue <= 240) {
      setInputValue(numberValue);
      onLimitChange(app.id, numberValue);
    } else if (value === "") {
      setInputValue(0);
    }
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
        <div
          className="w-12 h-12 flex items-center justify-center rounded-full mr-4"
          style={{ backgroundColor: `${app.color}1A` }}
        >
          <div className="w-8 h-8" style={{ color: app.color }}>
            {app.icon}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            {app.name}
          </h3>
          <p className="text-slate-500 dark:text-slate-400">Daily Limit</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {formatTime(inputValue)}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4 mb-2">
        <span className="text-sm text-slate-500">0m</span>
        <input
          type="range"
          min="0"
          max="240"
          step="1" // continuous slider
          value={inputValue}
          onChange={handleSliderChange}
          className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
          style={{ "--thumb-color": app.color } as React.CSSProperties}
        />
        <span className="text-sm text-slate-500">4h</span>
      </div>
      <div className="flex items-center space-x-2">
        <label className="text-sm text-slate-500">
          Set manually (minutes):
        </label>
        <input
          type="number"
          min={0}
          max={240}
          value={inputValue}
          onChange={handleInputChange}
          className="w-20 p-1 rounded border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
        />
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

export default AppCard;
