// React hooks
import { useEffect } from 'react';
// Module && Library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faPencil } from '@fortawesome/free-solid-svg-icons';

// React router
import { useParams } from 'react-router-dom';
// Redux
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
// Reducers
import {
  getOneSequence,
  toggleUpdateSequenceMenu,
} from '../../redux/store/reducers/sequence';
// Components
import SequenceModal from '../Modals/SequenceModal';
import Colgroup from './Colgroup';
import Thead from './Thead';
import Tbody from './Tbody';
import UpdateSession from '../Modals/UpdateSession';
// import RadarGraph from '../Graphiques/Radar';
import PieGraph from '../Graphiques/Pie';
import BarGraphFirst from '../Graphiques/Bar';
import BarGraphSecond from '../Graphiques/Bar-copy';
import { convertToExcel } from '../../redux/store/reducers/convert';

function Tables() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const isLogged = useAppSelector((state) => state.user.isLogged);
  const sequence = useAppSelector((state) => state.sequence.sequence);
  const sessions = sequence.map((e) => e.sessions);
  const toggleModal = useAppSelector((state) => state.sequence.toggle);
  const isOpen = useAppSelector((state) => state.session.isOpen);

  useEffect(() => {
    if (isLogged) {
      dispatch(getOneSequence(id as string));
    }
  }, [dispatch, id, isLogged]);

  const handleExportExcel = () => {
    dispatch(convertToExcel(id as string))
      .then((resultAction) => {
        if (convertToExcel.fulfilled.match(resultAction)) {
          // Si l'action a été réussie, vous pouvez accéder aux données dans resultAction.payload
          const excelData = resultAction.payload;
          const blob = new Blob([excelData], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          });
          const url = window.URL.createObjectURL(blob);
          // Utilisez window.open() pour déclencher le téléchargement
          window.open(url, '_blank');

          // Libérer les ressources après le téléchargement
          window.URL.revokeObjectURL(url);
        } else if (convertToExcel.rejected.match(resultAction)) {
          // Si l'action a été rejetée, vous pouvez accéder à l'erreur dans resultAction.error
          const error = resultAction.error;
          console.error('Erreur lors de la conversion en Excel :', error);
        }
      })
      .catch((error) => {
        // Gérer d'autres erreurs non liées à l'action asynchrone ici
        console.error('Erreur inattendue :', error);
      });
  };

  return (
    <div className="overflow-y-auto w-full">
      <div className="flex justify-between items-center m-3">
        <h2 className="text-4xl m-3 font-bold">
          {localStorage.getItem('sequence_name')}
          <button
            onClick={() => {
              dispatch(toggleUpdateSequenceMenu(!toggleModal));
            }}
          >
            <FontAwesomeIcon
              icon={faPencil}
              beat
              size="xs"
              style={{ color: '#000000', marginLeft: '1rem' }}
            />
          </button>
        </h2>
        {sessions.length > 0 && (
          <div className="ml-auto">
            <button
              className="btn btn-success mr-3"
              onClick={() => {
                handleExportExcel();
              }}
            >
              XLS
              <FontAwesomeIcon icon={faDownload} />
            </button>
            <button
              className="btn btn-error"
              onClick={() => {
                handleExportExcel();
              }}
            >
              PDF
              <FontAwesomeIcon icon={faDownload} />
            </button>
          </div>
        )}
        <SequenceModal isOpen={toggleModal} />
      </div>

      {sequence.length > 0 && (
        <table className="table w-full overflow-auto">
          <Colgroup />
          <Thead />
          {sequence.map((e, index) => (
            <Tbody key={index} sessions={e.sessions} />
          ))}
        </table>
      )}
      {sequence.length > 0 && (
        <section className="flex justify-evenly">
          <BarGraphFirst sequence={sequence} />
          <PieGraph sequence={sequence} />
          <BarGraphSecond sequence={sequence} />
        </section>
      )}

      <UpdateSession isOpen={isOpen} sequence={sequence} />
    </div>
  );
}

export default Tables;
