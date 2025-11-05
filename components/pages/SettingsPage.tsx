
import React from 'react';

const ToggleSwitch: React.FC<{ checked: boolean; onChange: (checked: boolean) => void }> = ({ checked, onChange }) => {
    return (
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="sr-only peer" />
        <div className="w-14 h-8 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-slate-300 dark:after:border-slate-600 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-slate-600 peer-checked:bg-indigo-600"></div>
      </label>
    );
};

interface Settings {
  name: string;
  email: string;
  sound: boolean;
  notifications: boolean;
  appEnabled: boolean;
}

interface SettingsPageProps {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ settings, setSettings }) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
    };

    const handleToggleChange = (name: keyof Settings, value: boolean) => {
        setSettings(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div>
            <header className="py-4 mb-4">
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Settings</h1>
                <p className="text-slate-500 dark:text-slate-400">Manage your profile and app preferences.</p>
            </header>

            <div className="space-y-6">
                {/* Profile Section */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Profile</h3>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={settings.name}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={settings.email}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                    </div>
                </div>

                {/* App Settings Section */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">App Settings</h3>
                    <ul className="divide-y divide-slate-200 dark:divide-slate-700">
                        <li className="py-4 flex items-center justify-between">
                            <div>
                                <h4 className="font-semibold text-slate-800 dark:text-slate-200">Enable Sound</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Get audible alerts and feedback.</p>
                            </div>
                            <ToggleSwitch checked={settings.sound} onChange={(val) => handleToggleChange('sound', val)} />
                        </li>
                        <li className="py-4 flex items-center justify-between">
                            <div>
                                <h4 className="font-semibold text-slate-800 dark:text-slate-200">Enable Notifications</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Receive push notifications for limits.</p>
                            </div>
                            <ToggleSwitch checked={settings.notifications} onChange={(val) => handleToggleChange('notifications', val)} />
                        </li>
                        <li className="pt-4 flex items-center justify-between">
                             <div>
                                <h4 className="font-semibold text-slate-800 dark:text-slate-200">Enable App</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Globally turn FocusGram on or off.</p>
                            </div>
                            <ToggleSwitch checked={settings.appEnabled} onChange={(val) => handleToggleChange('appEnabled', val)} />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
