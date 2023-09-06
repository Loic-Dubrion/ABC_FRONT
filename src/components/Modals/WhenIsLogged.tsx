import { useAppDispatch } from '../../redux/hooks';
import { logout } from '../../redux/store/reducers/user';

function WhenIsLogged() {
  const dispatch = useAppDispatch();

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <div className="whenIsLogged">
      <button className="btn btn-ghost w-full">
        <a href="#">Créer un scénario</a>
      </button>
      <button className="btn btn-ghost w-full">
        <a href="#">Profil</a>
      </button>
      <button className="btn btn-ghost w-full" onClick={handleLogout}>
        <a href="#">Déconnexion</a>
      </button>
    </div>
  );
}

export default WhenIsLogged;
