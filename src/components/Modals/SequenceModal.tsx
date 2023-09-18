import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  toggleUpdateSequenceMenu,
  updateSequence,
} from '../../redux/store/reducers/sequence';
import { useAppDispatch } from '../../redux/hooks';

interface SequenceModal {
  isOpen: boolean;
}

function SequenceModal({ isOpen }: SequenceModal) {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [scenarioData, setScenarioData] = useState({
    name: '',
    sequenceId: id as string,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(updateSequence(scenarioData));
    dispatch(toggleUpdateSequenceMenu(isOpen));
  };

  return (
    <dialog id="sequence-modal" className="modal" open={isOpen}>
      <div className="modal-box">
        <form action="post" onSubmit={handleSubmit}>
          <h3 className="font-bold text-lg mb-2">
            Modifier le nom du scénario
          </h3>
          <input
            type="text"
            id="sequence-name"
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
            autoComplete="off"
          />
          <button className="btn btn-success ml-5 text-white">Valider</button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button
          onClick={() => {
            dispatch(toggleUpdateSequenceMenu(isOpen));
            setScenarioData({
              name: '',
              sequenceId: id as string,
            });
          }}
        >
          close
        </button>
      </form>
    </dialog>
  );
}

export default SequenceModal;
