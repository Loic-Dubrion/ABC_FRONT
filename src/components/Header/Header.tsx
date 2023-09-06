import { useEffect, useRef, useState } from 'react';
import Login from '../Modals/Login';
import Register from '../Modals/Register';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  function handleMenu() {
    setIsOpen(!isOpen);
  }
  return (
    <div className="navbar bg-base-300 rounded-box">
      <div className="flex-1 px-2 lg:flex-none">
        <a className="text-lg font-bold">
          <img src="src/assets/logo.png" alt="logo" width={50} />
        </a>
        <p className="font-bold ml-5">ABC Learning</p>
        <p className="font-bold ml-10">Création de scénario d'apprentissage</p>
      </div>
      <div className="flex justify-end flex-1 px-2">
        <div className="flex items-stretch">
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
                <Login />
                <Register />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
