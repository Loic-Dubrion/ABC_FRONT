// React hooks
import { useEffect } from 'react';
// Redux
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getAllScenarios } from '../../redux/store/reducers/scenario';

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
              <th>ID</th>
              <th>Nom</th>
              <th>Date de création</th>
              <th>Date de mise à jour</th>
            </tr>
          </thead>
          {scenarios.length &&
            scenarios.map((scenario) => (
              <tbody>
                <tr>
                  <th>{scenario.id}</th>
                  <td>{scenario.name}</td>
                  <td>{scenario.created_at}</td>
                  <td>{scenario.updated_at || 'Pas de mise à jour'}</td>
                </tr>
              </tbody>
            ))}
        </table>
      )}
    </div>
  );
}

export default Scenarios;
