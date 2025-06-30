import React from 'react';
import * as Select from '@radix-ui/react-select';
import { ChevronDown } from 'lucide-react';
import type { GroupKey } from '../../types/fruit.types';

interface SelectProps {
  value: GroupKey;
  onValueChange: (value: GroupKey) => void;
  options: { value: GroupKey; label: string }[];
  placeholder?: string;
  className?: string;
}

const CustomSelect: React.FC<SelectProps> = ({
  value,
  onValueChange,
  options,
  placeholder = "Select option",
  className = ""
}) => {
  const triggerClasses = `inline-flex items-center w-40 justify-between rounded-md border text-black border-gray-300 bg-purple-200 px-3 py-2 text-sm shadow-sm focus:outline-none ${className}`;

  return (
    <Select.Root value={value} onValueChange={onValueChange}>
      <Select.Trigger className={triggerClasses} aria-label={placeholder}>
        <Select.Value className="flex-1 truncate capitalize" />
        <Select.Icon className="text-purple-500">
          <ChevronDown size={16} />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={4}
          className="z-50 rounded-md border border-gray-200 bg-purple-200 shadow-lg"
        >
          <Select.Viewport className="p-1 capitalize">
            {options.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
                className="relative flex cursor-pointer select-none items-center rounded-md px-6 py-2 text-sm text-black outline-none data-[highlighted]:bg-purple-700 data-[highlighted]:text-white"
              >
                <Select.ItemText>
                  <span className="p-1 capitalize">{option.label}</span>
                </Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default CustomSelect;