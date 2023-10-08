import { useParams } from "react-router-dom";
import {
  toggleUpdateSequenceMenu,
  updateSequence,
} from "../../redux/store/reducers/sequence";
import { useAppDispatch } from "../../redux/hooks";

interface SequenceModal {
  isOpen: boolean;
}

function SequenceModal({ isOpen }: SequenceModal) {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    formData.append("sequenceId", id as string);
    dispatch(updateSequence(formData));
    dispatch(toggleUpdateSequenceMenu(isOpen));
  };

  return (
    <dialog id="sequence-modal" className="modal" open={isOpen}>
      <div className="modal-box">
        <form action="post" onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label
              htmlFor="name"
              className="flex flex-col  text-sm font-medium text-black gap-1"
            >
              Modifier le nom du scénario
              <div className="flex flex-row items-end">
                <div className="flex-grow mr-2">
                  <input
                    id="name"
                    name="name"
                    placeholder="Nom du scénario"
                    className="input input-bordered w-full align-middle text-black"
                    autoComplete="off"
                    required
                  />
                </div>
                <button className="btn btn-success ml-2">Valider</button>
              </div>
            </label>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button
          onClick={() => {
            dispatch(toggleUpdateSequenceMenu(isOpen));
          }}
        >
          close
        </button>
      </form>
    </dialog>
  );
}

export default SequenceModal;
