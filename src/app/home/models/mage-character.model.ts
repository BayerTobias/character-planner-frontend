import { BaseCharacter, CharacterData } from './base-character.model';
import { Skill } from './skill.model';

interface MageData extends CharacterData {
  skills?: Skill[];
}

export class Mage extends BaseCharacter {
  constructor(data?: MageData) {
    super(data);
    this.maxHealth = this.calculateMaxHealth();
    this.maxMana = this.calculateMaxMana();
  }

  calculateMaxHealth() {
    console.log((this.constitutionBonus + 4) * this.level);

    return (this.constitutionBonus + 4) * this.level;
  }

  calculateMaxMana() {
    const developMagic = this.class.skills.find(
      (skill: Skill) => skill.name === 'Magie Entwickeln'
    );

    if (developMagic) {
      const developMagicRanks = this.getSkillRank(developMagic.nodesSkilled);
      return (this.intelligenceBonus + 3) * developMagicRanks;
    } else return null;
  }
}
