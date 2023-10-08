import React from "react";
import {
  deleteSession,
  openDeleteSessionModal,
} from "../../redux/store/reducers/session";
import { useAppDispatch } from "../../redux/hooks";

interface Props {
  isOpen: boolean;
  sessionId: number;
}

function SuppressionSessionModal({ isOpen, sessionId }: Props) {
  const dispatch = useAppDispatch();

  return (
    <React.Fragment>
      <dialog id="Delete-session-modal" className="modal" open={isOpen}>
        <div className="modal-box mt-10">
          <h3 className="font-bold text-lg text-center text-[#f87272] error-line mb-5">
            Vous êtes sur le point de supprimer la session !
          </h3>
          <section className="button-container flex justify-evenly">
            <button
              className="btn btn-error"
              onClick={() => {
                dispatch(deleteSession(sessionId));
                dispatch(openDeleteSessionModal(isOpen));
              }}
            >
              Supprimer
            </button>
            <button
              className="btn btn-success"
              onClick={() => {
                dispatch(openDeleteSessionModal(isOpen));
              }}
            >
              Annuler
            </button>
          </section>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button
            onClick={() => {
              dispatch(openDeleteSessionModal(isOpen));
            }}
          >
            close
          </button>
        </form>
      </dialog>
    </React.Fragment>
  );
}

export default SuppressionSessionModal;
