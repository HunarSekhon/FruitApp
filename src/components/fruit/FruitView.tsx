import React from 'react';
import type { FruitData, GroupKey, ViewType } from '../../types/fruit.types';
import FruitTable from './FruitTable';
import FruitList from './FruitList';

interface FruitViewProps {
  data: FruitData[];
  viewType: ViewType;
  groupOption: GroupKey;
  onAdd: (item: FruitData) => void;
  onAddGroup: (items: FruitData[]) => void;
}

const FruitView: React.FC<FruitViewProps> = ({
  data,
  viewType,
  groupOption,
  onAdd,
  onAddGroup,
}) => {
  const commonProps = {
    data,
    groupOption,
    onAdd,
    onAddGroup,
  };

  return (
    <div className="flex-1 overflow-x-auto">
      {viewType === 'table' ? (
        <FruitTable {...commonProps} />
      ) : (
        <FruitList {...commonProps} />
      )}
    </div>
  );
};

export default FruitView;