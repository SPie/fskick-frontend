import {useEffect, useState} from 'react';

import PlayerStatsTable from '../../components/player-stats-table/player-stats-table';
import {PlayerStats} from '../../api/types';
import {getPlayers} from '../../api/players';
import {getGamesCount} from '../../api/seasons';

const Players = () => {
  const [sort, setSort] = useState<string>('pointsRatio');
  const [players, setPlayers] = useState<PlayerStats[]>([])
  const [gamesCount, setGamesCount] = useState(0);

  useEffect(() => {
    const fetchPlayers = async () => {
      const {playerStats} = await getPlayers(sort);

      setPlayers(playerStats);
    };

    fetchPlayers();
  }, [sort]);

  useEffect(() => {
    const fetchGamesCount = async () => {
      const {gamesCount} = await getGamesCount();

      setGamesCount(gamesCount);
    };

    fetchGamesCount();
  }, []);

  return (
    <div className="py-2 px-2">
      <div className="mx-auto bg-gradient-to-b from-gray-900 to-gray-300 via-gray-600 p-5 rounded-lg shadow xl:w-1/2 lg:w-3/4 sm:w-11/12 container hover:from-gray-800 hover:to-gray-200 hover:via-gray-500">
        <h2 className="text-center text-md md:text-2xl font-bold">
          Players
        </h2>

        <div>
          <PlayerStatsTable playerStats={players} gamesCount={gamesCount} sort={sort} sortHandler={setSort} />
        </div>
      </div>
    </div>
  );
};

export default Players;