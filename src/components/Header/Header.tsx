function Header() {
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
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost rounded-btn">
              Menu
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4"
            >
              <li>
                <a>Se connecter</a>
              </li>
              <li>
                <a>S'enregistrer</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
