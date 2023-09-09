import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { motion } from 'framer-motion';
import {
  getAllCards,
  getOneCard,
  togglerCheckbox,
} from '../../redux/store/reducers/card';

function CreateSequence() {
  const dispatch = useAppDispatch();
  const allCards = useAppSelector((state) => state.card.cards);
  const oneCard = useAppSelector((state) => state.card.card);
  console.log('oneCard :', oneCard);
  const cardRef = useRef<HTMLDialogElement | null>(null);
  const isLogged = useAppSelector((state) => state.user.isLogged);
  const isChecked = useAppSelector((state) => state.card.isChecked);

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
    if (!allCards && isLogged) {
      dispatch(getAllCards());
    }
  }, [dispatch, allCards, isLogged]);

  function handleCheckboxChange() {
    dispatch(togglerCheckbox(isChecked));
  }

  function openModal() {
    if (cardRef.current) {
      cardRef.current.showModal();
    }
  }
  return (
    <div className="CreateSequence">
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
            onChange={handleCheckboxChange}
          />
          <p className={`${isChecked ? 'font-bold text-[#f87272]' : ''}`}>
            Expert
          </p>
        </motion.div>
      )}
      {isLogged && (
        <section className="cards flex m-3 gap-2">
          {allCards &&
            isLogged &&
            allCards.map((card) => (
              <motion.div
                key={card.id}
                animate="show"
                variants={container}
                initial="hidden"
                style={{ background: `${card.color}` }}
                className={`card card-compact w-96 bg-base-100 shadow-xl md:w-full`}
              >
                <div className="card-body">
                  <h2 className="card-title text-white">{card.name}</h2>
                  <p className="card-text text-white">{card.comments}</p>
                  <div className="card-actions justify-end">
                    <button
                      onClick={() => {
                        dispatch(getOneCard(card.id.toString()));
                        openModal();
                      }}
                      className={`btn ${isChecked && 'bg-[#f87272]'}`}
                    >
                      Open
                    </button>
                    {oneCard &&
                      oneCard.map((current) => (
                        <dialog id="my_modal_2" className="modal" ref={cardRef}>
                          <div
                            className="modal-box w-full max-w-5xl flex gap-2"
                            id={current.get_activities.card_id}
                            style={{ background: current.get_activities.color }}
                          >
                            <div
                              className="card w-96 bg-base-100"
                              style={{
                                background: current.get_activities.color,
                              }}
                            >
                              <div className="card-body">
                                <h2 className="card-title text-white">
                                  {current.get_activities.card_name}
                                </h2>
                                <ul>
                                  {current.get_activities.activities.map(
                                    (activities, index) => (
                                      <li
                                        className="py-2 text-white"
                                        key={index}
                                      >
                                        {activities}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            </div>
                            <div
                              className="card bg-base-100  w-full flex flex-col justify-between content-between"
                              style={{
                                background: current.get_activities.color,
                              }}
                            >
                              {current.get_activities.tool_categories.map(
                                (tool, index) => (
                                  <div className="card-body flex" key={index}>
                                    <strong className="card-title text-sm text-white">
                                      {tool.tool_category_name}
                                    </strong>
                                    <p>
                                      {!isChecked &&
                                        tool.tools
                                          .filter((e) => e.level_id === 1)
                                          .map((e) => (
                                            <button
                                              key={e.tool_name} // Assurez-vous d'ajouter une clé unique à chaque élément dans la liste.
                                              className="btn btn-sm mr-2"
                                              type="button"
                                            >
                                              {e.tool_name}
                                            </button>
                                          ))}
                                      {isChecked &&
                                        tool.tools.map((e) => (
                                          <button
                                            key={e.tool_name} // Assurez-vous d'ajouter une clé unique à chaque élément dans la liste.
                                            className="btn btn-sm mr-2"
                                            type="button"
                                          >
                                            {e.tool_name}
                                          </button>
                                        ))}
                                    </p>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                          <form method="dialog" className="modal-backdrop">
                            <button></button>
                          </form>
                        </dialog>
                      ))}
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
