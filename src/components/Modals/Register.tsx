import { useRef } from 'react';

function Register() {
  const registerModalRef = useRef<HTMLDialogElement>(null);

  function openModal() {
    if (registerModalRef.current) {
      registerModalRef.current.showModal();
    }
  }

  return (
    <div className="Register">
      {/* Open the modal using the openModal function */}
      <button className="btn btn-ghost w-full" onClick={openModal}>
        S'enregistrer
      </button>
      <dialog ref={registerModalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click outside to close</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

export default Register;
