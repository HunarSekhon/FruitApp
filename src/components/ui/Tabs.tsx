import React from 'react';

interface TabOption {
  value: string;
  label: string;
}

interface CustomTabsProps {
  activeTab: string;
  onValueChange: (value: string) => void;
  options: TabOption[];
  className?: string;
}

const CustomTabs: React.FC<CustomTabsProps> = ({
  activeTab,
  onValueChange,
  options,
}) => {
  return (
    <div className="inline-flex rounded-md overflow-hidden border border-gray-300">
        {options.map(({value, label }) => (
          <button
            key={value}
            onClick={() => onValueChange(value)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === value
                ? 'bg-purple-700 text-white'
                : 'bg-purple-200 text-gray-600 hover:bg-purple-300'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
  );
};

export default CustomTabs;