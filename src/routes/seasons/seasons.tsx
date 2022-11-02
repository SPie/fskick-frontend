import {useEffect, useState} from 'react';

import {Season, SeasonTable} from '../../api/types';
import {getSeasons, getSeasonsTable} from '../../api/seasons/seasons';

import SeasonSelection from '../../components/season-selection/season-selection';
import PlayerStatsTable from '../../components/player-stats-table/player-stats-table';

const Seasons = () => {
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<string>('');
  const [seasonTable, setSeasonTable] = useState<SeasonTable>();
  const [sort, setSort] = useState<string>('pointsRatio');

  useEffect(() => {
    const fetchSeasons = async () => {
      const {seasons} = await getSeasons();

      setSeasons(seasons)
    };

    fetchSeasons();
  }, [])

  useEffect(() => {
    let activeSeason = seasons.find(season => season.active)?.uuid;

    if (activeSeason) {
      setSelectedSeason(activeSeason);
    }
  }, [seasons])

  useEffect(() => {
    const fetchSeasonTable = async () => {
      console.log(selectedSeason);
      const seasonTable: SeasonTable = await getSeasonsTable(selectedSeason, sort);

      setSeasonTable(seasonTable);
    };

    fetchSeasonTable();
  }, [selectedSeason, sort])

  return (
      <div className="py-2 px-2">
        <div className="mx-auto bg-gradient-to-b from-gray-900 to-gray-300 via-gray-600 p-5 rounded-lg shadow xl:w-1/2 lg:w-3/4 sm:w-11/12 container hover:from-gray-800 hover:to-gray-200 hover:via-gray-500">
          <h2 className="text-center text-md md:text-2xl font-bold">
            Season
            <SeasonSelection seasons={seasons} selectedSeason={selectedSeason} onChangeHandler={setSelectedSeason} />
          </h2>

          <div>
            <PlayerStatsTable playerStats={seasonTable?.playerStats} gamesCount={seasonTable?.season.games.length} sort={sort} sortHandler={setSort} />
        </div>
      </div>
    </div>
  );
};

export default Seasons;