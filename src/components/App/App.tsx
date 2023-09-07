import { useRef } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { useAppSelector } from '../../redux/hooks';

function App() {
  const cardRef = useRef(null);
  const isLogged = useAppSelector((state) => state.user.isLogged);

  return (
    <div className="home">
      <Header />
      <section className="container m-auto">
        {!isLogged && (
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
        )}
      </section>

      <Footer />
    </div>
  );
}

export default App;
