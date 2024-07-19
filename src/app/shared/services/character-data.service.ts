import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharacterDataService {
  private http = inject(HttpClient);

  constructor() {}

  async getCharacterData() {
    const url = environment.baseUrl + '/api/characters';

    return lastValueFrom(this.http.get(url));
  }
}
