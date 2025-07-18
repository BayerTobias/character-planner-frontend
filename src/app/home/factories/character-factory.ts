import { BaseCharacter, CharacterData } from '../models/base-character.model';
import { Mage } from '../models/mage-character.model';

export class CharacterFactory {
  static create(data?: CharacterData, classType?: string): BaseCharacter {
    const className =
      data?.character_class.name.toLocaleLowerCase() ||
      classType?.toLowerCase() ||
      'default';

    switch (className) {
      case 'mage':
        return new Mage(data);
        break;

      default:
        return new BaseCharacter(data);
        break;
    }
  }
}
