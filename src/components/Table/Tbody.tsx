import { faTrashCan, faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { deleteSession, openModal } from '../../redux/store/reducers/session';
import { getOneCard } from '../../redux/store/reducers/card';
import { ISession } from '../@types/sequence';
import { useRef } from 'react';

interface ITbody {
  sessions: ISession[];
}

function Tbody({ sessions }: ITbody) {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.session.isOpen);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleBlurButtonClick = () => {
    buttonRef.current?.blur();
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
                }}
              >
                <FontAwesomeIcon icon={faTrashCan} size="lg" />
              </button>
            </th>
            <td>
              <button
                className="btn"
                onClick={() => {
                  handleBlurButtonClick();
                  dispatch(getOneCard(session.card_id.toString()));
                  localStorage.setItem(
                    'session_id',
                    session.session_id.toString()
                  );
                  setTimeout(() => {
                    dispatch(openModal(isOpen));
                  }, 100);
                }}
                ref={buttonRef}
              >
                <FontAwesomeIcon
                  icon={faPencil}
                  beat
                  size="lg"
                  style={{ color: '#000000' }}
                />
              </button>
            </td>
            <td
              style={{
                background: session.color,
                borderRadius: '1rem',
              }}
            >
              <p className="text-white font-bold">{session.card_name}</p>
            </td>
            <td>
              <p>{session.session_name}</p>
            </td>
            <td>{session.tool_name}</td>
            <td className="overflow-auto">
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
    </>
  );
}

export default Tbody;
