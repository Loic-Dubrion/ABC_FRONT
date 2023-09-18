import React, { useEffect, useState } from 'react';
import {
  openModal,
  readOneSession,
  updateSession,
} from '../../redux/store/reducers/session';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { ISequence } from '../@types/sequence';

interface IUpdate {
  isOpen: boolean;
  sequence: ISequence[];
}

function UpdateSession({ isOpen }: IUpdate) {
  const dispatch = useAppDispatch();
  const color = localStorage.getItem('color');
  const sessionId = Number(localStorage.getItem('session_id'));
  const session = useAppSelector((state) => state.session.session);
  const [isPresentiel, setIsPresentiel] = useState(true);
  const [isGroupe, setIsGroupe] = useState(true);

  useEffect(() => {
    if (sessionId) {
      dispatch(readOneSession(sessionId));
    }
  }, [dispatch, sessionId]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    formData.append('is_face_to_face', isPresentiel.toString());
    formData.append('is_group_work', isGroupe.toString());
    formData.append('tool_id', localStorage.getItem('tool_id') as string);
    dispatch(updateSession(formData));
    dispatch(readOneSession(sessionId));
    dispatch(openModal(isOpen));
    window.location.reload();
  };

  return (
    <dialog id="update_modal" className="modal" open={isOpen}>
      <div
        className="modal-box w-full max-w-5xl"
        style={{ backgroundColor: color ? color : '' }}
      >
        <form onSubmit={handleFormSubmit}>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-white"
          >
            Nom de la session
            <input
              id="name"
              name="name"
              placeholder="Modifier le nom de la session"
              className="input input-bordered w-full mt-1 align-middle mb-4"
              defaultValue={session ? session.name : ''}
              required
              autoComplete="on"
            />
          </label>
          <label
            htmlFor="comments"
            className="block text-sm font-medium text-white"
          >
            Remarques
            <textarea
              id="comments"
              name="comments"
              placeholder="Ecrivez vos commentaire"
              className="input input-bordered w-full mt-1 align-middle mb-4 max-h-16"
              defaultValue={session ? session.comments : ''}
              autoComplete="on"
            />
          </label>
          <label
            htmlFor="time"
            className="block text-sm font-medium text-white"
          >
            Durée en minutes
            <input
              type="number"
              id="time"
              name="time"
              placeholder="Minutes"
              className="input input-bordered w-full max-w-xs mb-4"
              defaultValue={session?.time}
              autoComplete="on"
            />
          </label>
          <label
            htmlFor="presentiel"
            className="block text-sm font-medium text-white"
          >
            Présentiel / Distanciel
            <select
              id="presentiel"
              name="presentiel"
              className="select select-bordered w-full max-w-xs mb-4"
              onChange={(e) => setIsPresentiel(e.target.value === 'Présentiel')}
              autoComplete="on"
            >
              <option value="Présentiel">Présentiel</option>
              <option value="Distanciel">Distanciel</option>
            </select>
          </label>
          <label
            htmlFor="groupe"
            className="block text-sm font-medium text-white"
          >
            Individuel / Groupe
            <select
              id="groupe"
              name="groupe"
              className="select select-bordered w-full max-w-xs mb-4"
              onChange={(e) => setIsGroupe(e.target.value === 'Groupe')}
              autoComplete="on"
            >
              <option value="Individuel">Individuel</option>
              <option value="Groupe">Groupe</option>
            </select>
          </label>
          <label
            htmlFor="equipment"
            className="block text-sm font-medium text-white"
          >
            Matériel
            <textarea
              id="equipment"
              name="equipment"
              placeholder="Ecrivez vos matériels"
              className="input input-bordered w-2/5 mt-1 align-middle mb-4"
              defaultValue={session ? session.equipment : ''}
              autoComplete="on"
            />
          </label>
          <button
            className="btn float-right"
            onClick={() => {
              dispatch(openModal(false));
            }}
          >
            Annuler
          </button>
          <button className="btn float-right mr-2">Valider</button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button
          onClick={() => {
            dispatch(openModal(isOpen));
          }}
        >
          close
        </button>
      </form>
    </dialog>
  );
}

export default UpdateSession;
