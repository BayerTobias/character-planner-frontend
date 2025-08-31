import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { lastValueFrom } from 'rxjs';

import {
  BaseCharacter,
  CharacterData,
} from '../../home/models/base-character.model';
import { Mage } from '../../home/models/mage-character.model';
import {
  CharacterListItem,
  CharacterListItemData,
} from '../../home/models/character-list-item.model';
import { CharClass, CharClassData } from '../../home/models/char-class.model';
import { CharacterFactory } from '../../home/factories/character-factory';
import { CharacterResponseData } from '../../interfaces/character-api-interfaces/character-response-interface';

@Injectable({
  providedIn: 'root',
})
export class CharacterDataService {
  private http = inject(HttpClient);

  // public character?: BaseCharacter | Mage | null = null;
  public character = signal<BaseCharacter | Mage | null>(null);
  public characterList: CharacterListItem[] = [];

  constructor() {}

  async getCharacterList() {
    const url = environment.baseUrl + 'api/characters/';

    try {
      const resp: CharacterListItemData[] = await lastValueFrom(
        this.http.get<CharacterListItemData[]>(url)
      );
      this.characterList = resp.map((data) => new CharacterListItem(data));
      console.log('char List:', this.characterList);
    } catch (err) {
      console.error(err);
    }
  }

  async getCharacterData(id: number) {
    const url = environment.baseUrl + `api/characters/${id}/`;
    const resp: CharacterData = await lastValueFrom(
      this.http.get<CharacterData>(url)
    );
    console.log(resp);

    const characterObject = CharacterFactory.create(resp);
    this.setCharacter(characterObject);
    console.log(characterObject);
  }

  async getClassDetails(id: number) {
    const url = environment.baseUrl + `api/classes/${id}/`;

    try {
      const resp: CharClassData = await lastValueFrom(
        this.http.get<CharClassData>(url)
      );
      return new CharClass(resp);
    } catch (err) {
      console.error(err);
      return new CharClass();
    }
  }

  async uploadCharacter(character: BaseCharacter) {
    const url = environment.baseUrl + 'api/characters/';
    const body = character.asPostRequestJson();

    const resp: CharacterData = await lastValueFrom(
      this.http.post<CharacterData>(url, body)
    );
    return resp;
  }

  //  Character signal functions

  setCharacter(character: BaseCharacter | Mage) {
    this.character.set(character);
  }

  updateCharacter(patch: Partial<BaseCharacter | Mage>) {
    this.character.update((currentChar) => {
      if (!currentChar) return currentChar;

      Object.assign(currentChar, patch);
      return currentChar;
    });

    // console.log(this.character());

    // this.character.set(structuredClone(this.character()));
  }
}
