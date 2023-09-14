import { useState } from 'react';
import { createSession } from '../../redux/store/reducers/session';
import { useAppDispatch } from '../../redux/hooks';
import { useParams } from 'react-router-dom';
import { modalIsOpen } from '../../redux/store/reducers/card';

interface ICreateSession {
  isOpen: boolean;
  color: string;
  card_id: number;
}

function CreateSession({ isOpen, color, card_id }: ICreateSession) {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [sessionData, setSessionData] = useState({
    name: '',
    sequence_id: Number(id),
    card_id: card_id,
    tool_id: 0,
    comments: '',
    time: 0,
    is_face_to_face: true,
    is_group_work: false,
    equipment: '',
  });
  console.log('sessionData :', sessionData);
  return (
    <dialog id="my_modal_2" className="modal" open={isOpen}>
      <div
        className="modal-box w-full max-w-5xl"
        style={{ backgroundColor: color }}
      >
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-white"
        >
          Nom de la session
        </label>
        <input
          name="name"
          placeholder="Ecrivez le nom de la session"
          className="input input-bordered w-full mt-1 align-middle"
          onChange={(e) =>
            setSessionData({
              ...sessionData,
              name: e.target.value,
              card_id: Number(localStorage.getItem('card_id')),
              tool_id: Number(localStorage.getItem('tool_id')),
            })
          }
        />
        <label
          htmlFor="comments"
          className="block mb-2 text-sm font-medium text-white"
        >
          Remarques
        </label>
        <textarea
          name="comments"
          placeholder="Ecrivez vos commentaire"
          className="input input-bordered w-full mt-1 align-middle"
          onChange={(e) =>
            setSessionData({
              ...sessionData,
              comments: e.target.value,
              card_id: Number(localStorage.getItem('card_id')),
              tool_id: Number(localStorage.getItem('tool_id')),
            })
          }
        />
        <label
          htmlFor="number"
          className="block mb-2 text-sm font-medium  text-white"
        >
          Durée en minutes
        </label>
        <input
          type="number"
          defaultValue={0}
          min={0}
          max={100}
          placeholder="Minutes"
          className="input input-bordered w-full max-w-xs"
          onChange={(e) =>
            setSessionData({
              ...sessionData,
              time: Number(e.target.value),
              card_id: Number(localStorage.getItem('card_id')),
              tool_id: Number(localStorage.getItem('tool_id')),
            })
          }
        />
        <label className="block mb-2 text-sm font-medium text-white">
          Présentiel / Distanciel
        </label>
        <select
          className="select select-bordered w-full max-w-xs"
          onChange={(e) =>
            setSessionData({
              ...sessionData,
              is_face_to_face: e.target.value === 'Présentiel',
              card_id: Number(localStorage.getItem('card_id')),
              tool_id: Number(localStorage.getItem('tool_id')),
            })
          }
        >
          <option>Présentiel</option>
          <option>Distanciel</option>
        </select>
        <label className="block mb-2 text-sm font-medium  text-white">
          Individuel / Groupe
        </label>
        <select
          className="select select-bordered w-full max-w-xs"
          onChange={(e) =>
            setSessionData({
              ...sessionData,
              is_group_work: e.target.value === 'Groupe',
              card_id: Number(localStorage.getItem('card_id')),
              tool_id: Number(localStorage.getItem('tool_id')),
            })
          }
        >
          <option>Individuel</option>
          <option>Groupe</option>
        </select>
        <label
          htmlFor="equipment"
          className="block mb-2 text-sm font-medium text-white"
        >
          Matériel
        </label>
        <textarea
          name="equipement"
          placeholder="Ecrivez vos matériels"
          className="input input-bordered w-2/5 mt-1 align-middle"
          onChange={(e) =>
            setSessionData({
              ...sessionData,
              equipment: e.target.value,
              card_id: Number(localStorage.getItem('card_id')),
              tool_id: Number(localStorage.getItem('tool_id')),
            })
          }
        />
        <label htmlFor="button"></label>
        <button
          className="btn float-right"
          onClick={() => {
            dispatch(createSession(sessionData));
            dispatch(modalIsOpen(isOpen));
            localStorage.removeItem('card_id');
            localStorage.removeItem('tool_id');
            window.location.reload();
          }}
        >
          Valider
        </button>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button
          onClick={() => {
            dispatch(modalIsOpen(isOpen));
          }}
        ></button>
      </form>
    </dialog>
  );
}

export default CreateSession;
