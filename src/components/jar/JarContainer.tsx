import React from 'react';
import type { JarViewTabType, AggregatedJarItem, PieChartData } from '../../types/fruit.types';
import JarSummary from './JarSummary';
import JarTable from './JarTable';
import JarChart from './JarChart';

interface JarContainerProps {
  activeTab: JarViewTabType;
  onTabChange: (tab: JarViewTabType) => void;
  aggregatedItems: AggregatedJarItem[];
  pieData: PieChartData[];
  totalCalories: number;
  itemCount: number;
  onRemove: (name: string) => void;
  onClear: () => void;
}

const JarContainer: React.FC<JarContainerProps> = ({
  activeTab,
  onTabChange,
  aggregatedItems,
  pieData,
  totalCalories,
  itemCount,
  onRemove,
  onClear,
}) => {
  return (
    <div className="h-full space-y-6 overflow-auto w-1/2 p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center justify-center">
        Jar Summary
      </h2>
      
      <JarSummary
        activeTab={activeTab}
        onTabChange={onTabChange}
        totalCalories={totalCalories}
        itemCount={itemCount}
      />

      {activeTab === 'jar' ? (
        <JarTable
          items={aggregatedItems}
          onRemove={onRemove}
          onClear={onClear}
        />
      ) : (
        <JarChart data={pieData} />
      )}
    </div>
  );
};

export default JarContainer;