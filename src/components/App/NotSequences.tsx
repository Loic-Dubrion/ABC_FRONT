// Module & Library
import { motion } from 'framer-motion';
// Utiles
import { container } from '../../utils/motion-container';

function NotSequences() {
  return (
    <section className="container m-auto">
      <motion.div
        animate="show"
        variants={container}
        initial="hidden"
        className="card card-compact w-3/6 bg-base-100 shadow-xl m-auto"
      >
        <div className="card-body">
          <p className="text-center font-bold">
            Il n'y a pas de scénarios enregistrés.
          </p>
        </div>
      </motion.div>
    </section>
  );
}

export default NotSequences;
