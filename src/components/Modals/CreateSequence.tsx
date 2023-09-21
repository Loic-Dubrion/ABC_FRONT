import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import React, { useRef } from 'react';
import { createSequence } from '../../redux/store/reducers/sequence';
import { toggleDropDown } from '../../redux/store/reducers/user';
import { useNavigate } from 'react-router-dom';

function CreateSequence() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const isOpen = useAppSelector((state) => state.user.isOpen);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    formData.append('user_id', localStorage.getItem('id') as string);
    dispatch(createSequence(formData));
    dialogRef.current?.close();
    if (isOpen === true) {
      dispatch(toggleDropDown(isOpen));
    }
    navigate(`/`);
  };
  return (
    <div className="whenIsLogged">
      <button
        className="btn btn-ghost w-full"
        onClick={() => {
          dialogRef.current?.showModal();
        }}
      >
        Créer un scénario
      </button>
      <dialog id="my_modal_2" className="modal" ref={dialogRef}>
        <div className="modal-box">
          <form action="post" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label
                htmlFor="name"
                className="flex flex-col  text-sm font-medium text-black gap-1"
              >
                Créer un scénario
                <div className="flex flex-row items-end">
                  <div className="flex-grow mr-2">
                    <input
                      id="name"
                      name="name"
                      placeholder="Entrez le nom du scénario"
                      className="input input-bordered w-full align-middle text-black"
                      autoComplete="off"
                    />
                  </div>
                  <button className="btn btn-success ml-2">Valider</button>
                </div>
              </label>
            </div>
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
