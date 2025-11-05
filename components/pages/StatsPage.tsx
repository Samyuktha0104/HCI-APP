
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { AppUsage } from '../../types';

interface StatsPageProps {
  apps: AppUsage[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const format = (mins: number) => {
        const h = Math.floor(mins / 60);
        const m = mins % 60;
        return `${h > 0 ? `${h}h ` : ''}${m}m`;
    }
    return (
      <div className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg">
        <p className="font-bold text-slate-900 dark:text-white">{label}</p>
        <p style={{ color: data.color }}>Usage: {format(data.weeklyUsage)}</p>
        <p className="text-slate-500 dark:text-slate-400">Limit: {format(data.weeklyLimit)}</p>
      </div>
    );
  }
  return null;
};

const StatsPage: React.FC<StatsPageProps> = ({ apps }) => {
  const weeklyData = apps.map(app => ({
      ...app,
      weeklyUsage: app.usage.reduce((sum, daily) => sum + daily, 0),
      weeklyLimit: app.limit * 7,
  }))

  const totalUsage = weeklyData.reduce((sum, app) => sum + app.weeklyUsage, 0);
  const totalLimit = weeklyData.reduce((sum, app) => sum + app.weeklyLimit, 0);

  const formatTime = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h > 0 ? `${h}h ` : ''}${m}m`;
  };
  
  return (
    <div>
      <header className="py-4 mb-4">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Weekly Stats</h1>
        <p className="text-slate-500 dark:text-slate-400">Your weekly screen time at a glance.</p>
      </header>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md mb-6 transition-colors duration-300">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Total Screen Time</h3>
        <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">{formatTime(totalUsage)}</p>
        <p className="text-slate-500 dark:text-slate-400">of your {formatTime(totalLimit)} weekly goal</p>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 mt-4">
          <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${Math.min(100, (totalUsage / totalLimit) * 100)}%` }}></div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-md transition-colors duration-300 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
            <XAxis dataKey="name" tick={{ fill: 'currentColor' }} className="text-sm text-slate-600 dark:text-slate-400" />
            <YAxis unit="m" tick={{ fill: 'currentColor' }} className="text-sm text-slate-600 dark:text-slate-400" />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(128, 128, 128, 0.1)' }} />
            <Legend wrapperStyle={{ fontSize: '14px' }} />
            <Bar dataKey="weeklyUsage" name="Time Spent (weekly)" radius={[4, 4, 0, 0]}>
              {weeklyData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} opacity={entry.weeklyUsage > entry.weeklyLimit ? 1 : 0.7} />
              ))}
            </Bar>
            <Bar dataKey="weeklyLimit" name="Weekly Limit" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatsPage;
