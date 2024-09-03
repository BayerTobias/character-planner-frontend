export interface CustomSkillData {
  id: number;
  name: string;
  description: string;
  first_level_cost: number;
  second_level_cost: number | null;
  nodes_skilled: number;
}

export class CustomSkill {
  id: number | null;
  name: string;
  description: string;
  firstLevelCost: number;
  secondLevelCost: number | null;
  nodesSkilled: number;

  constructor(data: CustomSkillData) {
    this.id = data?.id || null;
    this.name = data?.name || '';
    this.description = data?.description || '';
    this.firstLevelCost = data?.first_level_cost || 99;
    this.secondLevelCost = data?.second_level_cost || null;
    this.nodesSkilled = data?.nodes_skilled || 0;
  }

  asJson() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      firstLevelCost: this.firstLevelCost,
      secondLevelCost: this.secondLevelCost,
      nodesSkilled: this.nodesSkilled,
    };
  }
}
