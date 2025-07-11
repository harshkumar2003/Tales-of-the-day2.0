import React from 'react';
import { Calendar, Plus } from 'lucide-react';

const TabOptions = [
  { key: 'calendar', label: 'Calendar', icon: <Calendar /> },
  { key: 'write', label: 'Write Tale', icon: <Plus /> },
];

function DasboardNav({ activeTab, setActiveTab }) {
  return (
    <div className="p-4 border-b border-gray-300 dark:border-gray-700 shadow-sm w-full">
      <div className="text-black dark:text-white flex space-x-2">
        {TabOptions.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-bold bg-gradient-to-r transition-all duration-200 ${
              activeTab === tab.key
                ? 'from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white'
                : 'from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 text-black dark:text-white'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default DasboardNav;
