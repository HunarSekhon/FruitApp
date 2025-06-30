import React from 'react';
import * as Collapsible from '@radix-ui/react-collapsible';
import { ChevronDown, Plus } from 'lucide-react';
import type { FruitData, GroupKey } from '../../types/fruit.types';
import { groupItems } from '../../utils/fruit.utils';

interface FruitTableProps {
  data: FruitData[];
  groupOption: GroupKey;
  onAdd: (item: FruitData) => void;
  onAddGroup: (items: FruitData[]) => void;
}

interface SimpleTableProps {
  data: FruitData[];
  onAdd: (item: FruitData) => void;
}

const SimpleTable: React.FC<SimpleTableProps> = ({ data, onAdd }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full text-sm bg-green-100 rounded-md overflow-hidden">
      <thead className="bg-green-600">
        <tr>
          <th className="px-4 py-2 text-left">Name</th>
          <th className="px-4 py-2 text-left">Family</th>
          <th className="px-4 py-2 text-left">Order</th>
          <th className="px-4 py-2 text-left">Genus</th>
          <th className="px-4 py-2 text-right">Calories</th>
          <th className="px-4 py-2 text-center">Add</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={`${item.name}-${item.id}`} className="hover:bg-green-50">
            <td className="px-4 py-2 font-medium">{item.name}</td>
            <td className="px-4 py-2">{item.family}</td>
            <td className="px-4 py-2">{item.order}</td>
            <td className="px-4 py-2">{item.genus}</td>
            <td className="px-4 py-2 text-center">{item.nutritions.calories}</td>
            <td className="px-4 py-2 text-center">
              <button
                onClick={() => onAdd(item)}
                className="p-1 rounded-full hover:bg-indigo-100 text-purple-600 transition-colors"
                title={`Add ${item.name} to jar`}
              >
                <Plus size={16} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const FruitTable: React.FC<FruitTableProps> = ({ data, groupOption, onAdd, onAddGroup }) => {
  const grouped = groupItems(data, groupOption);
  if (data.length === 0) {
    return (
      <div className="bg-green-100 p-6 rounded-2xl shadow-md text-center">
        <h3 className="text-lg font-semibold mb-2">Fruit not Found!</h3>
      </div>
    );
  }
  if (groupOption === 'none') {
    return <SimpleTable data={data} onAdd={onAdd} />;
  }

  return (
    <div className="space-y-4 overflow-y-auto">
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
            <SimpleTable data={items} onAdd={onAdd} />
          </Collapsible.Content>
        </Collapsible.Root>
      ))}
    </div>
  );
};

export default FruitTable;