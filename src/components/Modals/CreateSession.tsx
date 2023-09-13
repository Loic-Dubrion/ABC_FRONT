import { useState } from 'react';
import { createSession } from '../../redux/store/reducers/session';
import { useAppDispatch } from '../../redux/hooks';
import { useParams } from 'react-router-dom';

interface ICreateSession {
  isOpen: boolean;
  onClose: () => void;
  color: string | null;
}

function CreateSession({ isOpen, onClose, color }: ICreateSession) {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [sessionData, setSessionData] = useState({
    name: '',
    sequence_id: Number(id),
    card_id: Number(localStorage.getItem('card_id')),
    tool_id: Number(localStorage.getItem('tool_id')),
    comments: '',
    time: 0,
    is_face_to_face: true,
    is_group_work: false,
    equipment: '',
  });

  return (
    <dialog id="my_modal_2" className="modal" open={isOpen}>
      <div
        className="modal-box w-full max-w-5xl"
        style={{ backgroundColor: color as string }}
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
            setSessionData({ ...sessionData, name: e.target.value })
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
            setSessionData({ ...sessionData, comments: e.target.value })
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
            setSessionData({ ...sessionData, time: Number(e.target.value) })
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
            setSessionData({ ...sessionData, equipment: e.target.value })
          }
        />
        <label htmlFor="button"></label>
        <button
          className="btn float-right"
          onClick={() => {
            dispatch(createSession(sessionData));
            onClose();
            window.location.reload();
          }}
        >
          Valider
        </button>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}></button>
      </form>
    </dialog>
  );
}

export default CreateSession;