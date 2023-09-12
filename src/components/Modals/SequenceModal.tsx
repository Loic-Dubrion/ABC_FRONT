// React Hooks
import { useState } from 'react';
import { useParams } from 'react-router-dom';
// Reducers actions
import { updateScenario } from '../../redux/store/reducers/sequence';
import { useAppDispatch } from '../../redux/hooks';

function Sequence() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [scenarioData, setScenarioData] = useState({
    name: '',
    sequenceId: '',
  });

  return (
    <dialog id="sqfqsfqsaz" className="modal">
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
  );
}

export default Sequence;
