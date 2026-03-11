import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CharacterListItemData } from '../../home/models/character-list-item.model';
import { environment } from '../../../environments/environment';
import {
  BaseCharacter,
  CharacterData,
} from '../../home/models/base-character.model';
import { CharClassData } from '../../home/models/char-class.model';
import { CharacterRequestDto } from '../api/dtos/character/character-request.dto';

@Injectable({
  providedIn: 'root',
})
export class CharacterApiService {
  private http = inject(HttpClient);

  private charactersUrl = environment.baseUrl + 'api/characters/';
  private classesUrl = environment.baseUrl + 'api/classes/';

  constructor() {}

  getCharacterList() {
    return this.http.get<CharacterListItemData[]>(this.charactersUrl);
  }

  getCharacterData(id: number) {
    return this.http.get<CharacterData>(this.charactersUrl + `${id}/`);
  }

  getClassDetails(id: number) {
    return this.http.get<CharClassData>(this.classesUrl + `${id}/`);
  }

  uploadCharacter(body: CharacterRequestDto) {
    return this.http.post<CharacterData>(this.charactersUrl, body);
  }
}
