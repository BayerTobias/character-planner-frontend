import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { lastValueFrom, map } from 'rxjs';

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
import { CharacterApiService } from './character-api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CharacterDataService {
  private http = inject(HttpClient);
  private api = inject(CharacterApiService);

  public character = signal<BaseCharacter | Mage | null>(null);
  public characterList = signal<CharacterListItem[]>([]);

  constructor() {}

  getCharacterList() {
    this.api.getCharacterList().subscribe({
      next: (resp) => {
        this.characterList.set(resp.map((data) => new CharacterListItem(data)));
        console.log('char List:', this.characterList());
      },

      error: (err) => {
        console.error(err);
      },
    });

    // try {
    //   const resp: CharacterListItemData[] = await lastValueFrom(
    //     this.http.get<CharacterListItemData[]>(url),
    //   );
    //   this.characterList = resp.map((data) => new CharacterListItem(data));
    //   console.log('char List:', this.characterList);
    // } catch (err) {
    //   console.error(err);
    // }
  }

  getCharacterData(id: number) {
    this.api.getCharacterData(id).subscribe({
      next: (resp) => {
        const characterObject = CharacterFactory.create(resp);
        this.setCharacter(characterObject);
        console.log(characterObject);
      },

      error: (err) => {
        console.error(err);
      },
    });

    // const url = environment.baseUrl + `api/characters/${id}/`;
    // const resp: CharacterData = await lastValueFrom(
    //   this.http.get<CharacterData>(url),
    // );
    // console.log(resp);

    // const characterObject = CharacterFactory.create(resp);
    // this.setCharacter(characterObject);
    // console.log(characterObject);
  }

  getClassDetails(id: number) {
    return this.api
      .getClassDetails(id)
      .pipe(map((resp) => new CharClass(resp)));

    // const url = environment.baseUrl + `api/classes/${id}/`;

    // try {
    //   const resp: CharClassData = await lastValueFrom(
    //     this.http.get<CharClassData>(url),
    //   );
    //   return new CharClass(resp);
    // } catch (err) {
    //   console.error(err);
    //   return new CharClass();
    // }
  }

  uploadCharacter(character: BaseCharacter) {
    return this.api.uploadCharacter(character.asPostRequestJson());

    // const url = environment.baseUrl + 'api/characters/';
    // const body = character.asPostRequestJson();

    // const resp: CharacterData = await lastValueFrom(
    //   this.http.post<CharacterData>(url, body),
    // );
    // return resp;
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
