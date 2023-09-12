// Module & Library
import { faTrashCan, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

// Redux
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { createSession } from '../../redux/store/reducers/session';

interface ITable {
  card: string;
  color: string;
  tool: string;
}

function Tbody({ card, color, tool }: ITable) {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const oneCard = useAppSelector((state) => state.card.card);
  const cardId =
    oneCard && oneCard.length > 0 && oneCard[0].get_activities.card_id;

  const [sessionData, setSessionData] = useState({
    name: '',
    sequence_id: Number(id),
    card_id: Number(cardId),
    tool_id: Number(localStorage.getItem('tool_id')),
    comments: '',
    time: 0,
    is_face_to_face: true,
    is_group_work: false,
    equipment: '',
  });

  // Gestionnaire d'événement pour la suppression
  const handleDeleteClick = () => {
    // Mettez ici la logique de suppression que vous souhaitez effectuer
    // par exemple, vous pouvez appeler une fonction qui supprime cet élément
    // de la liste.
  };

  // Gestionnaire d'événement pour la validation
  const handleCheckClick = () => {
    dispatch(createSession(sessionData));
  };

  return (
    <tbody>
      {/* row 1 */}
      <tr>
        <th>
          <button className="btn" onClick={handleDeleteClick}>
            <FontAwesomeIcon icon={faTrashCan} size="lg" />
          </button>
        </th>
        <td>
          <button className="btn" onClick={handleCheckClick}>
            <FontAwesomeIcon
              icon={faCheck}
              beat
              size="lg"
              style={{ color: '#000000' }}
            />
          </button>
        </td>
        <td
          style={{
            background: color,
            borderRadius: '1rem',
          }}
        >
          <p className="text-white font-bold">{card}</p>
        </td>
        <td>
          <textarea
            onChange={(e) =>
              setSessionData({ ...sessionData, name: e.target.value })
            }
            placeholder="Ecrivez le nom de la session"
            className="input input-bordered w-full mt-1 align-middle"
          />
        </td>
        <td>{tool}</td>
        <td>
          <textarea
            onChange={(e) =>
              setSessionData({ ...sessionData, comments: e.target.value })
            }
            placeholder="Ecrivez vos remarques"
            className="input input-bordered w-full mt-1 align-middle"
          />
        </td>
        <td>
          <input
            type="number"
            defaultValue={0}
            onChange={(e) =>
              setSessionData({
                ...sessionData,
                time: Number(e.target.value),
              })
            }
            min={0}
            max={100}
            placeholder="Minutes"
            className="input input-bordered w-full max-w-xs"
          />
        </td>
        <td>
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
        </td>
        <td>
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
        </td>
        <td>
          <textarea
            onChange={(e) =>
              setSessionData({ ...sessionData, equipment: e.target.value })
            }
            placeholder="Ecrivez vos matériels"
            className="input input-bordered w-full max-w-xs align-middle"
          />
        </td>
      </tr>
    </tbody>
  );
}

export default Tbody;
