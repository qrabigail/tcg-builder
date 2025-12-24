import { useLiveQuery } from 'dexie-react-hooks';
import { AddCardForm } from './components/AddCardForm';
import { CardView } from './components/CardView';
import { db } from './db';
import { ResetDatabaseButton } from './components/ResetDatabaseButton';

function App() {
  const cards = useLiveQuery(
    () => db.cards
      .reverse() // Show newest lists first
      .toArray()
  );
  return (
    <div>
      <AddCardForm/>
      {cards?.map(card => <CardView card={card}/>)}
      <ResetDatabaseButton/>
    </div>
  );
}

export default App;
