// React hooks
import { useEffect, useState } from 'react';
// Module && Library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
// React router
import { useParams } from 'react-router-dom';
// Redux
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
// Reducers
import { getOneSequence } from '../../redux/store/reducers/sequence';
// Components
import SequenceModal from '../Modals/SequenceModal';
import Colgroup from './Colgroup';
import Thead from './Thead';
import Tbody from './Tbody';
import { container } from '../../utils/motion-container';

function Tables() {
  const dispatch = useAppDispatch();
  const isLogged = useAppSelector((state) => state.user.isLogged);
  const { id } = useParams();
  const sequence = useAppSelector((state) => state.sequence.sequence);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isLogged) {
      dispatch(getOneSequence(id as string));
    }
  }, [dispatch, id, isLogged]);

  return (
    <motion.div
      className="overflow-y-auto w-full"
      animate="show"
      variants={container}
      initial="hidden"
    >
      <div className="flex gap-3 items-center">
        <h2 className="text-4xl m-3 font-bold">
          {localStorage.getItem('sequence_name')}
        </h2>
        <button>
          <FontAwesomeIcon
            icon={faPencil}
            beat
            size="lg"
            style={{ color: '#000000' }}
            onClick={() => {
              setIsOpen(true);
            }}
          />
        </button>
        <SequenceModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
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
    </motion.div>
  );
}

export default Tables;
