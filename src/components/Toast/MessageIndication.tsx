import { useAppSelector } from '../../redux/hooks';

function MessageIndication() {
  const message = useAppSelector((state) => state.error.error);
  console.log('message :', message);

  const messageStyle = {
    opacity: message ? 1 : 0, // Afficher le message uniquement s'il est présent
    transform: `translateX(${message ? '0' : '100%'})`, // Déplacer de droite à gauche
    transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out', // Ajouter une transition
  };

  return (
    <div
      className={`alert alert-${message?.status} w-1/4 ml-auto`}
      style={messageStyle}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-current shrink-0 h-6 w-6 m-auto"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p className="font-bold text-right">
        {message?.message || 'Vous êtes connecté(e)'}
      </p>
    </div>
  );
}

export default MessageIndication;
