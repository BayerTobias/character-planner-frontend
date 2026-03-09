import { CustomWeaponRequestDto } from '../items/custom-weapon-request.dto';
import { CustomSkillRequestDto } from '../skills/custom-skill-request.dto';
import { skilledNodeRequestDto } from '../skills/skilled-node-request.dto';
import { MoneyRequestDto } from './money-request.dto';

export interface CharacterRequestDto {
  id: number | null;

  // Core Character Information
  name: string;
  character_race_id: number | null;
  character_class_id: number | null;
  current_lvl: number;

  // Health and Mana
  current_hp: number;
  max_hp: number;
  current_mana: number | null;
  max_mana: number | null;

  // Primary Attributes
  strength_value: number;
  strength_bonus: number;
  agility_value: number;
  agility_bonus: number;
  constitution_value: number;
  constitution_bonus: number;
  intelligence_value: number;
  intelligence_bonus: number;
  charisma_value: number;
  charisma_bonus: number;

  // Skills
  custom_skills: CustomSkillRequestDto[];
  skilled_skills: skilledNodeRequestDto[];
  attribute_points: number;

  // Items
  base_weapons: number[] | null;
  custom_weapons: CustomWeaponRequestDto[];
  base_armor_id: number | null;
  shield_id: number | null;
  money: MoneyRequestDto;
}
