// React Hooks

// Module & Library
import { faTrashCan, faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Redux
import { useAppDispatch } from '../../redux/hooks';
import { deleteSession } from '../../redux/store/reducers/session';
import { ISession } from '../@types/session';
import CreateSession from '../Modals/CreateSession';
import { useState } from 'react';

interface ITbody {
  sessions: ISession[];
}

function Tbody({ sessions }: ITbody) {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

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
                <button
                  className="btn"
                  onClick={() => {
                    setIsOpen(true);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faPencil}
                    beat
                    size="lg"
                    style={{ color: '#000000' }}
                  />
                </button>
              )}
            </td>
            <td
              style={{
                background: '#f0f',
                borderRadius: '1rem',
              }}
            >
              <p className="text-white font-bold">{session.card_name}</p>
            </td>
            <td>
              <p>{session.session_name}</p>
            </td>
            <td>{session.tool_name}</td>
            <td>
              <p>{session.comments}</p>
            </td>
            <td>
              <p>{session.time}</p>
            </td>
            <td>
              <p>
                {session.is_face_to_face === true ? 'Présentiel' : 'Distanciel'}
              </p>
            </td>
            <td>
              <p>{session.is_group_work === true ? 'Groupe' : 'Individuel'}</p>
            </td>
            <td>
              <p>{session.equipment}</p>
            </td>
          </tr>
        </tbody>
      ))}
      <CreateSession
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      />
    </>
  );
}

export default Tbody;
