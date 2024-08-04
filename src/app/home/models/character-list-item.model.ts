export interface CharacterListItemData {
  id: number;
  name: string;
  race_name: string;
  char_class_name: string;
}

export class CharacterListItem {
  id: number | null;
  name: string;
  race: string;
  charClass: string;

  constructor(data: CharacterListItemData) {
    this.id = data?.id || null;
    this.name = data?.name || '';
    this.race = data?.race_name || '';
    this.charClass = data?.char_class_name || '';
  }
}
