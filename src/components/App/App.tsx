// React component
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
// Redux
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
// Components
import NotLogged from './NotLogged';
import NotSequences from './NotSequences';
import HasSequences from './HasSequences';
import {
  getAllSequences,
  resetSequenceAlert,
} from '../../redux/store/reducers/sequence';

function App() {
  const dispatch = useAppDispatch();
  const isLogged = useAppSelector((state) => state.user.isLogged);
  const scenarios = useAppSelector((state) => state.sequence.sequences);
  const alert = useAppSelector((state) => state.sequence.alert);

  useEffect(() => {
    if (isLogged) {
      dispatch(getAllSequences());
    }
    if (alert) {
      dispatch(getAllSequences());
      dispatch(resetSequenceAlert());
    }
  }, [dispatch, isLogged, alert]);

  return (
    <div className="main mb-20">
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="La méthode ABC Learning Design est une solution développée depuis 2014 par Clive Young and Nataša Perović (UCL Digital Education) pour offrir un cadre méthodologique et des outils pour la conduite d’ateliers de scénarisation pédagogique efficaces et collaboratifs"
        />
        <title>ABC Learning</title>
      </Helmet>

      {!isLogged && <NotLogged />}
      {isLogged && scenarios.length === 0 && <NotSequences />}
      {isLogged && scenarios.length > 0 && <HasSequences />}
    </div>
  );
}

export default App;
