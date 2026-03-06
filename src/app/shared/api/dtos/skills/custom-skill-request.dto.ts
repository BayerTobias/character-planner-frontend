export interface CustomSkillRequestDto {
  id: number | null;
  name: string;
  description: string;
  firstLevelCost: number;
  secondLevelCost: number | null;
  nodesSkilled: number;
}
