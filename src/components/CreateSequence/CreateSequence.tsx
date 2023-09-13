// React Hooks
import { useEffect } from 'react';
// Module & Library

// Redux functions
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
// Reducers actions
import { getAllCards } from '../../redux/store/reducers/card';
// Components
import Cards from '../Cards/Cards';
import Tables from '../Table/Tables';
import { useLocation, useParams } from 'react-router-dom';

import { getOneScenario } from '../../redux/store/reducers/sequence';
import TogglerLevelButton from './TogglerLevelButton';

function CreateSequence() {
  const location = useLocation();
  const scenarioId = useAppSelector((state) => state.scenario.scenarioId);

  const dispatch = useAppDispatch();

  if (location.pathname === '/sequence') {
    history.pushState(
      { name: 'sequenceId' },
      'pushState sequenceId',
      `/sequence/${scenarioId?.toString()}`
    );
  }
  const { id } = useParams();

  const allCards = useAppSelector((state) => state.card.cards);
  const isLogged = useAppSelector((state) => state.user.isLogged);

  useEffect(() => {
    if (!allCards && isLogged) {
      dispatch(getAllCards());
      dispatch(getOneScenario(id as string));
    }
  }, [dispatch, allCards, isLogged, id]);

  return (
    <div className="CreateSequence flex flex-col flex-nowrap items-center gap-5">
      {allCards && isLogged && <TogglerLevelButton />}
      <Cards />
      <Tables />
    </div>
  );
}

export default CreateSequence;
