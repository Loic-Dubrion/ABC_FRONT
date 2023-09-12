// React Hooks
import { useEffect } from 'react';
// Module & Library
import { motion } from 'framer-motion';
// Redux functions
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
// Reducers actions
import { getAllCards, togglerCheckbox } from '../../redux/store/reducers/card';
// Components
import Cards from '../Cards/Cards';
import Tables from '../Table/Tables';
import { useLocation } from 'react-router-dom';
import { container } from '../../utils/motion-container';

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

  const allCards = useAppSelector((state) => state.card.cards);
  const isLogged = useAppSelector((state) => state.user.isLogged);
  const isChecked = useAppSelector((state) => state.card.isChecked);

  useEffect(() => {
    if (!allCards && isLogged) {
      dispatch(getAllCards());
    }
  }, [dispatch, allCards, isLogged]);


  return (
    <div className="CreateSequence flex flex-col flex-nowrap items-center gap-5">
      {allCards && isLogged && (
        <motion.div
          animate="show"
          variants={container}
          initial="hidden"
          className="flex justify-center items-center gap-3 mt-3"
        >
          <p className={`${!isChecked ? 'font-bold text-[#8f949b]' : ''}`}>
            Novice
          </p>
          <input
            type="checkbox"
            className="toggle toggle-error toggle-lg"
            checked={isChecked}
            onChange={() => {
              dispatch(togglerCheckbox(isChecked));
            }}
          />
          <p className={`${isChecked ? 'font-bold text-[#f87272]' : ''}`}>
            Expert
          </p>
        </motion.div>
      )}
      <Cards />
      <Tables />
    </div>
  );
}

export default CreateSequence;
