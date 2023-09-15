import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { ISequence } from '../@types/sequence';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieGraph {
  sequence: ISequence[];
}

function PieGraph({ sequence }: PieGraph) {
  const labels = sequence.map((e) => e.sessions.map((el) => el.card_name))
    .flat();
  console.log('labels :', labels);

  const times = sequence.map((e) => e.sessions.map((el) => el.time)).flat();
  console.log('times :', times);
  const backgroundColor = sequence
    .map((e) => e.sessions.map((el) => el.color))
    .flat();
  console.log('backgroundColor :', backgroundColor);
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Durée en minute',
        data: times,
        backgroundColor: backgroundColor,
        borderWidth: 1,
      },
    ],
  };
  const pieStyle = {
    maxWidth: '100%',
    maxHeight: '50vh',
    marginTop: '4rem',
  };
  ChartJS.defaults.font.size = 12;
  return <Pie data={data} style={pieStyle} />;
}

export default PieGraph;
