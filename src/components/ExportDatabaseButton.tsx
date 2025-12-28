import { RotateCcw } from 'lucide-react';
import { db } from '../db';
import { Button } from './ui/button';
import { convert2CSV, convert2NileFmt } from '../helpers/conversions';
import { useLiveQuery } from 'dexie-react-hooks';

export const ExportDatabaseButton = () => {

  const cards = useLiveQuery(
    () => db.cards
      .reverse() // Show newest lists first
      .toArray()
  );

  const handleExport = async () => {
    const csv = cards && convert2CSV(cards?.map(card => convert2NileFmt(card)))
    await navigator.clipboard.writeText(csv ?? 'oopsies')
    window.alert('copied')
  };

  return (
    <Button
      variant="outline"
      size="lg"
      onClick={handleExport}
      className="w-full sm:w-auto flex items-center gap-2 border-green-300 text-green-700 bg-green-50 hover:bg-green-100 hover:border-green-400"
    >
      <RotateCcw className="h-4 w-4" />
      Copy As CSV
    </Button>
  );
}
