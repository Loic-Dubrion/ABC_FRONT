import CreateSequence from '../Modals/CreateSequence';

function NotSequences() {
  return (
    <section className="container m-auto">
      <div className="card card-compact w-3/6 bg-base-100 shadow-xl m-auto">
        <div className="card-body">
          <p className="text-center font-bold">
            Il n'y a pas de scénarios enregistrés.
          </p>
        </div>
        <div className="w-48 m-auto my-4">
          <CreateSequence />
        </div>
      </div>
    </section>
  );
}

export default NotSequences;
