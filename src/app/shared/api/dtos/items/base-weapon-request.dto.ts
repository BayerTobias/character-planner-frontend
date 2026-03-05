import { WeaponGroupRequestDto } from './weapon-group-request.dto';

export interface BaseWeaponRequestDto {
  id: number | null;
  name: string;
  weaponGroups: WeaponGroupRequestDto[];
  minStr: number;
  dmg: number;
  attribute: string;
  weight: number;
  iniBonus: number;
}
