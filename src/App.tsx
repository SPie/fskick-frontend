import {Routes, Route} from 'react-router-dom';

import Navigation from './routes/navigation/navgation';
import Seasons from './routes/seasons/seasons';
import Player from './routes/player/player';
import Players from './routes/players/players';
import Imprint from './routes/impressum/imprint';

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Navigation />}>
            <Route index element={<Seasons />} />
            <Route path="players" element={<Players />} />
            <Route path="imprint" element={<Imprint />} />
            <Route path="player/:uuid" element={<Player />} />
        </Route>
      </Routes>
  );
}

export default App;
