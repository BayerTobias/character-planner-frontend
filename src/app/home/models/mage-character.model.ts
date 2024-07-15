import { BaseCharacter, BaseCharacterData } from './base-character.model';
import { Skill, SkillData } from './skill.model';

interface MageData extends BaseCharacterData {
  skills?: Skill[];
}

export class Mage extends BaseCharacter {
  maxHealth: number;
  skills: Skill[];

  constructor(data: MageData) {
    super(data);
    this.maxHealth = this.calculateMaxHealth();
    this.skills = data?.skills || [];
    this.setupDefaultSkills();
  }

  calculateMaxHealth() {
    return (this.constitutionBonus + 4) * this.level;
  }

  setupDefaultSkills() {
    const defaultSkillData: SkillData[] = [
      {
        name: 'Develop Magic',
        description: 'Allows the mage to develop magical abilities.',
        level: 0,
        firstLevelCost: 1,
        secondLevelCost: 2,
      },
      {
        name: 'Riding',
        description: 'Allows the mage to ride creatures.',
        level: 0,
        firstLevelCost: 3,
        secondLevelCost: null,
      },
    ];

    defaultSkillData.forEach((skillData) => {
      this.addSkill(skillData);
    });
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

  calculateMaxMana() {}
}
