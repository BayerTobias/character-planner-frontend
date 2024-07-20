import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { lastValueFrom } from 'rxjs';
import {
  CharClassListItem,
  CharClassListItemData,
} from '../../home/models/char-class-list-item.mode';

@Injectable({
  providedIn: 'root',
})
export class CharacterDataService {
  private http = inject(HttpClient);

  public charClasses: CharClassListItem[] = [];

  constructor() {
    this.getClassesList();
  }

  async getCharacterData() {
    const url = environment.baseUrl + '/api/characters/';

    return lastValueFrom(this.http.get(url));
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
  }
}
