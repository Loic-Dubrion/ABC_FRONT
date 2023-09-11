import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getAllScenarios } from '../../redux/store/reducers/scenario';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

function Scenarios() {
  const dispatch = useAppDispatch();
  const scenarios = useAppSelector((state) => state.scenario.scenarios);
  const isLogged = useAppSelector((state) => state.user.isLogged);

  useEffect(() => {
    function fetchScenarios() {
      dispatch(getAllScenarios());
    }

    fetchScenarios();
  }, [dispatch]);

  return (
    <div className="overflow-x-auto">
      {isLogged && (
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Nom</th>
              <th>Date de création</th>
              <th>Date de mise à jour</th>
            </tr>
          </thead>
          <tbody>
            {scenarios.length > 0 &&
              scenarios.map((scenario) => (
                <tr key={scenario.id}>
                  <td>
                    <button className="btn bg-transparent border-none">
                      <FontAwesomeIcon icon={faTrashCan} size="lg" />
                    </button>
                  </td>
                  <td>
                    <Link
                      to={`/scenario/${scenario.id}`}
                      className="table-row-link"
                    >
                      {scenario.id}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/scenario/${scenario.id}`}
                      className="table-row-link"
                    >
                      {scenario.name}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/scenario/${scenario.id}`}
                      className="table-row-link"
                    >
                      {scenario.created_at}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/scenario/${scenario.id}`}
                      className="table-row-link"
                    >
                      {scenario.updated_at || 'Pas de mise à jour'}
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Scenarios;
