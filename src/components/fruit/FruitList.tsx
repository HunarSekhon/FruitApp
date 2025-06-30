import React from 'react';
import * as Collapsible from '@radix-ui/react-collapsible';
import { ChevronDown, Plus } from 'lucide-react';
import type { FruitData, GroupKey } from '../../types/fruit.types';
import { groupItems } from '../../utils/fruit.utils';

interface FruitListProps {
  data: FruitData[];
  groupOption: GroupKey;
  onAdd: (item: FruitData) => void;
  onAddGroup: (items: FruitData[]) => void;
}

interface SimpleListProps {
  data: FruitData[];
  onAdd: (item: FruitData) => void;
}

const SimpleList: React.FC<SimpleListProps> = ({ data, onAdd }) => (
  <div className="space-y-2">
    <ul className="bg-green-100 rounded-md divide-y divide-green-200">
      {data.map((item) => (
        <li
          key={`${item.name}-${item.id}`}
          className="px-4 py-3 flex justify-between items-center hover:bg-green-50 transition-colors"
        >
          <div>
            <span className="font-medium text-gray-900">{item.name}</span>
            <span className="text-sm text-gray-600 ml-2">
              ({item.nutritions.calories} cal)
            </span>
          </div>
          <button
            onClick={() => onAdd(item)}
            className="p-2 rounded-full hover:bg-indigo-100 text-purple-600 transition-colors flex-shrink-0 ml-3"
            title={`Add ${item.name} to jar`}
          >
            <Plus size={16} />
          </button>
        </li>
      ))}
    </ul>
  </div>
);

const FruitList: React.FC<FruitListProps> = ({ data, groupOption, onAdd, onAddGroup }) => {
  const grouped = groupItems(data, groupOption);

  if (data.length === 0) {
    return (
      <div className="bg-green-100 p-6 rounded-2xl shadow-md text-center">
        <h3 className="text-lg font-semibold mb-2">Fruit not Found!</h3>
      </div>
    );
  }

  if (groupOption === 'none') {
    return <SimpleList data={data} onAdd={onAdd} />;
  }

  return (
    <div className="space-y-4 overflow-y-auto max-h-140">
      {Object.entries(grouped).map(([group, items]) => (
        <Collapsible.Root key={group} defaultOpen>
          <Collapsible.Trigger className="w-full px-4 py-2 bg-yellow-300 text-left font-semibold rounded-md flex justify-between items-center hover:bg-yellow-400 transition-colors">
            <span>{group} ({items.length} items)</span>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddGroup(items);
                }}
                className="p-1 rounded-full hover:bg-indigo-100 text-purple-600 transition-colors"
                title={`Add all ${group} fruits to jar`}
              >
                <Plus size={16} />
              </button>
              <ChevronDown className="w-5 h-5 transition-transform data-[state=open]:rotate-180" />
            </div>
          </Collapsible.Trigger>
          <Collapsible.Content>
            <SimpleList data={items} onAdd={onAdd} />
          </Collapsible.Content>
        </Collapsible.Root>
      ))}
    </div>
  );
};

export default FruitList;