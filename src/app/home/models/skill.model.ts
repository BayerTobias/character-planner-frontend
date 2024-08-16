export interface SkillData {
  id: number;
  name: string;
  description: string;
  first_level_cost: number;
  second_level_cost: number | null;
}

export class Skill {
  id: number;
  name: string;
  description: string;
  firstLevelCost: number;
  secondLevelCost: number | null;
  nodesSkilled: number;

  constructor(data: SkillData) {
    this.id = data.id || -1;
    this.name = data.name || '';
    this.description = data?.description || '';
    this.firstLevelCost = data?.first_level_cost || 99;
    this.secondLevelCost = data?.second_level_cost || null;
    this.nodesSkilled = 0;
  }
}
