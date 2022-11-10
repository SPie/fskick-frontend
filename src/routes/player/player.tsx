import {Attendance, PlayerStats} from '../../api/types';
import PlayerStatsTable from '../../components/player-stats-table/player-stats-table';
import {useState} from "react";

const Player = () => {
  const [sort, setSort] = useState('pointsRatio');
  // TODO
  const player: PlayerStats & {attendances: Attendance[]} = {
    uuid: '123',
    name: 'schobi',
    position: 1,
    points: 22,
    pointsRatio: 2.2,
    games: 20,
    wins: 17,
    attendances: [{win: true, game: {uuid: '123', createdAt: '1988-02-23'}}],
  }
  const gamesCount: number = 30;

  return (
    <div>
      <div className="py-2 px-2">
        <div className="mx-auto bg-gradient-to-b from-gray-900 to-gray-300 via-gray-600 p-5 rounded-lg shadow xl:w-1/2 lg:w-3/4 sm:w-11/12 container hover:from-gray-800 hover:to-gray-200 hover:via-gray-500">
          <h2 className="text-center text-md md:text-2xl font-bold">
            {player.name}
          </h2>

          <div className="mx-auto w-4/5">
            <div>
              <h3 className="text-left text-sm md:text-xl font-bold">Stats</h3>

              <PlayerStatsTable playerStats={[player]} gamesCount={gamesCount} sort={sort} sortHandler={setSort} />
            </div>

            <div>
              <h3 className="text-left text-sm md:text-xl font-bold">Streak</h3>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;