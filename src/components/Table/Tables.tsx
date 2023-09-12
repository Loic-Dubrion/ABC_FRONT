// Redux
import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

// Components
import Table from './Table';
import { useParams } from 'react-router-dom';
import {
  getOneScenario,
  updateScenario,
} from '../../redux/store/reducers/scenario';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

function Tables() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const tableIsOpen = useAppSelector((state) => state.table.showTable);
  const tables = useAppSelector((state) => state.table.tables);
  const tableId = useAppSelector((state) => state.table.tableId);
  const scenarioName = useAppSelector((state) => state.scenario.scenarioName);
  const [scenarioData, setScenarioData] = useState({
    name: '',
    sequenceId: '',
  });

  useEffect(() => {
    function fetchOneSequence(id: string) {
      dispatch(getOneScenario(id));
    }
    fetchOneSequence(id as string);
  }, [dispatch, id]);

  return (
    <div className="overflow-y-auto w-full">
      {scenarioName && (
        <div className="flex gap-3 items-center">
          <h2 className="text-4xl m-3 font-bold">{scenarioName}</h2>
          <button
            onClick={() => {
              dialogRef.current?.showModal();
            }}
          >
            <FontAwesomeIcon
              icon={faPencil}
              beat
              size="lg"
              style={{ color: '#000000' }}
            />
          </button>
          <dialog id="sqfqsfqsaz" className="modal" ref={dialogRef}>
            <div className="modal-box">
              <form action="post">
                <h3 className="font-bold text-lg mb-2">
                  Modifier le nom du scénario
                </h3>
                <input
                  type="text"
                  name="name"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setScenarioData({
                      ...scenarioData,
                      name: event.target.value,
                      sequenceId: id as string,
                    });
                  }}
                  placeholder="Entrez le nom de scénario"
                  className="input input-bordered w-full max-w-xs"
                />
                <button
                  className="btn btn-success ml-5 text-white"
                  onClick={(event) => {
                    event.preventDefault();
                    dialogRef.current?.close();
                    dispatch(updateScenario(scenarioData));
                  }}
                >
                  Valider
                </button>
              </form>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>
      )}
      {tables.length > 0 && (
        <table className="table w-full">
          {/* head */}
          <colgroup>
            <col style={{ width: '3%' }} />
            <col style={{ width: '3%' }} />
            <col style={{ width: '15%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '27%' }} />
            <col style={{ width: '7%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '15%' }} />
          </colgroup>
          <thead>
            <tr>
              <th></th>
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
                  id={tableId}
                  name={table.name}
                  color={table.color}
                  tool={table.tool}
                />
              ))
            : null}
        </table>
      )}
    </div>
  );
}

export default Tables;
