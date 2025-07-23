import { CharacterData } from '../../home/models/base-character.model';

export interface CharacterResponseData {
  message: string;
  character: CharacterData;
}
