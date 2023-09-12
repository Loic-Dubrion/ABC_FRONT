// Redux
import { useAppSelector } from '../../redux/hooks';

// Components
import Table from './Table';

function Tables() {
  const tableIsOpen = useAppSelector((state) => state.table.showTable);
  const tables = useAppSelector((state) => state.table.tables);
  const tableId = useAppSelector((state) => state.table.tableId);
  const scenarioName = useAppSelector((state) => state.scenario.scenarioName);
  return (
    <div className="overflow-y-auto w-full">
      {scenarioName && (
        <h2 className="text-center text-4xl font-bold">{scenarioName}</h2>
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
