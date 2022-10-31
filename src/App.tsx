import {Routes, Route} from 'react-router-dom';

import Navigation from './routes/navigation/navgation';
import Seasons from './routes/seasons/seasons';
import Players from './routes/players/players';
import Impressum from './routes/impressum/impressum';

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Navigation />}>
            <Route index element={<Seasons />} />
            <Route path="players" element={<Players />} />
            <Route path="impressum" element={<Impressum />} />
        </Route>
      </Routes>
  );
}

export default App;
