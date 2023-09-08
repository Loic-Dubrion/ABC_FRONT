import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getAllCards } from '../../redux/store/reducers/card';
import { logout, toggleDropDown } from '../../redux/store/reducers/user';
import { motion } from 'framer-motion';

function WhenIsLogged() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isOpen = useAppSelector((state) => state.user.isOpen);

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
          dispatch(toggleDropDown(isOpen));
          dispatch(getAllCards());
        }}
      >
        <Link to={'/create-sequence'}>Créer un scénario</Link>
      </button>
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
