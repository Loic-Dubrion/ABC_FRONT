import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { motion } from 'framer-motion';
import {
  getAllCards,
  getOneCard,
  togglerCheckbox,
} from '../../redux/store/reducers/card';

import {
  createTable,
  getToolName,
  showTable,
} from '../../redux/store/reducers/table';
import Table from '../Table/Table';

function CreateSequence() {
  const dispatch = useAppDispatch();
  const allCards = useAppSelector((state) => state.card.cards);
  const oneCard = useAppSelector((state) => state.card.card);
  const cardRef = useRef<HTMLDialogElement | null>(null);
  const isLogged = useAppSelector((state) => state.user.isLogged);
  const isChecked = useAppSelector((state) => state.card.isChecked);
  const tableIsOpen = useAppSelector((state) => state.table.showTable);
  const tables = useAppSelector((state) => state.table.tables);

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
                      oneCard.map((current, index) => (
                        <dialog
                          id="my_modal_2"
                          className="modal"
                          key={index}
                          ref={cardRef}
                        >
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
                                              key={e.tool_name}
                                              className="btn btn-sm m-1"
                                              type="button"
                                              onClick={() => {
                                                cardRef.current?.close();
                                                dispatch(showTable(true));
                                                dispatch(
                                                  getToolName(e.tool_name)
                                                );
                                                dispatch(
                                                  createTable({
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
                                                getToolName(e.tool_name)
                                              );
                                              dispatch(
                                                createTable({
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
      <div className="overflow-y-auto w-full">
        {tables.length > 0 && (
          <table className="table w-full">
            {/* head */}
            <colgroup>
              <col style={{ width: '3%' }} />
              <col style={{ width: '15%' }} />
              <col style={{ width: '10%' }} />
              <col style={{ width: '30%' }} />
              <col style={{ width: '7%' }} />
              <col style={{ width: '10%' }} />
              <col style={{ width: '10%' }} />
              <col style={{ width: '15%' }} />
            </colgroup>
            <thead>
              <tr>
                <th></th>
                <th>Mon scénario</th>
                <th>Activités</th>
                <th>Remarques</th>
                <th>Durée</th>
                <th>Présentiel / Distanciel</th>
                <th>Individuel / Groupe</th>
                <th>Matériel</th>
              </tr>
            </thead>
            {tableIsOpen
              ? tables.map((table, index) => (
                  <Table
                    key={index}
                    name={table.name}
                    color={table.color}
                    tool={table.tool}
                  />
                ))
              : null}
          </table>
        )}
      </div>
    </div>
  );
}

export default CreateSequence;
