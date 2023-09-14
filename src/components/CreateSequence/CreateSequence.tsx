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

import { getOneSequence } from '../../redux/store/reducers/sequence';
import TogglerLevelButton from './TogglerLevelButton';

function CreateSequence() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const sequenceId = useAppSelector((state) => state.sequence.sequenceId);

  if (location.pathname === '/sequence') {
    history.pushState(
      { name: 'exemple' },
      'pushState sequenceId',
      `/sequence/${sequenceId?.toString()}`
    );
  }
  const { id } = useParams();
  const allCards = useAppSelector((state) => state.card.cards);
  const isLogged = useAppSelector((state) => state.user.isLogged);

  useEffect(() => {
    if (!allCards && isLogged) {
      dispatch(getAllCards());
      dispatch(getOneSequence(id as string));
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
