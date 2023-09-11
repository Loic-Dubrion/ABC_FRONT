import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch } from '../../redux/hooks';
import { deleteTable } from '../../redux/store/reducers/table';

interface ITable {
  id: number;
  name: string;
  color: string;
  tool: string;
}

function Table({ name, color, tool, id }: ITable) {
  const dispatch = useAppDispatch();

  return (
    <tbody id={id.toString()}>
      {/* row 1 */}
      <tr>
        <th>
          <button
            className="btn"
            onClick={() => {
              dispatch(deleteTable(id));
            }}
          >
            <FontAwesomeIcon icon={faTrashCan} size="lg" />
          </button>
        </th>
        <td
          style={{
            background: color,
            borderRadius: '1rem',
          }}
        >
          <p className="text-white font-bold">{name}</p>
        </td>
        <td>{tool}</td>
        <td>
          <textarea
            placeholder="Ecrivez vos remarques"
            className="input input-bordered w-full mt-1 align-middle"
          />
        </td>
        <td>
          <input
            type="number"
            defaultValue={0}
            min={0}
            max={100}
            placeholder="Definissez la durée en minutes"
            className="input input-bordered w-full max-w-xs"
          />
        </td>
        <td>
          <select className="select select-bordered w-full max-w-xs">
            <option>Présentiel</option>
            <option>Distanciel</option>
          </select>
        </td>
        <td>
          <select className="select select-bordered w-full max-w-xs">
            <option>Individuel</option>
            <option>Groupe</option>
          </select>
        </td>
        <td>
          <textarea
            placeholder="Ecrivez vos matériels"
            className="input input-bordered w-full max-w-xs align-middle"
          />
        </td>
      </tr>
    </tbody>
  );
}

export default Table;
