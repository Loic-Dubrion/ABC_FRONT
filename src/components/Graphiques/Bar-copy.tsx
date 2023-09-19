import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BarController,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ISequence } from '../@types/sequence';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
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
        label: 'Individuel',
        data: [totalDureeIndividuel, 0],
        backgroundColor: ['rgb(54, 162, 235, 0.2)'],
        borderColor: ['rgb(54, 162, 235)'],
        borderWidth: 1,
        barThickness: 80,
      },
      {
        label: 'Groupe',
        data: [0, totalDureeGroupe],
        backgroundColor: ['rgba(153, 102, 255, 0.2)'],
        borderColor: ['rgb(153, 102, 255)'],
        borderWidth: 1,
        barThickness: 80,
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
