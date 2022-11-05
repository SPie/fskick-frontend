import {ReactNode} from 'react';

interface PlayerStatsCellProps {
  children?: ReactNode;
}

const PlayerStatsCell = ({children}: PlayerStatsCellProps) => (
  <td className="border-b-2 text-left px-1 md:px-6 py-2">{children}</td>
);

export default PlayerStatsCell;