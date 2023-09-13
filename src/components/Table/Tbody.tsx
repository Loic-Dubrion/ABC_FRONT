// Module & Library
import {
  faTrashCan,
  faCheck,
  faPencil,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

// Redux
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  createSession,
  deleteSession,
} from '../../redux/store/reducers/session';
import { ISession } from '../@types/session';

interface ITbody {
  sequence_id: number;
  sequence_name: string;
  sessions: ISession[];
}

function Tbody({ sequence_id, sequence_name, sessions }: ITbody) {
  const dispatch = useAppDispatch();
  const oneCard = useAppSelector((state) => state.card.card);
  const cardId =
    oneCard && oneCard.length > 0 && oneCard[0].get_activities.card_id;
  const color =
    oneCard && oneCard.length > 0 && oneCard[0].get_activities.color;

  const [sessionData, setSessionData] = useState({
    name: '',
    sequence_id: sequence_id,
    card_id: Number(cardId),
    tool_id: Number(localStorage.getItem('tool_id')),
    comments: '',
    time: 0,
    is_face_to_face: true,
    is_group_work: false,
    equipment: '',
  });

  // Gestionnaire d'événement pour la validation
  const handleCheckClick = () => {
    dispatch(createSession(sessionData));
  };

  return (
    <>
      {sessions.map((session, index) => (
        <tbody key={index}>
          <tr>
            <th>
              <button
                className="btn"
                onClick={() => {
                  dispatch(deleteSession(session.session_id));
                  window.location.reload();
                }}
              >
                <FontAwesomeIcon icon={faTrashCan} size="lg" />
              </button>
            </th>
            <td>
              {session.session_id && (
                <button className="btn" onClick={handleCheckClick}>
                  <FontAwesomeIcon
                    icon={faPencil}
                    beat
                    size="lg"
                    style={{ color: '#000000' }}
                  />
                </button>
              )}
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
                background: color as string,
                borderRadius: '1rem',
              }}
            >
              <p className="text-white font-bold">{session.card_name}</p>
            </td>
            <td>
              {sequence_name ? (
                <p>{sequence_name}</p>
              ) : (
                <input
                  onChange={(e) =>
                    setSessionData({ ...sessionData, name: e.target.value })
                  }
                  placeholder="Ecrivez le nom de la session"
                  className="input input-bordered w-full mt-1 align-middle"
                  value={sessionData.name}
                />
              )}
            </td>
            <td>{session.tool_name}</td>
            <td>
              {session.comments ? (
                <p>{session.comments}</p>
              ) : (
                <input
                  onChange={(e) =>
                    setSessionData({ ...sessionData, comments: e.target.value })
                  }
                  placeholder="Ecrivez vos remarques"
                  className="input input-bordered w-full mt-1 align-middle overflow-auto"
                  value={sessionData.comments}
                />
              )}
            </td>
            <td>
              {session.time !== undefined ? (
                <p>{session.time}</p>
              ) : (
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
                  value={sessionData.time.toString()}
                />
              )}
            </td>
            <td>
              <select
                className="select select-bordered w-full max-w-xs"
                defaultValue={
                  session.is_face_to_face ? 'Présentiel' : 'Distanciel'
                }
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
                defaultValue={session.is_group_work ? 'Groupe' : 'Individuel'}
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
              {session.equipment ? (
                <p>{session.equipment}</p>
              ) : (
                <input
                  onChange={(e) =>
                    setSessionData({
                      ...sessionData,
                      equipment: e.target.value,
                    })
                  }
                  placeholder="Ecrivez vos matériels"
                  className="input input-bordered w-full max-w-xs align-middle"
                  value={sessionData.equipment}
                />
              )}
            </td>
          </tr>
        </tbody>
      ))}
    </>
  );
}

export default Tbody;
