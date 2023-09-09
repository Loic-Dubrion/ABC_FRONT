interface ITable {
  name: string;
  color: string;
  tool: string;
}

function Table({ name, color, tool }: ITable) {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Mon scénario</th>
            <th>Activités</th>
            <th>Remarques</th>
            <th>Durée</th>
            <th>Présentiel / Distanciel</th>
            <th>Individuel / Groupe</th>
            <th>Matériel</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr>
            <th>1</th>
            <td style={{ background: color }}>{name}</td>
            <td>{tool}</td>
            <td>
              <input
                type="text"
                placeholder="Ecrivez vos remarques"
                className="input input-bordered w-full max-w-xs"
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
              <input
                type="text"
                placeholder="Ecrivez vos matériels"
                className="input input-bordered w-full max-w-xs"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Table;
