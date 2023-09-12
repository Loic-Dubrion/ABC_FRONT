// Redux
import { useAppSelector } from '../../redux/hooks';
// Components
import NotLogged from './NotLogged';
import NotSequences from './NotSequences';
import HasSequences from './HasSequences';

function App() {
  const isLogged = useAppSelector((state) => state.user.isLogged);
  const scenarios = useAppSelector((state) => state.scenario.scenarios);

  return (
    <div className="home">
      {!isLogged && <NotLogged />}
      {scenarios.length === 0 && <NotSequences />}
      {scenarios.length > 0 && <HasSequences />}
    </div>
  );
}

export default App;
