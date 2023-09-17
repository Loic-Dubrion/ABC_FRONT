import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ISequence } from '../@types/sequence';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface IBarGraph {
  sequence: ISequence[];
}

function BarGraphFirst({ sequence }: IBarGraph) {
  // Avant le retour de votre composant
  let totalDureePresentiel = 0;
  let totalDureeDistanciel = 0;

  if (sequence) {
    sequence.map((sequenceItem) =>
      sequenceItem.sessions.map((session) => {
        if (session.is_face_to_face) {
          totalDureePresentiel += session.time;
        } else {
          totalDureeDistanciel += session.time;
        }
      })
    );
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  const labels = ['Présentiel', 'Distanciel'];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Durée',
        data: [totalDureePresentiel, totalDureeDistanciel],
        backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(75, 192, 192, 0.5)'],
      },
    ],
  };

  const barStyle = {
    maxWidth: '20%',
    maxHeight: '50vh',
    marginTop: '4rem',
  };

  return <Bar options={options} data={data} style={barStyle} />;
}

export default BarGraphFirst;
