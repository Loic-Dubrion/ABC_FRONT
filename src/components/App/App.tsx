// React Hooks
import { useRef } from 'react';
// Redux
import { useAppSelector } from '../../redux/hooks';
// Module & Library
import { motion } from 'framer-motion';
// Components
import Scenarios from '../Scenario/Scenarios';

function App() {
  const cardRef = useRef(null);
  const isLogged = useAppSelector((state) => state.user.isLogged);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <div className="home">
      {!isLogged && (
        <section className="container m-auto">
          <motion.div
            animate="show"
            variants={container}
            initial="hidden"
            className="card card-compact w-3/6 bg-base-100 shadow-xl m-auto"
            ref={cardRef}
          >
            <div className="card-body">
              <p>
                Vous devez préparer un nouveau cours et vous aimeriez innover en
                intégrant des activités d’apprentissage, mais vous ne savez pas
                quoi et comment faire? Ou alors vous êtes responsable d’une
                formation, d’un module dont vous aimeriez repenser
                l’organisation avec les enseignants, mais vous ne savez pas
                comment vous y prendre ? Alors l’application en ligne « ABC
                Learning » peuvent vous aider.
              </p>
            </div>
          </motion.div>
        </section>
      )}
      <motion.div
        animate="show"
        variants={container}
        initial="hidden"
        className="card card-compact w-3/6 bg-base-100 shadow-xl m-auto"
        ref={cardRef}
      >
        <Scenarios />
      </motion.div>
    </div>
  );
}

export default App;
