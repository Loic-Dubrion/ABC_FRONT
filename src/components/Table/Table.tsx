import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ITable {
  name: string;
  color: string;
  tool: string;
}

function Table({ name, color, tool }: ITable) {
  return (
    <tbody>
      {/* row 1 */}
      <tr>
        <th>
          <button className="btn">
            <FontAwesomeIcon icon={faTrashCan} size="lg" />
          </button>
        </th>
        <td
          style={{
            background: color,
            borderRadius: '1rem',
          }}
        >
          <p className="text-white">{name}</p>
        </td>
        <td>{tool}</td>
        <td>
          <textarea
            placeholder="Ecrivez vos remarques"
            className="input input-bordered w-full"
          />
        </td>
        <td>
          <input
            type="number"
            value={0}
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
            className="input input-bordered w-full max-w-xs"
          />
        </td>
      </tr>
    </tbody>
  );
}

export default Table;
