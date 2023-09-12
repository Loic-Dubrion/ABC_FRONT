// Module & Libray
import { motion } from 'framer-motion';
// Components
import Sequences from '../Sequences/Sequences';
// Utiles
import { container } from '../../utils/motion-container';


function HasSequences() {


  return (
    <motion.div
      animate="show"
      variants={container}
      initial="hidden"
      className="card card-compact w-3/6 bg-base-100 shadow-xl m-auto"
    >
      <Sequences />
    </motion.div>
  );
}

export default HasSequences;
