import { Copy } from 'lucide-react';
import { Card as TradingCard, db } from '../db';
import { convert2NileFmt } from '../helpers/conversions';
import { Card, CardContent, CardTitle } from './ui/card';

interface Props {
  card: TradingCard;
}

export const CardView = ({ card }: Props) => {
  
  return (
      <Card className='m-4'>
        <CardTitle>{card.name}</CardTitle>
        <CardContent>
          <Copy onClick={() => {
            const csv = Object.values(convert2NileFmt(card)).join(",")
            navigator.clipboard.writeText(csv)
            window.alert('copied row. Paste into the spreadsheet and use data > From text or Data > Split into Columns')
          }}/>
          <code>{JSON.stringify(convert2NileFmt(card), null , 2)}</code>
        </CardContent>
      </Card>
  );
}
