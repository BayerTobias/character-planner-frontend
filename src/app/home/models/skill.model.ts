export interface SkillData {
  name: string;
  description: string;
  level: number;
  first_level_cost: number;
  second_level_cost: number | null;
}

export class Skill {
  name: string;
  description: string;
  level: number;
  firstLevelCost: number;
  secondLevelCost: number | null;

  constructor(data: SkillData) {
    this.name = data.name || '';
    this.description = data?.description || '';
    this.level = data?.level || 0;
    this.firstLevelCost = data?.first_level_cost || 99;
    this.secondLevelCost = data?.second_level_cost || null;
  }
}
