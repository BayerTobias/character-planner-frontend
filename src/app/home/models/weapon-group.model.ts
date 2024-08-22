export interface WeaponGroupData {
  name: string;
}

export class WeaponGroup {
  name: string;

  constructor(data: WeaponGroupData) {
    this.name = data?.name || '';
  }
}
