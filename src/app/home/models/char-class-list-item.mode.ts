export interface CharClassListItemData {
  id: number;
  name: string;
  color: string;
  base_lvl_hp: number;
  base_lvl_mana: number | null;
}

export class CharClassListItem {
  id: number | null;
  name: string;
  color: string;
  base_lvl_hp: number;
  base_lvl_mana: number | null;

  constructor(data: CharClassListItemData) {
    this.id = data?.id || null;
    this.name = data?.name || '';
    this.color = data?.color || '';
    this.base_lvl_hp = data?.base_lvl_hp || 0;
    this.base_lvl_mana = data?.base_lvl_mana || null;
  }
}
