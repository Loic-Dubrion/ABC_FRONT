// React Hooks
import { useState } from 'react';
import { useParams } from 'react-router-dom';
// Reducers actions
import { updateSequence } from '../../redux/store/reducers/sequence';
import { useAppDispatch } from '../../redux/hooks';

interface ISequenceModal {
  isOpen: boolean;
  onClose: () => void;
}

function SequenceModal({ isOpen, onClose }: ISequenceModal) {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [scenarioData, setScenarioData] = useState({
    name: '',
    sequenceId: '',
  });

  return (
    <dialog id="sqfqsfqsaz" className="modal" open={isOpen}>
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
              localStorage.setItem('sequence_name', event.target.value);
            }}
            placeholder="Entrez le nom de scénario"
            className="input input-bordered w-full max-w-xs"
          />
          <button
            className="btn btn-success ml-5 text-white"
            onClick={(event) => {
              event.preventDefault();
              dispatch(updateSequence(scenarioData));
              onClose();
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
  );
}

export default SequenceModal;
