import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getAllCards } from '../../redux/store/reducers/card';
import { logout, toggleDropDown } from '../../redux/store/reducers/user';

function WhenIsLogged() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.user.isOpen);

  return (
    <div className="whenIsLogged">
      <button
        className="btn btn-ghost w-full"
        onClick={() => {
          dispatch(toggleDropDown(isOpen));
          dispatch(getAllCards());
        }}
      >
        Créer un scénario
      </button>
      <button className="btn btn-ghost w-full">
        <a href="#">Profil</a>
      </button>
      <button
        className="btn btn-ghost w-full"
        onClick={() => {
          dispatch(logout());
        }}
      >
        <a href="#">Déconnexion</a>
      </button>
    </div>
  );
}

export default WhenIsLogged;
