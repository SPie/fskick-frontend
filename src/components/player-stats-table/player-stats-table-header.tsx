import {ReactNode} from 'react';

interface PlayerStatsTableHeaderProps {
  children?: ReactNode;
}

const PlayerStatsTableHeader = ({children}: PlayerStatsTableHeaderProps) => (
  <th className="border-b-2 text-left px-1 md:px-6 py-4">{children}</th>
);

export default PlayerStatsTableHeader;