import { Card as TradingCard, db } from '../db';
import { Card, CardContent, CardTitle } from './ui/card';

interface Props {
  card: TradingCard;
}

export const CardView = ({ card }: Props) => {
  
  return (
      <Card className='m-4'>
        <CardTitle>{card.name}</CardTitle>
        <CardContent>
          {Object.entries(card).map((key, i) => {return <p key={i}>{`${JSON.stringify(key)}`}</p>})}
        </CardContent>
      </Card>
  );
}
