import { useRef, useState } from 'react';
import { useAppSelector } from '../../redux/hooks';

function App() {
  const cardRef = useRef(null);
  const isLogged = useAppSelector((state) => state.user.isLogged);
  const cards = useAppSelector((state) => state.card.cards);
  const [isChecked, setIsChecked] = useState(false);

  function handleCheckboxChange() {
    setIsChecked(!isChecked);
  }

  return (
    <div className="home">
      {!isLogged && (
        <section className="container m-auto">
          <div
            className="card card-compact w-3/6 bg-base-100 shadow-xl m-auto"
            ref={cardRef}
          >
            <div className="card-body">
              <p>
                Vous devez préparer un nouveau cours et vous aimeriez innover en
                intégrant des activités d’apprentissage, mais vous ne savez pas
                quoi et comment faire? Ou alors vous êtes responsable d’une
                formation, d’un module dont vous aimeriez repenser
                l’organisation avec les enseignants, mais vous ne savez pas
                comment vous y prendre ? Alors l’application en ligne « ABC
                Learning » peuvent vous aider.
              </p>
            </div>
          </div>
        </section>
      )}
      {cards && (
        <section className="flex justify-center items-center gap-3 mt-3">
          <p className={`${!isChecked ? 'font-bold text-[#8f949b]' : ''}`}>
            Novice
          </p>
          <input
            type="checkbox"
            className="toggle toggle-lg"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <p className={`${isChecked ? 'font-bold' : ''}`}>Expert</p>
        </section>
      )}
      <section className="cards flex m-3 gap-2">
        {cards &&
          cards.map((card) => (
            <div className="card card-compact w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{card.name}</h2>
                <p>{card.comments}</p>
                <div className="card-actions justify-end">
                  <button className="btn">Open</button>
                </div>
              </div>
            </div>
          ))}
      </section>
    </div>
  );
}

export default App;
