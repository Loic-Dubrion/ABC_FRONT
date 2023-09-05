import Footer from '../Footer/Footer';
import Header from '../Header/Header';

function App() {
  return (
    <div className="home">
      <Header />
      <div className="card card-compact w-2/5 bg-base-100 shadow-xl m-auto mt-5">
        <div className="card-body">
          <p>
            Vous devez préparer un nouveau cours et vous aimeriez innover en
            intégrant des activités d’apprentissage, mais vous ne savez pas quoi
            et comment faire? Ou alors vous êtes responsable d’une formation,
            d’un module dont vous aimeriez repenser l’organisation avec les
            enseignants, mais vous ne savez pas comment vous y prendre ? Alors
            l’application en ligne « ABC Learning » peuvent vous aider.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
