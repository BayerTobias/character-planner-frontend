export interface CharRaceData {
  id: number;
  name: string;
}

export class CharRace {
  id: number | null;
  name: string;

  constructor(data: CharRaceData) {
    this.id = data?.id || null;
    this.name = data.name || '';
  }
}
