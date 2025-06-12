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

    this.setupCharacterObject(resp);
    console.log(this.character?.asPostRequestJson());
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

  setupCharacterObject(data: CharacterData) {
    switch (data.char_class.name.toLowerCase()) {
      case 'mage':
        this.character = new Mage(data);
        break;
      default:
        this.character = new BaseCharacter(data);
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

  async updateCharacter() {
    console.log('implement update function');
  }
}
