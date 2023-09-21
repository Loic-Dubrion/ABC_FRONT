import moment from 'moment';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  deleteSequence,
  openDeleteSequenceModal,
} from '../../redux/store/reducers/sequence';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import 'moment/locale/fr';
import SuppressionSequenceModal from '../Modals/SuppressionSequenceModal';

function HasSequences() {
  const dispatch = useAppDispatch();
  const sequences = useAppSelector((state) => state.sequence.sequences);
  const isLogged = useAppSelector((state) => state.user.isLogged);
  const isOpen = useAppSelector((state) => state.sequence.isOpen);

  const handleDeleteSequence = (sequenceId: number) => {
    dispatch(deleteSequence(sequenceId));
  };

  return (
    <div className="lg:card card-compact w-3/6 bg-base-100 shadow-xl m-auto md:w-9/12">
      {isLogged && sequences.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Nom</th>
              <th>Date de création</th>
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
                        localStorage.removeItem('sequence_name');
                        dispatch(openDeleteSequenceModal(isOpen));
                      }}
                    >
                      <FontAwesomeIcon icon={faTrashCan} size="lg" />
                    </button>
                    <SuppressionSequenceModal
                      isOpen={isOpen}
                      sequenceId={sequence.id}
                    />
                  </td>
                  <td>
                    <p className="table-row-link">{sequence.id}</p>
                  </td>
                  <td>
                    <p className="table-row-link">{sequence.name}</p>
                  </td>
                  <td>
                    <p className="table-row-link">
                      {moment(sequence.created_at).format(
                        'DD/MM/YYYY HH:mm:ss'
                      )}
                    </p>
                  </td>
                  <td>
                    <Link
                      to={`/sequence/${sequence.id}`}
                      className="table-row-link text-blue-700"
                      onClick={() => {
                        localStorage.setItem(
                          'sequence_name',
                          sequence.name as string
                        );
                      }}
                    >
                      Cliquez ici pour voir le scénario
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

export default HasSequences;
