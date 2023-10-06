import { useEffect, useState } from 'react';
import { useAppSelector } from '../../redux/hooks';

function MessageIndication() {
  const userError = useAppSelector((state) => state.user.userMessage);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (userError) {
      setShowMessage(true);

      // Utilisez setTimeout pour nettoyer le message après 5 secondes
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 6900);

      // Retournez une fonction de nettoyage pour annuler le timer si le composant est démonté avant 5 secondes
      return () => {
        clearTimeout(timer);
      };
    }
  }, [userError]);

  return (
    <>
      {showMessage && (
        <div
          className={`alert ${
            userError?.name === 'error'
              ? 'alert-error'
              : userError?.name === 'success'
              ? 'alert-success'
              : 'alert-info'
          } w-[400px] m-auto mr-2
          slide-from-right`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{userError?.message}</span>
        </div>
      )}
    </>
  );
}

export default MessageIndication;
