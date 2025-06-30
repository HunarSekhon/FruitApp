import React from 'react';
import type { JarViewTabType } from '../../types/fruit.types';
import CustomTabs from '../ui/Tabs';

interface JarSummaryProps {
  activeTab: JarViewTabType;
  onTabChange: (tab: JarViewTabType) => void;
  totalCalories: number;
  itemCount: number;
}

const JarSummary: React.FC<JarSummaryProps> = ({
  activeTab,
  onTabChange,
  totalCalories,
  itemCount
}) => {
  const tabs = [
    { value: 'jar' as const, label: 'Jar' },
    { value: 'chart' as const, label: 'Chart' },
  ];

  return (

    <div className="flex items-center justify-between mb-6">
      <CustomTabs
        activeTab={activeTab}
        onValueChange={(value) => onTabChange(value as JarViewTabType)}
        options={tabs}
      />
      <div className="flex items-center gap-3">
        <div className="px-3 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
          {itemCount} item{itemCount !== 1 ? 's' : ''}
        </div>
        <div className="px-3 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
          {totalCalories} cal
        </div>
      </div>
    </div>
  );
};

export default JarSummary;