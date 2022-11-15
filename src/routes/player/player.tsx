import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import {PlayerStatsWithAttendances} from '../../api/types';
import {getPlayer} from '../../api/players';
import {getGamesCount} from '../../api/seasons';

import PlayerStatsTable from '../../components/player-stats-table/player-stats-table';
import Streak from '../../components/streak/streak';

const Player = () => {
  const [sort, setSort] = useState('pointsRatio');
  const [player, setPlayer] = useState<PlayerStatsWithAttendances>();
  const [gamesCount, setGamesCount] = useState(0);

  const {uuid} = useParams();

  useEffect(() => {
    if (uuid !== undefined) {
      const fetchPlayer = async () => {
        const {player} = await getPlayer(uuid, sort);

        setPlayer(player);
      };

      fetchPlayer();
    }
  }, [sort])

  useEffect(() => {
    const fetchGamesCount = async () => {
      const {gamesCount} = await getGamesCount();

      setGamesCount(gamesCount);
    };

    fetchGamesCount();
  }, []);

  return (
    <div>
      <div className="py-2 px-2">
        <div className="mx-auto bg-gradient-to-b from-gray-900 to-gray-300 via-gray-600 p-5 rounded-lg shadow xl:w-1/2 lg:w-3/4 sm:w-11/12 container hover:from-gray-800 hover:to-gray-200 hover:via-gray-500">
          {player && (
            <div>
              <h2 className="text-center text-md md:text-2xl font-bold">
                {player.name}
              </h2>

              <div className="mx-auto w-4/5">
                <div className="my-5">
                  <h3 className="text-left text-sm md:text-xl font-bold">Stats</h3>

                  <PlayerStatsTable playerStats={[player]} gamesCount={gamesCount} sort={sort} sortHandler={setSort} />
                </div>

                <div className="my-5">
                  <h3 className="text-left text-sm md:text-xl font-bold">Streak</h3>

                  <div className="my-5 flex space-x-4">
                    <Streak attendances={player.attendances.slice(-5)} />
                  </div>

                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Player;