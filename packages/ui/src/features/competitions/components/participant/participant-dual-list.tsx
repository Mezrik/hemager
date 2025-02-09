import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { FC } from 'react';
import DualListBox from 'react-dual-listbox';

import './participant-dual-list.css';
import { ContestantDto } from '@hemager/api-types';

export const ParticipantDualList: FC<{
  options: ContestantDto[];
  selected: string[];
  onChange: (newValue: string[]) => void;
}> = ({ options, selected, onChange }) => {
  return (
    <div className="w-full">
      <DualListBox
        canFilter
        filterCallback={(option, filterInput, { getOptionLabel }) => {
          if (filterInput === '') {
            return true;
          }

          const label = getOptionLabel?.(option as any) ?? '';

          return new RegExp(filterInput, 'i').test(label);
        }}
        options={options.map((opt) => ({
          value: opt.id,
          label: `${opt.firstname} ${opt.surname}`,
        }))}
        selected={selected}
        onChange={onChange}
        icons={{
          moveToAvailable: <ChevronLeft className="size-5" />,
          moveAllToAvailable: <ChevronsLeft className="size-5" />,
          moveToSelected: <ChevronRight className="size-5" />,
          moveAllToSelected: <ChevronsRight className="size-5" />,
        }}
      />
    </div>
  );
};
