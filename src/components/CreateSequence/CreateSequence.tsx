import { useAppSelector } from '../../redux/hooks';

function CreateSequence() {
  const cards = useAppSelector((state) => state.card.cards);
  return <div className="CreateSequence"></div>;
}

export default CreateSequence;
