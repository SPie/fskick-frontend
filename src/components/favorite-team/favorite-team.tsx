import {useEffect, useState} from 'react';

import {PlayerStats} from '../../api/types';
import {getFavoriteTeam} from '../../api/players';

import PlayerStatsTable from '../player-stats-table/player-stats-table';
import {useLocation} from "react-router-dom";

interface FavoriteTeamProps {
  player: PlayerStats;
}

const FavoriteTeam = ({player}: FavoriteTeamProps) => {
  const [fellowPlayers, setFellowPlayers] = useState<PlayerStats[]>()
  const [sort, setSort] = useState('pointsRatio')

  const {search} = useLocation();
  const allFavorite = new URLSearchParams(search).get('allFavorite');

  useEffect(() => {
    if (player) {
      const fetchFellowPlayers = async () => {
        const {playerStats} = await getFavoriteTeam(player.uuid, sort);

        setFellowPlayers(allFavorite ? playerStats : playerStats.slice(0, 5));
      };

      fetchFellowPlayers();
    }
  }, [player, sort])

  return (
    <div className="my-5">
      <h3 className="text-left text-sm md:text-xl font-bold">Favorite Team</h3>

      <PlayerStatsTable playerStats={fellowPlayers} gamesCount={player.games} sort={sort} sortHandler={setSort} />
    </div>
  );
};

export default FavoriteTeam;