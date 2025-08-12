export interface CharacterListItemData {
  id: number;
  name: string;
  character_race: string;
  character_class: string;
  class_color: string;
}

export class CharacterListItem {
  id: number | null;
  name: string;
  race: string;
  charClass: string;
  classColor: string;

  constructor(data: CharacterListItemData) {
    this.id = data?.id || null;
    this.name = data?.name || '';
    this.race = data?.character_race || '';
    this.charClass = data?.character_class || '';
    this.classColor = data?.class_color || '';
  }
}
