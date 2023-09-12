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
import { getOneScenario } from '../../redux/store/reducers/sequence';
// Components
import Sequence from '../Modals/SequenceModal';
import Colgroup from './Colgroup';
import Thead from './Thead';
import Tbody from './Tbody';

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
          <Colgroup />
          <Thead />
          {tableIsOpen
            ? tables.map((table, index) => (
                <Tbody
                  key={index}
                  card={table.name}
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
