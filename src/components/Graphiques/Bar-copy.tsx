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
  
  let totalDureeIndividuel = 0;
  let totalDureeGroupe = 0;

  if (sequence) {
    sequence.forEach((sequenceItem) =>
      sequenceItem.sessions.forEach((session) => {
        if (!session.is_group_work) {
          totalDureeIndividuel += session.time;
        } else {
          totalDureeGroupe += session.time;
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

  const labels = ['Individuel', 'Groupe'];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Durée',
        data: [totalDureeIndividuel, totalDureeGroupe],
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
