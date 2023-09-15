import { useAppSelector } from '../../redux/hooks';

function Test() {
  const sequence = useAppSelector((state) => state.sequence.sequence);
  const sessions = sequence.map((e) => e.sessions);
  console.log('sessions :', sessions);
  const cards = useAppSelector((state) => state.card.cards);

  const data = {
    labels: cards?.map((card) => card.name),
    datasets: [
      {
        label: cards?.map((card) => card.name),
        data: times,
        backgroundColor: '#e0e0e0',
        pointBackgroundColor: labelColors,
        borderColor: '#1c1c1c',
        borderWidth: 1,
      },
    ],
  };
}

export default Test;
