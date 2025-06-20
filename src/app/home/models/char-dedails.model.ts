export interface CharDetailsData {
  name: string;
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
}

export class CharDetails {
  name: string;
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

  constructor(data?: CharDetailsData) {
    this.name = data?.name || '';
    this.strengthValue = data?.strengthValue || 0;
    this.strengthBonus = data?.strengthBonus || 0;
    this.agilityValue = data?.agilityValue || 0;
    this.agilityBonus = data?.agilityBonus || 0;
    this.constitutionValue = data?.constitutionValue || 0;
    this.constitutionBonus = data?.constitutionBonus || 0;
    this.intelligenceValue = data?.intelligenceValue || 0;
    this.intelligenceBonus = data?.intelligenceBonus || 0;
    this.charismaValue = data?.charismaValue || 0;
    this.charismaBonus = data?.charismaBonus || 0;
  }
}
