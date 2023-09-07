import { useRef } from 'react';
import { useAppSelector } from '../../redux/hooks';

function App() {
  const cardRef = useRef(null);
  const isLogged = useAppSelector((state) => state.user.isLogged);
  const cards = useAppSelector((state) => state.card.cards);
  console.log('cards :', cards);

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
      <section className="cards flex gap-2">
        {cards &&
          cards.map((card) => (
            <div className="card card-compact w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{card.name}</h2>
                <p>{card.comments}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
          ))}
      </section>
    </div>
  );
}

export default App;
