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
import {
  getOneSequence,
  toggleUpdateSequenceMenu,
} from '../../redux/store/reducers/sequence';
// Components
import SequenceModal from '../Modals/SequenceModal';
import Colgroup from './Colgroup';
import Thead from './Thead';
import Tbody from './Tbody';
import UpdateSession from '../Modals/UpdateSession';

function Tables() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const isLogged = useAppSelector((state) => state.user.isLogged);
  const sequence = useAppSelector((state) => state.sequence.sequence);
  const toggleModal = useAppSelector((state) => state.sequence.toggle);
  const isOpen = useAppSelector((state) => state.session.isOpen);

  useEffect(() => {
    if (isLogged) {
      dispatch(getOneSequence(id as string));
    }
  }, [dispatch, id, isLogged]);

  return (
    <div className="overflow-y-auto w-full">
      <div className="flex gap-3 items-center">
        <h2 className="text-4xl m-3 font-bold">
          {localStorage.getItem('sequence_name')}
        </h2>
        <button
          onClick={() => {
            dispatch(toggleUpdateSequenceMenu(!toggleModal));
          }}
        >
          <FontAwesomeIcon
            icon={faPencil}
            beat
            size="lg"
            style={{ color: '#000000' }}
          />
        </button>
        <SequenceModal isOpen={toggleModal} />
      </div>

      {sequence.length > 0 && (
        <table className="table w-full">
          <Colgroup />
          <Thead />
          {sequence.map((e, index) => (
            <Tbody key={index} sessions={e.sessions} />
          ))}
        </table>
      )}
      <UpdateSession sequence={sequence} isOpen={isOpen} />
    </div>
  );
}

export default Tables;
