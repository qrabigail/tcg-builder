import { useEffect, useState } from 'react';
import { Card as TradingCard, db } from '../db';
import { cn } from '../lib/utils';
import { Card, CardContent, CardTitle } from './ui/card';

interface Props {
  card: TradingCard;
}

export const CardView = ({ card }: Props) => {
  
  return (
    <div> 
      <Card>
        <CardTitle>{card.name}</CardTitle>
        <CardContent>{card.level}</CardContent>
      </Card>
    </div>
  );
}
