import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
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

  public character?: BaseCharacter | Mage;
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

    this.character = CharacterFactory.create(resp);
    console.log(this.character);
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

    const resp: CharacterResponseData = await lastValueFrom(
      this.http.post<CharacterResponseData>(url, body)
    );
    return resp;
  }
}
