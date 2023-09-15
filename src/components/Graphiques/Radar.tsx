// import {
//   Chart as ChartJS,
//   RadialLinearScale,
//   PointElement,
//   LineElement,
//   Filler,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Radar } from 'react-chartjs-2';
// import { ISequence } from '../@types/sequence';
// import { useAppSelector } from '../../redux/hooks';

// ChartJS.register(
//   RadialLinearScale,
//   PointElement,
//   LineElement,
//   Filler,
//   Tooltip,
//   Legend
// );

// interface IRaadarGraph {
//   sequence: ISequence[];
// }

// function RadarGraph({ sequence }: IRaadarGraph) {
//   const sessions = sequence.map((e) => e.sessions);
//   console.log('sessions :', sessions);

//   const cards = useAppSelector((state) => state.card.cards);
//   const times = sequence.map((e) => e.sessions.map((el) => el.time)).flat()
//   const colors = sequence.map((e) => e.sessions.map((el) => el.color));
//   console.log('colors :', colors);

//   if (times.length >= times.length) {
//     times.push(0);
//   }

//   const labelColors = [
//     '#16b1a2',
//     '#f39200',
//     '#1d71b8',
//     '#be1622',
//     '#662483',
//     '#3aaa35',
//   ];
//   const data = {
//     labels: cards?.map((card) => card.name),

//     datasets: [
//       {
//         label: 'Durée minutes',
//         data: times,
//         backgroundColor: '#e0e0e0',
//         pointBackgroundColor: labelColors,
//         borderColor: '#1c1c1c',
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     plugins: {
//       legend: {
//         display: false,
//       },
//     },
//     scales: {
//       r: {
//         pointLabels: {
//           font: {
//             size: 20,
//           },
//           color: labelColors,
//         },
//       },
//     },
//   };

//   const radarStyle = {
//     maxWidth: '100%',
//     maxHeight: '50vh',
//     marginTop: '4rem',
//   };

//   ChartJS.defaults.font.size = 12;
//   return <Radar data={data} options={options} style={radarStyle} />;
// }

// export default RadarGraph;
