import { BaseCharacter, CharacterData } from './base-character.model';
import { Skill, SkillData } from './skill.model';

interface MageData extends CharacterData {
  skills?: Skill[];
}

export class Mage extends BaseCharacter {
  constructor(data: MageData) {
    super(data);
    this.maxHealth = this.calculateMaxHealth();
    this.maxMana = this.calculateMaxMana();
  }

  calculateMaxHealth() {
    return (this.constitutionBonus + 4) * this.level;
  }

  calculateMaxMana() {
    return (this.intelligenceBonus + 3) * 7; /*magie entwikeln rank*/
  }
}
