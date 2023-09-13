// React hooks
import { useEffect } from 'react';
// Module && Library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
// React router
import { useParams } from 'react-router-dom';
// Redux
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
// Reducers
import { getOneScenario } from '../../redux/store/reducers/sequence';
// Components
import Sequence from '../Modals/SequenceModal';
import Colgroup from './Colgroup';
import Thead from './Thead';
import Tbody from './Tbody';

function Tables() {
  const dispatch = useAppDispatch();
  const isLogged = useAppSelector((state) => state.user.isLogged);
  const { id } = useParams();
  const sequence = useAppSelector((state) => state.scenario.scenario);

  useEffect(() => {
    if (isLogged) {
      dispatch(getOneScenario(id as string));
    }
  }, [dispatch, id, isLogged]);

  return (
    <div className="overflow-y-auto w-full">
      <div className="flex gap-3 items-center">
        <h2 className="text-4xl m-3 font-bold">{sequence[0]?.sequence_name}</h2>
        <button>
          <FontAwesomeIcon
            icon={faPencil}
            beat
            size="lg"
            style={{ color: '#000000' }}
          />
        </button>
        <Sequence />
      </div>

      {sequence.length > 0 && (
        <table className="table w-full">
          <Colgroup />
          <Thead />
          {sequence.map((e, index) => (
            <Tbody
              key={index}
              sequence_id={e.sequence_id}
              sequence_name={e.sequence_name}
              sessions={e.sessions}
            />
          ))}
        </table>
      )}
    </div>
  );
}

export default Tables;
