import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { motion } from 'framer-motion';
import { getAllCards, getOneCard } from '../../redux/store/reducers/card';

function CreateSequence() {
  const dispatch = useAppDispatch();
  const cards = useAppSelector((state) => state.card.cards);
  const isLogged = useAppSelector((state) => state.user.isLogged);
  const [isChecked, setIsChecked] = useState(false);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
  };

  useEffect(() => {
    if (!cards && isLogged) {
      dispatch(getAllCards());
    }
  }, [dispatch, cards, isLogged]);

  function handleCheckboxChange() {
    setIsChecked(!isChecked);
  }
  return (
    <div className="CreateSequence">
      {cards && isLogged && (
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
            onChange={handleCheckboxChange}
          />
          <p className={`${isChecked ? 'font-bold text-[#f87272]' : ''}`}>
            Expert
          </p>
        </motion.div>
      )}
      {isLogged && (
        <section className="cards flex m-3 gap-2">
          {cards &&
            isLogged &&
            cards.map((card) => (
              <motion.div
                key={card.id}
                animate="show"
                variants={container}
                initial="hidden"
                style={{ background: `${card.color}` }}
                className={`card card-compact w-96 bg-base-100 shadow-xl`}
              >
                <div className={`card-body`}>
                  <h2 className="card-title text-white">{card.name}</h2>
                  <p className="card-text text-white">{card.comments}</p>
                  <div className="card-actions justify-end">
                    <button
                      onClick={() => {
                        dispatch(getOneCard(card.id.toString()));
                      }}
                      className={`btn ${isChecked && 'bg-[#f87272]'}`}
                    >
                      Open
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
        </section>
      )}
    </div>
  );
}

export default CreateSequence;
