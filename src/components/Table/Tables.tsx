// React hooks
import { useEffect } from 'react';
// Module && Library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
// React router
import { useParams } from 'react-router-dom';
// Redux
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
// Reducers
import { getOneScenario } from '../../redux/store/reducers/scenario';
// Components
import Table from './Table';
import Sequence from '../Modals/Sequence';

function Tables() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const tableIsOpen = useAppSelector((state) => state.table.showTable);
  const tables = useAppSelector((state) => state.table.tables);
  const scenarioName = useAppSelector((state) => state.scenario.scenarioName);

  useEffect(() => {
    function fetchOneSequence(id: string) {
      dispatch(getOneScenario(id));
    }
    fetchOneSequence(id as string);
  }, [dispatch, id]);

  const handleClick = () => {};
  return (
    <div className="overflow-y-auto w-full">
      {scenarioName && (
        <div className="flex gap-3 items-center">
          <h2 className="text-4xl m-3 font-bold">{scenarioName}</h2>
          <button
            onClick={() => {
              handleClick();
            }}
          >
            <FontAwesomeIcon
              icon={faPencil}
              beat
              size="lg"
              style={{ color: '#000000' }}
            />
          </button>
          <Sequence />
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
