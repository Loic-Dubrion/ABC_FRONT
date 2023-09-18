import React, { useEffect, useRef, useState } from 'react';
import {
  openModal,
  readOneSession,
  updateSession,
} from '../../redux/store/reducers/session';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useParams } from 'react-router-dom';
import { getOneSequence } from '../../redux/store/reducers/sequence';
import { ISequence } from '../@types/sequence';

interface IUpdate {
  isOpen: boolean;
  sequence: ISequence[];
}

function UpdateSession({ isOpen }: IUpdate) {
  const dispatch = useAppDispatch();
  const color = localStorage.getItem('color');
  const { id } = useParams();
  const sessionId = Number(localStorage.getItem('session_id'));
  const session = useAppSelector((state) => state.session.session);
  console.log('session :', session);
  const focusRef = useRef<HTMLInputElement>(null);
  const [sessionData, setSessionData] = useState({
    name: '',
    sequence_id: Number(id),
    tool_id: Number(localStorage.getItem('tool_id')),
    comments: '',
    time: 0,
    is_face_to_face: true,
    is_group_work: false,
    equipment: '',
  });

  useEffect(() => {
    dispatch(readOneSession(sessionId));
  }, [dispatch, sessionId]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateSession(sessionData));
    dispatch(getOneSequence(id as string));
    dispatch(openModal(isOpen));
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLDialogElement>) => {
    if (e.code === 'Enter') {
      if (sessionData.name === '') {
        alert('Veuillez entrer un nom de la session');
      }
    }
  };

  return (
    <dialog
      id="my_modal_2"
      className="modal"
      open={isOpen}
      onKeyDown={onKeyPress}
    >
      <div
        className="modal-box w-full max-w-5xl"
        style={{ backgroundColor: color ? color : '' }}
        ref={focusRef}
      >
        <form onSubmit={handleFormSubmit}>
          <label
            htmlFor="name"
            className="block  text-sm font-medium text-white"
          >
            Nom de la session
          </label>
          <input
            name="name"
            placeholder="Modifier le nom de la session"
            className="input input-bordered w-full mt-1 align-middle mb-4"
            onChange={(e) => {
              setSessionData({
                ...sessionData,
                name: e.target.value,
              });
            }}
            required
          />
          <label
            htmlFor="comments"
            className="block  text-sm font-medium text-white "
          >
            Remarques
          </label>
          <textarea
            name="comments"
            placeholder="Ecrivez vos commentaire"
            className="input input-bordered w-full mt-1 align-middle mb-4"
            defaultValue={session ? session.comments : ''}
            onChange={(e) =>
              setSessionData({ ...sessionData, comments: e.target.value })
            }
          />
          <label
            htmlFor="number"
            className="block  text-sm font-medium  text-white"
          >
            Durée en minutes
          </label>
          <input
            type="number"
            min={0}
            max={100}
            placeholder="Minutes"
            className="input input-bordered w-full max-w-xs mb-4"
            defaultValue={session ? session.time : 0}
            onChange={(e) =>
              setSessionData({ ...sessionData, time: Number(e.target.value) })
            }
          />
          <label className="block  text-sm font-medium text-white">
            Présentiel / Distanciel
          </label>
          <select
            className="select select-bordered w-full max-w-xs mb-4"
            onChange={(e) =>
              setSessionData({
                ...sessionData,
                is_face_to_face: e.target.value === 'Présentiel',
              })
            }
          >
            <option>Présentiel</option>
            <option>Distanciel</option>
          </select>
          <label className="block  text-sm font-medium  text-white">
            Individuel / Groupe
          </label>
          <select
            className="select select-bordered w-full max-w-xs mb-4"
            onChange={(e) =>
              setSessionData({
                ...sessionData,
                is_group_work: e.target.value === 'Groupe',
              })
            }
          >
            <option>Individuel</option>
            <option>Groupe</option>
          </select>
          <label
            htmlFor="equipment"
            className="block text-sm font-medium text-white "
          >
            Matériel
          </label>
          <textarea
            name="equipement"
            placeholder="Ecrivez vos matériels"
            className="input input-bordered w-2/5 mt-1 align-middle mb-4"
            defaultValue={session ? session.equipment : ''}
            onChange={(e) =>
              setSessionData({ ...sessionData, equipment: e.target.value })
            }
          />
          <label htmlFor="button"></label>
          <button
            className="btn float-right"
            onClick={() => {
              dispatch(openModal(isOpen));
            }}
          >
            Annuler
          </button>
          <button
            className="btn float-right mr-2"
            onClick={() => {
              if (sessionData.name === '') {
                alert('Veuillez entrer un nom de session');
              }
            }}
          >
            Valider
          </button>
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
