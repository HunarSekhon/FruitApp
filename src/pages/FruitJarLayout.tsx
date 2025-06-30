import React, { useState, useMemo } from 'react';
import type { GroupKey, ViewType, JarViewTabType } from '../types/fruit.types';
import { useFruits } from '../hooks/useFruits';
import { useJar } from '../hooks/useJar';
import { filterFruits } from '../utils/fruit.utils';

import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import ViewControls from '../components/controls/ViewControls';
import FruitView from '../components/fruit/FruitView';
import JarContainer from '../components/jar/JarContainer';

const FruitJarLayout: React.FC = () => {
  const { fruits, loading, error, refetch } = useFruits();
  
  const {
    jar,
    aggregatedItems,
    pieData,
    totalCalories,
    addItem,
    addGroup,
    removeByName,
    clearJar,
  } = useJar();

  const [viewType, setViewType] = useState<ViewType>('table');
  const [groupOption, setGroupOption] = useState<GroupKey>('none');
  const [jarViewTab, setJarViewTab] = useState<JarViewTabType>('jar');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFruits = useMemo(() => 
    filterFruits(fruits, searchQuery), 
    [fruits, searchQuery]
  );

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-red-500 via-orange-300 to-pink-400">
        <LoadingSpinner message="Loading delicious fruits..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-red-500 via-orange-300 to-pink-400">
        <ErrorMessage message={error} onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-red-500 via-orange-300 to-pink-400 overflow-hidden">
      <div className="flex h-screen">
        <div className="w-1/2 p-8">
          <div className="h-full flex flex-col">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center justify-center">
              🍇 Fruits Nutritional Table
            </h1>
            
            <ViewControls
              groupOption={groupOption}
              onGroupChange={setGroupOption}
              viewType={viewType}
              onViewChange={setViewType}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            <FruitView
              data={filteredFruits}
              viewType={viewType}
              groupOption={groupOption}
              onAdd={addItem}
              onAddGroup={addGroup}
            />
          </div>
        </div>

        <JarContainer
          activeTab={jarViewTab}
          onTabChange={setJarViewTab}
          aggregatedItems={aggregatedItems}
          pieData={pieData}
          totalCalories={totalCalories}
          itemCount={jar.length}
          onRemove={removeByName}
          onClear={clearJar}
        />
      </div>
    </div>
  );
};

export default FruitJarLayout;