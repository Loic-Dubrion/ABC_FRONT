// React Router
import { Link, useNavigate } from 'react-router-dom';
// Redux
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
// Reducers actions
import { logout, toggleDropDown } from '../../redux/store/reducers/user';
// Module & Library
import { motion } from 'framer-motion';
// React Hooks
import { useRef, useState } from 'react';
import { createScenario } from '../../redux/store/reducers/sequence';

function WhenIsLogged() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [scenarioData, setScenarioData] = useState({
    name: '',
    user_id: localStorage.getItem('id') || '',
  });

  const isOpen = useAppSelector((state) => state.user.isOpen);

  function openModal() {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }

  function handleSubmit() {
    dispatch(createScenario(scenarioData));
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <motion.div
      animate="show"
      variants={container}
      initial="hidden"
      className="whenIsLogged"
    >
      <button
        className="btn btn-ghost w-full"
        onClick={() => {
          openModal();
        }}
      >
        Créer un scénario
      </button>
      <dialog id="my_modal_2" className="modal" ref={dialogRef}>
        <div className="modal-box">
          <form
            action="post"
            onSubmit={(e) => {
              e.preventDefault();
              dispatch(toggleDropDown(isOpen));
              dialogRef.current?.close();
              handleSubmit();
              window.location.reload();
            }}
          >
            <h3 className="font-bold text-lg mb-2">Créer un scénario</h3>
            <input
              type="text"
              name="name"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setScenarioData({ ...scenarioData, name: event.target.value });
              }}
              placeholder="Entrez le nom de scénario"
              className="input input-bordered w-full max-w-xs"
            />
            <button className="btn btn-success ml-5 text-white">Valider</button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <button className="btn btn-ghost w-full">
        <a href="#">Profil</a>
      </button>
      <button
        className="btn btn-ghost w-full"
        onClick={() => {
          dispatch(logout());
          navigate('/');
        }}
      >
        <Link to="/">Déconnexion</Link>
      </button>
    </motion.div>
  );
}

export default WhenIsLogged;
