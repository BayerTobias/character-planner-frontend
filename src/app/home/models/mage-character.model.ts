import { BaseCharacter, CharacterData } from './base-character.model';
import { Skill } from './skill.model';

interface MageData extends CharacterData {
  skills?: Skill[];
}

export class Mage extends BaseCharacter {
  constructor(data?: MageData) {
    super(data);
    this.class.baseLvlHp = 4;
    this.class.baseLvlMana = 3;
    this.maxHealth = this.calculateMaxHealth();
    this.maxMana = this.calculateMaxMana();
  }

  calculateMaxMana() {
    const developMagic = this.class.skills.find(
      (skill: Skill) => skill.name === 'Magie entwickeln'
    );

    if (developMagic && this.class.baseLvlMana) {
      const developMagicRanks = this.getSkillRank(developMagic.nodesSkilled);
      return (
        (this.intelligenceBonus + this.class.baseLvlMana) * developMagicRanks
      );
    } else return null;
  }
}
