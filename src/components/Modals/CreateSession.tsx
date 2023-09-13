interface ICreateSession {
  isOpen: boolean;
  onClose: () => void;
  color: string | null;
}

function CreateSession({ isOpen, onClose, color }: ICreateSession) {
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
        />
        <label className="block mb-2 text-sm font-medium text-white">
          Présentiel / Distanciel
        </label>
        <select
          className="select select-bordered w-full max-w-xs"
          defaultValue={'Présentiel'}
        >
          <option>Présentiel</option>
          <option>Distanciel</option>
        </select>
        <label className="block mb-2 text-sm font-medium  text-white">
          Individuel / Groupe
        </label>
        <select
          className="select select-bordered w-full max-w-xs"
          defaultValue={'individuel'}
        >
          <option>Individuel</option>
          <option>Groupe</option>
        </select>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}></button>
      </form>
    </dialog>
  );
}

export default CreateSession;
