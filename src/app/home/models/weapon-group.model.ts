export interface WeaponGroupData {
  id: number;
  name: string;
}

export class WeaponGroup {
  id: number | null;
  name: string;

  constructor(data: WeaponGroupData) {
    this.id = data?.id || null;
    this.name = data?.name || '';
  }

  asJason() {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
