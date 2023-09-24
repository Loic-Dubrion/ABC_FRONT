import React from 'react';
import { useAppDispatch } from '../../redux/hooks';
import {
  deleteSequence,
  openDeleteSequenceModal,
} from '../../redux/store/reducers/sequence';

interface Props {
  sequenceId: number;
  isOpen: boolean;
}

function SuppressionSequenceModal({ isOpen, sequenceId }: Props) {
  const dispatch = useAppDispatch();

  return (
    <React.Fragment>
      <dialog id="Delete-sequence-modal" className="modal" open={isOpen}>
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center text-[#f87272] error-line mb-5">
            Vous êtes sur le point de supprimer le scénario !
          </h3>
          <section className="button-container flex justify-evenly">
            <button
              className="btn btn-error"
              onClick={() => {
                dispatch(deleteSequence(sequenceId));
                dispatch(openDeleteSequenceModal(isOpen));
              }}
            >
              Supprimer
            </button>
            <button
              className="btn btn-success"
              onClick={() => {
                dispatch(openDeleteSequenceModal(isOpen));
              }}
            >
              Annuler
            </button>
          </section>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button
            onClick={() => {
              dispatch(openDeleteSequenceModal(isOpen));
            }}
          >
            close
          </button>
        </form>
      </dialog>
    </React.Fragment>
  );
}

export default SuppressionSequenceModal;
