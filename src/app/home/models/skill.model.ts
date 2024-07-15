export interface SkillData {
  name: string;
  description: string;
  level: number;
  firstLevelCost: number;
  secondLevelCost: number | null;
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
    this.firstLevelCost = data?.firstLevelCost || 99;
    this.secondLevelCost = data?.secondLevelCost || null;
  }
}
