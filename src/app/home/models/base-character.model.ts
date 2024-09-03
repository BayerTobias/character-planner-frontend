import { BaseArmor, BaseArmorData } from './base-armor.model';
import { BaseWeapon, BaseWeaponData } from './base-weapon.model';
import { CharClass, CharClassData } from './char-class.model';
import { CharRace, CharRaceData } from './char-race.model';
import { CustomSkill, CustomSkillData } from './custom-skill.model';
import { CustomWeapon, CustomWeaponData } from './custom-weapon.model';
import { Money, MoneyData } from './money.model';
import { NodeData, SkilledNode } from './skilled-node.model';

export interface CharacterData {
  // Core Character Information
  id: number;
  name: string;
  race: CharRaceData;
  char_class: CharClassData;
  level?: number;

  // Health and Mana
  current_hp: number;
  current_mana: number | null;

  // Primary Attributes
  strength_value: number;
  strength_bonus: number;
  agility_value: number;
  agility_bonus: number;
  constitution_value: number;
  constitution_bonus: number;
  intelligence_value: number;
  intelligence_bonus: number;
  charisma_value: number;
  charisma_bonus: number;

  // Skills
  char_skilled_skills: NodeData[];
  custom_skills: CustomSkillData[];

  // Items
  base_weapons: BaseWeaponData[];
  custom_weapons: CustomWeaponData[];
  armor: BaseArmorData | null; // evtl custom armor
  money: MoneyData;
}

export class BaseCharacter {
  // Core Character Information
  id: number | null;
  name: string;
  race: CharRace;
  class: CharClass;
  level: number;

  // Health and Mana
  currentHp: number;
  maxHealth: number;
  currentMana: number | null;
  maxMana: number | null;

  // Primary Attributes
  strengthValue: number;
  strengthBonus: number;
  agilityValue: number;
  agilityBonus: number;
  constitutionValue: number;
  constitutionBonus: number;
  intelligenceValue: number;
  intelligenceBonus: number;
  charismaValue: number;
  charismaBonus: number;

  // Skills
  customSkills: CustomSkill[];
  skilledSkills: SkilledNode[];

  // Items
  baseWeapons: BaseWeapon[];
  customWeapons: CustomWeapon[];
  armor: BaseArmor | null;
  money: Money;

  constructor(data?: CharacterData) {
    // Core Character Information
    this.id = data?.id || null;
    this.name = data?.name || '';
    this.race = new CharRace(data?.race);
    this.class = new CharClass(data?.char_class);
    this.level = data?.level || 1;

    // Health and Mana
    this.currentHp = data?.current_hp || 0;
    this.maxHealth = 0;
    this.currentMana = data?.current_mana || null;
    this.maxMana = null;

    // Primary Attributes
    this.strengthValue = data?.strength_value || 0;
    this.strengthBonus =
      data?.strength_bonus || this.getStatBonusValue(this.strengthValue);
    this.agilityValue = data?.agility_value || 0;
    this.agilityBonus =
      data?.agility_bonus || this.getStatBonusValue(this.agilityValue);
    this.constitutionValue = data?.charisma_value || 0;
    this.constitutionBonus =
      data?.constitution_bonus ||
      this.getStatBonusValue(this.constitutionValue);
    this.intelligenceValue = data?.intelligence_value || 0;
    this.intelligenceBonus =
      data?.intelligence_bonus ||
      this.getStatBonusValue(this.intelligenceValue);
    this.charismaValue = data?.charisma_value || 0;
    this.charismaBonus =
      data?.charisma_bonus || this.getStatBonusValue(this.charismaValue);

    // Skills
    this.skilledSkills = (data?.char_skilled_skills || []).map(
      (skilledNode: NodeData) => new SkilledNode(skilledNode)
    );
    this.customSkills = (data?.custom_skills || []).map(
      (customSkill: CustomSkillData) => new CustomSkill(customSkill)
    );
    this.addSkilledNodes();
    // Items
    this.baseWeapons = (data?.base_weapons || []).map(
      (baseWeapon: BaseWeaponData) => new BaseWeapon(baseWeapon)
    );
    this.customWeapons = (data?.custom_weapons || []).map(
      (customWeapon: CustomWeaponData) => new CustomWeapon(customWeapon)
    );
    this.armor = data?.armor ? new BaseArmor(data.armor) : null;
    this.money = new Money(data?.money);
  }

  addSkilledNodes() {
    const skills = this.class.skills;
    const skilledSkills = this.skilledSkills;

    if (!skills || !skilledSkills) {
      return;
    }

    skilledSkills?.forEach((skilledNode) => {
      const skill = skills?.find((skill) => skill.id === skilledNode.skillId);

      if (skill) {
        skill.nodesSkilled = skilledNode.nodesSkilled;
      }
    });
  }

  getStatBonusValue(statValue: number) {
    switch (statValue) {
      case 0:
        return -99;
        break;
      case 1:
        return -3;
        break;
      case 2:
        return -2;
        break;
      case 3:
      case 4:
        return -1;
        break;
      case 5:
        return 0;
        break;
      case 6:
      case 7:
        return 1;
        break;
      case 8:
      case 9:
        return 2;
        break;
      case 10:
      case 11:
        return 3;
        break;
      case 12:
      case 13:
        return 4;
        break;
      case 14:
        return 5;
        break;
      default:
        return -99;
    }
  }

  getSkillRank(skilledNodes: number) {
    console.log('get skill:', skilledNodes);

    switch (skilledNodes) {
      case 0:
        return 0;
        break;
      case 1:
        return 1;
        break;
      case 2:
        return 2;
        break;
      case 3:
        return 3;
        break;
      case 4:
        return 4;
        break;
      case 5:
      case 6:
        return 5;
        break;
      case 7:
      case 8:
        return 6;
        break;
      case 9:
      case 10:
        return 7;
        break;
      case 11:
      case 12:
        return 8;
        break;
      case 13:
      case 14:
        return 9;
        break;
      case 15:
      case 16:
      case 17:
      case 18:
        return 10;
        break;
      case 19:
      case 20:
      case 21:
      case 22:
        return 11;
        break;
      case 23:
        return 12;
      default:
        return 0;
    }
  }

  asJson() {
    return {
      // Core Character Information
      name: this.name,
      race: this.race.id,
      class: this.class.id,
      level: this.level,

      // Health and Mana
      currentHp: this.currentHp,
      maxHealth: this.maxHealth,
      currentMana: this.currentMana,
      maxMana: this.maxMana,

      // Primary Attributes
      strengthValue: this.strengthValue,
      strengthBonus: this.strengthBonus,
      agilityValue: this.agilityValue,
      agilityBonus: this.agilityBonus,
      constitutionValue: this.constitutionValue,
      constitutionBonus: this.constitutionBonus,
      intelligenceValue: this.intelligenceValue,
      intelligenceBonus: this.intelligenceBonus,
      charismaValue: this.charismaValue,
      charismaBonus: this.charismaBonus,

      // Skills
      customSkills: this.customSkills.map((customSkill) =>
        customSkill.asJson()
      ),
      skilledSkills: this.skilledSkills.map((skilledSkill) =>
        skilledSkill.asJson()
      ),

      // Items
      baseWeapons: this.baseWeapons.map((baseWeapon) => baseWeapon.asJason()),
      customWeapons: this.customWeapons.map((customWeapon) =>
        customWeapon.asJason()
      ),
      armor: this.armor?.asJason(),
      money: this.money.asJason(),
    };
  }
}
