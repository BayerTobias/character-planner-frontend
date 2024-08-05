import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { lastValueFrom } from 'rxjs';
import { CharClassListItem } from '../../home/models/char-class-list-item.mode';
import {
  BaseCharacter,
  CharacterData,
} from '../../home/models/base-character.model';
import { Mage } from '../../home/models/mage-character.model';
import {
  CharacterListItem,
  CharacterListItemData,
} from '../../home/models/character-list-item.model';

@Injectable({
  providedIn: 'root',
})
export class CharacterDataService {
  private http = inject(HttpClient);

  public character?: BaseCharacter | Mage;
  public characterList: CharacterListItem[] = [];
  public charClasses: CharClassListItem[] = [];

  constructor() {
    this.getClassesList();
  }

  async getCharacterList() {
    const url = environment.baseUrl + '/api/characters/';

    try {
      const resp: CharacterListItemData[] = await lastValueFrom(
        this.http.get<CharacterListItemData[]>(url)
      );
      this.characterList = resp.map((data) => new CharacterListItem(data));
    } catch (err) {
      console.error(err);
    }
  }

  async getCharacterData(id: number) {
    const url = environment.baseUrl + `/api/characters/${id}/`;
    const resp: CharacterData = await lastValueFrom(
      this.http.get<CharacterData>(url)
    );
    this.setupCharacterObject(resp);
    console.log(this.character);
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

  async getClassesList() {
    const url = environment.baseUrl + 'api/classes/';
    const resp = await lastValueFrom(this.http.get<[]>(url));

    const charClasses: CharClassListItem[] = [];

    resp.forEach((charClassData) => {
      const object = new CharClassListItem(charClassData);
      charClasses.push(object);
    });

    this.charClasses = charClasses;
    console.log(this.charClasses);
  }
}
