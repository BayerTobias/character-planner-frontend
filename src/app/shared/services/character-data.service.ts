import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharacterDataService {
  private http = inject(HttpClient);

  public charClasses = [];

  constructor() {}

  async getCharacterData() {
    const url = environment.baseUrl + '/api/characters/';

    return lastValueFrom(this.http.get(url));
  }

  async getClassesList() {
    const url = environment.baseUrl + 'api/classes/';
    const resp = await lastValueFrom(this.http.get(url));
    console.log(resp);
  }
}
