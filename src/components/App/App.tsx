// React component
import { useEffect } from 'react';
// Redux
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
// Components
import NotLogged from './NotLogged';
import NotSequences from './NotSequences';
import HasSequences from './HasSequences';
import { getAllSequences } from '../../redux/store/reducers/sequence';

function App() {
  const dispatch = useAppDispatch();
  const isLogged = useAppSelector((state) => state.user.isLogged);
  const scenarios = useAppSelector((state) => state.sequence.sequences);

  useEffect(() => {
    if (isLogged) {
      dispatch(getAllSequences());
    }
  }, [dispatch, isLogged]);

  return (
    <div className="home">
      {!isLogged && <NotLogged />}
      {isLogged && scenarios.length === 0 && <NotSequences />}
      {isLogged && scenarios.length > 0 && <HasSequences />}
    </div>
  );
}

export default App;
