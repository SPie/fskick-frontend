import {ReactNode} from 'react';

interface SortablePlayerStatsTableHeaderProps {
  children?: ReactNode;
  sort: string;
  selectedSort: string;
  sortHandler: (sortName: string) => void;
}

const SortablePlayerStatsTableHeader = ({children, sort, selectedSort, sortHandler}: SortablePlayerStatsTableHeaderProps) => (
  <th
    className={`border-b-2 text-left px-1 md:px-6 py-4 ${sort === selectedSort ? "underline" : "hover:underline"}`}
    onClick={() => sortHandler(sort)}
  >
    {children}
  </th>
);

export default SortablePlayerStatsTableHeader;