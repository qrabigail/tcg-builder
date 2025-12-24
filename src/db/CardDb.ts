import Dexie, { Table } from 'dexie';
import dexieCloud, { DexieCloudTable } from 'dexie-cloud-addon';
import { Card } from './Card';

export class CardDb extends Dexie {
  cards!: DexieCloudTable<Card, 'id'>;
  openCloseStates!: Table<boolean, [string, string]>;

  constructor() {
    super('tcg');

    this.version(1).stores({
      cards: `++id, name, level, speed, type`
    });
  }
}
