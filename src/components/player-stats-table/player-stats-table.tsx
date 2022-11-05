import {PlayerStats} from '../../api/types';

import PlayerStatsTableHeader from './player-stats-table-header';
import SortablePlayerStatsTableHeader from './sortable-player-stats-table-header';
import PlayerStatsRow from './player-stats-row';

interface PlayerStatsTableProps {
  playerStats: PlayerStats[]|undefined;
  gamesCount: number|undefined;
  sort: string;
  sortHandler: (sortName: string) => void;
}

const PlayerStatsTable = ({playerStats, gamesCount, sort, sortHandler}: PlayerStatsTableProps) => {
  if (!playerStats) {
    return null;
  }

  return (
    <table className="mx-auto text-xs md:text-base table-fixed">
      <thead>
      <tr>
        <PlayerStatsTableHeader>Pos ({playerStats.length})</PlayerStatsTableHeader>
        <PlayerStatsTableHeader>Player</PlayerStatsTableHeader>
        <SortablePlayerStatsTableHeader selectedSort={sort} sort="pointsRatio" sortHandler={sortHandler}>Points</SortablePlayerStatsTableHeader>
        <SortablePlayerStatsTableHeader selectedSort={sort} sort="wins" sortHandler={sortHandler}>Wins</SortablePlayerStatsTableHeader>
        <SortablePlayerStatsTableHeader selectedSort={sort} sort="games" sortHandler={sortHandler}>Games ({gamesCount})</SortablePlayerStatsTableHeader>
        <SortablePlayerStatsTableHeader selectedSort={sort} sort="winRatio" sortHandler={sortHandler}>Win Ratio</SortablePlayerStatsTableHeader>
      </tr>
      </thead>
      <tbody>
        { playerStats.map((player: PlayerStats) => <PlayerStatsRow key={player.uuid} player={player} gamesCount={gamesCount} />) }
      </tbody>
    </table>
  );
};

export default PlayerStatsTable;