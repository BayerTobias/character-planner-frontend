import { Skill, SkillData } from './skill.model';

export interface CharClassData {
  id: number;
  name: string;
  base_lvl_hp: number;
  base_lvl_mana: number | null;
  skills: SkillData[];
}

export class CharClass {
  id: number | null;
  name: string;
  baseLvlHp: number;
  baseLvlMana: number | null;
  skills: Skill[];

  constructor(data: CharClassData) {
    this.id = data?.id || null;
    this.name = data?.name || '';
    this.baseLvlHp = data?.base_lvl_hp || 0;
    this.baseLvlMana = data?.base_lvl_mana || null;
    this.skills = (data?.skills || []).map((skillData) => new Skill(skillData));
  }
}
