import React from 'react';
import { Trash2 } from 'lucide-react';
import type { AggregatedJarItem } from '../../types/fruit.types';
import JarStatus from '../common/JarStatus';

interface JarTableProps {
  items: AggregatedJarItem[];
  onRemove: (name: string) => void;
  onClear: () => void;
}

const JarTable: React.FC<JarTableProps> = ({ items, onRemove, onClear }) => {
  if (items.length === 0) {
    return (
      <JarStatus isEmpty={true} />
    )
  }

  return (
    <div className="bg-green-100 p-4 rounded-2xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Calories Jar Table</h3>
        <button
          onClick={onClear}
          className="inline-flex items-center gap-1 px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
          title="Clear all items"
        >
          <Trash2 size={14} />
          Clear All
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm bg-white rounded-md overflow-hidden shadow-sm">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Name</th>
              <th className="px-4 py-3 text-center font-semibold">Qty</th>
              <th className="px-4 py-3 text-center font-semibold">Total Calories</th>
              <th className="px-4 py-3 text-center font-semibold"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.name} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-medium text-gray-900">{item.name}</td>
                <td className="px-4 py-3 text-center text-gray-700">{item.qty}</td>
                <td className="px-4 py-3 text-center font-semibold text-gray-900">{item.calories}</td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => onRemove(item.name)}
                    className="p-1 rounded-full hover:bg-red-100 text-red-600 transition-colors"
                    title={`Remove all ${item.name} from jar`}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JarTable;