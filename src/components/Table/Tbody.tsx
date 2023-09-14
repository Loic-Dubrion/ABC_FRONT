import { faTrashCan, faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { deleteSession, openModal } from '../../redux/store/reducers/session';
import { ISession } from '../@types/session';
import { getOneCard } from '../../redux/store/reducers/card';

interface ITbody {
  sessions: ISession[];
}

function Tbody({ sessions }: ITbody) {
  console.log('sessions :', sessions);
  console.log('card_id :', localStorage.getItem('card_id'));
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.session.isOpen);

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
              <button
                className="btn"
                onClick={() => {
                  dispatch(openModal(isOpen));
                  dispatch(
                    getOneCard(localStorage.getItem('card_id') as string)
                  );
                }}
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
    </>
  );
}

export default Tbody;
