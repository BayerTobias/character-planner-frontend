import { CharRace } from '../../../models/char-race.model';

export interface AttributeCosts {
  cost: number;
  value: number;
  bonus: number;
}

export const ATTRIBUTE_COST = [
  { cost: 0, value: 0, bonus: -99 },
  { cost: 1, value: 1, bonus: -3 },
  { cost: 2, value: 2, bonus: -2 },
  { cost: 3, value: 3, bonus: -1 },
  { cost: 4, value: 4, bonus: -1 },
  { cost: 5, value: 5, bonus: 0 },
  { cost: 6, value: 6, bonus: 1 },
  { cost: 8, value: 7, bonus: 1 },
  { cost: 10, value: 8, bonus: 2 },
  { cost: 12, value: 9, bonus: 2 },
  { cost: 16, value: 10, bonus: 3 },
];

export const raceModifierMap: Record<string, keyof CharRace> = {
  strengthValue: 'strengthModifier',
  agilityValue: 'agilityModifier',
  constitutionValue: 'constitutionModifier',
  intelligenceValue: 'intelligenceModifier',
  charismaValue: 'charismaModifier',
};

export interface StatBonuses {
  strengthBonus: number;
  agilityBonus: number;
  constitutionBonus: number;
  intelligenceBonus: number;
  charismaBonus: number;
}

export const statBonusMap: Record<string, keyof StatBonuses> = {
  strengthValue: 'strengthBonus',
  agilityValue: 'agilityBonus',
  constitutionValue: 'constitutionBonus',
  intelligenceValue: 'intelligenceBonus',
  charismaValue: 'charismaBonus',
};
