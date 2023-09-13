import moment from 'moment';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  deleteSequence,
  getAllSequences,
} from '../../redux/store/reducers/sequence';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import 'moment/locale/fr';

function Sequences() {
  const dispatch = useAppDispatch();
  const message = useAppSelector((state) => state.sequence.message);
  const sequences = useAppSelector((state) => state.sequence.sequences);
  console.log('scenar :', sequences);
  const isLogged = useAppSelector((state) => state.user.isLogged);

  useEffect(() => {
    function fetchSequences() {
      dispatch(getAllSequences());
    }
    fetchSequences();
    if (message !== null) {
      dispatch(getAllSequences());
    }
  }, [dispatch, message]);

  const handleDeleteSequence = (sequenceId: number) => {
    dispatch(deleteSequence(sequenceId));
  };

  return (
    <div className="overflow-x-auto">
      {isLogged && sequences.length > 0 && (
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
            {sequences.length > 0 &&
              sequences.map((sequence) => (
                <tr key={sequence.id}>
                  <td>
                    <button
                      className="btn bg-transparent border-none"
                      onClick={() => {
                        handleDeleteSequence(sequence.id as number);
                        localStorage.removeItem('sequence_name');
                      }}
                    >
                      <FontAwesomeIcon icon={faTrashCan} size="lg" />
                    </button>
                  </td>
                  <td>
                    <Link
                      to={`/sequence/${sequence.id}`}
                      className="table-row-link"
                    >
                      {sequence.id}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/sequence/${sequence.id}`}
                      className="table-row-link"
                    >
                      {sequence.name}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/sequence/${sequence.id}`}
                      className="table-row-link"
                    >
                      {moment(sequence.created_at).format(
                        'DD/MM/YYYY HH:mm:ss'
                      )}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/sequence/${sequence.id}`}
                      className="table-row-link"
                    >
                      {sequence.updated_at
                        ? moment(sequence.updated_at).format('DD/MM/YYYY HH:mm')
                        : 'Pas de mise à jour'}
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

export default Sequences;
