export interface CharRaceData {
  id: number;
  name: string;
  strength_modifier: number;
  agility_modifier: number;
  constitution_modifier: number;
  intelligence_modifier: number;
  charisma_modifier: number;
}

export class CharRace {
  id: number | null;
  name: string;
  strengthModifier: number;
  agilityModifier: number;
  constitutionModifier: number;
  intelligenceModifier: number;
  charismaModifier: number;

  constructor(data?: CharRaceData) {
    this.id = data?.id || null;
    this.name = data?.name || '';
    this.strengthModifier = data?.strength_modifier || 0;
    this.agilityModifier = data?.agility_modifier || 0;
    this.constitutionModifier = data?.constitution_modifier || 0;
    this.intelligenceModifier = data?.intelligence_modifier || 0;
    this.charismaModifier = data?.charisma_modifier || 0;
  }
}
