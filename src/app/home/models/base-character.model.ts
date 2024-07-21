import { CharClass, CharClassData } from './char-class.model';
import { CharRace, CharRaceData } from './char-race.model';

export interface CharacterData {
  id: number;
  name: string;
  race: CharRaceData;
  char_class: CharClassData;
  level?: number;

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
}

export class BaseCharacter {
  id: number | null;
  name: string;
  race: CharRace;
  class: CharClass;
  level: number;

  strengthValue: number;
  strengthBonus: number;
  agilityValue: number;
  agilityBonus: number;
  constitutionValue: number;
  constitutionBonus: number;
  intelligenceValue: number;
  intelligenceBonus: number;
  charismaValue: number;
  charismaBonus: number;

  constructor(data: CharacterData) {
    this.id = data?.id || null;
    this.name = data?.name || '';
    this.race = new CharRace(data?.race);
    this.class = new CharClass(data?.char_class);
    this.level = data?.level || 1;

    this.strengthValue = data.strength_value || 0;
    this.strengthBonus =
      data.strength_bonus || this.getStatBonusValue(this.strengthValue);
    this.agilityValue = data.agility_value || 0;
    this.agilityBonus =
      data.agility_bonus || this.getStatBonusValue(this.agilityValue);
    this.constitutionValue = data.charisma_value || 0;
    this.constitutionBonus =
      data.constitution_bonus || this.getStatBonusValue(this.constitutionValue);
    this.intelligenceValue = data.intelligence_value || 0;
    this.intelligenceBonus =
      data.intelligence_bonus || this.getStatBonusValue(this.intelligenceValue);
    this.charismaValue = data.charisma_value || 0;
    this.charismaBonus =
      data.charisma_bonus || this.getStatBonusValue(this.charismaValue);
  }

  getStatBonusValue(statValue: number) {
    console.log(statValue);

    switch (statValue) {
      case 0:
        return -99;
        break;
      case 1:
        return -3;
        break;
      case 2:
        return -2;
        break;
      case 3:
      case 4:
        return -1;
        break;
      case 5:
        return 0;
        break;
      case 6:
      case 7:
        return 1;
        break;
      case 8:
      case 9:
        return 2;
        break;
      case 10:
      case 11:
        return 3;
        break;
      case 12:
      case 13:
        return 4;
        break;
      case 14:
        return 5;
        break;
      default:
        return -99;
    }
  }

  asJson() {
    return {};
  }
}
