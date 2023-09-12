// Module & Library
import { motion } from 'framer-motion';
// Utiles
import { container } from '../../utils/motion-container';
// Redux
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
// Reducer actions
import { togglerCheckbox } from '../../redux/store/reducers/card';

function TogglerLevelButton() {
  const dispatch = useAppDispatch();
  const isChecked = useAppSelector((state) => state.card.isChecked);
  return (
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
      <p className={`${isChecked ? 'font-bold text-[#f87272]' : ''}`}>Expert</p>
    </motion.div>
  );
}

export default TogglerLevelButton;
