import {Link} from 'react-router-dom';

import {PlayerStats} from '../../api/types';

import PlayerStatsCell from './player-stats-cell';

interface PlayerStatsRowProps {
  player: PlayerStats;
  gamesCount?: number;
}

const PlayerStatsRow = ({player, gamesCount}: PlayerStatsRowProps) => {
  const calculateGamesRatio = (): string => (
    gamesCount ? (player.games / gamesCount * 100).toFixed(2) : '0'
  );

  const calculateWinRatio = (): string => (player.wins / player.games * 100).toFixed(2);

  return (
    <tr>
      <PlayerStatsCell>{player.position}</PlayerStatsCell>
      <PlayerStatsCell><Link to={`/player/${player.uuid}`} className="underline">{player.name}</Link></PlayerStatsCell>
      <PlayerStatsCell>{player.pointsRatio.toFixed(2)}</PlayerStatsCell>
      <PlayerStatsCell>{player.wins}</PlayerStatsCell>
      <PlayerStatsCell>{player.games} ({calculateGamesRatio()} %)</PlayerStatsCell>
      <PlayerStatsCell>{calculateWinRatio()} %</PlayerStatsCell>
    </tr>
  );
};

export default PlayerStatsRow;