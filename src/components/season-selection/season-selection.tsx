import {ChangeEvent, Dispatch, SetStateAction} from 'react';

import {Season} from '../../api/types';

interface SeasonSelectionProps {
  seasons: Season[];
  selectedSeason: string;
  onChangeHandler: Dispatch<SetStateAction<string>>;
}

const SeasonSelection = ({seasons, selectedSeason, onChangeHandler}: SeasonSelectionProps) => {
  const selectSeason = (e: ChangeEvent<HTMLSelectElement>): void => {
    onChangeHandler(e.target.value);
  };

  if (!seasons || !selectedSeason) {
    return null;
  }

  return (
    <select className="bg-gray-900" value={selectedSeason} onChange={selectSeason}>
      { seasons.map((season: Season) => <option key={season.uuid} value={season.uuid}>{season.name}</option>) }
    </select>
  );
};

export default SeasonSelection;