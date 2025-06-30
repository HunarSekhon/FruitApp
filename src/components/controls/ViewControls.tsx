import React from 'react';
import type { GroupKey, ViewType } from '../../types/fruit.types';
import CustomSelect from '../ui/Select';
import CustomTabs from '../ui/Tabs';
import SearchInput from '../ui/SearchInput';

interface ViewControlsProps {
  groupOption: GroupKey;
  onGroupChange: (group: GroupKey) => void;
  viewType: ViewType;
  onViewChange: (view: ViewType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const ViewControls: React.FC<ViewControlsProps> = ({
  groupOption,
  onGroupChange,
  viewType,
  onViewChange,
  searchQuery,
  onSearchChange,
}) => {
  const groupOptions = [
    { value: 'none' as const, label: 'No Grouping' },
    { value: 'family' as const, label: 'By Family' },
    { value: 'order' as const, label: 'By Order' },
    { value: 'genus' as const, label: 'By Genus' },
  ];

  const viewOptions = [
    { value: 'table', label: 'Table' },
    { value: 'list', label: 'List' },
  ];

  return (
    <div className="flex justify-between items-center gap-4 mb-6 flex-wrap">
      <CustomSelect
        value={groupOption}
        onValueChange={onGroupChange}
        options={groupOptions}
        placeholder="Group by..."
      />

      <SearchInput
        value={searchQuery}
        onChange={onSearchChange}
        placeholder="Search by name"
        className="flex-1 min-w-60"
      />

      <CustomTabs
        activeTab={viewType}
        onValueChange={(value) => onViewChange(value as ViewType)}
        options={viewOptions}
      />
    </div>
  );
};

export default ViewControls;