// Modules
import React, { useRef } from 'react';

// Composants
import Login from '../Modals/Login';
import Register from '../Modals/Register';
import WhenIsLogged from '../Modals/WhenIsLogged';

//Redux
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { toggleDropDown } from '../../redux/store/reducers/user';
import { Link } from 'react-router-dom';

function Header() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.user.isOpen);
  const username = useAppSelector((state) => state.user.username);
  const isLogged = useAppSelector((state) => state.user.isLogged);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  function handleMenu() {
    dispatch(toggleDropDown(!isOpen));
  }

  return (
    <div className="navbar bg-base-300 rounded-box">
      <div className="flex-1 px-2 lg:flex-none">
        <Link to="/" className="text-lg font-bold">
          <img src="src/assets/logo.png" alt="logo" width={50} />
        </Link>
        <p className="font-bold ml-5">ABC Learning</p>
        <p className="font-bold ml-10">Création de scénario d'apprentissage</p>
      </div>
      <div className="flex justify-end flex-1 px-2">
        <div className="flex items-stretch">
          {username && <p className="mr-10 font-bold">Hi {username}</p>}
          <div className="dropdown dropdown-end" ref={dropdownRef}>
            <button
              type="button"
              className="focus:outline-none"
              onClick={handleMenu}
            >
              <span
                className={`block h-1 w-6 bg-base-content rounded-full transition-all duration-1000 transform ${
                  isOpen && 'rotate-45 translate-y-2'
                }`}
              ></span>
              <span
                className={`block h-1 w-6 bg-base-content rounded-full mt-1 transition-all duration-1000 ${
                  isOpen && 'opacity-0'
                }`}
              ></span>
              <span
                className={`block h-1 w-6 bg-base-content rounded-full mt-1 transition-all duration-1000 transform ${
                  isOpen && '-rotate-45 -translate-y-2'
                }`}
              ></span>
            </button>
            {isOpen && (
              <div
                tabIndex={0}
                className={`menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4`}
              >
                {!isLogged && (
                  <React.Fragment>
                    <Login />
                    <Register />
                  </React.Fragment>
                )}
                {isLogged && <WhenIsLogged />}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
