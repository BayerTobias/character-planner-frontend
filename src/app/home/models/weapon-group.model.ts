import { WeaponGroupRequestDto } from '../../shared/api/dtos/items/weapon-group-request.dto';

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

  asJason(): WeaponGroupRequestDto {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
