export interface BaseCharacterData {
  name: string;
  race: string;
  class: string;
  level?: number;

  // maxHealth: number; // Calculate class based when final

  strengthValue: number;
  agilityValue: number;
  constitutionValue: number;
  intelligenceValue: number;
  charismaValue: number;
}

export class BaseCharacter {
  name: string;
  race: string;
  class: string;
  level: number;
  // maxHealth: number;
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

  constructor(data: BaseCharacterData) {
    this.name = data?.name || '';
    this.race = data?.race || '';
    this.class = data?.class || '';
    this.level = data?.level || 0;
    // this.maxHealth = data.maxHealth || 0;
    this.strengthValue = data.strengthValue || 0;
    this.strengthBonus = this.getStatBonusValue(this.strengthValue);
    this.agilityValue = data.agilityValue || 0;
    this.agilityBonus = this.getStatBonusValue(this.agilityValue);
    this.constitutionValue = data.constitutionValue || 0;
    this.constitutionBonus = this.getStatBonusValue(this.constitutionValue);
    this.intelligenceValue = data.intelligenceValue || 0;
    this.intelligenceBonus = this.getStatBonusValue(this.intelligenceValue);
    this.charismaValue = data.charismaValue || 0;
    this.charismaBonus = this.getStatBonusValue(this.charismaValue);
  }

  getStatBonusValue(statValue: number) {
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
