import { useAppDispatch } from '../../redux/hooks';
import { useRef, useState } from 'react';
import { createSequence } from '../../redux/store/reducers/sequence';

function CreateSequence() {
  const dispatch = useAppDispatch();
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const [scenarioData, setScenarioData] = useState({
    name: '',
    user_id: localStorage.getItem('id') || '',
  });

  function openModal() {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }

  return (
    <div className="whenIsLogged">
      <button
        className="btn btn-ghost w-full"
        onClick={() => {
          openModal();
        }}
      >
        Créer un scénario
      </button>
      <dialog id="my_modal_2" className="modal" ref={dialogRef}>
        <div className="modal-box">
          <form
            action="post"
            onSubmit={(e) => {
              e.preventDefault();
              dialogRef.current?.close();
              dispatch(createSequence(scenarioData));
              setTimeout(() => {
                window.location.reload();
              }, 200);
            }}
          >
            <h3 className="font-bold text-lg mb-2">Créer un scénario</h3>
            <input
              type="text"
              name="name"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setScenarioData({ ...scenarioData, name: event.target.value });
              }}
              placeholder="Entrez le nom du scénario"
              className="input input-bordered w-full max-w-xs"
            />
            <button className="btn btn-success ml-5 text-white">Valider</button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

export default CreateSequence;
