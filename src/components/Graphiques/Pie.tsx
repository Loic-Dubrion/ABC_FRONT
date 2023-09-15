import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { ISequence } from '../@types/sequence';
import { ISession } from '../@types/session';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieGraph {
  sequence: ISequence[];
}

function PieGraph({ sequence }: PieGraph) {
  function aggregateSessionsByChoice(sessions: ISession[]) {
    const aggregatedData = {};

    sessions.forEach((session) => {
      const choice = session.card_name;
      const time = session.time;

      if (aggregatedData[choice]) {
        // Si le choix existe déjà, ajoutez la durée à la somme existante
        aggregatedData[choice] += time;
      } else {
        // Si le choix n'existe pas encore, créez-le avec la durée actuelle
        aggregatedData[choice] = time;
      }
    });

    return aggregatedData;
  }
  const sessions = sequence.map((e) => e.sessions).flat();
  const aggregatedData = aggregateSessionsByChoice(sessions);

  const labels = Object.keys(aggregatedData);
  const times = Object.values(aggregatedData);

  const backgroundColor = sequence
    .map((e) => e.sessions.map((el) => el.color))
    .flat();

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
