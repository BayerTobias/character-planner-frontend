import { BaseCharacter, CharacterData } from '../models/base-character.model';
import { Mage } from '../models/mage-character.model';

export class CharacterFactory {
  static create(data: CharacterData): BaseCharacter {
    switch (data.character_class.name.toLocaleLowerCase()) {
      case 'mage':
        return new Mage(data);
        break;

      default:
        return new BaseCharacter(data);
        break;
    }
  }
}
