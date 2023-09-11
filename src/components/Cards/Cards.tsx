import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { motion } from 'framer-motion';
import { getAllCards, getOneCard } from '../../redux/store/reducers/card';

import { createTable, showTable } from '../../redux/store/reducers/table';

function Cards() {
  const dispatch = useAppDispatch();
  const oneCard = useAppSelector((state) => state.card.card);
  const cardRef = useRef<HTMLDialogElement | null>(null);
  const isChecked = useAppSelector((state) => state.card.isChecked);
  const tableId = useAppSelector((state) => state.table.tableId);
  const allCards = useAppSelector((state) => state.card.cards);
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

  useEffect(() => {
    if (!allCards && isLogged) {
      dispatch(getAllCards());
    }
  }, [dispatch, allCards, isLogged]);

  return (
    isLogged && (
      <section className="cards flex m-3 gap-2">
        {allCards &&
          isLogged &&
          allCards.map((card, index) => (
            <motion.div
              animate="show"
              key={index}
              variants={container}
              initial="hidden"
              style={{ background: `${card.color}` }}
              className={`card card-compact w-96 bg-base-100 shadow-xl md:w-full`}
            >
              <div className="card-body" key={card.id}>
                <h2 className="card-title text-white">{card.name}</h2>
                <p className="card-text text-white">{card.comments}</p>
                <div className="card-actions justify-end">
                  <button
                    onClick={() => {
                      dispatch(getOneCard(card.id.toString()));
                      setTimeout(() => {
                        cardRef.current?.showModal();
                      }, 100);
                    }}
                    className={`btn ${isChecked && 'bg-[#f87272]'}`}
                  >
                    Open
                  </button>

                  {oneCard &&
                    oneCard.map((current) => (
                      <dialog
                        id="my_modal_2"
                        className="modal"
                        key={current.get_activities.card_id}
                        ref={cardRef}
                      >
                        <div
                          className="modal-box w-full max-w-5xl flex gap-2"
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
                                    <li className="py-2 text-white" key={index}>
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
                                            key={e.tool_name}
                                            className="btn btn-sm m-1"
                                            type="button"
                                            onClick={() => {
                                              cardRef.current?.close();
                                              dispatch(showTable(true));
                                              dispatch(
                                                createTable({
                                                  id: tableId,
                                                  name: current.get_activities
                                                    .card_name,
                                                  color:
                                                    current.get_activities
                                                      .color,
                                                  tool: e.tool_name,
                                                })
                                              );
                                            }}
                                          >
                                            {e.tool_name}
                                          </button>
                                        ))}
                                    {isChecked &&
                                      tool.tools.map((e) => (
                                        <button
                                          key={e.tool_name}
                                          className="btn btn-sm m-1"
                                          type="button"
                                          onClick={() => {
                                            cardRef.current?.close();
                                            dispatch(showTable(true));
                                            dispatch(
                                              createTable({
                                                id: tableId,
                                                name: current.get_activities
                                                  .card_name,
                                                color:
                                                  current.get_activities.color,
                                                tool: e.tool_name,
                                              })
                                            );
                                          }}
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
    )
  );
}

export default Cards;
