import Login from '../Modals/Login';

function NotLogged() {
  return (
    <section className="container m-auto">
      <div className="card card-compact w-3/6 bg-base-100 shadow-xl m-auto">
        <div className="card-body">
          {
            <p>
              Vous devez préparer un nouveau cours et vous aimeriez innover en
              intégrant des activités d’apprentissage, mais vous ne savez pas
              quoi et comment faire? Ou alors vous êtes responsable d’une
              formation, d’un module dont vous aimeriez repenser l’organisation
              avec les enseignants, mais vous ne savez pas comment vous y
              prendre ? Alors l’application en ligne « ABC Learning » peuvent
              vous aider.
            </p>
          }
        </div>
        <div className="w-40 m-auto my-4">
          <Login />
        </div>
      </div>
    </section>
  );
}

export default NotLogged;
