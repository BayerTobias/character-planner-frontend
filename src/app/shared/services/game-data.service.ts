import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  CharClassListItem,
  CharClassListItemData,
} from '../../home/models/char-class-list-item.mode';
import { environment } from '../../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { CharRace, CharRaceData } from '../../home/models/char-race.model';

@Injectable({
  providedIn: 'root',
})
export class GameDataService {
  private http = inject(HttpClient);

  public charClasses: CharClassListItem[] = [];
  public charRaces: CharRace[] = [];

  constructor() {
    this.getClassesList();
    this.getRaceList();
  }

  async getClassesList() {
    const url = environment.baseUrl + 'api/classes/';
    const resp = await lastValueFrom(
      this.http.get<CharClassListItemData[]>(url)
    );
    this.charClasses = resp.map(
      (classData: CharClassListItemData) => new CharClassListItem(classData)
    );

    console.log(this.charClasses);
  }

  async getRaceList() {
    const url = environment.baseUrl + 'api/races';
    const resp = await lastValueFrom(this.http.get<CharRaceData[]>(url));
    this.charRaces = resp.map(
      (raceData: CharRaceData) => new CharRace(raceData)
    );

    console.log(this.charRaces);
  }
}
