import { BaseCharacter, CharacterData } from './base-character.model';
import { Skill, SkillData } from './skill.model';

interface MageData extends CharacterData {
  skills?: Skill[];
}

export class Mage extends BaseCharacter {
  maxHealth: number;
  maxMana: number;
  skills: Skill[];

  constructor(data: MageData) {
    super(data);
    this.maxHealth = this.calculateMaxHealth();
    this.maxMana = this.calculateMaxMana();
    this.skills = data?.skills || [];
  }

  calculateMaxHealth() {
    return (this.constitutionBonus + 4) * this.level;
  }

  calculateMaxMana() {
    return (this.intelligenceBonus + 3) * 7; /*magie entwikeln rank*/
  }

  addSkill(skillData: SkillData) {
    const existingSkillIndex = this.skills.findIndex(
      (skill) => skill.name === skillData.name
    );

    if (existingSkillIndex === -1) {
      this.skills.push(new Skill(skillData));
    } else {
      console.log(
        `Skill ${skillData.name} already exists and will not be added.`
      );
    }
  }
}
